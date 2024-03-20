import { createSignal } from "solid-js";

export interface User {
  id: number;
  username: string;
  nickname: string;
  token: string;
}

export const [user, setUser] = createSignal<User | null>(null);
