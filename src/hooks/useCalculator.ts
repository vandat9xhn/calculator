import { useState } from "react";
import { ARR_KEY_MATH, ARR_KEY_NUMBER } from "../data/keyboard";

import {
  AppStateObj,
  handleChangeThemeType,
  handleClickBtnType,
} from "../types";

import { pressDel } from "../utils/pressDel";
import { pressDot } from "../utils/pressDot";
import { pressMath } from "../utils/pressMath";
import { pressNumber } from "../utils/pressNumber";
import { pressParentTheses } from "../utils/pressParentTheses";
import { pressPercent } from "../utils/pressPercent";
import { pressReset } from "../utils/pressReset";
import { pressReturn } from "../utils/pressReturn";

const initialState: AppStateObj = {
  stack: [],
  parentTheses: {
    arr_ix_open: [],
    arr_ix_close: [],
  },
  done: false,
};

//
export const useCalculator = () => {
  //
  const [state_obj, setStateObj] = useState<AppStateObj>(initialState);

  const str_screen = state_obj.stack.join("");

  // ---

  const handleChangeTheme: handleChangeThemeType = () => {
    const html = document.getElementsByTagName("html")[0];
    const ix_theme = parseInt(html.dataset.theme) + 1;
    html.dataset.theme = `${ix_theme > 3 ? 1 : ix_theme}`;
  };

  const handleClickBtn: handleClickBtnType = (str_key) => {
    setStateObj((state_obj) => {
      const new_state_obj = { ...state_obj };

      if (ARR_KEY_NUMBER.includes(str_key)) {
        pressNumber(new_state_obj, str_key);
      } else if (ARR_KEY_MATH.includes(str_key)) {
        pressMath(new_state_obj, str_key);
      } else {
        switch (str_key) {
          case "del":
            pressDel(new_state_obj);
            break;

          case ".":
            pressDot(new_state_obj);
            break;

          case "()":
            pressParentTheses(new_state_obj);
            break;

          case "%":
            pressPercent(new_state_obj);
            break;

          case "c":
            pressReset(new_state_obj);
            break;

          case "=":
            pressReturn(new_state_obj);
            break;

          default:
            break;
        }
      }

      return new_state_obj;
    });
  };

  // ----

  return {
    ...state_obj,
    str_screen,
    handleChangeTheme,
    handleClickBtn,
  };
};
