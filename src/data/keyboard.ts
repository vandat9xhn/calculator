export const ARR_KEY_NUMBER = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "."];
export const ARR_KEY_FUNC = ["del", "reset", "="];
export const ARR_KEY_MATH = ["+", "-", "x", "/"];

export const ARR_KEY_SMALL = [
  7,
  8,
  9,
  "del",
  4,
  5,
  6,
  "+",
  1,
  2,
  3,
  "-",
  ".",
  0,
  "/",
  "x",
];
export const ARR_KEY_LARGE = ["reset", "="];

type KeySmall = typeof ARR_KEY_SMALL[number];
type KeyLarge = typeof ARR_KEY_LARGE[number];

type ObjKeysType = {
  [K in KeySmall | KeyLarge]: {
    type: "number" | "func" | "math";
    str_key: string;
    class_name: string;
  };
};

//
export const OBJ_KEYS = ((): ObjKeysType => {
  const obj_keys = {} as ObjKeysType;

  ARR_KEY_NUMBER.forEach((i) => {
    obj_keys[i] = {
      type: "number",
      str_key: `${i}`,
      class_name: "btn-number",
    };
  });

  ARR_KEY_FUNC.forEach((item) => {
    obj_keys[item] = {
      type: "func",
      str_key: `${item}`,
      class_name: item === "=" ? "btn-return" : "btn-func",
    };
  });

  ARR_KEY_MATH.forEach((item) => {
    obj_keys[item] = {
      type: "math",
      str_key: `${item}`,
      class_name: "btn-math",
    };
  });

  return obj_keys as ObjKeysType;
})();
