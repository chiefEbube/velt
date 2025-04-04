import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function weiToMetis(wei: bigint) {
  const WEI_IN_METIS = BigInt(1e18);
  return Number(wei) / Number(WEI_IN_METIS);
}

export function fetchUsdtValue(balance: string) {
  const usdt = parseFloat(balance) * 15.91;
  return usdt.toFixed(2);
}
