import React from "react";
import img from "../images.png";

function GroupDetailRight(props) {
  return (
    <div className="container bg-white py-3">
      <div className="text-center">
        <img
          src={img}
          className="rounded"
          style={{ height: "100px" }}
          alt="Cinque Terre"
        />
      </div>
      <h4 className="text-center my-3">{props.name}</h4>
      <hr />
      <input type="text" class="form-control" value={props.link}></input>
      <hr />
    </div>
  );
}

export default GroupDetailRight;
