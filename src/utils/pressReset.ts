import { AppStateObj } from "../types";

//
export const pressReset = (new_state_obj: AppStateObj) => {
  new_state_obj.done = false;
  new_state_obj.stack = [];
  new_state_obj.parentTheses = {
    arr_ix_open: [],
    arr_ix_close: [],
  };

  return;
};
