"use client";
import { getRoleFromCookie } from "@/features/auth/api/get-role-from-cookie";
//check if the user is logged in by checking his role (set in signin/ page.tsx)
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SessionProvider({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  //on RELOAD check role and redirect if missing
  useEffect(() => {
    const manageRole = async () => {
      const role = await getRoleFromCookie();

      if (
        role === "EXPIRED / NON EXISTANT TOKEN. CAN NOT GET ROLE" &&
        pathname !== "/"
      ) {
        router.replace("/");
      }
    };
    manageRole();
  }, [router, pathname]);

  if (role === "" && pathname !== "/") return null;
  return <>{children}</>;
}
