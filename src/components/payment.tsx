"use client";

import { CreditCard, LogOut, PlusCircle, Settings, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
  useSignMessage,
  useWaitForTransaction,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Wallet } from "lucide-react";
import styles from "@/components/header.module.css";
import Link from "next-intl/link";
import Loading from "@/app/[locale]/loading";
import { Label } from "@/components/ui/label";
import { parseEther } from "viem";
import { switchNetwork } from "@wagmi/core";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useSetAtom } from "jotai";
import { loginAtom } from "@/atoms/subscribe";

interface PaymentProps {
  title: string;
  introduction: string;
  includeItems: string;
  paymentList: string;
  children: React.ReactNode;
}

export function Payment({
  title,
  introduction,
  includeItems,
  paymentList,
  children,
}: PaymentProps) {
  const chainId = 1;
  const switchMain = async () => {
    await switchNetwork({
      chainId: chainId,
    });
  };
  const postTx = async () => {
    console.log("post tx");
  };

  const setLogin = useSetAtom(loginAtom);
  const [amount, setAmount] = React.useState(0);
  const receiveAddress = "0xe0b3981348c07fC29349518929c8Ea9eb29Ce24E";
  const { data: session, status } = useSession();
  const { toast } = useToast();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  // const { data: balance } = useBalance({
  //   address: address,
  //   chainId: 1,
  // });
  // console.log("address, balance: ", address, balance);
  const { chain } = useNetwork();
  // console.log("chain", chain);
  useEffect(() => {
    if (chain?.id !== chainId) {
      switchMain();
    }
  }, [chain]);

  const {
    config,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareSendTransaction({
    to: receiveAddress,
    value: parseEther(`${amount}`),
    chainId: chainId,
  });
  const { data, sendTransaction, isError, error } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  // console.log(
  //   "isLoading, isSuccess, data?.hash",
  //   isLoading,
  //   isSuccess,
  //   data?.hash
  // );

  useEffect(() => {
    if (isLoading) {
      postTx();
      toast({
        description: "Subscribe Success, please sign in again later;",
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setLogin(false);
      }, 10);
    }
  }, [isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
        {/*<Button*/}
        {/*  variant="ghost"*/}
        {/*  className="w-full flex justify-start px-2 py-1.5 h-8"*/}
        {/*>*/}
        {/*  <CreditCard className="mr-2 h-4 w-4" />*/}
        {/*  <span>Subscribe</span>*/}
        {/*</Button>*/}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl my-3">{title}</DialogTitle>
          <DialogDescription>{introduction}</DialogDescription>
        </DialogHeader>
        <ul className="list-disc list-inside text-muted-foreground">
          {includeItems.split("__").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {paymentList.split("__").map((item) => {
          const [price, month, priceDetail, days] = item.split(",");
          return (
            <Button
              variant="outline"
              size="lg"
              key={price}
              // disabled={!sendTransaction || !amount}
              onMouseOver={() => {
                setAmount(parseFloat(price));
              }}
              onClick={() => {
                if (chain?.id !== chainId) {
                  switchMain();
                }
                sendTransaction?.();
                // postTx();
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex space-x-3 items-center">
                  <Loading />
                  <span>Waiting Transaction</span>
                </div>
              ) : (
                `Get ${month} Month (ETH ${price})`
              )}
            </Button>
          );
        })}
        {/*prepareError: exceeds the balance of the account*/}
        {/*prepareError: Chain mismatch*/}
        {/*error: User rejected the request*/}
        <div className="flex space-x-2 items-center">
          {isPrepareError &&
            prepareError?.message.includes(
              "exceeds the balance of the account"
            ) && <Badge variant="destructive">Insufficient Balacne</Badge>}
          {isPrepareError &&
            prepareError?.message.includes("Chain mismatch") && (
              <Badge variant="destructive">Chain Mismatch</Badge>
            )}
          {isError && error?.message.includes("User rejected the request") && (
            <Badge variant="destructive">User Rejected</Badge>
          )}
          <span className="sr-only">error</span>
        </div>
        {/*{isPrepareError &&*/}
        {/*{prepareError?.message.includes("exceeds the balance of the account")*/}
        {/*  ? // @ts-ignore*/}
        {/*    InsufficientBalance()*/}
        {/*  : null}*/}
        {/*{isPrepareError && prepareError?.message.includes("Chain mismatch") &&*/}
        {/*    toast({*/}
        {/*      variant: "destructive",*/}
        {/*      description: "Chain Mismatch",*/}
        {/*    })*/}
        {/*}*/}
        {/*{isError && error?.message.includes("User rejected the request") &&*/}
        {/*    toast({*/}
        {/*      variant: "destructive",*/}
        {/*      description: "User Rejected",*/}
        {/*    })*/}
        {/*}*/}
        {/*{isSuccess && (*/}
        {/*  <div>*/}
        {/*    Successfully sent {amount} ether to*/}
        {/*    {receiveAddress}*/}
        {/*    <div>*/}
        {/*      <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </DialogContent>
    </Dialog>
  );
}
