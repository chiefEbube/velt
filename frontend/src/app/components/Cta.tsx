import { Button } from "./ui/button";

export default function Cta() {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-80 blur-md"></div>
                    <div
                        className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-12
                  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Earning & Borrowing Today</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join thousands of users already benefiting from decentralized finance. Start your DeFi journey with Velt
                            today.
                        </p>
                        <Button
                            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full
                        shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}