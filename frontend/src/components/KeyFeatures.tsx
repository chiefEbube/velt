import { ChevronRight, Shield, Zap, BarChart3, Clock, Coins } from "lucide-react"
import FeatureCard from "./FeatureCard"

export default function KeyFeatures() {
    return (
        <section id="features" className="container mx-auto px-4 py-20 ">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                    icon={<Shield className="w-6 h-6" />}
                    title="Smart Contract-Powered"
                    description="Secure and automated lending with blockchain technology."
                />
                <FeatureCard
                    icon={<ChevronRight className="w-6 h-6" />}
                    title="No Middlemen"
                    description="Fully decentralized, giving you complete control."
                />
                <FeatureCard
                    icon={<BarChart3 className="w-6 h-6" />}
                    title="Earn Passive Income"
                    description="Lend your crypto and earn interest."
                />
                <FeatureCard
                    icon={<Zap className="w-6 h-6" />}
                    title="Instant Borrowing"
                    description="Get liquidity without selling your assets."
                />
                <FeatureCard
                    icon={<Coins className="w-6 h-6" />}
                    title="Multi-Asset Support"
                    description="Lend and borrow across various crypto assets."
                />
                <FeatureCard
                    icon={<Clock className="w-6 h-6" />}
                    title="Flexible Terms"
                    description="Choose lending and borrowing terms that work for you."
                />
            </div>
        </section>
    )
}