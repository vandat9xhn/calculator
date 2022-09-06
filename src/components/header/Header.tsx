import * as React from "react";

import { handleChangeThemeType } from "../../types";

import Theme from "../theme/Theme";

import './Header.scss';

//
export interface HeaderProps {
  handleChangeTheme: handleChangeThemeType;
}

//
function Header({ handleChangeTheme }: HeaderProps) {
  //
  return (
    <div className="Header flex items-center space-between">
      <h1 className="Header_title">calc</h1>

      <div>
        <Theme handleChangeTheme={handleChangeTheme} />
      </div>
    </div>
  );
}

export default Header;
