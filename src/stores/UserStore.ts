import { createSignal } from "solid-js";

export interface User {
  id: number;
  username: string;
  nickname: string;
  profilePic: string | null;
  token: string;
}

const [user, setUser] = createSignal<User | null>(null);

const setUserAfterLogin = (user: User) => {
  localStorage.setItem("token", user.token);
  setUser(user);
};

const updateProfilePic = (profilePic: string) => {
  const oldUser = user();
  if (oldUser) {
    const newUser: User = { ...oldUser };
    newUser.profilePic = profilePic;
    setUser(newUser);
  }
};

const updateNickname = (nickname: string) => {
  const oldUser = user();
  if (oldUser) {
    const newUser: User = { ...oldUser };
    newUser.nickname = nickname;
    setUser(newUser);
  }
};

const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
  window.location.href = "/login";
};

export { user, setUserAfterLogin, logout, updateProfilePic, updateNickname };
