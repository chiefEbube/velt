import { Button } from "./ui/button";

export default function AccountSummary({balance}: {balance: string}) {
    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1a3a] p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-100">
                Account Summary
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-[#1a1a4a] border border-white/10">
                    <div className="text-sm text-gray-300 mb-1">Total Balance</div>
                    <div className="text-2xl font-bold">{parseFloat(balance).toFixed(4)} tMETIS</div>
                    <div className="text-sm text-gray-300">≈ $0.00 USD</div>
                </div>
                <div className="p-4 rounded-lg bg-[#1a1a4a] border border-white/10">
                    <div className="text-sm text-gray-300 mb-1">Available to Borrow</div>
                    <div className="text-2xl font-bold">12,500 VLT</div>
                    <div className="text-sm text-gray-300">Based on your collateral</div>
                </div>
            </div>

            <div className="grid gap-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Active Positions</h3>
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white/80 hover:bg-transparent cursor-pointer">
                        View All
                    </Button>
                </div>

                <div className="overflow-hidden rounded-lg border border-white/10">
                    <div className="grid grid-cols-5 bg-[#1a1a4a] p-3 text-sm font-medium">
                        <div>Asset</div>
                        <div>Type</div>
                        <div>Amount</div>
                        <div>APY</div>
                        <div>Status</div>
                    </div>

                    <div className="divide-y divide-white/10">
                        <div className="grid grid-cols-5 p-3 text-[10px] sm:text-sm items-center">
                            <div className="font-medium">tMetis</div>
                            <div className="text-green-400">Lending</div>
                            <div>1.5 tMetis</div>
                            <div>4.2%</div>
                            <div>
                                <span className="px-2 py-1 rounded-full text-[10px] sm:text-xs bg-green-500/20 text-green-400">Active</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 p-3 text-[10px] sm:text-sm items-center">
                            <div className="font-medium">VLT</div>
                            <div className="text-blue-400">Borrowing</div>
                            <div>2,500 VLT</div>
                            <div>2.8%</div>
                            <div>
                                <span className="px-2 py-1 rounded-full text-[10px] sm:text-xs bg-blue-500/20 text-blue-400">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}