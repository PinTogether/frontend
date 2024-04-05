"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";

import { LoginStatusMessage } from "../login/LoginPage";

export default function LoginPopup() {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const opener = window.opener;
    if (!opener) {
      redirect("/");
    }
    const oauth = new Cookies().get("Authorization");
    (async () => {
      if (oauth) {
        setSuccess(true);
        await window.opener.postMessage(
          {
            source: LoginStatusMessage.SOURCE_LOGIN_POPUP,
            status: LoginStatusMessage.LOGIN_SUCCESS,
          },
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}`
        );
      } else {
        setSuccess(false);
        await window.opener.postMessage(
          LoginStatusMessage.LOGIN_FAILED,
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}`
        );
      }
      self.close();
    })();
  }, []);

  return (
    <>
      <div>{success ? "login success" : "login failed"}</div>
    </>
  );
}
