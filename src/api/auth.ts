import { Post } from '../types/types';

const BASE_URL = `${import.meta.env.VITE_API_URL}/${
  import.meta.env.VITE_COHORT_NAME
}`;

type UserInfo = {
  username: string;
  password: string;
};

type TokenFetch = {
  error: Error | null;
  data: { token: string; message: string } | null;
};

type Error = {
  name: string;
  message: string;
};

export async function registerUser({
  username,
  password,
}: UserInfo): Promise<TokenFetch | void> {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username, password } }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function login({
  username,
  password,
}: UserInfo): Promise<TokenFetch | void> {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username, password } }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const result = await response.json();
    if (result.error) throw result.error;
    return result.data.posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
