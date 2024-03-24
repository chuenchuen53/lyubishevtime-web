import { user } from "@stores/UserStore";
import { Configuration } from "./openapi/configuration";
import { UserControllerApiFactory, TimeEventTagControllerApiFactory, TimeEventControllerApiFactory, SummaryControllerApiFactory } from "./openapi";
import type { AxiosResponse } from "axios";

const basePath = import.meta.env.VITE_API_BASE_URL;
const configuration = new Configuration({ basePath, accessToken: () => user()?.token ?? localStorage.getItem("token") ?? "" });

type ControllerApi = { [key: string]: (...args: any) => Promise<AxiosResponse<any>> };

const createService = <T extends ControllerApi>(
  api: T,
): { [K in keyof T]: T[K] extends (...args: infer P) => Promise<AxiosResponse<infer R>> ? (...args: P) => Promise<R> : never } => {
  return new Proxy(api, {
    get(target, propKey, receiver) {
      const origMethod = (target as any)[propKey];
      if (typeof origMethod === "function") {
        return async (...args: any[]) => {
          const response = await origMethod.apply(this, args);
          return response.data;
        };
      }
      return origMethod;
    },
  }) as any;
};

export const TagService = createService(TimeEventTagControllerApiFactory(configuration));
export const EventService = createService(TimeEventControllerApiFactory(configuration));
export const SummaryService = createService(SummaryControllerApiFactory(configuration));
export const UserService = UserControllerApiFactory(configuration);
