import { createSignal } from "solid-js";

export interface Customer {
  id: number;
  username: string;
  nickname: string;
}

export const [customer, setCustomer] = createSignal<Customer | null>(null);

export const useIsLogin = () => customer() !== null;
