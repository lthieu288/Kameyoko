import React from "react";
import Slide from "./Slide";
import Card from "react-bootstrap/Card";

function SlideName() {
  return (
    <div
      className=" bg-white p-3"
      style={{  borderRadius: "10px", minHeight: "200px" }}
      // style={{ borderRadius: "10px", minHeight: "75vh" }}
    >

      <div className="d-grid gap-2" >
        <Card.Img
            variant="top"
            src="https://i1-thethao.vnecdn.net/2022/11/20/ronaldo-messi-jpeg-2695-1668938162.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=Lv4T90hu_MaLuArTfZH4sA"
            style={{
              width: "100%",
              height: "8rem",
            }}
        />
        <button className="btn btn-primary" type="button">
          Button
        </button>
      </div>
    </div>
  );
}

export default SlideName;
