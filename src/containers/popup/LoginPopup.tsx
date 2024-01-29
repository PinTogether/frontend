"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

export default function LoginPopup() {
  const [success, setSuccess] = useState(false);
  const opener = window.opener;
  const oauth = new Cookies().get("Authorization");

  useEffect(() => {
    if (!opener) {
      redirect("/");
    }
  }, [opener]);

  useEffect(() => {
    console.log("popup page");
    // const oauth = cookies.get("Authorization");
    // console.log(cookies);
    if (oauth) {
      setSuccess(true);
      opener?.postMessage("success", "http://localhost:3000");
      window.close();
    } else opener?.postMessage("failed", "http://localhost:3000");
  }, [opener]);

  return (
    <>
      <div>{success ? "login success" : "login failed"}</div>
    </>
  );
}
