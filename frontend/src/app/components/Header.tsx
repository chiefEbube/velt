"use client"

import BackgroundImage from "@/../public/bg.jpg"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "./ui/button";


export default function Header() {
    const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

    useEffect(() => {
        setBackgroundImage(BackgroundImage.src);
    }, []);
    return (
        <div style={{
            backgroundImage: backgroundImage
                ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backgroundImage})`
                : "none",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
        }}>
            <header className="container mx-auto px-4 h-[100vh] flex flex-col gap-8">
                <nav className="flex items-center justify-between py-6">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl">
                            V
                        </div>
                        <span className="text-xl font-bold">Velt</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                            How It Works
                        </Link>
                        <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                            Features
                        </Link>
                        <Link href="#why-velt" className="text-gray-300 hover:text-white transition-colors">
                            Why Velt
                        </Link>
                        <Link href="#faq" className="text-gray-300 hover:text-white transition-colors">
                            FAQ
                        </Link>
                    </div>
                </nav>
                {/* <section className="py-20 md:py-32  items-center text-center"> */}
                <div className="max-w-4xl mx-auto py-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Decentralized Crypto Lending Platform. Borrow & Earn with Smart Contracts
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto my-4">
                        Unlock the power of decentralized finance. Securely lend your crypto to earn yield or borrow against your
                        assets—all without intermediaries.
                    </p>
                    <Button
                        className="mt-8 text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full
              shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                    >
                        Get Started
                    </Button>
                </div>
                {/* </section> */}
            </header>
        </div>
    )
}