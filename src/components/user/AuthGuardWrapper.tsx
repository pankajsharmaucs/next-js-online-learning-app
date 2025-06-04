"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authUserLogin } from "@/utlis/checkAdminLogin";

export default function AuthGuardWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUserLogin();
      if (!isAuth) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return <>{children}</>;
}
