import { Dispatch, SetStateAction } from 'react';

export type Post = {
  title: string;
  description: string;
  location: string;
  price: string;
  _id: string;
  author: UserInfo;
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
  post: { _id: string; title: string };
  fromUser: UserInfo;
};

export type UserAuth = {
  username: string;
  password: string;
};

export type TokenFetch = {
  error: Error | null;
  data: { token: string; message: string } | null;
};

export type Error = {
  name: string;
  message: string;
};

export type HomeProps = {
  isLogin: boolean;
};

export type NavbarProps = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string | null>>;
};

export type PostsProps = {
  posts: Post[];
};

export type SignInProps = {
  setToken: Dispatch<SetStateAction<string | null>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};
