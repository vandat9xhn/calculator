import { ARR_KEY_MATH, ARR_KEY_NUMBER } from "../data/keyboard";
import { AppStateObj } from "../types";

//
export const pressParentTheses = (new_state_obj: AppStateObj) => {
  const { done, stack, parentTheses } = new_state_obj;
  const last_stack = stack.slice(-1)[0];

  //
  if (done || !last_stack) {
    stack.splice(0, stack.length, "(");
    parentTheses.arr_ix_open.push(0);
    new_state_obj.done = false;

    return;
  }

  const last_letter = last_stack.slice(-1);
  // after math, (: open
  if ([...ARR_KEY_MATH, '('].includes(last_letter)) {
    parentTheses.arr_ix_open.push(stack.length);
    stack.push("(");
    return;
  }

  // after number, %, ): close
  if ([...ARR_KEY_NUMBER, "%", ")"].includes(last_letter)) {
    if (parentTheses.arr_ix_open.length === 0) {
      return;
    }

    const ix_open = parentTheses.arr_ix_open.pop();
    parentTheses.arr_ix_close.push([ix_open, stack.length]);
    stack.push(")");

    return;
  }
};
