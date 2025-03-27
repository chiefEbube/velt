"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Wallet, ChevronDown, LogOut } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import AccountSummary from "../components/AccountSummary"
import TabsColumn from "../components/TabsColumn"

export default function GetStarted() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = () => {
    // In a real app, this would integrate with MetaMask or another wallet provider
    const mockAddress = "0x" + Math.random().toString(16).slice(2, 12) + "..."
    setWalletAddress(mockAddress)
    setWalletConnected(true)
  }

  const disconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress("")
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0F] text-white">
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a2e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a2e]/60">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl">
              V
            </div>
            <span className="text-xl font-bold">Velt</span>
          </div>
          <div className="flex items-center gap-4">
            {walletConnected && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent">
                    <Wallet className="mr-2 h-4 w-4 text-blue-400" />
                    {walletAddress}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#1a1a3a] border-white/10 text-white">
                  <DropdownMenuItem className="hover:bg-[#1a1a4a] cursor-pointer" onClick={disconnectWallet}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white transition-colors" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center py-12 mb-20">
        <div className="container px-4 md:px-6 w-full">
          <div className="flex flex-col items-center text-center mb-8 space-y-2">
            <p className="text-gray-100 font-bold text-lg sm:text-xl">
              {walletConnected
                ? "Choose whether you want to lend or borrow crypto assets."
                : "Connect your wallet to start lending or borrowing crypto assets."}
            </p>
          </div>

          {!walletConnected ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1a3a] p-8 shadow-xl text-center">
                <Wallet className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                <h2 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Connect Your Wallet
                </h2>
                <p className="text-gray-300 mb-6">
                  {`You need to connect your wallet to access Velt's lending and borrowing features.`}
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="p-4 rounded-lg border border-white/10 bg-[#1a1a3a] text-center">
                  <h3 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    Lenders
                  </h3>
                  <p className="text-gray-300 text-sm">Earn passive income by lending your crypto assets</p>
                </div>
                <div className="p-4 rounded-lg border border-white/10 bg-[#1a1a3a] text-center">
                  <h3 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                    Borrowers
                  </h3>
                  <p className="text-gray-300 text-sm">Get liquidity without selling your crypto assets</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              <TabsColumn />
              <AccountSummary />
            </div>
          )}
          {!walletConnected && (
            <div className="mt-6 text-center text-sm text-gray-300">
              <p>
                By using Velt, you agree to our{" "}
                <Link href="#" className="text-blue-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          )}

        </div>
      </main>
      <div className="border-t border-gray-800 mt-12 py-8 text-center text-white">
        <p>© {new Date().getFullYear()} Velt. All rights reserved.</p>
      </div>
    </div>
  )
}

