"use client"

import Link from "next/link"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import AccountSummary from "../../components/AccountSummary"
import TabsColumn from "../../components/TabsColumn"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from 'wagmi/connectors'
import { toast } from "sonner"
import { useEffect, useState } from "react"

export default function GetStarted() {
  const [isClient, setIsClient] = useState(false);
  const account = useAccount()
  const { connectAsync, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Connect wallet
  const handleConnectWallet = async () => {
    try {
      const result = await connectAsync({ connector: injected() })
      if (result) toast("Wallet connected successfully.")
    } catch {
      toast(error?.message)
    }
  }

  const handleDisconnect = () => {
    disconnect()
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0F] text-white">
      <nav className="px-4 sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a2e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a2e]/60">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl">
              V
            </div>
            <span className="text-xl font-bold">Velt</span>
          </div>
          <div className="flex items-center gap-4">
            {!account.isConnected ? (
              <>
                <Button
                  onClick={handleConnectWallet}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">
                    {account.address
                      ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
                      : ""}
                  </span>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white" onClick={handleDisconnect} asChild>
                  <span className="hidden md:flex">{account.isReconnecting ? "Disconnecting" : "Disconnect"}</span>

                </Button>
              </>
            )}

          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center py-12 mb-20">
        <div className="container px-4 md:px-6 w-full">
          <div className="flex flex-col items-center text-center mb-8 space-y-2">
            <p className="text-gray-100 font-bold text-lg md:text-xl">
              {account.isConnected
                ? "Choose whether you want to lend or borrow crypto assets."
                : "Connect your wallet to start lending or borrowing crypto assets."}
            </p>
          </div>

          {!account.isConnected ? (
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
                  onClick={handleConnectWallet}
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
              <AccountSummary balance={"000"} />
            </div>
          )}
          {!account.isConnected && (
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

