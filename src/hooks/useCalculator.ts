import { useState } from "react";
import { ARR_KEY_FUNC, ARR_KEY_MATH, OBJ_KEYS } from "../data/keyboard";

import { handleChangeThemeType, handleClickBtnType } from "../types";
import { makeEval } from "../utils/makeEval";

//
export const useCalculator = () => {
  //
  const [state_obj, setStateObj] = useState<{
    stack: string[];
    done: boolean;
  }>({
    stack: [],
    done: true,
  });

  const str_screen = state_obj.stack.join("");

  // ---

  const handleChangeTheme: handleChangeThemeType = () => {
    const html = document.getElementsByTagName("html")[0];
    const ix_theme = parseInt(html.dataset.theme) + 1;
    html.dataset.theme = `${ix_theme > 3 ? 1 : ix_theme}`;
  };

  const handleClickBtn: handleClickBtnType = (new_str_key) => {
    setStateObj((state_obj) => {
      const new_stack = [...state_obj.stack];
      let done = state_obj.done;
      const { type, str_key } = OBJ_KEYS[new_str_key];
      let last_stack = state_obj.stack.slice(-1)[0];

      switch (type) {
        //
        case "func":
          if (new_stack.length === 0) {
            break;
          }

          if (str_key === "reset") {
            new_stack.splice(0);
            done = true;
            break;
          }

          if (done) {
            break;
          }

          if (str_key === "del") {
            last_stack = last_stack.slice(0, last_stack.length - 1);
            if (last_stack.length === 0) {
              new_stack.splice(new_stack.length - 1, 1);
            } else {
              new_stack[new_stack.length - 1] = last_stack;
            }

            break;
          }

          // cal
          const result = makeEval(new_stack);

          if (result === "error") {
            alert(result);
            break;
          }
          new_stack.splice(0, new_stack.length, result);
          done = true;

          break;

        //
        case "math":
          if (new_stack.length === 0) {
            if (new_str_key === "-") {
              new_stack.push(new_str_key);
              done = false;
            }
            break;
          }

          if (ARR_KEY_MATH.includes(last_stack)) {
            new_stack[new_stack.length - 1] = new_str_key;
          } else {
            new_stack.push(new_str_key);
          }

          done = false;
          break;

        //
        case "number":
          const is_last_math = ARR_KEY_MATH.includes(last_stack);
          if (
            str_key === "." &&
            (!last_stack || done || is_last_math || last_stack.includes("."))
          ) {
            break;
          }

          if (done) {
            new_stack.splice(0, new_stack.length, new_str_key);
            done = false;
            break;
          }

          if ((is_last_math && new_stack.length > 1) || !last_stack) {
            new_stack.push(new_str_key);
          } else {
            new_stack[new_stack.length - 1] += new_str_key;
          }

          break;

        default:
          break;
      }

      return {
        ...state_obj,
        stack: new_stack,
        done: done,
      };
    });
  };

  return {
    ...state_obj,
    str_screen,
    handleChangeTheme,
    handleClickBtn,
  };
};
