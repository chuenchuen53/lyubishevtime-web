import { Configuration } from "./openapi/configuration";
import { UserControllerApiFactory } from "./openapi/api-service/user-controller-api";
import { TimeEventTagControllerApiFactory } from "./openapi/api-service/time-event-tag-controller-api";
import { user } from "@stores/UserStore";

const basePath = import.meta.env.VITE_API_BASE_URL;
const configuration = new Configuration({ basePath, accessToken: () => user()?.token ?? "" });

export const UserService = UserControllerApiFactory(configuration);
export const TagService = TimeEventTagControllerApiFactory(configuration);
