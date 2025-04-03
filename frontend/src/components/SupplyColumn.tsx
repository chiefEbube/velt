"use client"

import { Button } from "./ui/button";
import { useState } from "react";
import { abi } from "@/lib/abi"
import { useAccount, useWriteContract, useWatchAsset } from "wagmi";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { fetchUsdtValue } from "@/lib/utils";


const LENDING_POOL_ADDRESS = '0x04286AE4E99ca61810BE89B385306b09cA05a953'

const VELT_TOKEN_ADDRESS = '0x25DE93cFf41aa47C1133f44e89bE1962cEa52f73';
const VELT_TOKEN_SYMBOL = 'VELT';
const VELT_TOKEN_DECIMALS = 18;

export default function SupplyColumn({ balance }: { balance: string }) {
    const { address } = useAccount();
    const [amount, setAmount] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const writeContract = useWriteContract();
    const usdt = fetchUsdtValue(balance)
    const watchAsset = useWatchAsset();

    const handleDeposit = () => {
        if (!amount) {
            toast("Supply amount is required");
            return;
        }
        // Convert amount to Wei (smallest unit)
        const amountInWei = BigInt((parseFloat(amount) * 1e18).toFixed(0));

        if (parseFloat(amount) > parseFloat(balance)) {
            toast("Deposit amount exceeds available balance.");
            return;
        }

        writeContract.writeContract(
            {
                abi,
                address: LENDING_POOL_ADDRESS,
                functionName: 'deposit',
                args: [address],
                value: amountInWei
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

    // Function to watch (add) Velt token to the user's wallet
    const addVeltTokenToWallet = () => {
        watchAsset.watchAsset(
            {
                type: 'ERC20',
                options: {
                    address: VELT_TOKEN_ADDRESS,
                    symbol: VELT_TOKEN_SYMBOL,
                    decimals: VELT_TOKEN_DECIMALS,
                },
            },
            {
                onSuccess: () => {
                    toast("Velt token successfully added to wallet");
                },
                onError: () => {
                    toast("Error adding Velt token to wallet:");
                }
            }
        );
    };

    const handleMaxClick = () => {
        setAmount(balance)
    };

    return (
        <>
            <div className="mb-12 mt-4">
                <h2 className="text-lg font-bold mb-4">Assets to supply</h2>
                <div className="flex gap-4 mb-4 justify-between bg-[#252542] rounded-lg p-3 md:p-6">
                    <div>
                        <div className="text-gray-400 text-xs md:text-sm">Asset</div>
                        <div className="font-bold text-sm md:text-base">Metis</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs md:text-sm">Wallet Balance</div>
                        <div className="font-bold text-sm md:text-base">${usdt}</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs md:text-sm">APY</div>
                        <div className="font-bold text-sm md:text-base">4.5%</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs md:text-sm">Can be collateral?</div>
                        <div className="font-bold text-sm md:text-base text-green-400">yes</div>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">Select asset to supply</div>
                <select className="w-full rounded-md border border-white/20 bg-[#1a1a4a] px-3 py-2 text-white">
                    <option>Metis</option>
                </select>
            </div>
            <div className="space-y-2">
                <div className="text-sm font-medium">Amount</div>
                <div className="flex rounded-md border border-white/20 bg-[#1a1a4a]">
                    <input
                        type="text"
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-white"
                    />
                    <div className="flex items-center border-l border-white/20 bg-[#1a1a3a] px-3 text-sm">metis</div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[10px] md:text-xs text-gray-300">Est. APY: 4.5%</div>
                    <div className="text-gray-300 text-[10px] md:text-xs">Wallet balance: {balance}
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
            <Button disabled={writeContract.isPending} className={`w-full ${writeContract.isPending ? "cursor-progress" : "bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer"} hover:from-blue-700 hover:to-purple-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]`} onClick={handleDeposit}>
                {writeContract.isPending ? "Loading..." : "Start Lending"}
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#0A0A0F] text-white">
                    <DialogTitle>Add Velt Token to wallet?</DialogTitle>
                    <DialogDescription className="text-white my-4">
                        {amount} Velt has been sent to your wallet. Do you want to add Velt as a token in your wallet so that you can track your balance?
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            disabled={watchAsset.isPending}
                            onClick={() => {
                                addVeltTokenToWallet();
                                setIsDialogOpen(false);
                            }}
                        >
                            {watchAsset.isPending ? "Adding..." : "Add Velt Token"}
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