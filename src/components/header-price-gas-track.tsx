"use client";

import { useBtcEthPrice, useEthGas } from "@/hooks/coingecko";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function HeaderPriceGasTrack() {
  const {
    data: ethGasObj,
    // error,
    // isLoading,
  } = useEthGas();
  // console.log("ethGasObj: ", ethGasObj);
  const {
    data: btcEthPriceObj,
    // error,
    // isLoading,
  } = useBtcEthPrice();
  // console.log("btcEthPriceObj: ", btcEthPriceObj);
  const btcPrice = btcEthPriceObj?.filter((_) => _.symbol === "btc")[0];
  const ethPrice = btcEthPriceObj?.filter((_) => _.symbol === "eth")[0];

  return (
    <div className="hidden lg:block text-sm ml-8">
      <div className="flex space-x-3 items-center">
        <div className="flex h-4 items-center space-x-2">
          {btcPrice ? (
            <>
              <span>BTC: </span>
              <span>{`$${btcPrice.current_price} `}</span>
              <span
                className={cn(
                  // @ts-ignore
                  ethPrice?.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >{`(${btcPrice.price_change_percentage_24h.toFixed(2)}%)`}</span>
              <Separator orientation="vertical" />
            </>
          ) : null}
        </div>
        <div className="flex h-4 items-center space-x-2">
          {ethPrice ? (
            <>
              <span>ETH: </span>
              <span>{`$${ethPrice.current_price} `}</span>
              <span
                className={cn(
                  // @ts-ignore
                  ethPrice?.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >{`(${ethPrice.price_change_percentage_24h.toFixed(2)}%)`}</span>
              <Separator orientation="vertical" />
            </>
          ) : null}
        </div>
        <div className="flex h-4 items-center space-x-2">
          {ethGasObj && ethGasObj.result && ethGasObj.result.ProposeGasPrice ? (
            <>
              <span>GAS: </span>
              <span>{`${ethGasObj.result.ProposeGasPrice} GWEI`}</span>
              {/*<Separator orientation="vertical" />*/}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
