import React from "react";
import CardList from "./CardList/CardList";
import Form from "./Form/Form";

type CardState = {
  cards: Array<[]>
};

class CardContainer extends React.Component<any, CardState> {
  state = {
    cards: []
  };

  addNewCard = (cardInfo:any) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

export default CardContainer;
