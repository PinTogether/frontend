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
      (async () => {
        await opener?.postMessage(
          "success",
          process.env.NEXT_PUBLIC_FRONTEND_URL
        );
        window.close();
      })();
    } else {
      (async () => {
        await opener?.postMessage(
          "failed",
          process.env.NEXT_PUBLIC_FRONTEND_URL
        );
        window.close();
      })();
    }
  }, []);

  return (
    <>
      <div>{success ? "login success" : "login failed"}</div>
    </>
  );
}
