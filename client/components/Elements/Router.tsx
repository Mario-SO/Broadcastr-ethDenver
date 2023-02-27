import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "components/Elements/Container";
import { Routes, ProtectedRutes } from "utils/constants";
import useCastrAccount from "hooks/useCastrAccount";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Router = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const route = router.pathname as Routes;
  const [isLoading, setIsLoading] = useState(true);
  const {
    isLoading: loadingRead,
    isConnected,
    accountCastrs,
    isOwned,
    isSuccess,
  } = useCastrAccount();

  useEffect(() => {
    if (ProtectedRutes.includes(route) && isSuccess) {
      const address = router.query.address as string;
      if (accountCastrs?.length === 0 && route !== Routes.HOME) {
        router.push(Routes.HOME);
      } else if (
        (accountCastrs?.length > 0 && route !== Routes.CAST) ||
        (route === Routes.CAST && !isOwned(address))
      ) {
        router.push(Routes.CAST + "?address=" + accountCastrs[0]);
      } else {
        setIsLoading(false);
      }
    }
    if (!ProtectedRutes.includes(route)) {
      setIsLoading(false);
    }
  }, [route, isSuccess]);

  if (isLoading || loadingRead) {
    return (
      <Container>
        <h1 className="text-4xl font-bold">loading...</h1>
      </Container>
    );
  }

  if (ProtectedRutes.includes(route) && !isConnected) {
    return (
      <Container>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-screen h-48 realtive">
            <Image
              src="/logo.png"
              alt="Broadcastr Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="text-2xl text-center">Welcome to Broadcastr!</h1>

          <p className="text-center">Connect your wallet to get started.</p>
          <ConnectButton />
        </div>
      </Container>
    );
  }

  return <>{children}</>;
};

export default Router;
