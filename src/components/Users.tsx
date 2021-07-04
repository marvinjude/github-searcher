import { FC } from "react";
import UserBox from "./UserBox/UserBox";

export type UserType = {
  login: string;
  id: number;
  node_id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
};

type UsersProps = {
  items: UserType[];
};

const Users: FC<UsersProps> = ({ items }) => {
  return (
    <>
      {items.map(({ login, avatar_url, type }) => (
        <UserBox
          avatar_url={avatar_url}
          login={login}
          type={type}
          key={avatar_url}
        />
      ))}
    </>
  );
};

export default Users;
