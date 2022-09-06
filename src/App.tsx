import * as React from "react";

import { IS_MOBILE } from "./constant";
import "./styles/main.scss";

import { useCalculator } from "./hooks/useCalculator";

import Header from "./components/header/Header";
import KeyBoard from "./components/keyboard/KeyBoard";
import Screen from "./components/screen/Screen";

import design_pc from "../design/desktop-design-theme-1.jpg";
import design_mb from "../design/mobile-design-theme-1.jpg";

//
export interface AppProps {}

//
function App({}: AppProps) {
  //
  const { handleChangeTheme, str_screen, handleClickBtn } = useCalculator();

  //
  React.useLayoutEffect(() => {
    const html = document.getElementsByTagName("html")[0];
    html.dataset.theme = "1";

    if (IS_MOBILE) {
      const body = document.getElementsByTagName("body")[0];
      body.classList.add("device-mobile");
    }
  }, []);

  //
  return (
    <div className="App">
      <div className="App_contain">
        <div className="App_header">
          <Header handleChangeTheme={handleChangeTheme} />
        </div>

        <div className="App_screen">
          <Screen str_screen={str_screen} />
        </div>

        <div className="App_keyboard">
          <KeyBoard handleClickBtn={handleClickBtn} />
        </div>
      </div>

      <div className="display-none">
        <img src={design_pc} alt="" />
        <img src={design_mb} alt="" />
      </div>
    </div>
  );
}

export default App;
