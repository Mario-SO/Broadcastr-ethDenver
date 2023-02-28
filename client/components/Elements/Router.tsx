import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "components/Elements/Container";
import { Routes, ProtectedRutes } from "utils/constants";
import useCastrAccount from "hooks/useCastrAccount";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LensLogin from "components/Buttons/LensLogin";
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
    isError,
  } = useCastrAccount();
  useEffect(() => {
    if (ProtectedRutes.includes(route) && isSuccess) {
      if (accountCastrs?.length === 0 && route !== Routes.HOME) {
        router.push(Routes.HOME);
      } else if (accountCastrs?.length > 0 && route !== Routes.CAST) {
        router.push(Routes.CAST + "?address=" + accountCastrs[0]);
      } else {
        setIsLoading(false);
      }
    }
    if (!ProtectedRutes.includes(route)) {
      setIsLoading(false);
    }
  }, [route, isSuccess]);

  if (ProtectedRutes.includes(route) && !isConnected) {
    return (
      <Container>
        <div className="flex flex-col items-center space-y-4 w-full h-full">
          <div className="w-12 h-12">
            <Image
              src="/logo.png"
              alt="Broadcastr Logo"
              height={10}
              width={10}
            />
          </div>

          <h1 className="text-2xl text-center">Welcome to Broadcastr!</h1>
          <p className="text-center">Connect your wallet to get started.</p>
          <LensLogin />
        </div>
      </Container>
    );
  }

  if (isLoading || loadingRead) {
    return (
      <Container>
        <h1 className="text-4xl font-bold">loading...</h1>
      </Container>
    );
  }

  return <>{children}</>;
};

export default Router;
