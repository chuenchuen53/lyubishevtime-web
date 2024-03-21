export class EnumUtil {
  public static values<T extends object>(enumObj: T): (keyof T)[] {
    return Object.keys(enumObj) as unknown[] as (keyof T)[];
  }
}
