module.exports = buildModule("LendingPoolModule", (m) => {
  const velt = m.contract("VeltUSD", [], { });

  return { velt };
});
