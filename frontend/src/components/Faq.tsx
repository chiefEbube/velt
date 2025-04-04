import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

export default function Faq() {
    return (
        <section id="faq" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                        <AccordionItem value="item-1" className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
                            <div
                                className="relative bg-gray-900/90 backdrop-blur-sm rounded-lg overflow-hidden
                  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                            >
                                <AccordionTrigger className="text-base md:text-xl px-6 py-4 hover:bg-gray-800/70 transition-colors">
                                    How does lending work?
                                </AccordionTrigger>
                                <AccordionContent className="text-sm md:text-lg px-6 pb-4 text-gray-300">
                                    {`Users deposit funds into a smart contract-powered lending pool and earn interest. The interest rates
                    are determined algorithmically based on supply and demand in the pool. You can withdraw your funds
                    at any time, along with the interest you've earned.`}
                                </AccordionContent>
                            </div>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
                            <div
                                className="relative bg-gray-900/90 backdrop-blur-sm rounded-lg overflow-hidden
                  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                            >
                                <AccordionTrigger className="text-base md:text-xl px-6 py-4 hover:bg-gray-800/70 transition-colors">
                                    {` What happens if I don't repay my loan?`}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm md:text-lg px-6 pb-4 text-gray-300">
                                    Your collateral is liquidated based on protocol rules. If your collateral value falls below the
                                    required threshold, a portion of it will be automatically liquidated to repay the loan. To avoid
                                    liquidation, you can add more collateral or repay part of your loan.
                                </AccordionContent>
                            </div>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
                            <div
                                className="relative bg-gray-900/90 backdrop-blur-sm rounded-lg overflow-hidden
                  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                            >
                                <AccordionTrigger className="text-base md:text-xl px-6 py-4 hover:bg-gray-800/70 transition-colors">
                                    Is Velt safe?
                                </AccordionTrigger>
                                <AccordionContent className="text-sm md:text-lg px-6 pb-4 text-gray-300">
                                    Yes! We use audited smart contracts and industry-standard security measures. Our smart contracts
                                    have been audited by leading blockchain security firms, and we implement multiple layers of security
                                    to protect user funds. However, as with any DeFi platform, users should be aware of the inherent
                                    risks of smart contract technology.
                                </AccordionContent>
                            </div>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-70 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
                            <div
                                className="relative bg-gray-900/90 backdrop-blur-sm rounded-lg overflow-hidden
                  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                            >
                                <AccordionTrigger className="text-base md:text-xl px-6 py-4 hover:bg-gray-800/70 transition-colors">
                                    What are the minimum and maximum amounts I can lend or borrow?
                                </AccordionTrigger>
                                <AccordionContent className="text-sm md:text-lg px-6 pb-4 text-gray-300">
                                    There is no minimum amount for lending. For borrowing, you need to maintain a minimum
                                    collateralization ratio, which varies by asset. There are no maximum limits for either lending or
                                    borrowing, but large transactions may be limited by the available liquidity in the pools.
                                </AccordionContent>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
            <div className="absolute -top-10 left-0 w-20 h-20 md:w-32 md:h-32">
                <Image src="/Bitcoin3d.svg" alt="faq" width={200} height={200} />
            </div>
        </section>
    )
}