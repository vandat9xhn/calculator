//
export const makeEval = (stack: string[]) => {
  const arr_first = stack[0] === "-" ? ["0"] : ["0", "+"];
  const new_stack = [...arr_first, ...stack, "+", "0"];
  let result = 0;
  let i = 2;

  while (i <= new_stack.length - 3) {
    const num =
      parseFloat(new_stack[i]) / (new_stack[i].slice(-1) === "%" ? 100 : 1);
    const prev_math = new_stack[i - 1];
    const next_math = new_stack[i + 1];

    if (["+", "-"].includes(next_math)) {
      result += num * (prev_math === "+" ? 1 : -1);
    } else {
      if (next_math === "/" && new_stack[i + 2] === "0") {
        return "error";
      }

      const next_num = parseFloat(new_stack[i + 2]);
      const new_num = next_math === "x" ? num * next_num : num / next_num;
      new_stack[i + 2] = `${new_num}`;
      new_stack[i + 1] = prev_math;
    }

    i += 2;
  }

  const x = result % 1;

  if (x === 0) {
    return `${result}`;
  }

  const tail = `${x}`.slice(1, 4);
  return `${result - x}${tail}`;
};
