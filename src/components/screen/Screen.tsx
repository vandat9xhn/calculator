import * as React from "react";

import './Screen.scss';

//
export interface ScreenProps {
  str_screen: string;
}

//
function Screen({ str_screen }: ScreenProps) {
  //
  return (
    <div className="Screen">
      <div className="Screen_contain">{str_screen}</div>
    </div>
  );
}

export default Screen;
