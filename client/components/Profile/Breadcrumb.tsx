import { useEnsAvatar } from "wagmi";
import {
  RainbowKitProvider,
  AvatarComponent,
} from '@rainbow-me/rainbowkit';
const ProfileBreadcrumb = () => {

  
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0}>
        <div className="avatar h-8 w-8">
          <div className="h-full rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
