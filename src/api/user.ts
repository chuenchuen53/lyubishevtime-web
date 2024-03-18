const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

interface SignupRequest {
  username: string;
  password: string;
  nickname: string;
}

interface SignupResponse {
  username: string;
  nickname: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  username: string;
  nickname: string;
  photoUrl: string;
  token: string;
}

export async function signup(req: SignupRequest): Promise<SignupResponse> {
  const resp = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  });

  if (resp.status === 200) {
    const data = await resp.json();
    return data as SignupResponse;
  }

  throw new Error("signup failed");
}

export async function login(rea: LoginRequest): Promise<LoginResponse> {
  const resp = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rea),
  });

  if (resp.status === 200) {
    const data = await resp.json();
    localStorage.setItem("token", data.token);
    return data as LoginResponse;
  }

  throw new Error("login failed");
}
