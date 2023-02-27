import { useRouter } from "next/router";
import { ViewContextProvider } from "context/viewContext";
import WatchComponent from "components/Watch";
import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import Button from "components/Buttons/Button";
import ShareButton from "components/Share/Button";
import LensLogin from "components/Buttons/LensLogin";
import ProfileBreadcrumb from "components/Profile/Breadcrumb";


const View = () => {
  const router = useRouter();
  const { address } = router.query;

  return (
    <ViewContextProvider address={address as string}>
      <Navbar>
        <ViewOnPlatform address={address as string} />
        <ShareButton />
        <LensLogin />
      </Navbar>
      <WatchComponent />
    </ViewContextProvider>
  );
};

export default View;
