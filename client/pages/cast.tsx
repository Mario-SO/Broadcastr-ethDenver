import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ViewContextProvider } from "context/viewContext";
import CastComponent from "components/Cast/CastComponent";
import MintButton from "components/Buttons/MintButton";
import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import Button from "components/Buttons/Button";
import ShareButton from "components/Share/Button";
import LensLogin from "components/Buttons/LensLogin";

const Cast: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  if (!address) {
    return <div>loading</div>;
  }

  return (
    <ViewContextProvider address={address as string}>
      <Navbar>
        <ViewOnPlatform address={address as string} />
        <ShareButton />
        <LensLogin />
      </Navbar>
      <CastComponent />
    </ViewContextProvider>
  );
};

export default Cast;
