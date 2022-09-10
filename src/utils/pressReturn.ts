import { ARR_KEY_MATH } from "../data/keyboard";
import { AppStateObj } from "../types";
import { makeEval } from "./makeEval";

//
export const pressReturn = (new_state_obj: AppStateObj) => {
  const { parentTheses, done } = new_state_obj;
  const stack = [...new_state_obj.stack];
  const last_stack = stack.slice(-1)[0];

  if (done || !last_stack) {
    return;
  }

  // has parentTheses open
  if (parentTheses.arr_ix_open.length || ARR_KEY_MATH.includes(last_stack)) {
    alert("Math is wrong!");
    return "Math is wrong!";
  }

  for (const item of parentTheses.arr_ix_close) {
    const stack_child = stack.slice(item[0] + 1, item[1]);
    const result_child = makeEval(stack_child);
    if (result_child === "error") {
      alert("Math is wrong!");
      return "Error";
    }

    stack[item[0]] = result_child;
    for (let ix = 0; ix <= item[1] - item[0] - 1; ix++) {
      stack[item[0] + 1 + ix] = ix % 2 === 0 ? "x" : "1";
    }
  }

  const result = makeEval(stack, true);
  new_state_obj.stack = [result];
  new_state_obj.done = true;
  new_state_obj.parentTheses = {
    arr_ix_open: [],
    arr_ix_close: [],
  };
};
