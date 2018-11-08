import React from "react";
import { range } from "lodash";

const Numbers = (props: any) => {
  const NumberClassName = number => {
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return "selected";
    }
    if (props.usedNumbers.indexOf(number) >= 0) {
      return "used";
    }
  };
  return (
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) => (
          <span
            key={i}
            className={NumberClassName(number)}
            onClick={() => props.selectNumber(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};
Numbers.list = range(1, 10);

export default Numbers;
