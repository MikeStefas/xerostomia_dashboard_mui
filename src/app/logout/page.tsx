'use client';
import { LogoutFunc } from "@/tokenSessionFuncs/logout";
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