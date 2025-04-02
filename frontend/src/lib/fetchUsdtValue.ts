export function fetchUsdtValue(balance: string) {
  const usdt = parseFloat(balance) * 15.91;
  return usdt.toFixed(2);
}
