import { Configuration } from "./openapi/configuration";
import { UserControllerApiFactory } from "./openapi/api-service/user-controller-api";
import { TimeEventTagControllerApiFactory } from "./openapi/api-service/time-event-tag-controller-api";
import { user } from "@stores/UserStore";
import { AxiosResponse } from "axios";

const basePath = import.meta.env.VITE_API_BASE_URL;
const configuration = new Configuration({ basePath, accessToken: () => user()?.token ?? localStorage.getItem("token") ?? "" });

type ControllerApi = { [key: string]: (...args: any) => Promise<AxiosResponse<any>> };

const createService = <T extends ControllerApi>(
  api: T,
): { [K in keyof T]: T[K] extends (...args: infer P) => Promise<AxiosResponse<infer R>> ? (...args: P) => Promise<R> : never } => {
  const service: any = {};

  for (const [key, value] of Object.entries(api)) {
    if (typeof value === "function") {
      service[key as keyof T] = async (...args: any) => {
        const response = await (value as any)(...args);
        return response.data;
      };
    }
  }

  return service;
};

export const UserService = UserControllerApiFactory(configuration);
export const TagService = createService(TimeEventTagControllerApiFactory(configuration));
