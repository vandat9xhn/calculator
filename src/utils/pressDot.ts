import { ARR_KEY_NUMBER } from "../data/keyboard";
import { AppStateObj } from "../types";

//
export const pressDot = (new_state_obj: AppStateObj) => {
  const { stack } = new_state_obj;
  const last_stack = stack.slice(-1)[0];
  new_state_obj.done = false;

  // stack empty
  if (!last_stack) {
    return;
  }

  const last_letter = last_stack.slice(-1);
  // after number && last_stack no dot
  if (ARR_KEY_NUMBER.includes(last_letter) && !last_stack.includes(".")) {
    stack[stack.length - 1] += ".";
  }

  return;
};
