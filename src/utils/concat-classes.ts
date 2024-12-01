const concatClasses = (...args: unknown[]): string => {
  let str: string = "";

  args.forEach((item: unknown): void => {
    if (item == null) {
      return;
    }

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
