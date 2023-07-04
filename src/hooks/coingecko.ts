import { useQuery } from "@tanstack/react-query";

interface useEthGasRes {
  status: string;
  message: string;
  result: {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
    suggestBaseFee: string;
    gasUsedRatio: string;
  };
}

export function useEthGas() {
  return useQuery<useEthGasRes>({
    queryKey: ["useEthGas"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.etherscan.io/api?module=gastracker&action=gasoracle"
      );
      return response.json();
    },
    refetchInterval: 60000,
  });
}

interface useBtcEthPriceRes {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
}

export function useBtcEthPrice() {
  return useQuery<useBtcEthPriceRes[]>({
    queryKey: ["useBtcEthPrice"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&symbols=eth,btc&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      return response.json();
    },
    refetchInterval: 60000,
  });
}
