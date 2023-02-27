import { useEffect, useState } from "react";
import { client, challenge, authenticate } from "services/lens";
import { useAccount, useSignMessage } from "wagmi";

const useLens = () => {
  const [token, setToken] = useState<string | null>(null);
  const { address } = useAccount();
  const [messageToSign, setMessageToSign] = useState<string | null>(null);
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: messageToSign ? messageToSign : "",
  });

  useEffect(() => {
    if (messageToSign) {
      signMessage();
    }
  }, [messageToSign]);

  useEffect(() => {
    // load token from local storage
    const token = localStorage.getItem("lensAccessToken");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      client
        .mutate({
          mutation: authenticate,
          variables: {
            address,
            signature: data,
          },
        })
        .then((res) => {
          const {
            data: {
              authenticate: { accessToken },
            },
          } = res;
          setToken(accessToken);
          localStorage.setItem("lensAccessToken", accessToken);
        });
    }
  }, [data, isSuccess, isError]);

  async function login() {
    const challengeInfo = await client.query({
      query: challenge,
      variables: { address },
    });

    setMessageToSign(challengeInfo.data.challenge.text);
  }

  return {
    isLoggedIn: !!token,
    login,
  };
};

export default useLens;
