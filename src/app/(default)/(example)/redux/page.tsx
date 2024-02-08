"use client";
import { FormEvent, useState, useRef } from "react";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { decrement, increment, incrementByAmount } from "@/redux/counterSlice";

export default function Page() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(incrementByAmount(Number(inputRef.current?.value || 0)));
  };

  return (
    <div>
      <h1>Redux test page</h1>
      <p>
        Count : <strong>{count}</strong>
      </p>
      <br />
      <button onClick={handleDecrement}>decrement-BTN</button>
      <br />
      <button onClick={handleIncrement}>increment-BTN</button>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="number" ref={inputRef} />
        <button>incrementByAmount-BTN</button>
      </form>
    </div>
  );
}
