import { Dispatch, SetStateAction } from 'react';

export type Post = {
  title: string;
  description: string;
  location: string;
  price: string;
  _id: string;
  author: UserInfo;
  __v: number;
  messages: { _id: string; fromUser: UserInfo; content: string }[];
  willDeliver: boolean;
  active: boolean;
};

export type UserData = {
  posts: Post[];
  messages: Message[];
} & UserInfo;

export type UserInfo = {
  username: string;
  _id: string;
};

export type Message = {
  _id: string;
  post?: { _id: string; title: string };
  fromUser: UserInfo;
  content: string;
};

export type UserAuth = {
  username: string;
  password: string;
};

export type TokenFetch = {
  error: Error | null;
  data: { token: string; message: string } | null;
};

export type NewPost = {
  title: string;
  description: string;
  price: string;
  location?: string;
  willDeliver: boolean;
};

export type MakeNewPost = {
  error: Error | null;
  data: Post | null;
};

export type Error = {
  name: string;
  message: string;
};

export type ProfileProps = {
  token: string | null;
  userData: UserData | null;
};

export type NavbarProps = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUserData: Dispatch<SetStateAction<UserData | null>>;
};

export type HomeProps = {
  posts: Post[];
  userData: UserData | null;
  token: string | null;
};

export type SignInProps = {
  setToken: Dispatch<SetStateAction<string | null>>;
  token: string | null;
};

export type NewPostProps = {
  token: string | null;
  getPosts: () => Promise<void>;
  getUserData: (token: string) => Promise<void>;
};

export type PostCardProps = {
  post: Post;
  isOwner: boolean;
  token: string | null;
};

export type ViewPostProps = {
  posts: Post[];
  userData: UserData | null;
  token: string | null;
  getPosts: () => Promise<void>;
  getUserData: (token: string) => Promise<void>;
};
