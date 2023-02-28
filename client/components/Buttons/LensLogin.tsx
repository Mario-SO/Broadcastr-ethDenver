import useLens from "hooks/useLens";
import useModalContext from "hooks/useModalContext";
import Button from "./Button";
import Lens from "images/lens";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ProfileBreadcrumb from "components/Profile/Breadcrumb";
import { useEffect } from "react";
export default function Home() {
  const { login, isLoggedIn } = useLens();
  const { isConnected } = useAccount();
  const { isOpen, setIsOpen, setModalContent } = useModalContext();
  console.log(isOpen);

  useEffect(() => {
    isLoggedIn && isConnected && setIsOpen(false);
  }, [isConnected, isLoggedIn]);

  const ModalContent = () => {
    if (!isConnected) {
      return <ConnectButton />;
    }

    return (
      <Button styles="bg-white text-[#00501e]" onClick={login}>
        <Lens />
        Login with Lens
      </Button>
    );
  };

  return (
    <div>
      {!isLoggedIn || !isConnected ? (
        <Button
          styles="bg-white text-[#00501e]"
          onClick={() => {
            setIsOpen(true);
            setModalContent(<ModalContent />);
          }}
        >
          <Lens />
          Login with Lens
        </Button>
      ) : (
        <ProfileBreadcrumb />
      )}
    </div>
  );
}
