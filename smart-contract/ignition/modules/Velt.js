const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Velt", (m) => {
  // const initialOwner = "0x3f79824989897Fb20b24ee4373041dE5dc9885eE";
  // const recipient = "0x3f79824989897Fb20b24ee4373041dE5dc9885eE";
  const lendingPool = "0x04286AE4E99ca61810BE89B385306b09cA05a953"
  const veltToken = "0x25DE93cFf41aa47C1133f44e89bE1962cEa52f73"
  const usdtToken = "0x362fee87284068B0e85B4bDd1eDC7524A00D3afB"

  // const veltToken = m.contract("VeltToken", [ initialOwner], {});
  
  // // const veltToken = "0xd4ffc12e8c340D4e0d3bF391028B967E9EC0E77e"

  //  const lendingPool = m.contract("LendingPool", [veltToken]);

  //  const usdtToken = m.contract("USDT", [recipient, initialOwner], {});

   const BorrowingModule = m.contract("BorrowingModule", [lendingPool, veltToken, usdtToken], {});

  //  m.call(veltToken, "setLendingPool", [lendingPool]);

  return { BorrowingModule };
});

0x362fee87284068B0e85B4bDd1eDC7524A00D3afB
