import React, {useEffect, useState} from "react";
import CardGroup from "../components/CardGroup"
import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {getGroups} from "../services/auth";

function Homepage(props) {

    const [groups, setGroups] = useState([])
    useEffect(() => {
        getGroups(props.token).then((data) => {
            setGroups(data.groups_data)
        });
    }, [props]);

    console.log(groups)

    return (
        <>
            <Container style={{marginTop: "20px", minHeight: "40rem", marginBottom: "50px"}}>
                <div className="create-group">
                    <Button style={{marginBottom: "20px"}} variant="outline-primary">
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
                            <CardGroup nameGroup={data.name} idGroup={data.id} link={data.link}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Homepage;
