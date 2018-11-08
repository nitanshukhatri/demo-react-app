import React from "react";

const Star = (props: any) => {
  const numberOfStars = [...Array(props.numberOfStars).keys()];
  let stars = [];
  for (let star of numberOfStars) {
    stars.push(<i key={star} className="fa fa-star" />);
  }
  return <div className="col-5">{stars}</div>;
};

export default Star;
