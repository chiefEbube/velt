"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Wallet, ChevronDown, LogOut } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"

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
    <div className="flex min-h-screen flex-col bg-[#1a1a2e] text-white">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a2e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a2e]/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image src="/logo.jpg" alt="Velt" width={40} height={40} />
            </div>
            <span className="logo-text">Velt</span>
          </div>
          <div className="flex items-center gap-4">
            {walletConnected && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-[#00f5ff]/50 text-white hover:bg-[#00f5ff]/10">
                    <Wallet className="mr-2 h-4 w-4 text-[#00f5ff]" />
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
            <Button variant="ghost" size="sm" className="text-white" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 md:px-6 max-w-md">
          <div className="flex flex-col items-center text-center mb-8 space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter logo-text">Get Started with Velt</h1>
            <p className="text-white">
              {walletConnected
                ? "Choose whether you want to lend or borrow crypto assets."
                : "Connect your wallet to start lending or borrowing crypto assets."}
            </p>
          </div>

          {!walletConnected ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1a3a] p-8 shadow-xl text-center">
                <Wallet className="h-16 w-16 mx-auto mb-4 text-[#00f5ff]" />
                <h2 className="text-xl font-bold mb-2">Connect Your Wallet</h2>
                <p className="text-white mb-6">
                  You need to connect your wallet to access Velt's lending and borrowing features.
                </p>
                <Button size="lg" className="logo-bg text-[#1a1a2e] hover:opacity-90" onClick={connectWallet}>
                  Connect Wallet
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="p-4 rounded-lg border border-white/10 bg-[#1a1a3a] text-center">
                  <h3 className="font-bold logo-text mb-2">Lenders</h3>
                  <p className="text-white text-sm">Earn passive income by lending your crypto assets</p>
                </div>
                <div className="p-4 rounded-lg border border-white/10 bg-[#1a1a3a] text-center">
                  <h3 className="font-bold logo-text mb-2">Borrowers</h3>
                  <p className="text-white text-sm">Get liquidity without selling your crypto assets</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1a3a] p-2 shadow-xl">
              <Tabs defaultValue="lend" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#1a1a4a]">
                  <TabsTrigger value="lend" className="data-[state=active]:logo-bg data-[state=active]:text-[#1a1a2e]">
                    Lend
                  </TabsTrigger>
                  <TabsTrigger
                    value="borrow"
                    className="data-[state=active]:logo-bg data-[state=active]:text-[#1a1a2e]"
                  >
                    Borrow
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="lend" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Select Asset</div>
                    <select className="w-full rounded-md border border-white/20 bg-[#1a1a4a] px-3 py-2 text-white">
                      <option>Ethereum (ETH)</option>
                      <option>Bitcoin (BTC)</option>
                      <option>USDC</option>
                      <option>USDT</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Amount</div>
                    <div className="flex rounded-md border border-white/20 bg-[#1a1a4a]">
                      <input
                        type="text"
                        placeholder="0.0"
                        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-white"
                      />
                      <div className="flex items-center border-l border-white/20 bg-[#1a1a3a] px-3 text-sm">ETH</div>
                    </div>
                    <div className="text-xs text-white/80">Est. APY: 4.5%</div>
                  </div>
                  <Button className="w-full logo-bg text-[#1a1a2e] hover:opacity-90">Start Lending</Button>
                </TabsContent>
                <TabsContent value="borrow" className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Collateral Asset</div>
                    <select className="w-full rounded-md border border-white/20 bg-[#1a1a4a] px-3 py-2 text-white">
                      <option>Ethereum (ETH)</option>
                      <option>Bitcoin (BTC)</option>
                      <option>USDC</option>
                      <option>USDT</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Borrow Amount</div>
                    <div className="flex rounded-md border border-white/20 bg-[#1a1a4a]">
                      <input
                        type="text"
                        placeholder="0.0"
                        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-white"
                      />
                      <div className="flex items-center border-l border-white/20 bg-[#1a1a3a] px-3 text-sm">USDC</div>
                    </div>
                    <div className="text-xs text-white/80">Interest Rate: 2.5%</div>
                  </div>
                  <Button className="w-full logo-bg text-[#1a1a2e] hover:opacity-90">Borrow Now</Button>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <div className="mt-6 text-center text-sm text-white/80">
            <p>
              By using Velt, you agree to our{" "}
              <Link href="#" className="text-[#00f5ff] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#00f5ff] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-white/10 bg-[#1a1a2e] py-4">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-xs text-white/80">&copy; {new Date().getFullYear()} Velt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

