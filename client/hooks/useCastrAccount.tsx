import { useState, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";
import factoryContract from "contracts/CastrFactory-abi";
import { ContractAddress } from "utils/constants";

const useCastrAccount = () => {
  const { address, isConnected } = useAccount();
  const { data, isLoading, isSuccess } = useContractRead({
    address: ContractAddress,
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
  };
};

export default useCastrAccount;
