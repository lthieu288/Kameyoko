import React from "react";

function Paragraph(props) {
  return (
    <div className="text-center p-5">
      <p>{props.paragraph}</p>
    </div>
  );
}

export default Paragraph;
