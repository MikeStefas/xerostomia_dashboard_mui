'use client';
import { LogoutFunc } from "@/funcs/logout";
import { useContext, useEffect } from "react";
import { RoleContext } from "../layout";


export default function LogoutPage() {

    const ctx = useContext(RoleContext);
    if (!ctx) {
    throw new Error("RoleContext must be used inside RootLayout");
      }
    const { role, setRole } = ctx;


    useEffect(() => {
        LogoutFunc();
    }, []);

    return (
        <div>
            <h1>Logging Out ...</h1>
        </div>
    );
}