import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "./ui/button"

export default function TabsColumn() {
    return (
        <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1a3a] p-2 shadow-xl">
                <Tabs defaultValue="lend" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-[#1a1a4a]">
                    <TabsTrigger
                      value="lend"
                      className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                    >
                      Lend
                    </TabsTrigger>
                    <TabsTrigger
                      value="borrow"
                      className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                    >
                      Borrow
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="lend" className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Select Asset</div>
                      <select className="w-full rounded-md border border-white/20 bg-[#1a1a4a] px-3 py-2 text-white">
                        <option>Velt Token (VLT)</option>
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
                  </TabsContent>
                  <TabsContent value="borrow" className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Collateral Asset</div>
                      <select className="w-full rounded-md border border-white/20 bg-[#1a1a4a] px-3 py-2 text-white">
                        <option>Metis Sepolia (tMetis)</option>
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
                        <div className="flex items-center border-l border-white/20 bg-[#1a1a3a] px-3 text-sm">VLT</div>
                      </div>
                      <div className="text-xs text-gray-300">Interest Rate: 2.5%</div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                      Borrow Now
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>
    )
}