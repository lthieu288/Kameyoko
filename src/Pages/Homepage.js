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

  function handleClick(id) {
    console.log(id);
  }

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
              <CardGroup
                nameGroup={data.name}
                idGroup={data.id}
                link={data.link}
                onClick={handleClick}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Homepage;
