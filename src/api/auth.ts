import {
  MakeNewPost,
  NewPost,
  Post,
  TokenFetch,
  UserAuth,
} from '../types/types';

const BASE_URL = `${import.meta.env.VITE_API_URL}/${
  import.meta.env.VITE_COHORT_NAME
}`;

export async function registerUser({
  username,
  password,
}: UserAuth): Promise<TokenFetch | void> {
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
}: UserAuth): Promise<TokenFetch | void> {
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

export async function fetchUserData(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (result.error) throw result.error;
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function makePost(
  dataObj: NewPost,
  token: string
): Promise<MakeNewPost | void> {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ post: dataObj }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
