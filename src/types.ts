export interface AppStateObj {
  stack: string[];
  parentTheses: {
    arr_ix_open: number[];
    arr_ix_close: [number, number][];
  };
  done: boolean;
}

export type handleChangeThemeType = () => void;
export type handleClickBtnType = (str_key: string) => void;
