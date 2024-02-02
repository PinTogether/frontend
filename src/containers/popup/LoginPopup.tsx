"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

export default function LoginPopup() {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const opener = window.opener;
    const oauth = new Cookies().get("Authorization");
    if (!opener) {
      redirect("/");
    }
    if (oauth) {
      setSuccess(true);
      opener?.postMessage("success", "http://localhost:3000");
      window.close();
    } else opener?.postMessage("failed", "http://localhost:3000");
  }, []);

  return (
    <>
      <div>{success ? "login success" : "login failed"}</div>
    </>
  );
}
