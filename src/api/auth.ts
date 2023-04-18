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
