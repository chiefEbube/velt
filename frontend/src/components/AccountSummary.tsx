"use client"

import { Button } from "./ui/button";

export default function AccountSummary({userDepositInMetis = 0.00}: {userDepositInMetis: number }) {
    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1a3a] p-6 shadow-xl">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-4 text-gray-100">
                    Active Positions
                </h2>
                <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white/80 hover:bg-transparent cursor-pointer">
                    View All
                </Button>
            </div>


            <div className="grid gap-4">
                <div className="overflow-hidden rounded-lg border border-white/10">
                    <div className="grid grid-cols-5 bg-[#1a1a4a] p-3 text-sm font-medium">
                        <div>Asset</div>
                        <div>Type</div>
                        <div>Amount</div>
                        <div>APY</div>
                        <div>Action</div>
                    </div>

                    <div className="divide-y divide-white/10">
                        <div className="grid grid-cols-5 p-3 text-[10px] sm:text-sm items-center">
                            <div className="font-medium">tMetis</div>
                            <div className="text-green-400">Lending</div>
                            <div>{userDepositInMetis} tMetis</div>
                            <div>4.2%</div>
                            <div>
                                <span className="px-2 py-1 rounded-full text-[10px] sm:text-xs bg-green-500/20 text-green-400">withdraw</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 p-3 text-[10px] sm:text-sm items-center">
                            <div className="font-medium">-</div>
                            <div className="text-blue-400">Borrowing</div>
                            <div>0</div>
                            <div>0%</div>
                            <div>
                                <span className="px-2 py-1 rounded-full text-[10px] sm:text-xs bg-blue-500/20 text-blue-400">repay</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}