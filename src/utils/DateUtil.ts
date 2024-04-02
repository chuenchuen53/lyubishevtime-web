export class DateUtil {
  public static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && date.toISOString().startsWith(dateString);
  }

  public static shortDateString(dateString: string): string {
    return dateString.slice(2);
  }

  public static removeSec(dateString: string): string {
    return dateString.slice(0, -3);
  }

  public static minsFromTimeString(timeString: string): number {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  }

  public static todayString(): string {
    const now = new Date();
    return DateUtil.dateStringFromDate(now);
  }

  public static nextDayString(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return DateUtil.dateStringFromDate(date);
  }

  public static prevDayString(dateString: string): string {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 1);
    return DateUtil.dateStringFromDate(date);
  }

  public static prevNDayString(n: number): string {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return DateUtil.dateStringFromDate(date);
  }

  private static dateStringFromDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}
