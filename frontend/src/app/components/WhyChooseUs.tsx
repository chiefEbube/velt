export default function WhyChooseUs() {
    return (
        <section id="why-velt" className="py-20 bg-gray-900/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Velt</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
                        <div
                            className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 h-full
          bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        >
                            <h3 className="text-xl font-semibold mb-4">Trustless & Transparent</h3>
                            <p className="text-gray-300">
                                Funds are managed by audited smart contracts. Every transaction is recorded on the blockchain,
                                ensuring complete transparency.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
                        <div
                            className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 h-full
          bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        >
                            <h3 className="text-xl font-semibold mb-4">High Liquidity Pools</h3>
                            <p className="text-gray-300">
                                Easy access to lending and borrowing anytime. Our deep liquidity pools ensure you can always access
                                funds when you need them.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
                        <div
                            className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 h-full
          bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        >
                            <h3 className="text-xl font-semibold mb-4">Competitive Rates</h3>
                            <p className="text-gray-300">
                                Earn attractive APYs and borrow at fair interest rates. Our algorithm optimizes rates based on market
                                conditions.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
                        <div
                            className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 h-full
          bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        >
                            <h3 className="text-xl font-semibold mb-4">Secure & Decentralized</h3>
                            <p className="text-gray-300">
                                No third-party control, just pure DeFi. Your assets remain in your control at all times through
                                non-custodial smart contracts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}