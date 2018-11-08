import React from "react";

type AnswerProps = {
  selectedNumbers: Array<any>,
  unselectNumber: Function
};
const Answer = (props: AnswerProps) => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((number, i) => (
        <span key={i} onClick={() => props.unselectNumber(number)}>
          {number}
        </span>
      ))}
    </div>
  );
};

export default Answer;
