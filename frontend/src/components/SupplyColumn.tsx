import { Button } from "./ui/button";

export default function SupplyColumn() {
    return (
        <>
            <div className="mb-12 mt-4">
                <h2 className="text-xl font-bold mb-4">Your Supplies</h2>
                <div className="flex gap-4 mb-4 justify-between bg-[#252542] rounded-lg p-6">
                    <div>
                        <div className="text-gray-400 text-sm">Balance</div>
                        <div className="font-bold">$0.00</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-sm">APY</div>
                        <div className="font-bold">0%</div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-sm">Collateral</div>
                        <div className="font-bold">$0.00</div>
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
                        className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-white"
                    />
                    <div className="flex items-center border-l border-white/20 bg-[#1a1a3a] px-3 text-sm">VLT</div>
                </div>
                <div className="text-xs text-gray-300">Est. APY: 4.5%</div>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] cursor-pointer">
                Start Lending
            </Button>
        </>
    )
}