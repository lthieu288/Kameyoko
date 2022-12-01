import React, { useEffect, useState } from "react";
import CardGroup from "../components/CardGroup";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getGroups } from "../services/auth";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import Card from "react-bootstrap/Card";

function Homepage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=");
    }
  }, [localStorage.getItem("currentUser")]);
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getGroups(props.token).then((data) => {
      setGroups(data.groups_data);
    });
  }, [props]);


  return (
    <>
      <Navbar />
      <Container
        style={{ marginTop: "20px", minHeight: "40rem", marginBottom: "50px" }}
      >
        <div className="create-group">
          <Button style={{ marginBottom: "20px" }} variant="outline-primary">
            <Link
              className="nav-link"
              variant="outline-primary"
              to="/create-group"
            >
              Create Group
            </Link>
          </Button>{" "}
        </div>
        <Row xs={2} md={4} className="g-4">
          {groups.map((data) => (
            <Col>
              <Card
                  className="item-group"
                  style={{ padding: "0", borderRadius: "15px", margin: 0 }}
              >
                <Link to={`/groups/${data.id}`}>
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
                    <a style={{ fontWeight: "bolder" }}>{data.name}</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Homepage;
