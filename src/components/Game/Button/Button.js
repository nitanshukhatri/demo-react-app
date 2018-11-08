import React from "react";

type buttonProps = {
  selectedNumbers: Array<any>,
  answerIsCorrect: any,
  checkAnswer: any,
  acceptAnswer: Function,
  reDraw: Function,
  redraws: number
};
const Button = (props: buttonProps) => {
  let button;
  switch (props.answerIsCorrect) {
    case true:
      button = (
        <button className="btn btn-success" onClick={props.acceptAnswer}>
          <i className="fa fa-check" />
        </button>
      );
      break;
    case false:
      button = (
        <button className="btn btn-danger">
          <i className="fa fa-times" />
        </button>
      );

      break;
    default:
      button = (
        <button
          className="btn btn-primary"
          onClick={props.checkAnswer}
          disabled={props.selectedNumbers.length === 0}
        >
          =
        </button>
      );

      break;
  }
  return (
    <div className="col-2 text-center">
      {button}
      <br />
      <br />
      <button
        className="btn btn-warning btn-sm"
        disabled={props.redraws === 0}
        onClick={props.reDraw}
      >
        <i className="fa fa-refresh" /> {props.redraws}
      </button>
    </div>
  );
};

export default Button;
