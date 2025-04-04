import Image from "next/image";
import CryptoCard from "./CryptoCard";

export default function SupportedAssets() {
    return (
        <section className="container mx-auto px-4 py-20 relative">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Assets</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
                <CryptoCard
                    name="Bitcoin"
                    symbol="BTC"
                    color="from-amber-500 to-orange-600"
                    iconPath="/Bitcoin.svg?height=80&width=80"
                />
                <CryptoCard
                    name="Ethereum"
                    symbol="ETH"
                    color="from-indigo-400 to-blue-600"
                    iconPath="/Ethereum.svg?height=80&width=80"
                />
                <CryptoCard
                    name="USDT"
                    symbol="USDT"
                    color="from-green-400 to-green-600"
                    iconPath="/Usdt.svg?height=80&width=80"
                />
                <CryptoCard
                    name="Solana"
                    symbol="SOL"
                    color="from-purple-400 to-purple-600"
                    iconPath="/Solana.svg?height=80&width=80"
                />
                <CryptoCard
                    name="Avalanche"
                    symbol="AVAX"
                    color="from-red-400 to-red-600"
                    iconPath="/Avalanche.svg?height=80&width=80"
                />
            </div>

            <div className="text-center mt-10">
                <p className="text-gray-400">...and more assets coming soon</p>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32">
                <Image src="/Etherium-3d.svg" alt="faq" width={250} height={250} />
            </div>
        </section>
    )
}