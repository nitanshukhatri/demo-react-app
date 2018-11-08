import React from "react";

import Answer from "../../components/Game/Answer/Answer";
import Button from "../../components/Game/Button/Button";
import Star from "../../components/Game/Star/Star";
import Numbers from "../../components/Game/Numbers/Numbers";
import { range } from "lodash";

type GameState = {
  selectedNumbers: Array<any>,
  randomNumberOfStars: number,
  answerIsCorrect: any,
  usedNumbers: Array<any>,
  redraws: number,
  doneStatus: string
};
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) {
    return true;
  }
  if (arr[0] > n) {
    return false;
  }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length,
    combinationsCount = 1 << listSize;
  for (var i = 1; i < combinationsCount; i++) {
    var combinationSum = 0;
    for (var j = 0; j < listSize; j++) {
      if (i & (1 << j)) {
        combinationSum += arr[j];
      }
    }
    if (n === combinationSum) {
      return true;
    }
  }
  return false;
};

class GameBuilder extends React.Component<any, GameState> {
  static randomNumber = () => Math.floor(Math.random() * 9);
  static initialState = () => ({
    selectedNumbers: [],
    randomNumberOfStars: GameBuilder.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: null
  });
  state = GameBuilder.initialState();

  selectNumber = (clickedNumber: number) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) > 0) {
      return;
    }
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unselectNumber = (clickedNumber: number) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(
        number => number !== clickedNumber
      )
    }));
  };

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect:
        prevState.randomNumberOfStars ===
        prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };

  acceptAnswer = () => {
    this.setState(
      prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        answerIsCorrect: null,
        selectedNumbers: [],
        randomNumberOfStars: GameBuilder.randomNumber()
      }),
      this.updateDoneStatus
    );
  };

  reDraw = () => {
    if (this.state.redraws === 0) {
      return;
    }
    this.setState(
      prevState => ({
        randomNumberOfStars: GameBuilder.randomNumber(),
        answerIsCorrect: null,
        selectedNumbers: [],
        redraws: prevState.redraws - 1
      }),
      this.updateDoneStatus
    );
  };

  possibleSolution = ({ randomNumberOfStars, usedNumbers }) => {
    const possibleNumbers = range(1, 10).filter(
      number => usedNumbers.indexOf(number) === -1
    );

    return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: "Done Nice!" };
      }
      if (prevState.redraws === 0 && !this.possibleSolution(prevState)) {
        return { doneStatus: "Game Over !" };
      }
    });
  };
  resetGame = () => {
    this.setState(GameBuilder.initialState());
  };

  render() {
    const {
      selectedNumbers,
      randomNumberOfStars,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus
    } = this.state;
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <br />
        <div className="row">
          <Star numberOfStars={randomNumberOfStars} />
          <Button
            selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            reDraw={this.reDraw}
            redraws={redraws}
          />
          <Answer
            selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber}
          />
        </div>
        <br />
        {doneStatus ? (
          <div className="text-center">
            <h2>{doneStatus}</h2>
            <button className="btn btn-secondary" onClick={this.resetGame}>
              Play Again
            </button>
          </div>
        ) : (
          <Numbers
            selectedNumbers={selectedNumbers}
            selectNumber={this.selectNumber}
            usedNumbers={usedNumbers}
          />
        )}
      </div>
    );
  }
}

export default GameBuilder;
