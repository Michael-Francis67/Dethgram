import React from "react";
import Image from "next/image";

const SignUpLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="w-screen h-screen flex items-center justify-center px-8 py-4 md:px-0 md:py-0">
            <div className="w-full h-full flex items-center justify-between">
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center gap-4">
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
                    {children}
                </div>
                <div className="w-0 lg:w-1/2 h-full">
                    <Image
                        src={"/assests/auth-image.svg"}
                        alt="Dethgram Authentication Image"
                        width={700}
                        height={700}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </main>
    );
};

export default SignUpLayout;
