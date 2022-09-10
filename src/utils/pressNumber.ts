import { ARR_KEY_MATH } from "../data/keyboard";
import { AppStateObj } from "../types";

//
export const pressNumber = (new_state_obj: AppStateObj, str_number = "") => {
  const { stack, done } = new_state_obj;
  const last_stack = stack.slice(-1)[0];

  // done = true
  if (done || !last_stack) {
    stack.splice(0, stack.length, str_number);
    new_state_obj.done = false;
    return;
  }

  const last_letter = last_stack.slice(-1);

  // after - at first or after (-
  if (
    (stack.length === 1 || stack.slice(-2)[0] === "(") &&
    last_stack === "-"
  ) {
    stack[stack.length - 1] += str_number;
    return;
  }

  // after (, key_math
  if (["(", ...ARR_KEY_MATH].includes(last_letter)) {
    stack.push(str_number);
    return;
  }

  // after ), %
  if ([")", "%"].includes(last_letter)) {
    return;
  }

  // after number
  stack[stack.length - 1] += str_number;
};
