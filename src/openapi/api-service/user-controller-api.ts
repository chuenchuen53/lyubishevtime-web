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
import { IsUsernameExistResponse } from "../api-typing";
// @ts-ignore
import { LoginRequest } from "../api-typing";
// @ts-ignore
import { LoginResponse } from "../api-typing";
// @ts-ignore
import { SignUpResponse } from "../api-typing";
// @ts-ignore
import { SignupRequest } from "../api-typing";
/**
 * UserControllerApi - axios parameter creator
 * @export
 */
export const UserControllerApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @param {string} username
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    isUsernameExist: async (username: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'username' is not null or undefined
      assertParamExists("isUsernameExist", "username", username);
      const localVarPath = `/is-username-exist/{username}`.replace(`{${"username"}}`, encodeURIComponent(String(username)));
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
     * @param {SignupRequest} signupRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    signup: async (signupRequest: SignupRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'signupRequest' is not null or undefined
      assertParamExists("signup", "signupRequest", signupRequest);
      const localVarPath = `/signup`;
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
      localVarRequestOptions.data = serializeDataIfNeeded(signupRequest, localVarRequestOptions, configuration);

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
     * @param {string} username
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async isUsernameExist(
      username: string,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<IsUsernameExistResponse>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.isUsernameExist(username, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["UserControllerApi.isUsernameExist"]?.[localVarOperationServerIndex]?.url;
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
     * @param {SignupRequest} signupRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async signup(
      signupRequest: SignupRequest,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SignUpResponse>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.signup(signupRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["UserControllerApi.signup"]?.[localVarOperationServerIndex]?.url;
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
     * @param {string} username
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    isUsernameExist(username: string, options?: any): AxiosPromise<IsUsernameExistResponse> {
      return localVarFp.isUsernameExist(username, options).then(request => request(axios, basePath));
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
     * @param {SignupRequest} signupRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    signup(signupRequest: SignupRequest, options?: any): AxiosPromise<SignUpResponse> {
      return localVarFp.signup(signupRequest, options).then(request => request(axios, basePath));
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
   * @param {string} username
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserControllerApi
   */
  public isUsernameExist(username: string, options?: RawAxiosRequestConfig) {
    return UserControllerApiFp(this.configuration)
      .isUsernameExist(username, options)
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
   * @param {SignupRequest} signupRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UserControllerApi
   */
  public signup(signupRequest: SignupRequest, options?: RawAxiosRequestConfig) {
    return UserControllerApiFp(this.configuration)
      .signup(signupRequest, options)
      .then(request => request(this.axios, this.basePath));
  }
}