export type Post = {
  title: string;
  description: string;
  location: string;
  price: string;
  _id: string;
  author: { _id: string; username: string };
};
