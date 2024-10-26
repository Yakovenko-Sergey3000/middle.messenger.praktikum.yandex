import { Any } from "./global-types/index.js";

const concatClasses = (...args: Any[]): string => {
  let str: string = "";

  args.forEach((item: Any): void => {
    if (typeof item === "string" || typeof item === "number") {
      str += str ? " " : "";
      str += item;
    } else if (typeof item === "object") {
      if (Array.isArray(item)) {
        item.forEach((element) => {
          if (element) {
            const prepareStr = concatClasses(element);
            if (prepareStr) {
              str += str ? " " : "";
              str += prepareStr;
            }
          }
        });
      } else {
        Object.entries(item).forEach(([key, value]) => {
          if (value) {
            str += str ? " " : "";
            str += key;
          }
        });
      }
    }
  });

  return str;
};

export default concatClasses;
