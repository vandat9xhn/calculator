import * as React from "react";

import { handleClickBtnType } from "../../types";

import "./Btn.scss";

//
export interface BtnProps {
  str_key: string;
  class_name: string;
  handleClickBtn: handleClickBtnType;
}

//
function Btn({ str_key, class_name, handleClickBtn }: BtnProps) {
  //
  const onClick = () => {
    handleClickBtn(str_key);
  };

  //
  return (
    <div className="Btn">
      <button
        className={`Btn_btn ${class_name}`}
        type="button"
        onClick={onClick}
      >
        <div>{str_key}</div>
      </button>

      <div className={`Btn_bg ${class_name}-bg`}></div>
    </div>
  );
}

export default Btn;
