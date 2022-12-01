import React from "react";
import "../styles/CreateGroup.module.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const CardGroup = (props) => {
  return (
    <>
      <Card
        className="item-group"
        style={{ padding: "0", borderRadius: "15px", margin: 0 }}
        onClick={console.log(props)}
      >
        <Link>
          <Card.Img
            variant="top"
            src="https://i1-thethao.vnecdn.net/2022/11/20/ronaldo-messi-jpeg-2695-1668938162.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=Lv4T90hu_MaLuArTfZH4sA"
            style={{
              width: "100%",
              height: "14rem",
              cursor: "pointer",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          />
        </Link>
        <Card.Body>
          <div className="name-group" style={{ cursor: "pointer" }}>
            <a style={{ fontWeight: "bolder" }}>{props.nameGroup}</a>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardGroup;
