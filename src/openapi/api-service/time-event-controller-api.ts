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
import { AddTimeEventRequest } from "../api-typing";
// @ts-ignore
import { AddTimeEventResponse } from "../api-typing";
// @ts-ignore
import { ListOneDayTimeEventResponse } from "../api-typing";
// @ts-ignore
import { ListTimeEventByTagIdResponse } from "../api-typing";
// @ts-ignore
import { UpdateTimeEventRequest } from "../api-typing";
/**
 * TimeEventControllerApi - axios parameter creator
 * @export
 */
export const TimeEventControllerApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     *
     * @param {AddTimeEventRequest} addTimeEventRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addTimeEvent: async (addTimeEventRequest: AddTimeEventRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'addTimeEventRequest' is not null or undefined
      assertParamExists("addTimeEvent", "addTimeEventRequest", addTimeEventRequest);
      const localVarPath = `/time-event`;
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
      localVarRequestOptions.data = serializeDataIfNeeded(addTimeEventRequest, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteTimeEvent: async (id: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      assertParamExists("deleteTimeEvent", "id", id);
      const localVarPath = `/time-event/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = { method: "DELETE", ...baseOptions, ...options };
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
     * @param {number} tagId
     * @param {number} page
     * @param {number} pageSize
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAllTagEvents: async (tagId: number, page: number, pageSize: number, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'tagId' is not null or undefined
      assertParamExists("getAllTagEvents", "tagId", tagId);
      // verify required parameter 'page' is not null or undefined
      assertParamExists("getAllTagEvents", "page", page);
      // verify required parameter 'pageSize' is not null or undefined
      assertParamExists("getAllTagEvents", "pageSize", pageSize);
      const localVarPath = `/time-event/all-tag-events/{tagId}/{page}/{pageSize}`
        .replace(`{${"tagId"}}`, encodeURIComponent(String(tagId)))
        .replace(`{${"page"}}`, encodeURIComponent(String(page)))
        .replace(`{${"pageSize"}}`, encodeURIComponent(String(pageSize)));
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
     * @param {string} date
     * @param {Array<number>} [tagIds]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getOneDayEvents: async (date: string, tagIds?: Array<number>, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'date' is not null or undefined
      assertParamExists("getOneDayEvents", "date", date);
      const localVarPath = `/time-event/one-day`;
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

      if (tagIds) {
        localVarQueryParameter["tagIds"] = tagIds;
      }

      if (date !== undefined) {
        localVarQueryParameter["date"] = (date as any) instanceof Date ? (date as any).toISOString().substring(0, 10) : date;
      }

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
     * @param {UpdateTimeEventRequest} updateTimeEventRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateTimeEvent: async (updateTimeEventRequest: UpdateTimeEventRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'updateTimeEventRequest' is not null or undefined
      assertParamExists("updateTimeEvent", "updateTimeEventRequest", updateTimeEventRequest);
      const localVarPath = `/time-event`;
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
      localVarRequestOptions.data = serializeDataIfNeeded(updateTimeEventRequest, localVarRequestOptions, configuration);

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * TimeEventControllerApi - functional programming interface
 * @export
 */
export const TimeEventControllerApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = TimeEventControllerApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {AddTimeEventRequest} addTimeEventRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addTimeEvent(
      addTimeEventRequest: AddTimeEventRequest,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AddTimeEventResponse>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addTimeEvent(addTimeEventRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TimeEventControllerApi.addTimeEvent"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteTimeEvent(id: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteTimeEvent(id, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TimeEventControllerApi.deleteTimeEvent"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {number} tagId
     * @param {number} page
     * @param {number} pageSize
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllTagEvents(
      tagId: number,
      page: number,
      pageSize: number,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListTimeEventByTagIdResponse>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getAllTagEvents(tagId, page, pageSize, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TimeEventControllerApi.getAllTagEvents"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {string} date
     * @param {Array<number>} [tagIds]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getOneDayEvents(
      date: string,
      tagIds?: Array<number>,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListOneDayTimeEventResponse>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getOneDayEvents(date, tagIds, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TimeEventControllerApi.getOneDayEvents"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     *
     * @param {UpdateTimeEventRequest} updateTimeEventRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateTimeEvent(
      updateTimeEventRequest: UpdateTimeEventRequest,
      options?: RawAxiosRequestConfig,
    ): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
      const localVarAxiosArgs = await localVarAxiosParamCreator.updateTimeEvent(updateTimeEventRequest, options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath = operationServerMap["TimeEventControllerApi.updateTimeEvent"]?.[localVarOperationServerIndex]?.url;
      return (axios, basePath) =>
        createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * TimeEventControllerApi - factory interface
 * @export
 */
export const TimeEventControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
  const localVarFp = TimeEventControllerApiFp(configuration);
  return {
    /**
     *
     * @param {AddTimeEventRequest} addTimeEventRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addTimeEvent(addTimeEventRequest: AddTimeEventRequest, options?: any): AxiosPromise<AddTimeEventResponse> {
      return localVarFp.addTimeEvent(addTimeEventRequest, options).then(request => request(axios, basePath));
    },
    /**
     *
     * @param {number} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteTimeEvent(id: number, options?: any): AxiosPromise<void> {
      return localVarFp.deleteTimeEvent(id, options).then(request => request(axios, basePath));
    },
    /**
     *
     * @param {number} tagId
     * @param {number} page
     * @param {number} pageSize
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAllTagEvents(tagId: number, page: number, pageSize: number, options?: any): AxiosPromise<ListTimeEventByTagIdResponse> {
      return localVarFp.getAllTagEvents(tagId, page, pageSize, options).then(request => request(axios, basePath));
    },
    /**
     *
     * @param {string} date
     * @param {Array<number>} [tagIds]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getOneDayEvents(date: string, tagIds?: Array<number>, options?: any): AxiosPromise<ListOneDayTimeEventResponse> {
      return localVarFp.getOneDayEvents(date, tagIds, options).then(request => request(axios, basePath));
    },
    /**
     *
     * @param {UpdateTimeEventRequest} updateTimeEventRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateTimeEvent(updateTimeEventRequest: UpdateTimeEventRequest, options?: any): AxiosPromise<void> {
      return localVarFp.updateTimeEvent(updateTimeEventRequest, options).then(request => request(axios, basePath));
    },
  };
};

/**
 * TimeEventControllerApi - object-oriented interface
 * @export
 * @class TimeEventControllerApi
 * @extends {BaseAPI}
 */
export class TimeEventControllerApi extends BaseAPI {
  /**
   *
   * @param {AddTimeEventRequest} addTimeEventRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TimeEventControllerApi
   */
  public addTimeEvent(addTimeEventRequest: AddTimeEventRequest, options?: RawAxiosRequestConfig) {
    return TimeEventControllerApiFp(this.configuration)
      .addTimeEvent(addTimeEventRequest, options)
      .then(request => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {number} id
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TimeEventControllerApi
   */
  public deleteTimeEvent(id: number, options?: RawAxiosRequestConfig) {
    return TimeEventControllerApiFp(this.configuration)
      .deleteTimeEvent(id, options)
      .then(request => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {number} tagId
   * @param {number} page
   * @param {number} pageSize
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TimeEventControllerApi
   */
  public getAllTagEvents(tagId: number, page: number, pageSize: number, options?: RawAxiosRequestConfig) {
    return TimeEventControllerApiFp(this.configuration)
      .getAllTagEvents(tagId, page, pageSize, options)
      .then(request => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {string} date
   * @param {Array<number>} [tagIds]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TimeEventControllerApi
   */
  public getOneDayEvents(date: string, tagIds?: Array<number>, options?: RawAxiosRequestConfig) {
    return TimeEventControllerApiFp(this.configuration)
      .getOneDayEvents(date, tagIds, options)
      .then(request => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {UpdateTimeEventRequest} updateTimeEventRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof TimeEventControllerApi
   */
  public updateTimeEvent(updateTimeEventRequest: UpdateTimeEventRequest, options?: RawAxiosRequestConfig) {
    return TimeEventControllerApiFp(this.configuration)
      .updateTimeEvent(updateTimeEventRequest, options)
      .then(request => request(this.axios, this.basePath));
  }
}
