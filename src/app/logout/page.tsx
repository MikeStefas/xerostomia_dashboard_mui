'use client';
import { LogoutFunc } from "@/token/session_related_funcs/logout";
import {  useEffect } from "react";

export default function LogoutPage() {

    
    useEffect(() => {
        LogoutFunc();
    }, []);

    return (
        <div>
            <h1>Logging Out ...</h1>
        </div>
    );
}