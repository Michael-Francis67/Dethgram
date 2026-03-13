"use client";

import React, {useEffect} from "react";
import Image from "next/image";
import {usePathname} from "next/navigation";
import crypto from "node:crypto";

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    const pathname = usePathname();

    useEffect(() => {
        let id = localStorage.getItem("deviceId");

        if (!id) {
            id = crypto.randomBytes(32).toString("hex");
            localStorage.setItem("deviceId", id);
        } else {
            return;
        }
    }, []);

    return (
        <main className="w-full h-screen flex items-center justify-center px-8 py-4">
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center gap-4">
                {pathname === "/signup" ||
                    (pathname === "/login" ? (
                        ""
                    ) : (
                        <div className="flex items-center gap-2">
                            <Image
                                src={"/assests/dethgram-logo.png"}
                                alt="Dethgram"
                                width={25}
                                height={25}
                                className="mx-auto"
                            />
                            <h2 className="text-blue-500 font-semibold tracking-wide">Dethgram</h2>
                        </div>
                    ))}
                {children}
            </div>
        </main>
    );
};

export default AuthLayout;
