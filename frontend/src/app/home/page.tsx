"use client"

import Link from "next/link"
import { SquareArrowOutUpRight, Wallet, } from "lucide-react"
import { Button } from "@/components/ui/button"
import AccountSummary from "../../components/AccountSummary"
import TabsColumn from "../../components/TabsColumn"
import { useAccount, useConnect, useDisconnect, useReadContract, useSwitchChain, useBalance } from "wagmi"
import { injected } from 'wagmi/connectors'
import { toast } from "sonner"
import { useEffect, useState } from "react"
import Image from "next/image"
import { metisSepolia } from "@/wagmi"
import { abi } from "@/lib/abi"
import weiToMetis, { fetchUsdtValue } from "@/lib/utils"

const LENDING_POOL_ADDRESS = '0x04286AE4E99ca61810BE89B385306b09cA05a953';

export default function GetStarted() {
  const [isClient, setIsClient] = useState(false);
  const { address, isConnected, chainId } = useAccount()
  const { connectAsync, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const correctChainId = metisSepolia.id
  const isCorrectNetwork = chainId === correctChainId

  const userBalance = useBalance({
    address,
    chainId: metisSepolia.id,
  });

  const { data } = useReadContract({
    abi,
    address: LENDING_POOL_ADDRESS,
    functionName: 'userDeposits',
    args: [address],
  })

  const userDeposit: bigint = data as bigint
  const userDepositInMetis = weiToMetis(userDeposit)
  const userDepositInUsdt = fetchUsdtValue(String(userDepositInMetis))


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

  if (userBalance.isError) toast("Error fetching balance")

  const balance = userBalance.data?.value && userBalance.data?.decimals
    ? (Number(userBalance.data.value) / 10 ** userBalance.data.decimals).toFixed(4)
    : "0.00";

  const usdt = fetchUsdtValue(balance)
  const availableToBorrow = Number(userDepositInUsdt) * 0.8

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0F] text-white">
      {/* 🚨 Show Wrong Network Banner */}
      {isConnected && !isCorrectNetwork && (
        <div className="bg-red-500 text-white text-center p-2 font-bold text-sm">
          🚨 Wrong Network! Please switch to Metis Sepolia.
          <button
            className="bg-blue-600 px-3 py-1 ml-2 rounded"
            onClick={() => switchChain({ chainId: correctChainId })}
          >
            Switch Network
          </button>
        </div>
      )}
      <nav className="px-4 sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a2e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a2e]/60">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xl">
              V
            </div>
            <span className="text-xl font-bold">Velt</span>
          </div>
          <div className="flex items-center gap-4">
            {!isConnected ? (
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
                    {address
                      ? `${address.slice(0, 6)}...${address.slice(-4)}`
                      : ""}
                  </span>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white" onClick={handleDisconnect} asChild>
                  <span className="hidden md:flex">Disconnect</span>

                </Button>
              </>
            )}

          </div>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center mb-2">
        <div className="container px-4 md:px-6 w-full  py-8">
          {!isConnected ? (
            <>
              <div className="flex flex-col items-center text-center mb-8">
                <p className="text-gray-100 font-bold text-lg md:text-xl">
                  {!isConnected && "Connect your wallet to start lending or borrowing crypto assets."}
                </p>
              </div>

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
            </>
          ) : (
            <>
              <div className="mb-8">
                {
                  isConnected && isCorrectNetwork &&
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10">
                      <Image src="/metis.png" alt="metis logo" width={200} height={200} />
                    </div>
                    <h1 className="text-2xl font-bold">Metis</h1>
                  </div>
                }


                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="grid grid-cols-3 gap-4 mb-2">
                    <div className="text-center">
                      <div className="text-gray-400 text-xs md:text-sm">Wallet Balance</div>
                      <div className="text-lg md:text-2xl font-bold">{parseFloat(balance).toFixed(2)} tMETIS</div>
                      <div className="text-xs text-gray-300">≈ ${usdt} USDT</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-xs md:text-sm">Net worth</div>
                      <div className="text-lg md:text-2xl font-bold">${userDepositInUsdt}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-400 text-xs md:text-sm">Available to borrow</div>
                      <div className="text-lg md:text-2xl font-bold">${availableToBorrow.toFixed(2)}</div>
                    </div>
                  </div>
                  <Link href="https://faucet.metis.io/">
                    <div className="flex items-start gap-2 bg-[#252542] rounded-md p-2 text-xs font-bold">
                      <p>METIS SEPOLIA FAUCET</p>
                      <SquareArrowOutUpRight className="h-3 w-3" />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <TabsColumn balance={balance} />
                <AccountSummary userDepositInMetis={userDepositInMetis} />
              </div>
            </>
          )}
          {!isConnected && (
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

