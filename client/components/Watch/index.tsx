import { useContext } from "react";
import { ViewContext } from "context/viewContext";
import { PlayerURL } from "utils/constants";
import MintButton from "components/Buttons/MintButton";
import Navbar from "components/Elements/Navbar";
import ViewOnPlatform from "components/Buttons/ViewOnPlatform";
import Button from "components/Buttons/Button";
import ShareButton from "components/Share/Button";
import LensLogin from "components/Buttons/LensLogin";
const WatchComponent = () => {
  const context = useContext(ViewContext);

  if (!context) {
    return <div>loading</div>;
  }
  const { stream, address } = context;

  return (
    <>
      <Navbar>
        <ViewOnPlatform address={address} />
        <ShareButton />
        <Button styles="btn-info">
          <a className="text-black no-underline">Know more</a>
        </Button>
        <LensLogin />
      </Navbar>
      <div className="flex flex-col lg:flex-row w-full h-full">
        <div className="md:h-full w-full flex flex-col">
          <iframe
            src={PlayerURL + stream?.id + "&chat=false"}
            className="min-h-[250px] w-full h-full"
          />
          <div className="h-14 items-center p-3 box-content flex flex-row ">
            <div id="shadowBox" className="mr-auto">
              <h3 className="rainbow rainbow_text_animated lg:text-2xl font-bold m-1">
                Welcome to the Broadcastr festival
              </h3>
            </div>
            <MintButton address={address} />
          </div>
        </div>
        <iframe
          className="flex-grow w-full lg:w-1/4 lg:h-full bg-zinc-800 bg-opacity-80 min-h-[350px]"
          src={`https://stingray-app-u9f8x.ondigitalocean.app/${stream?.id}`}
        />
      </div>
    </>
  );
};

export default WatchComponent;
