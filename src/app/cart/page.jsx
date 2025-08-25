"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/counterSlice";

export default function CounterComponent() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  useEffect(() => {
    console.log("Redux count:", count);
  }, [count]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Counter: {count}</h1>
      <button
        onClick={() => dispatch(increment())}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
}
