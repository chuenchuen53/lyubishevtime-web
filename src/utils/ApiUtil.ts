import { Message } from "@components/general/Message";
import { isAxiosError } from "axios";
import type { AxiosError } from "axios";

export class ApiUtil {
  public static isAxiosErrorWithStatus(e: unknown, status: number): e is AxiosError {
    return isAxiosError(e) && e.response?.status === status;
  }

  public static async loadingAndErrHandling<T, R>(
    fetcher: (...args: T[]) => Promise<R>,
    setLoading: (x: boolean) => void,
    errMsg?: string,
  ): Promise<R> {
    try {
      setLoading(true);
      return await fetcher();
    } catch (e) {
      if (errMsg) Message.createError(errMsg);
      throw e;
    } finally {
      setLoading(false);
    }
  }
}
