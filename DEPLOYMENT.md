# Deployment Guide - ShopEase E-commerce Store

This guide will help you deploy your Next.js e-commerce application to Netlify and configure it for production use.

## Table of Contents
- [Local Development Setup](#local-development-setup)
- [Deploying to Netlify](#deploying-to-netlify)
- [Environment Variables Configuration](#environment-variables-configuration)
- [Google OAuth Setup](#google-oauth-setup)
- [Cashfree Payment Gateway Setup](#cashfree-payment-gateway-setup)
- [Post-Deployment Checklist](#post-deployment-checklist)
- [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### 1. Environment Variables for Local Development

Your `.env.local` file should contain **ONLY localhost URLs** for local development:

```env
# Authentication
NEXTAUTH_SECRET=8c8a3b9c2deb5b6e2d7e1f4a6b9c
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Cashfree Payment Gateway
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_APP_ID=your_cashfree_app_id

# App Configuration
APP_PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Important**: Never commit `.env.local` to Git. It's already in `.gitignore`.

### 2. Running Locally

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

---

## Deploying to Netlify

### Step 1: Prepare Your Project

1. **Build your project locally** to ensure there are no errors:
```bash
npm run build
```

2. **Commit all changes** to your Git repository:
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### Step 2: Create a Netlify Site

1. Go to [Netlify](https://www.netlify.com/) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository: `EcommerceStore`
5. Configure build settings:
   - **Base directory**: `ecomstore`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Functions directory**: Leave empty (Next.js handles this)

6. Click **"Deploy site"**

### Step 3: Configure Build Settings for Next.js

After initial deployment, you may need to configure Netlify for Next.js:

1. Install the **Next.js Runtime** plugin:
   - Go to **Site settings** → **Build & deploy** → **Continuous deployment**
   - Scroll to **Build plugins**
   - Add **"Next on Netlify"** or **"Essential Next.js"** plugin

2. Or add a `netlify.toml` file to your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## Environment Variables Configuration

### Setting Environment Variables in Netlify

1. Go to your site dashboard in Netlify
2. Click **Site settings** → **Environment variables**
3. Click **"Add a variable"** and add each of the following:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `NEXTAUTH_SECRET` | `8c8a3b9c2deb5b6e2d7e1f4a6b9c` | Same as local |
| `NEXTAUTH_URL` | `https://your-site.netlify.app` | Replace with your actual Netlify URL |
| `GOOGLE_CLIENT_ID` | Your Google Client ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Your Google Client Secret | From Google Cloud Console |
| `CASHFREE_SECRET_KEY` | Your Cashfree Secret Key | From Cashfree Dashboard |
| `CASHFREE_APP_ID` | Your Cashfree App ID | From Cashfree Dashboard |
| `NEXT_PUBLIC_APP_URL` | `https://your-site.netlify.app` | Replace with your actual Netlify URL |

> **Important**: 
> - Use your actual Netlify URL (e.g., `https://shopease-store.netlify.app`)
> - If using a custom domain, use that instead (e.g., `https://shopease.com`)
> - Variables starting with `NEXT_PUBLIC_` are exposed to the browser

### After Adding Variables

1. Click **"Save"**
2. **Redeploy** your site:
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## Google OAuth Setup

### For Production (Netlify)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **APIs & Services** → **Credentials**
4. Click on your **OAuth 2.0 Client ID**

5. **Add Authorized JavaScript origins**:
   - Click **"+ ADD URI"**
   - Add: `https://your-site.netlify.app`
   - If using custom domain, add that too

6. **Add Authorized redirect URIs**:
   - Click **"+ ADD URI"**
   - Add: `https://your-site.netlify.app/api/auth/callback/google`
   - If using custom domain, add that too

7. Click **"Save"**

> **Note**: Keep your localhost URLs for local development:
> - `http://localhost:3000`
> - `http://localhost:3000/api/auth/callback/google`

---

## Cashfree Payment Gateway Setup

### For Production

1. Log in to [Cashfree Dashboard](https://merchant.cashfree.com/)
2. Go to **Developers** → **API Keys**
3. Make sure you're using **Production** credentials (not Test/Sandbox)
4. Copy your **App ID** and **Secret Key**
5. Add them to Netlify environment variables (as mentioned above)

### Configure Webhook URLs (Optional)

If you're using Cashfree webhooks:

1. In Cashfree Dashboard, go to **Developers** → **Webhooks**
2. Add webhook URL: `https://your-site.netlify.app/api/cashfree/webhook`
3. Save the configuration

---

## Post-Deployment Checklist

After deploying, verify the following:

- [ ] **Site loads correctly** at your Netlify URL
- [ ] **Google OAuth login works**
  - Try signing in with Google
  - Check that user session persists
- [ ] **Product pages load** without errors
- [ ] **Cart functionality works**
  - Add items to cart
  - Update quantities
  - Remove items
- [ ] **Checkout process works**
  - Fill in shipping details
  - Payment integration works (if enabled)
- [ ] **Orders page displays** correctly
  - View orders
  - Cancel order functionality works
- [ ] **Wishlist functionality** works
  - Add/remove items from wishlist
- [ ] **Redux state persists** on page refresh
- [ ] **All API routes** are working
  - `/api/products`
  - `/api/auth/[...nextauth]`
  - `/api/cashfree/*` (if applicable)

---

## Troubleshooting

### Issue: "Invalid Client" Error on Google Login

**Solution**:
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in Netlify environment variables
- Check that your Netlify URL is added to Google Cloud Console authorized URIs
- Clear browser cache and try again

### Issue: NextAuth Session Not Working

**Solution**:
- Verify `NEXTAUTH_URL` matches your actual Netlify URL (no trailing slash)
- Ensure `NEXTAUTH_SECRET` is set in Netlify environment variables
- Redeploy the site after adding environment variables

### Issue: API Routes Return 404

**Solution**:
- Ensure you have the Next.js runtime plugin installed in Netlify
- Check that your `netlify.toml` is configured correctly
- Verify the build completed successfully in Netlify deploy logs

### Issue: Environment Variables Not Working

**Solution**:
- Go to Netlify → **Site settings** → **Environment variables**
- Verify all variables are set correctly
- Trigger a new deployment with **"Clear cache and deploy site"**
- For `NEXT_PUBLIC_*` variables, they must be set BEFORE build time

### Issue: Payment Integration Not Working

**Solution**:
- Ensure you're using **Production** credentials from Cashfree
- Verify `CASHFREE_SECRET_KEY` and `CASHFREE_APP_ID` are correct
- Check Cashfree dashboard for any restrictions on domain/URL
- Verify webhook URLs are configured correctly

### Issue: Products/Orders Not Persisting

**Solution**:
- This is normal - Redux Persist uses localStorage which is browser-specific
- Data won't sync between different browsers/devices
- For production, consider implementing a backend database (MongoDB, PostgreSQL, etc.)

---

## Custom Domain Setup (Optional)

### Adding a Custom Domain to Netlify

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name (e.g., `shopease.com`)
4. Follow Netlify's instructions to:
   - Update your domain's DNS settings
   - Add Netlify nameservers or CNAME record
5. Netlify will automatically provision SSL certificate

### Update Environment Variables for Custom Domain

After adding custom domain:
1. Update `NEXTAUTH_URL` to `https://yourdomain.com`
2. Update `NEXT_PUBLIC_APP_URL` to `https://yourdomain.com`
3. Update Google OAuth authorized URIs to include your custom domain
4. Redeploy the site

---

## Need Help?

If you encounter issues not covered in this guide:

1. Check Netlify deploy logs for build errors
2. Check browser console for JavaScript errors
3. Verify all environment variables are set correctly
4. Ensure your code is up to date with the latest push to Git

---

## Summary

**For Local Development:**
- Use `.env.local` with localhost URLs
- Keep this file in `.gitignore`

**For Production (Netlify):**
- Set environment variables in Netlify dashboard
- Use production URLs (Netlify URL or custom domain)
- Configure Google OAuth with production URLs
- Use production Cashfree credentials
- Test thoroughly after deployment

Good luck with your deployment! 🚀
