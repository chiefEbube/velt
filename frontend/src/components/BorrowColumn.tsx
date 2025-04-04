"use client"

import { useWatchAsset } from "wagmi";
import { Button } from "./ui/button";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { borrowAbi } from "@/lib/borrowAbi";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const BORROWMODULE_ADDRESS = '0xe11b6Cc636F2dcde503674287Ec16EbCE9138fE0'

const USDT_TOKEN_ADDRESS = '0x362fee87284068B0e85B4bDd1eDC7524A00D3afB'
const USDT_SYMBOL = 'USDT'
const USDT_DECIMAL = 18

export default function BorrowColumn({ availableToBorrow }: { availableToBorrow: number }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const writeContract = useWriteContract();
    const watchAsset = useWatchAsset();
    const availableToBorrowStirng = String(availableToBorrow.toFixed(2))

    const [amount, setAmount] = useState("")

    const handleBorrow = () => {
        if (!amount) {
            toast("Borrow amount is required");
            return;
        }
        // Convert amount to Wei (smallest unit)
        const amountInWei = BigInt(Math.floor(parseFloat(amount) * 1e18))

        if (parseFloat(amount) > availableToBorrow) {
            toast("Borrow limit exceeded.");
            return;
        }

        writeContract.writeContract(
            {
                abi: borrowAbi,
                address: BORROWMODULE_ADDRESS,
                functionName: 'borrow',
                args: [amountInWei],
              },
            {
                onSuccess: () => {
                    toast("Transaction submitted successfully:");
                    setIsDialogOpen(true);
                },
                onError: () => {
                    toast("Transaction failed:");
                }
            })
    }

    const addUSDTTokenToWallet = () => {
        watchAsset.watchAsset(
            {
                type: 'ERC20',
                options: {
                    address: USDT_TOKEN_ADDRESS,
                    symbol: USDT_SYMBOL,
                    decimals: USDT_DECIMAL,
                },
            },
            {
                onSuccess: () => {
                    toast("USDT successfully added to wallet");
                },
                onError: () => {
                    toast("Error adding USDT token to wallet:");
                }
            }
        );
    };

    const handleMaxClick = () => {
        setAmount(availableToBorrowStirng)
    };
    return (
        <>
            <div className="mb-12 mt-4">
                <h2 className="text-lg font-bold mb-4">Assets to supply</h2>
                <div className="flex gap-4 mb-4 justify-between bg-[#252542] rounded-lg p-3 md:p-6">
                    <div>
                        <div className="text-gray-400 text-xs md:text-sm">Asset you can borrow</div>
                        <div className="font-bold text-sm md:text-base">USDT</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs md:text-sm">APY</div>
                        <div className="font-bold text-sm md:text-base">4.5%</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs md:text-sm">Available to borrow</div>
                        <div className="font-bold text-sm md:text-base text-green-400">${availableToBorrow.toFixed(4)}</div>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">Collateral Asset</div>
                <select className="w-full rounded-md border border-white/20 bg-[#1a1a4a] px-3 py-2 text-white">
                    <option>USDT</option>
                </select>
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">Borrow Amount</div>
                <div className="flex rounded-md border border-white/20 bg-[#1a1a4a]">
                    <input
                        type="text"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-white"
                    />
                    <div className="flex items-center border-l border-white/20 bg-[#1a1a3a] px-3 text-sm">USDT</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[10px] md:text-xs text-gray-300">Health: <span>4.5%</span></div>
                    <div className="text-gray-300 text-[10px] md:text-xs">Wallet balance: {availableToBorrow.toFixed(2)}
                        <Button
                            variant="ghost"
                            onClick={handleMaxClick}
                            className="text-[10px] md:text-xs font-bold hover:text-white hover:bg-transparent"
                        >
                            MAX
                        </Button>
                    </div>

                </div>
            </div>
            <Button disabled={writeContract.isPending} className={`w-full ${writeContract.isPending ? "cursor-progress" : "bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer"} hover:from-blue-700 hover:to-purple-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]`} onClick={handleBorrow}>
                {writeContract.isPending ? "Loading..." : "Borrow Now"}
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#0A0A0F] text-white">
                    <DialogTitle>Add USDT Token to wallet?</DialogTitle>
                    <DialogDescription className="text-white my-4">
                        {amount} USDT has been sent to your wallet. Do you want to add USDT as a token in your wallet so that you can track your balance?
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            disabled={watchAsset.isPending}
                            onClick={() => {
                                addUSDTTokenToWallet();
                                setIsDialogOpen(false);
                            }}
                        >
                            {watchAsset.isPending ? "Adding..." : "Add USDT Token"}
                        </Button>
                        <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                            No, Thanks
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}