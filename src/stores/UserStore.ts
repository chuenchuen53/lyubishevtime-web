import { createSignal } from "solid-js";

export interface User {
  id: number;
  username: string;
  nickname: string;
  token: string;
}

const [user, setUser] = createSignal<User | null>(null);

const setUserAfterLogin = (user: User) => {
  localStorage.setItem("token", user.token);
  setUser(user);
};

const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
};

export { user, setUserAfterLogin, logout };
