"use client";

import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Payment } from "@/components/payment";
import React, { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function SubscribeLock({ payment }: { payment: any }) {
  const { address, isConnected, isReconnecting } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  // useEffect(() => {
  //   console.log("address: ", address);
  //   if (address === undefined) {
  //     connect();
  //   }
  // }, [address]);
  return (
    <Payment
      title={payment.title}
      introduction={payment.introduction}
      includeItems={payment.includeItems}
      paymentList={payment.paymentList}
    >
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => {
          if (address === undefined) {
            connect();
          }
        }}
      >
        <Lock className="w-4 h-4" />
      </Button>
    </Payment>
  );
}
