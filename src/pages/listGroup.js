import React from "react";
import "./listGroup.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const listGroup = () => {
  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        <div className="create-group">
          <Button style={{ marginBottom: "20px" }} variant="outline-primary">
            Create Group
          </Button>{" "}
        </div>
        <Row xs={2} md={4} className="g-4">
          <Col>
            <Card
              className="item-group"
              style={{ padding: "0", borderRadius: "15px", margin: 0 }}
            >
              <Link href="">
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
                  <a style={{ fontWeight: "bolder" }}>Group A</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              className="item-group"
              style={{ padding: "0", borderRadius: "15px", margin: 0 }}
            >
              <Link href="">
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
                  <a style={{ fontWeight: "bolder" }}>Group A</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              className="item-group"
              style={{ padding: "0", borderRadius: "15px", margin: 0 }}
            >
              <Link href="">
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
                  <a style={{ fontWeight: "bolder" }}>Group A</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              className="item-group"
              style={{ padding: "0", borderRadius: "15px", margin: 0 }}
            >
              <Link href="">
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
                  <a style={{ fontWeight: "bolder" }}>Group A</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default listGroup;
