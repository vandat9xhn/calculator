import * as React from "react";

import { handleChangeThemeType } from "../../types";

import "./Theme.scss";

//
export interface ThemeProps {
  handleChangeTheme: handleChangeThemeType;
}

//
function Theme({ handleChangeTheme }: ThemeProps) {
  //
  return (
    <div className="Theme">
      <div className="Theme_title">THEME</div>

      <div>
        <div className="Theme_numbers flex space-between">
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>

        <div>
          <button
            className="Theme_btn"
            type="button"
            onClick={handleChangeTheme}
          >
            <div className="Theme_ball"></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Theme;
