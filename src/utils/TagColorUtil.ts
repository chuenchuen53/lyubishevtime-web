import { TimeEventTagColor } from "@openapi";

export class TagColorUtil {
  public static main(x: TimeEventTagColor): string {
    switch (x) {
      case TimeEventTagColor.RED:
        return "bg-red-600 dark:bg-red-700";
      case TimeEventTagColor.ORANGE:
        return "bg-orange-600 dark:bg-orange-700";
      case TimeEventTagColor.YELLOW:
        return "bg-yellow-600 dark:bg-yellow-700";
      case TimeEventTagColor.GREEN:
        return "bg-green-600 dark:bg-green-700";
      case TimeEventTagColor.CYAN:
        return "bg-cyan-600 dark:bg-cyan-700";
      case TimeEventTagColor.BLUE:
        return "bg-blue-600 dark:bg-blue-700";
      case TimeEventTagColor.PURPLE:
        return "bg-purple-600 dark:bg-purple-700";
      case TimeEventTagColor.GREY:
        return "bg-gray-600 dark:bg-gray-700";
    }
  }

  public static secondary(x: TimeEventTagColor): string {
    switch (x) {
      case TimeEventTagColor.RED:
        return "bg-red-100/40 dark:bg-red-900/85";
      case TimeEventTagColor.ORANGE:
        return "bg-orange-100/40 dark:bg-orange-900/85";
      case TimeEventTagColor.YELLOW:
        return "bg-yellow-100/40 dark:bg-yellow-900/85";
      case TimeEventTagColor.GREEN:
        return "bg-green-100/40 dark:bg-green-900/85";
      case TimeEventTagColor.CYAN:
        return "bg-cyan-100/40 dark:bg-cyan-900/85";
      case TimeEventTagColor.BLUE:
        return "bg-blue-100/40 dark:bg-blue-900/85";
      case TimeEventTagColor.PURPLE:
        return "bg-purple-100/40 dark:bg-purple-900/85";
      case TimeEventTagColor.GREY:
        return "bg-gray-100/40 dark:bg-gray-900/85";
    }
  }
}
