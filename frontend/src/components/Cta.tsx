"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Cta() {
    const router = useRouter()
    return (
        <section className="container mx-auto py-20">
            <div className="flex justify-between items-center flex-col-reverse md:flex-row py-10 px-4">
                <div className="relative group text-center md:text-left max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Earning & Borrowing Today</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of users already benefiting from decentralized finance. Start your DeFi journey with Velt
                        today.
                    </p>
                    <Button
                        className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full
                        shadow-[0_0_15px_rgba(79,70,229,0.5)]" onClick={() => {router.push("/home")}}
                    >
                        Get Started
                    </Button>
                </div>
                <div className="relative overflow-hidden md:-right-10">
                    <Image src="/purple-bag.svg" alt="cta" width={500} height={500}  className="relative z-10"/>
                    <div className="absolute top-10 right-1/2 z-0">
                        <Image src="/group.png" alt="cta" width={300} height={300} />
                    </div>
                </div>
            </div>
        </section>
    )
}