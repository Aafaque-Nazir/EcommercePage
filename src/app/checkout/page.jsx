"use client";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Truck, CreditCard, MapPin, Phone, User, Home, Building2 } from "lucide-react";
import { load } from "@cashfreepayments/cashfree-js";
import ProtectedPage from "@/components/ProtectedPage";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    pincode: "",
    locality: "", // Flat, House no, Building
    address: "",  // Area, Street, Sector
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "home", // home or work
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Specific validation for numbers
    if ((name === "mobile" || name === "pincode" || name === "alternatePhone") && !/^\d*$/.test(value)) {
      return; 
    }
    setForm({ ...form, [name]: value });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
  const shipping = subtotal > 500 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const validateForm = () => {
    if (!form.name || form.name.length < 3) return "Please enter a valid full name.";
    if (!form.mobile || form.mobile.length !== 10) return "Please enter a valid 10-digit mobile number.";
    if (!form.pincode || form.pincode.length !== 6) return "Please enter a valid 6-digit Pincode.";
    if (!form.locality) return "Please enter Flat/House No/Building details.";
    if (!form.address) return "Please enter Area/Colony/Street details.";
    if (!form.city) return "Please enter your City.";
    if (!form.state) return "Please enter your State.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paymentMethod = e.target.payment.value;

    // Cart Validation
    if (!cartItems?.length) {
      toast.error("Your cart is empty!");
      return;
    }

    // Form Validation
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const fullAddress = `${form.locality}, ${form.address}, ${form.landmark ? form.landmark + ", " : ""}${form.city}, ${form.state} - ${form.pincode}`;
    const userEmail = session?.user?.email || "guest@example.com";

    // For Cash on Delivery
    if (paymentMethod === "cod") {
      const order = {
        id: `order_${Date.now()}`,
        customer: { ...form, email: userEmail, fullAddress },
        items: cartItems,
        total,
        payment: "COD",
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      // We don't really use this localStorage item for logic anymore, but keeping it consistent
      localStorage.setItem("lastOrder", JSON.stringify(order));
      
      // We need to send this to the backend as well for COD to appear in DB
      // COD Logic update to match strict backend requirement
      setLoading(true);
      try {
         const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            customer: {
              name: form.name,
              email: userEmail,
              address: fullAddress,
              phone: form.mobile
            },
            order_amount: total,
          })
        });

        if (!response.ok) {
           throw new Error("Failed to place COD order");
        }
        
        dispatch(clearCart());
        router.push("/order-success");
      } catch (err) {
         console.error(err);
         toast.error("Failed to place order. Please try again.");
      } finally {
         setLoading(false);
      }
      return;
    }

    // For Online Payment (Cashfree)
    if (paymentMethod === "online") {
      setLoading(true);
      try {
        // 1. Create Order on Backend
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            customer: {
              name: form.name,
              email: userEmail, // USING REAL SESSION EMAIL
              address: fullAddress,
              phone: form.mobile
            },
            order_amount: total,
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Payment initialization failed");
        }

        const data = await response.json();

        // Store order data BEFORE payment
        const orderData = {
          orderId: data.order_id,
          items: cartItems,
          customer: { ...form, email: userEmail, fullAddress },
          total,
          status: "pending",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("pendingOrder", JSON.stringify(orderData));

        if (data.mock) {
          // Mock payment flow
          toast.info('Simulating Bank Payment...');
          await new Promise(resolve => setTimeout(resolve, 1500));
          dispatch(clearCart());
          router.push(`/order-success?order_id=${data.order_id}`);
          return;
        }

        if (data.payment_session_id) {
          const cashfree = await load({
            mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox",
          });
          dispatch(clearCart());
          await cashfree.checkout({
            paymentSessionId: data.payment_session_id,
            redirectTarget: "_self",
          });
        }
      } catch (error) {
        console.error("Payment Error:", error);
        toast.error(error.message || "Payment initialization failed.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <ShieldCheck className="text-green-600" /> Secure Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column: Address & Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              <form id="checkout-form" onSubmit={handleSubmit}>
                
                {/* 1. Delivery Address Section */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm mb-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs">1</span>
                    Delivery Address
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
                      <input 
                        type="text" name="name" value={form.name} onChange={handleChange} 
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        placeholder="John Doe"
                      />
                    </div>
                    {/* Mobile */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">10-digit Mobile Number</label>
                      <input 
                        type="text" name="mobile" value={form.mobile} onChange={handleChange} maxLength={10}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        placeholder="9876543210"
                      />
                    </div>
                    {/* Pincode */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Pincode</label>
                      <input 
                        type="text" name="pincode" value={form.pincode} onChange={handleChange} maxLength={6}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        placeholder="110001"
                      />
                    </div>
                    {/* Locality */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Locality</label>
                      <input 
                        type="text" name="locality" value={form.locality} onChange={handleChange}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        placeholder="Flat 101, Galaxy Apts"
                      />
                    </div>
                    {/* Address (Area/Street) */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Address (Area and Street)</label>
                      <textarea 
                        name="address" value={form.address} onChange={handleChange} rows={2}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none"
                        placeholder="Sector 14, Main Market Road"
                      />
                    </div>
                    {/* City */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">City/District/Town</label>
                      <input 
                        type="text" name="city" value={form.city} onChange={handleChange}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      />
                    </div>
                    {/* State */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">State</label>
                      <div className="relative">
                       <select 
                          name="state" value={form.state} onChange={handleChange}
                          className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none cursor-pointer"
                        >
                          <option value="">Select State</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Kerala">Kerala</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Manipur">Manipur</option>
                          <option value="Meghalaya">Meghalaya</option>
                          <option value="Mizoram">Mizoram</option>
                          <option value="Nagaland">Nagaland</option>
                          <option value="Odisha">Odisha</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Sikkim">Sikkim</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Telangana">Telangana</option>
                          <option value="Tripura">Tripura</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Uttarakhand">Uttarakhand</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        </select>
                      </div>
                    </div>
                    {/* Landmark */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Landmark (Optional)</label>
                      <input 
                        type="text" name="landmark" value={form.landmark} onChange={handleChange}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        placeholder="Near Metro Station"
                      />
                    </div>
                    {/* Alt Phone */}
                    <div className="col-span-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Alternate Phone (Optional)</label>
                      <input 
                        type="text" name="alternatePhone" value={form.alternatePhone} onChange={handleChange} maxLength={10}
                        className="w-full p-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      />
                    </div>
                    
                    {/* Address Type */}
                    <div className="md:col-span-2 mt-2">
                       <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Address Type</label>
                       <div className="flex gap-4">
                         <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${form.addressType === 'home' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600' : 'border-gray-200 dark:border-gray-800'}`}>
                           <input type="radio" name="addressType" value="home" checked={form.addressType === "home"} onChange={handleChange} className="hidden"/>
                           <Home size={16} /> Home
                         </label>
                         <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${form.addressType === 'work' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600' : 'border-gray-200 dark:border-gray-800'}`}>
                           <input type="radio" name="addressType" value="work" checked={form.addressType === "work"} onChange={handleChange} className="hidden"/>
                           <Building2 size={16} /> Work
                         </label>
                       </div>
                    </div>
                  </div>
                </div>

                {/* 2. Payment Section */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-xs">2</span>
                    Payment Method
                  </h2>
                  
                  <div className="space-y-3">
                    <label className="relative flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all">
                      <input type="radio" name="payment" value="cod" defaultChecked className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500" />
                      <div className="flex-1">
                         <div className="font-semibold text-gray-900 dark:text-white">Cash on Delivery</div>
                         <div className="text-sm text-gray-500">Pay lightly with cash when your order arrives.</div>
                      </div>
                      <CreditCard className="text-gray-400" />
                    </label>

                    <label className="relative flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-all">
                      <input type="radio" name="payment" value="online" className="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500" />
                      <div className="flex-1">
                         <div className="font-semibold text-gray-900 dark:text-white">UPI / Cards / NetBanking</div>
                         <div className="text-sm text-gray-500">Secure faster checkout with Cashfree Payments.</div>
                      </div>
                      <div className="flex gap-2">
                         {/* Icons for payment options could go here */}
                         <CreditCard className="text-gray-400" />
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-24">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Price Details</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Price ({cartItems.length} items)</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Discount</span>
                    <span className="text-green-600">- ₹0</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                     <span>Delivery Charges</span>
                     <span className={shipping === 0 ? "text-green-600" : ""}>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                   <div className="flex justify-between text-gray-600 dark:text-gray-400">
                     <span>Tax (5%)</span>
                     <span>₹{tax}</span>
                  </div>
                  
                  <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Total Payable</span>
                      <span className="text-xl font-bold text-green-600 dark:text-green-500">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 justify-center">
                    <ShieldCheck size={14} className="text-green-600" />
                    Safe and Secure Payments. 100% Authentic products.
                  </div>
                  <button
                    onClick={() => document.getElementById('checkout-form').requestSubmit()}
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-wide transition-all shadow-lg shadow-green-500/20 active:scale-[0.98] ${
                      loading 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-green-600 hover:bg-green-500 text-white"
                    }`}
                  >
                    {loading ? "Processing..." : `Place Order • ₹${total.toLocaleString()}`}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
