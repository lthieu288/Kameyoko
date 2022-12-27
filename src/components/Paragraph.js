import React from "react";

function Paragraph(props) {
  return (
      <div
          className="text-center p-5"
          style={{
              height: "500px",
              backgroundColor: "white",
              borderRadius: "10px",
              border: "ridge",
          }}
      >
          <h1>{props?.paragraph?.paragraph?.heading}</h1>
          <span style={{marginTop:"15px"}}>{props?.paragraph?.paragraph?.text}</span>
      </div>
  );
}

export default Paragraph;
