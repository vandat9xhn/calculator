import { AppStateObj } from "../types";

//
export class MyCalculate {
  stack: AppStateObj["stack"];
  arr_ix_parent_theses: [number, number][];
  obj_result_parent_theses: {};
  count_running: number;

  constructor(
    stack: AppStateObj["stack"],
    arr_ix_parent_theses: [number, number][]
  ) {
    this.stack = stack;
    this.arr_ix_parent_theses = arr_ix_parent_theses;
    this.obj_result_parent_theses = {};
    this.count_running = 0;
  }

  getNumber = (str_num = "1") => {
    return parseFloat(str_num) / (str_num.slice(-1) === "%" ? 100 : 1);
  };

  handleInParenThese = (i_open = 0, i_close = 0) => {
    let i = i_open;
    let result = 0;
    let operator1 = "+";
    let str_num1 = "0";
    let operator2 = this.stack[i] === "-" ? "-" : "+";
    this.stack[i] === "-" && (i += 1);
    let str_num2 = this.stack[i];

    while (i <= i_close) {
      this.count_running += 1;
      if (this.count_running >= this.stack.length * 10) {
        throw `Exhausted ${this.count_running}`;
      }

      if (str_num2 === "(") {
        str_num2 = `${this.obj_result_parent_theses[i].result}`;
        i = this.obj_result_parent_theses[i].ix_close;
        continue;
      }

      i += 2;

      const num1 = this.getNumber(str_num1);
      const num2 = this.getNumber(str_num2);

      if (["+", "-"].includes(operator1)) {
        if (["+", "-"].includes(operator2)) {
          result += num1 * (operator1 === "+" ? 1 : -1);
          operator1 = operator2;
          str_num1 = str_num2;
          operator2 = this.stack[i - 1];
          str_num2 = this.stack[i];
        } else {
          // operator 2: *, /
          if (operator2 === "/" && num2 === 0) {
            throw "Math is wrong!";
          }

          str_num1 = `${operator2 === "x" ? num1 * num2 : num1 / num2}`;
          operator2 = this.stack[i - 1];
          str_num2 = this.stack[i];
        }
      } else {
        // operator 1: *, /
        if (operator1 === "/" && num1 === 0) {
          throw "Math is wrong!";
        }
        result = operator1 === "x" ? result * num1 : result / num1;
        operator1 = operator2;
        str_num1 = str_num2;
        operator2 = this.stack[i - 1];
        str_num2 = this.stack[i];
      }
    }

    const num1 = this.getNumber(str_num1);
    if (["+", "-"].includes(operator1)) {
      result += num1 * (operator1 === "+" ? 1 : -1);
    } else {
      result = operator1 === "x" ? result * num1 : result / num1;
    }

    return result;
  };

  getResultObjParentThese = () => {
    this.arr_ix_parent_theses.forEach((item) => {
      const result = this.handleInParenThese(item[0] + 1, item[1]);
      this.obj_result_parent_theses[item[0]] = {
        result: result,
        ix_close: item[1],
      };
    });
  };

  getResult = (rounding = true, num_rounding = 2) => {
    this.getResultObjParentThese();
    let result = this.handleInParenThese(0, this.stack.length - 3);

    if (!rounding) {
      return `${result}`;
    }
    const power_ten = 10 ** num_rounding;
    return `${Math.round(result * power_ten) / power_ten}`;
  };
}
