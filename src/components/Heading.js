import React from "react";

function Heading(props) {
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
          <h1>{props?.heading?.heading?.heading}</h1>
          <p style={{marginTop:"15px" , fontSize:"20px" , fontWeight:"lighter"}}>{props?.heading?.heading?.sub_heading}</p>
      </div>
  );
}

export default Heading;
