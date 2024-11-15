import { Any } from "./global-types/index.js";

type Indexed = {
  [key: string]: unknown;
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  Object.keys(rhs).forEach((key) => {
    if (lhs[key] !== undefined) {
      if (rhs[key] instanceof Object) {
        // eslint-disable-next-line no-param-reassign
        rhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        // eslint-disable-next-line no-param-reassign
        lhs[key] = rhs[key];
      }
    } else {
      // eslint-disable-next-line no-param-reassign
      lhs[key] = rhs[key];
    }
  });

  return lhs;
};

export const set = (obj: Indexed, path: string, value: unknown): Indexed => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduce<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as Any,
  );

  return merge(obj, result);
};