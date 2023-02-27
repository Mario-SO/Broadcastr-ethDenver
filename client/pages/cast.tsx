import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ViewContextProvider } from "context/viewContext";
import CastComponent from "components/Cast/CastComponent";
import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import ShareButton from "components/Share/Button";
import LensLogin from "components/Buttons/LensLogin";
import useCastrAccount from "hooks/useCastrAccount";
import { Routes } from "utils/constants";
import ProfileBreadcrumb from "components/Profile/Breadcrumb";
const Cast: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { isOwned, accountCastrs } = useCastrAccount();

  useEffect(() => {
    if (address) {
      if (!isOwned(address as string)) {
        router.push(Routes.CAST + "?address=" + accountCastrs[0]);
      }
    }
  }, [address, isOwned]);

  if (!address) {
    return <></>;
  }

  return (
    <ViewContextProvider address={address as string}>
      <Navbar>
        <ProfileBreadcrumb />
        <ViewOnPlatform address={address as string} />
        <ShareButton />
        <LensLogin />
      </Navbar>
      <CastComponent />
    </ViewContextProvider>
  );
};

export default Cast;
