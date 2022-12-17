import React from "react";

function Heading(props) {
  return (
    <div className="text-center p-5">
      <h2>{props.heading}</h2>
    </div>
  );
}

export default Heading;
