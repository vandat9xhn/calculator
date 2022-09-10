import { ARR_KEY_NUMBER } from "../data/keyboard";
import { AppStateObj } from "../types";

//
export const pressPercent = (new_state_obj: AppStateObj) => {
  const { stack } = new_state_obj;
  const last_stack = stack.slice(-1)[0];

  // stack empty
  if (!last_stack) {
    return;
  }

  new_state_obj.done = false;
  const last_letter = last_stack.slice(-1);
  // after number
  if (ARR_KEY_NUMBER.includes(last_letter)) {
    stack[stack.length - 1] += "%";
  }
};
