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

// May contain unused imports in some cases
// @ts-ignore
import { TimeEventTag } from "./time-event-tag";

/**
 *
 * @export
 * @interface ListTimeEventTagResponse
 */
export interface ListTimeEventTagResponse {
  /**
   *
   * @type {Array<TimeEventTag>}
   * @memberof ListTimeEventTagResponse
   */
  timeEventTags: Array<TimeEventTag>;
  /**
   *
   * @type {Array<number>}
   * @memberof ListTimeEventTagResponse
   */
  timeEventTagOrder: Array<number>;
}
