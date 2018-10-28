import React from 'react';
import CardList from './CardList/CardList';
import Form from './Form/Form';

class CardContainer extends React.Component {
  state = {
    cards :[]
  };
  addNewCard =(cardInfo) =>{
  this.setState((prevState) => ({
    cards: prevState.cards.concat(cardInfo)
  }));
  };

  render() {
    return (
     <div>
      <Form onSubmit={this.addNewCard}></Form>
      <CardList cards ={this.state.cards}></CardList>
     </div>
    );
  };
}

export default CardContainer;
