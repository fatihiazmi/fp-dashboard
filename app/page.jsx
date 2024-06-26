"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router])

  if (user){
    return null;
  }

  return (
    <>
      <div className="mt-12">
        <LoginForm />
      </div>
    </>
  );
}
