const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule(
    "BorrowingSystem", (m) => {
  // Hardcoded addresses — make sure these are correct for your testnet/mainnet
  const veltToken = "0x25DE93cFf41aa47C1133f44e89bE1962cEa52f73";
  const usdtToken = "0x362fee87284068B0e85B4bDd1eDC7524A00D3afB";
  const lendingPool = "0x04286AE4E99ca61810BE89B385306b09cA05a953";

   // Deploy Mock Price Feed with initial price of 30 USD (8 decimals)
   const mockPriceFeed = m.contract("MockV3Aggregator", [8, 3000000000]);


  const borrowingModule = m.contract("BorrowingModule", [
    lendingPool,
    veltToken,
    usdtToken,
    mockPriceFeed,
  ]);

  return { borrowingModule,  mockPriceFeed };
});
