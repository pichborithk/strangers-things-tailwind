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
  isAuthor: boolean;
  updatedAt: string;
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
  post?: {
    _id: string;
    title: string;
    author: { _id: string; username: string };
  };
  fromUser: UserInfo;
  content: string;
};

export type UserAuth = {
  username: string;
  password: string;
};

export type TokenFetch = {
  success: boolean;
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
  token: string;
  userData: UserData;
};

export type HomeProps = {
  token: string;
  posts: Post[];
  userData: UserData;
};

export type NewPostProps = {
  token: string;
};

export type PostCardProps = {
  post: Post;
  isOwner: boolean;
  token: string;
};

export type ViewPostProps = {
  posts: Post[];
  userData: UserData;
  token: string;
};

export type PostMessagesContext = {
  token: string;
  id?: string;
  post: Post;
  messagesList: Message[];
  userData: UserData;
};

export type EditPostContext = {
  post: Post;
  token: string;
  id?: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isEditing: boolean;
};

export type SignInProps = {
  token: string;
};

export type RegistrationProps = {
  token: string;
};
