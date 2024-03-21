import { TimeEventTagColor } from "../openapi";

export function timeEventTagColorTranslate(color: TimeEventTagColor): string {
  switch (color) {
    case TimeEventTagColor.RED:
      return "紅色";
    case TimeEventTagColor.ORANGE:
      return "橘色";
    case TimeEventTagColor.YELLOW:
      return "黃色";
    case TimeEventTagColor.GREEN:
      return "綠色";
    case TimeEventTagColor.CYAN:
      return "青色";
    case TimeEventTagColor.BLUE:
      return "藍色";
    case TimeEventTagColor.PURPLE:
      return "紫色";
    case TimeEventTagColor.GREY:
      return "灰色";
  }
}
