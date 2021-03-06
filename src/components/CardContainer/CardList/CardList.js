import React from "react";
import Card from "../Card/card";

const CardList = (props: any) => {
  return (
    <div>
      {props.cards.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardList;
