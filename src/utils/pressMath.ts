import { ARR_KEY_MATH } from "../data/keyboard";
import { AppStateObj } from "../types";

//
export const pressMath = (new_state_obj: AppStateObj, str_math = "") => {
  const { stack } = new_state_obj;
  const last_stack = stack.slice(-1)[0];
  new_state_obj.done = false;

  // stack empty, after (
  if (!last_stack || ["("].includes(str_math)) {
    if (str_math === "-") {
      stack.push("-");
    }
    return;
  }

  // after key math
  if (ARR_KEY_MATH.includes(last_stack)) {
    // not at first
    if (stack.length > 1 && stack.slice(-2)[0] !== "(") {
      stack[stack.length - 1] = str_math;
    }
    return;
  }

  stack.push(str_math);
};
