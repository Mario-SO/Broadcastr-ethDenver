import { useEffect, useState } from "react";
import {
  client,
  challenge,
  authenticate,
  getDefaultProfile,
} from "services/lens";
import { useAccount, useSignMessage } from "wagmi";

const useLens = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { address } = useAccount();

  const [messageToSign, setMessageToSign] = useState<string | null>(null);
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: messageToSign ? messageToSign : "",
  });

  useEffect(() => {
    address && setUserProfile(getDefaultProfileInfo());
  }, [token]);

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

  async function getDefaultProfileInfo() {
    const profileData = localStorage.getItem("lensProfile");
    if (profileData) {
      return JSON.parse(profileData);
    }
    return client
      .query({
        query: getDefaultProfile,
        variables: { address },
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setUserProfile(res?.data.defaultProfile);
        return res?.data.defaultProfile;
      });
  }

  return {
    isLoggedIn: !!token,
    login,
    userProfile
  };
};

export default useLens;
