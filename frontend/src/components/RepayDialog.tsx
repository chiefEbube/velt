"use client"

import { useState } from "react"
import { useWriteContract } from "wagmi"
import { borrowAbi } from "@/lib/borrowAbi"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { toast } from "sonner"
import { usdtAbi } from "@/lib/usdtAbi";


const BORROWMODULE_ADDRESS = '0xD6C8805df4aef21d8fD88A06747a3f4465EF7aFf'
const USDT_ADDRESS = "0x362fee87284068B0e85B4bDd1eDC7524A00D3afB";


export function RepayDialog({ maxRepayAmount }: { maxRepayAmount: number }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [amount, setAmount] = useState("")
    const writeContract = useWriteContract()

    const handleRepay = async (amount: string) => {
        const amountInWei = BigInt(Math.floor(parseFloat(amount) * 1e18));

        // Step 1: Approve the BorrowModule to spend USDT
        writeContract.writeContract(
            {
                abi: usdtAbi,
                address: USDT_ADDRESS,
                functionName: "approve",
                args: [BORROWMODULE_ADDRESS, amountInWei],
            },
            {
                onSuccess: () => {
                    writeContract.writeContract(
                        {
                            abi: borrowAbi,
                            address: BORROWMODULE_ADDRESS,
                            functionName: "repay",
                            args: [amountInWei],
                        },
                        {
                            onSuccess: () => {
                                toast("Repayment successful!");
                            },
                            onError: () => {
                                toast("Repay transaction failed.");
                            },
                        }
                    );
                },
                onError: () => {
                    toast("Approval failed. Cannot proceed with repayment.");
                },
            }
        );
    };

    return (
        <>
            <span onClick={() => setIsDialogOpen(true)} className="px-2 py-1 rounded-full text-[10px] sm:text-xs bg-blue-500/20 text-blue-400 cursor-pointer">
                repay
            </span>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#0A0A0F] text-white">
                    <DialogTitle>Repay USDT</DialogTitle>
                    <div className="space-y-2 mt-4">
                        <input
                            type="text"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-md border border-white/20 bg-[#1a1a4a] px-3 py-2 text-white"
                        />
                        <div className="text-xs text-gray-400">
                            Max: {maxRepayAmount.toFixed(4)} USDT
                            <Button variant="ghost" size="sm" onClick={() => setAmount(String(maxRepayAmount))}>
                                MAX
                            </Button>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            disabled={writeContract.isPending}
                            onClick={() => {
                                handleRepay(amount)
                                setIsDialogOpen(false);
                            }
                            }
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        >
                            {writeContract.isPending ? "Repaying..." : "Confirm Repay"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
