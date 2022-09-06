import * as React from "react";

import { handleClickBtnType } from "../../types";
import { ARR_KEY_LARGE, ARR_KEY_SMALL, OBJ_KEYS } from "../../data/keyboard";

import Btn from "../btn/Btn";

import "./KeyBoard.scss";

//
export interface KeyBoardProps {
  handleClickBtn: handleClickBtnType;
}

//
function KeyBoard({ handleClickBtn }: KeyBoardProps) {
  //
  return (
    <div className="KeyBoard">
      <div className="KeyBoard_row">
        {ARR_KEY_SMALL.map((item, ix) => (
          <div key={item} className="KeyBoard_small KeyBoard_item">
            <Btn
              str_key={OBJ_KEYS[item].str_key}
              class_name={OBJ_KEYS[item].class_name}
              handleClickBtn={handleClickBtn}
            />
          </div>
        ))}

        {ARR_KEY_LARGE.map((item, ix) => (
          <div key={item} className={`KeyBoard_item KeyBoard_large-${ix + 1}`}>
            <Btn
              str_key={OBJ_KEYS[item].str_key}
              class_name={OBJ_KEYS[item].class_name}
              handleClickBtn={handleClickBtn}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyBoard;
