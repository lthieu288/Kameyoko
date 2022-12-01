import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import GroupDetailLeft from "../components/GroupDetailLeft";
import GroupDetailRight from "../components/GroupDetailRight";
import Navbar from "../components/navbar/Navbar";
import { useAuthState } from "../Context";
import request from "../utils/request";
import { useParams, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

function GroupDetail() {
  const navigate = useNavigate();
  const userDetails = useAuthState();
  const [groupData, setGroupData] = useState(null);
  const [member, setMember] = useState(null);
  const id = useParams();

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=groups/" + id.id);
    }
    async function getGroup() {
      await request
        .get("group/" + id.id + "/general", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("currentUser"))
              .token,
          },
        })
        .then((res) => {
          setGroupData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    async function getMember() {
      await request
        .get("group/" + id.id + "/details", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("currentUser"))
              .token,
          },
        })
        .then((res) => {
          setMember(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getGroup();
    getMember();
    console.log(groupData);
    console.log(member);
  }, [localStorage.getItem("currentUser")]);

  return (
    <>
      <Navbar username={userDetails.user ? userDetails.user.username : null} />
      <Row className="row App">
        <div className="col-3">
          <GroupDetailLeft
            name={groupData ? groupData.group_data.name : null}
            list={member ? member.groups_data : []}
            id={groupData ? groupData.group_data.id : null}
          />
        </div>
        <div className="col-9">
          <GroupDetailRight
            name={groupData ? groupData.group_data.name : null}
            link={groupData ? groupData.group_data.link : null}
          />
        </div>
      </Row>
      <Footer />
    </>
  );
}

export default GroupDetail;