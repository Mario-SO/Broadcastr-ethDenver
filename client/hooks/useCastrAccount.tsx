import { useState, useEffect } from "react";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import factoryContract from "contracts/CastrFactory-abi";
import { ContractAddress, MantleAddress } from "utils/constants";

const useCastrAccount = () => {
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { data, isLoading, isSuccess, isError } = useContractRead({
    address: chain?.name === "Mantle" ? MantleAddress : ContractAddress,
    abi: factoryContract,
    functionName: "getCreatorChannels",
    args: [address],
  });

  const isOwned = (address: string) => {
    const readData = data as string[];
    console.log("readData", readData.includes(address), readData, address);
    if (!readData) return false;
    return readData.includes(address);
  };

  return {
    accountCastrs: data as string[],
    isOwned,
    isLoading,
    isConnected,
    isSuccess,
    isError
  };
};

export default useCastrAccount;
