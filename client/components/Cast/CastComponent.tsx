import { ViewContext } from "context/viewContext";
import { useContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GoLive } from "components/Cast/GoliveButtons";
import StreamDetails from "components/StreamDetails";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import ShareButton from "components/Share/Button";
import { PlayerURL } from "utils/constants";
import { Routes } from "utils/constants";
import Button from "components/Buttons/Button";

const CastComponent = () => {
  const context = useContext(ViewContext);

  if (!context) {
    return <div>loading</div>;
  }
  const { address, stream, CastrData } = context;

  if (!stream || !CastrData) {
    return <div>loading</div>;
  }

  return (
    <div className="flex h-full lg:flex-row flex-col-reverse">
      <div className="flex flex-col p-5 space-y-5 h-2/3 lg:h-full lg:W-2/5 xl:w-1/5 relative overflow-auto bg-base-200 min-w-[400px]">
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
          showBalance={false}
        />
        <GoLive address={address} stream={stream} CastrData={CastrData} />
        <StreamDetails address={address} details={CastrData} />
      </div>
      <iframe
        src={PlayerURL + stream?.id + "&chat=false"}
        className="min-h-[250px] w-full h-full"
      />
    </div>
  );
};

export default CastComponent;
