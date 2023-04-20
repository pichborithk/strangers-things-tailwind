import { Message, Post } from './types';

export class UserData {
  username: string;
  _id: string;
  posts: Post[];
  messages: Message[];
  constructor() {
    this._id = '';
    this.username = '';
    this.posts = [];
    this.messages = [];
  }
}
