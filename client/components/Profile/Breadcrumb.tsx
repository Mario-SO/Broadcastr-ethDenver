import Image from "next/image";
import useLens from "hooks/useLens";

const ipfsToHttps = (ipfsUrl: string) => {
  if(!ipfsUrl) return "";
  return ipfsUrl.replace("ipfs://", "https://lnfts.infura-ipfs.io/ipfs/");
};

const ProfileBreadcrumb = () => {
  const { userProfile } = useLens();
  if (!userProfile) {
    return <></>;
  }
  const { picture } = userProfile;
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0}>
        <div className="avatar h-12 w-12">
          <div className="h-full rounded-full relative ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image src={ipfsToHttps(picture?.original.url)} alt="profile" layout="fill" />
          </div>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileBreadcrumb;
