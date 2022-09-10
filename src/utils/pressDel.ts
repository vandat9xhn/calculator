import { AppStateObj } from "../types";

//
export const pressDel = (new_state_obj: AppStateObj) => {
  const { stack, parentTheses, done } = new_state_obj;
  const last_stack = stack.slice(-1)[0];

  if (done) {
    new_state_obj.done = false;
    stack.splice(0, stack.length);
    return;
  }

  // stack empty
  if (!last_stack) {
    return;
  }

  const last_letter = last_stack.slice(-1);
  stack.pop();
  
  // after "("
  if (last_letter === "(") {
    parentTheses.arr_ix_open.pop();
    return;
  }
  // after ")"
  if (last_letter === ")") {
    const [ix_open] = parentTheses.arr_ix_close.pop();
    parentTheses.arr_ix_open.push(ix_open);
    return;
  }
};
