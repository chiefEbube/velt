"use client"

import { RepayDialog } from "./RepayDialog"

const SMALL_BALANCE_THRESHOLD = 1e-6;

export default function AccountSummary({
    userDepositInMetis = 0.00,
    debt,
    hasOpenPosition
}: {
    userDepositInMetis: number,
    debt: number
    hasOpenPosition: boolean
}) {

  
    const userBorrowDisplay = debt < SMALL_BALANCE_THRESHOLD ? 0 : debt;

    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1a3a] p-6 shadow-xl">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-4 text-gray-100">
                    Active Positions
                </h2>
                {/* <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white/80 hover:bg-transparent cursor-pointer">
                    View All
                </Button> */}
            </div>

            <div className="grid gap-4">
                <div className="overflow-hidden rounded-lg border border-white/10">
                    {hasOpenPosition ? (
                        <>
                            <div className="grid grid-cols-4 bg-[#1a1a4a] p-3 text-sm font-medium">
                                <div>Asset</div>
                                <div>Type</div>
                                <div>Amount</div>
                                {/* <div>APY</div> */}
                                <div>Action</div>
                            </div>

                            <div className="divide-y divide-white/10">
                                {userDepositInMetis > 0 && (
                                    <div className="grid grid-cols-4 p-3 text-[10px] sm:text-sm items-center">
                                        <div className="font-medium">tMetis</div>
                                        <div className="text-green-400">Lending</div>
                                        <div>{userDepositInMetis.toFixed(4)} tMetis</div>
                                        {/* <div>4.2%</div> */}
                                        <div>
                                            <span className="px-2 py-1 rounded-full text-[10px] sm:text-xs bg-green-500/20 text-green-400">withdraw</span>
                                        </div>
                                    </div>
                                )}

                                {debt > 0 && debt < 0.00 && (
                                    <div className="grid grid-cols-4 p-3 text-[10px] sm:text-sm items-center">
                                        <div className="font-medium">USDT</div>
                                        <div className="text-blue-400">Borrowing</div>
                                        <div>{userBorrowDisplay} USDT</div>
                                        <div>
                                            <RepayDialog maxRepayAmount={debt} />
                                        </div>
                                    </div>
                                )}

                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11.414V15a1 1 0 11-2 0v-1.586l-.293-.293a1 1 0 011.414-1.414l.293.293zM10 7a1.5 1.5 0 110-3A1.5 1.5 0 0110 7z" />
                            </svg>
                            <p className="text-sm">No active positions</p>
                            <p className="text-sm">Start earning by lending or borrowing</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}