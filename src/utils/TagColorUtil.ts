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

  public static shadow(x: TimeEventTagColor): string {
    switch (x) {
      case TimeEventTagColor.RED:
        return "shadow-red-600 dark:shadow-red-700";
      case TimeEventTagColor.ORANGE:
        return "shadow-orange-600 dark:shadow-red-700";
      case TimeEventTagColor.YELLOW:
        return "shadow-yellow-600 dark:shadow-red-700";
      case TimeEventTagColor.GREEN:
        return "shadow-green-600 dark:shadow-red-700";
      case TimeEventTagColor.CYAN:
        return "shadow-cyan-600 dark:shadow-red-700";
      case TimeEventTagColor.BLUE:
        return "shadow-blue-600 dark:shadow-red-700";
      case TimeEventTagColor.PURPLE:
        return "shadow-purple-600 dark:shadow-red-700";
      case TimeEventTagColor.GREY:
        return "shadow-gray-600 dark:shadow-red-700";
    }
  }

  public static bgGradient(x: TimeEventTagColor): string {
    switch (x) {
      case TimeEventTagColor.RED:
        return "from-red-200 to-red-50 dark:from-red-400 dark:to-red-100";
      case TimeEventTagColor.ORANGE:
        return "from-orange-200 to-orange-50 dark:from-orange-400 dark:to-orange-100";
      case TimeEventTagColor.YELLOW:
        return "from-yellow-200 to-yellow-50 dark:from-yellow-400 dark:to-yellow-100";
      case TimeEventTagColor.GREEN:
        return "from-green-200 to-green-50 dark:from-green-400 dark:to-green-100";
      case TimeEventTagColor.CYAN:
        return "from-cyan-200 to-cyan-50 dark:from-cyan-400 dark:to-cyan-100";
      case TimeEventTagColor.BLUE:
        return "from-blue-200 to-blue-50 dark:from-blue-400 dark:to-blue-100";
      case TimeEventTagColor.PURPLE:
        return "from-purple-200 to-purple-50 dark:from-purple-400 dark:to-purple-100";
      case TimeEventTagColor.GREY:
        return "from-gray-200 to-gray-50 dark:from-gray-400 dark:to-gray-100";
    }
  }

  public static chartColor(x: TimeEventTagColor): string {
    switch (x) {
      case TimeEventTagColor.RED:
        return "#E02424";
      case TimeEventTagColor.ORANGE:
        return "#EA580C";
      case TimeEventTagColor.YELLOW:
        return "#9F580A";
      case TimeEventTagColor.GREEN:
        return "#057A55";
      case TimeEventTagColor.CYAN:
        return "#0891b2";
      case TimeEventTagColor.BLUE:
        return "#1C64F2";
      case TimeEventTagColor.PURPLE:
        return "#7E3AF2";
      case TimeEventTagColor.GREY:
        return "#4B5563";
    }
  }
}
