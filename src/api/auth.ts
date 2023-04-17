const BASE_URL = `${import.meta.env.VITE_API_URL}/${
  import.meta.env.VITE_COHORT_NAME
}`;

type RegisterUserArgs = {
  username: string;
  password: string;
};

type ReturnFetch = {
  error: Error | null;
};

type LoginFetch = {
  data: { token: string; message: string } | null;
} & ReturnFetch;

type Error = {
  name: string;
  message: string;
};

export async function registerUser({
  username,
  password,
}: RegisterUserArgs): Promise<LoginFetch | void> {
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
