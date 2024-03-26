import { Message } from "@components/general/Message";
import { AxiosError } from "axios";

export class ApiUtil {
  public static isAxiosErrorWithStatus(e: unknown, status: number): e is AxiosError {
    return e instanceof AxiosError && e.response?.status === status;
  }

  public static async fetchWithErrorMessage<T, R>(errMsg: string, fetcher: (...args: T[]) => Promise<R>, ...args: T[]): Promise<R | null> {
    try {
      return await fetcher(...args);
    } catch (e) {
      Message.createError(errMsg);
      throw e;
    }
  }
}
