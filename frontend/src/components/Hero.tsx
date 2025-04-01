import { Zap, BarChart3, Coins } from "lucide-react"
import Image from "next/image"

export default function Hero() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">
                <div className="mt-16 relative w-full max-w-4xl z-20">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-80 blur-md"></div>
                    <div
                        className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-8
                bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center text-center space-y-4 p-4">
                                <div
                                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600/30 to-blue-400/30 flex items-center justify-center
                      shadow-[inset_0_2px_3px_rgba(255,255,255,0.1)]"
                                >
                                    <Coins className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold">Deposit</h3>
                                <p className="text-gray-400">Deposit crypto into a lending pool</p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-4 p-4">
                                <div
                                    className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600/30 to-indigo-400/30 flex items-center justify-center
                      shadow-[inset_0_2px_3px_rgba(255,255,255,0.1)]"
                                >
                                    <BarChart3 className="w-8 h-8 text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-semibold">Earn or Collateralize</h3>
                                <p className="text-gray-400">Earn yield or use your assets as collateral</p>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-4 p-4">
                                <div
                                    className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600/30 to-purple-400/30 flex items-center justify-center
                      shadow-[inset_0_2px_3px_rgba(255,255,255,0.1)]"
                                >
                                    <Zap className="w-8 h-8 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold">Borrow</h3>
                                <p className="text-gray-400">Borrow against your locked assets instantly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-1/2 right-0">
                <Image src="/Looper-3.png" alt="bg" width={500} height={300} />
            </div>
            <div className="absolute -bottom-1/2 left-0">
                <Image src="/Looper-2.png" alt="bg" width={500} height={300} />
            </div>
        </section>
    )
}