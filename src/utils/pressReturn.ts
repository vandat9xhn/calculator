import { ARR_KEY_MATH } from "../data/keyboard";
import { AppStateObj } from "../types";
import { MyCalculate } from "./MyCalculate";

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

  const new_stack = [...stack, "+", "0"];
  const arr_ix_close = new_state_obj.parentTheses.arr_ix_close;
  try {
    const my_calculate = new MyCalculate(new_stack, arr_ix_close);
    const result = my_calculate.getResult();

    new_state_obj.stack = [result];
    new_state_obj.done = true;
    new_state_obj.parentTheses = {
      arr_ix_open: [],
      arr_ix_close: [],
    };
  } catch (error) {
    alert(error);
  }
};
