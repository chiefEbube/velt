const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Velt", (m) => {
  const initialOwner = "0x3f79824989897Fb20b24ee4373041dE5dc9885eE";

  const recipient = "0x3f79824989897Fb20b24ee4373041dE5dc9885eE";

  // const veltToken = m.contract("VeltToken", [ initialOwner, recipient], {});
  
  const veltToken = "0xd4ffc12e8c340D4e0d3bF391028B967E9EC0E77e"

   const lendingPool = m.contract("LendingPool", [veltToken]);

  return { lendingPool };
  
});
