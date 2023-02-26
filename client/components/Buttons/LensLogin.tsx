import { useEffect, useState } from "react";
import { client, challenge, authenticate } from "services/lens";
import { useAccount, useSignMessage } from "wagmi";
export default function Home() {
  /* local state variables to hold user's address and access token */
  const [token, setToken] = useState();
  const [messageToSign, setMessageToSign] = useState<string | null>(null);
  const { address } = useAccount();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: messageToSign ? messageToSign : "",
  });

  useEffect(() => {
    if (messageToSign) {
      signMessage();
    }
  }, [messageToSign]);

  const mutation = async () => {};

  useEffect(() => {
    if (isError) {
      console.log("Error signing message: ", data);
    }

    if (isSuccess) {
      console.log("Successfully signed message: ", data);
      /* authenticate the user */
      client
        .mutate({
          mutation: authenticate,
          variables: {
            address,
            signature: data,
          },
        })
        .then((res) => {
          console.log(res);
          /* if user authentication is successful, you will receive an accessToken and refreshToken */
          const {
            data: {
              authenticate: { accessToken },
            },
          } = res;
          console.log({ accessToken });
          setToken(accessToken);
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
  return (
    <div>
      {/* if the user has connected their wallet but has not yet authenticated, show them a login button */}
      {address && !token && (
        <div onClick={login}>
          <button>Login</button>
        </div>
      )}
      {/* once the user has authenticated, show them a success message */}
      {address && token && <h2>Successfully signed in!</h2>}
    </div>
  );
}
