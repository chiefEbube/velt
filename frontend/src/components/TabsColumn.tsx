import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BorrowColumn from "./BorrowColumn"
import SupplyColumn from "./SupplyColumn"

export default function TabsColumn({ balance }: { balance: string }){
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
          <SupplyColumn balance={balance}/>
        </TabsContent>
        <TabsContent value="borrow" className="p-4 space-y-4">
         <BorrowColumn/>
        </TabsContent>
      </Tabs>
    </div>
  )
}