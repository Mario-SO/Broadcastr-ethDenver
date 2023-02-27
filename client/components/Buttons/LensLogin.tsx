import useLens from "hooks/useLens";
import useModalContext from "hooks/useModalContext";
import Button from "./Button";
import Lens from "images/lens";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { login, isLoggedIn } = useLens();
  const { address, isConnected } = useAccount();
  const { setIsOpen, setModalContent } = useModalContext();

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
      {!isLoggedIn ? (
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
        <div>Logged in</div>
      )}
    </div>
  );
}
