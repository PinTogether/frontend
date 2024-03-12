"use client";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { ProfileMine } from "@/types/Profile";

export default function LoginPopup() {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const opener = window.opener;
    if (!opener) {
      redirect("/");
    }
    const oauth = new Cookies().get("Authorization");
    if (oauth) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/members/me`)
        .then((res) => {
          if (res.ok) return res.json();
          else throw new Error("서버 오류");
        })
        .then((data) => {
          const myProfile: ProfileMine = data;
          localStorage.setItem("myProfile", JSON.stringify(myProfile));
        })
        .then(() => {
          setSuccess(true);
          window.opener.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}`;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!success)
      window.opener.postMessage(
        "login failed",
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}`
      );
    self.close();
  }, []);

  return (
    <>
      <div>{success ? "login success" : "login failed"}</div>
    </>
  );
}
