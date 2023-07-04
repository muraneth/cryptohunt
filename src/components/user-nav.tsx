"use client";

import {
  CreditCard,
  LogOut,
  PlusCircle,
  RefreshCw,
  RotateCw,
  Settings,
  User,
  User2,
} from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import React, { useCallback, useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import styles from "@/components/header.module.css";
import Link from "next-intl/link";
import Loading from "@/app/[locale]/loading";
import moment from "moment/moment";
import { usePathname, useRouter } from "next-intl/client";
import { Icons } from "@/components/icons";
import { useAtom } from "jotai";
import { loginAtom } from "@/atoms/subscribe";
import { useSearchParams } from "next/navigation";

export function UserNav({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleLogin = async () => {
    try {
      const callbackUrl = "/";
      const nonce = await getCsrfToken();
      const messageResponse = await fetch(
        `/api/auth/siwe?address=${address}&chainId=${chain?.id}&domain=${window.location.host}&uri=${window.location.origin}&nonce=${nonce}`
      );
      // const messageResponse = await fetch(`/api/auth/hello`);
      const message = await messageResponse.json();
      // console.log("message: ", message);
      const signature = await signMessageAsync({
        message: message.message,
      });
      setLogin(true);
      await signIn("credentials", {
        address,
        message: JSON.stringify(message.data),
        signature,
        redirect: false,
        callbackUrl,
      });
      // route.push(`${pathname}?reload=true`);
      // route.push("/");
      window.location.href = `${pathname}?${searchParams}`;
    } catch (error) {
      console.warn(error);
      disconnect();
    }
  };

  const [login, setLogin] = useAtom(loginAtom);
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected, isReconnecting } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: session, status } = useSession();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    // console.log("address: ", address);
    // console.log("status: ", status);
    if (address === undefined && status === "authenticated") {
      connect();
    }
    if (
      isConnected &&
      status !== "loading" &&
      (!session || session.address !== address)
    ) {
      setLogin(false);
    }
  }, [address, status]);

  useEffect(() => {
    // console.log("isConnected: ", isConnected);
    // console.log("login atom: ", login);
    // console.log("session: ", session);
    if (isConnected && !login) {
      handleLogin();
    }
  }, [login, isConnected]);

  const [role, setRole] = useState("");
  const [expireDate, setExpireDate] = useState("");
  useEffect(() => {
    if (session && session.role) {
      // @ts-ignore
      const [role, expireDate] =
        session && session.role && session?.role?.split("__");
      setRole(role);
      setExpireDate(expireDate);
    }
  }, [session]);

  return (
    <>
      {isConnected ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
              {session ? (
                <span>{`${session.address?.slice(
                  0,
                  4
                )}...${session.address?.slice(-4)}`}</span>
              ) : (
                <Loading />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-1 items-center">
                  <p className="text-sm font-medium leading-none">
                    {["internal", "normal"].includes(role) ||
                    (role === "subscribe" && new Date(expireDate) > new Date())
                      ? "Pro"
                      : "guest"}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogin();
                    }}
                    className="h-4 w-auto"
                  >
                    <RotateCw className="m-5 mx-2 h-3 w-3" />
                  </Button>
                </div>
                <p>
                  {expireDate !== "null" &&
                    `Expired At: ${moment(expireDate).format("YYYY-MM-DD")}`}
                </p>

                <p className="text-xs leading-none text-muted-foreground break-all">
                  {session ? <span>{session.address}</span> : <Loading />}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/*<DropdownMenuGroup>*/}
            {/*  <DropdownMenuItem>*/}
            {/*    <User className="mr-2 h-4 w-4" />*/}
            {/*    <span>Profile</span>*/}
            {/*  </DropdownMenuItem>*/}
            {/*  <DropdownMenuItem>*/}
            {/*    <CreditCard className="mr-2 h-4 w-4" />*/}
            {/*    <span>Billing</span>*/}
            {/*  </DropdownMenuItem>*/}
            {/*</DropdownMenuGroup>*/}
            <Link href={`/profile/${address}`}>
              <DropdownMenuItem className="font-medium">
                <User2 className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            {children}
            <DropdownMenuSeparator />
            <Link
              href={`/api/auth/signOut`}
              onClick={(e) => {
                e.preventDefault();
                disconnect();
                signOut();
              }}
            >
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={async (e) => {
            e.preventDefault();
            if (!isConnected) {
              // console.log("isConnected: ", isConnected);
              connect();
              // console.log("address: ", session?.address);
            } else {
              // console.log("isConnected: ", isConnected);
              // console.log("address: ", session?.address);
              handleLogin();
            }
          }}
        >
          <Wallet className="mr-2 h-4 w-4" />
          <span>Connect</span>
        </Button>
      )}
    </>
  );
}
