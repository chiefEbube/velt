const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VeltToken", (m) => {
  const recipient = "0x185F41BEC7a7E501359a145be1844BfB71379325";
  const initialOwner = "0x3f79824989897Fb20b24ee4373041dE5dc9885eE";

  const velt = m.contract("VeltToken", [recipient, initialOwner], {});

  return { velt };
});
