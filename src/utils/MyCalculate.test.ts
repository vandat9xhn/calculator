import { MyCalculate } from "./MyCalculate";

const arr_initialStack = [
  { str: "1-(-(-(1+1)x1)x1)+(9-1)x2+5", value: 20 },
  { str: "-(-1)", value: 1 },
  { str: "7-(-(1+1)/2+1)", value: 7 },
  { str: "8/4", value: 2 },
  { str: "(3/5+1)x5", value: 8 },
  { str: "(-3/5+1)x5", value: 2 },
  { str: "(-1/2+1)x4+8-9+(-(-1+3)x2+9)/5", value: 2 },
];

const arr_result = [];

arr_initialStack.forEach((item) => {
  const initialStack = [...item.str.split(""), "+", "0"];
  const initial_arr_ix_parent_theses = (() => {
    const arr_ix_open = [];
    const arr = [];

    initialStack.forEach((item, ix) => {
      if (item === "(") {
        arr_ix_open.push(ix);
        return;
      }

      if (item === ")") {
        const ix_open = arr_ix_open.pop();
        arr.push([ix_open, ix]);
        return;
      }
    });

    return arr;
  })();

  const result = new MyCalculate(
    initialStack,
    initial_arr_ix_parent_theses
  ).getResult();
  arr_result.push(result);
});

describe("", () => {
  console.log(arr_result);
  
  arr_result.forEach((item, ix) => {
    test("", () => {
      expect(item === `${arr_initialStack[ix].value}`).toBeTruthy();
    });
  });
});
