"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Wallet, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AccountSummary from "../components/AccountSummary"
import TabsColumn from "../components/TabsColumn"
import { Eip1193Provider, ethers, formatEther } from "ethers"

declare global {
  interface Window {
    ethereum: Eip1193Provider;
  }
}

export default function GetStarted() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [alertInfo, setAlertInfo] = useState({ show: false, type: "", message: "" })
  const [balance, setBalance] = useState("")
  // const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  // const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)


  // Check if MetaMask is installed
  const checkIfWalletIsAvalaible = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        showAlert("error", "MetaMask is not installed. Please install MetaMask to continue.")
        return false
      }
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  // Connect wallet
  const handleConnectWallet = async () => {
    try {
      const hasWallet = await checkIfWalletIsAvalaible()
      if (!hasWallet) return

      const { ethereum } = window
      const newProvider = new ethers.BrowserProvider(ethereum)
      const newSigner = await newProvider.getSigner()
      const userAddress = await newSigner.getAddress()

      setAddress(userAddress)
      setWalletConnected(true)

      showAlert("success", "Wallet connected successfully.")
      fetchMetisBalance(userAddress)
    } catch (error: unknown) {
      console.error(error)
      if ((error as { code: number }).code === 4001) {
        showAlert("error", "User rejected the connection request.")
      } else {
        showAlert("error", "Error connecting wallet. Please try again.")
      }
    }
  }

  const fetchMetisBalance = async (userAddress: string) => {
    try {
      const metisProvider = new ethers.JsonRpcProvider("https://sepolia.metisdevops.link") // Metis Sepolia RPC
      const balanceWei = await metisProvider.getBalance(userAddress)
      const balanceEth = formatEther(balanceWei) // Convert from Wei to tMetis
      setBalance(balanceEth || "0")
    } catch (error) {
      console.error("Error fetching tMetis balance:", error)
      setBalance("0")
    }
  }

  // Show alert
  const showAlert = (type: string, message: string) => {
    setAlertInfo({ show: true, type, message })

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ show: false, type: "", message: "" })
    }, 5000)
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

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
            {!walletConnected ? (
              <Button
                onClick={handleConnectWallet}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">{formatAddress(address)}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white transition-colors" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden md:flex">Back to Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Alerts */}
      {alertInfo.show && (
        <Alert
          className={`mb-6 ${alertInfo.type === "error"
            ? "bg-red-900/20 border-red-900 text-red-300"
            : alertInfo.type === "warning"
              ? "bg-yellow-900/20 border-yellow-900 text-yellow-300"
              : alertInfo.type === "success"
                ? "bg-green-900/20 border-green-900 text-green-300"
                : "bg-blue-900/20 border-blue-900 text-blue-300"
            }`}
        >
          {alertInfo.type === "error" && <AlertCircle className="h-4 w-4" />}
          {alertInfo.type === "warning" && <AlertCircle className="h-4 w-4" />}
          {alertInfo.type === "success" && <CheckCircle className="h-4 w-4" />}
          {alertInfo.type === "info" && <AlertCircle className="h-4 w-4" />}
          <AlertTitle>
            {alertInfo.type === "error"
              ? "Error"
              : alertInfo.type === "warning"
                ? "Warning"
                : alertInfo.type === "success"
                  ? "Success"
                  : "Information"}
          </AlertTitle>
          <AlertDescription>{alertInfo.message}</AlertDescription>
        </Alert>
      )}

      <main className="flex-1 flex items-center justify-center py-12 mb-20">
        <div className="container px-4 md:px-6 w-full">
          <div className="flex flex-col items-center text-center mb-8 space-y-2">
            <p className="text-gray-100 font-bold text-lg md:text-xl">
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
              <AccountSummary balance={balance} />
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

