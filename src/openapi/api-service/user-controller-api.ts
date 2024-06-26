/* tslint:disable */
/* eslint-disable */
/**
 * lyubishevtime API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from "../configuration";
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from "axios";
import globalAxios from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "../common";
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError, operationServerMap } from "../base";
// @ts-ignore
import { CurrentUserResponse } from "../api-typing";
// @ts-ignore
import { LoginRequest } from "../api-typing";
// @ts-ignore
import { LoginResponse } from "../api-typing";
// @ts-ignore
import { RegisterRequest } from "../api-typing";
// @ts-ignore
import { RegisterResponse } from "../api-typing";
// @ts-ignore
import { UpdateNicknameRequest } from "../api-typing";
// @ts-ignore
import { UpdatePasswordRequest } from "../api-typing";
// @ts-ignore
import { UpdateProfilePicRequest } from "../api-typing";
/**
 * UserControllerApi - axios parameter creator
 * @export
 */
export const UserControllerApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    currentUser: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/auth/current-user`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "GET", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {LoginRequest} loginRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    login: async (loginRequest: LoginRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'loginRequest' is not null or undefined
      assertParamExists("login", "loginRequest", loginRequest);
      const localVarPath = `/login`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(loginRequest, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {RegisterRequest} registerRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    register: async (registerRequest: RegisterRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'registerRequest' is not null or undefined
      assertParamExists("register", "registerRequest", registerRequest);
      const localVarPath = `/register`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "POST", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(registerRequest, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {UpdateNicknameRequest} updateNicknameRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateNickname: async (updateNicknameRequest: UpdateNicknameRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'updateNicknameRequest' is not null or undefined
      assertParamExists("updateNickname", "updateNicknameRequest", updateNicknameRequest);
      const localVarPath = `/personal-info/nickname`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateNicknameRequest, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {UpdatePasswordRequest} updatePasswordRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatePassword: async (updatePasswordRequest: UpdatePasswordRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'updatePasswordRequest' is not null or undefined
      assertParamExists("updatePassword", "updatePasswordRequest", updatePasswordRequest);
      const localVarPath = `/auth/password`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updatePasswordRequest, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {UpdateProfilePicRequest} updateProfilePicRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateProfilePic: async (updateProfilePicRequest: UpdateProfilePicRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'updateProfilePicRequest' is not null or undefined
      assertParamExists("updateProfilePic", "updateProfilePicRequest", updateProfilePicRequest);
      const localVarPath = `/personal-info/profile-pic`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "PUT", ...baseOptions, ...options };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
      localVarRequestOptions.data = serializeDataIfNeeded(updateProfilePicRequest, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * UserControllerApi - functional programming interface
 * @export
 */
export const UserControllerApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = UserControllerApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async currentUser(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CurrentUserResponse>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.currentUser(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["UserControllerApi.currentUser"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {LoginRequest} loginRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async login(
      loginRequest: LoginRequest,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoginResponse>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.login(loginRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["UserControllerApi.login"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {RegisterRequest} registerRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async register(
      registerRequest: RegisterRequest,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RegisterResponse>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.register(registerRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["UserControllerApi.register"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {UpdateNicknameRequest} updateNicknameRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateNickname(
      updateNicknameRequest: UpdateNicknameRequest,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateNickname(updateNicknameRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["UserControllerApi.updateNickname"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {UpdatePasswordRequest} updatePasswordRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updatePassword(
      updatePasswordRequest: UpdatePasswordRequest,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updatePassword(updatePasswordRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["UserControllerApi.updatePassword"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {UpdateProfilePicRequest} updateProfilePicRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateProfilePic(
      updateProfilePicRequest: UpdateProfilePicRequest,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateProfilePic(updateProfilePicRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["UserControllerApi.updateProfilePic"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * UserControllerApi - factory interface
 * @export
 */
export const UserControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = UserControllerApiFp(configuration);
  return {
    /**
     *
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    currentUser(options?: any): AxiosPromise<CurrentUserResponse> {
      return localVarFp.currentUser(options).then(request => request(axios, basePath));
    },
    /**
     *
     * @param {LoginRequest} loginRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    login(loginRequest: LoginRequest, options?: any): AxiosPromise<LoginResponse> {
      return localVarFp.login(loginRequest, options).then(request => request(axios, basePath));
    },
    /**
     *
     * @param {RegisterRequest} registerRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    register(registerRequest: RegisterRequest, options?: any): AxiosPromise<RegisterResponse> {
      return localVarFp.register(registerRequest, options).then(request => request(axios, basePath));
    },
    /**
     *
     * @param {UpdateNicknameRequest} updateNicknameRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateNickname(updateNicknameRequest: UpdateNicknameRequest, options?: any): AxiosPromise<void> {
      return localVarFp.updateNickname(updateNicknameRequest, options).then(request => request(axios, basePath));
    },
    /**
     *
     * @param {UpdatePasswordRequest} updatePasswordRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updatePassword(updatePasswordRequest: UpdatePasswordRequest, options?: any): AxiosPromise<void> {
      return localVarFp.updatePassword(updatePasswordRequest, options).then(request => request(axios, basePath));
    },
    /**
     *
     * @param {UpdateProfilePicRequest} updateProfilePicRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateProfilePic(updateProfilePicRequest: UpdateProfilePicRequest, options?: any): AxiosPromise<void> {
      return localVarFp.updateProfilePic(updateProfilePicRequest, options).then(request => request(axios, basePath));
    },
  };
};

/**
 * UserControllerApi - object-oriented interface
 * @export
 * @class UserControllerApi
 * @extends {BaseAPI}
 */
export class UserControllerApi extends BaseAPI {
  /**
   *
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserControllerApi
   */
  public currentUser(options?: RawAxiosRequestConfig) {
    return UserControllerApiFp(this.configuration)
      .currentUser(options)
      .then(request => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {LoginRequest} loginRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserControllerApi
   */
  public login(loginRequest: LoginRequest, options?: RawAxiosRequestConfig) {
    return UserControllerApiFp(this.configuration)
      .login(loginRequest, options)
      .then(request => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {RegisterRequest} registerRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserControllerApi
   */
  public register(registerRequest: RegisterRequest, options?: RawAxiosRequestConfig) {
    return UserControllerApiFp(this.configuration)
      .register(registerRequest, options)
      .then(request => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {UpdateNicknameRequest} updateNicknameRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserControllerApi
   */
  public updateNickname(updateNicknameRequest: UpdateNicknameRequest, options?: RawAxiosRequestConfig) {
    return UserControllerApiFp(this.configuration)
      .updateNickname(updateNicknameRequest, options)
      .then(request => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {UpdatePasswordRequest} updatePasswordRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserControllerApi
   */
  public updatePassword(updatePasswordRequest: UpdatePasswordRequest, options?: RawAxiosRequestConfig) {
    return UserControllerApiFp(this.configuration)
      .updatePassword(updatePasswordRequest, options)
      .then(request => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {UpdateProfilePicRequest} updateProfilePicRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserControllerApi
   */
  public updateProfilePic(updateProfilePicRequest: UpdateProfilePicRequest, options?: RawAxiosRequestConfig) {
    return UserControllerApiFp(this.configuration)
      .updateProfilePic(updateProfilePicRequest, options)
      .then(request => request(this.axios, this.basePath));
  }
}
