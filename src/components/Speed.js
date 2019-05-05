import React from "react";

export default props => {
  let wpm = 0;
  if (props.symbols !== 0 && props.sec !== 0) {
    const correct = props.symbols / 5;
    const secs = props.sec / 60;
    wpm = correct / secs;
  }
  return <div>{Math.round(wpm)} wpm</div>;

  return null;
};
