import React from "react";

const Preview = props => {
  let text = props.text.replace(/(<([^>]+)>)/gi, "");
  text = text.split("");

  return (
    <div className="border rounded p-3 mb-4">
      {text.map((s, i) => {
        let color;
        if (i < props.userInput.length) {
          color = s === props.userInput[i] ? "#dfffa0" : "#fcbea4";
        }
        return (
          <span key={i} style={{ backgroundColor: color }}>
            {s}
          </span>
        );
      })}
    </div>
  );
};

export default Preview;
