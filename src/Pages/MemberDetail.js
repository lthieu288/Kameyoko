import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import GroupDetailLeft from "../components/GroupDetailLeft";
import GroupMemberDetail from "../components/GroupMemberDetail";
import Navbar from "../components/ResponsiveAppBar";
import { useAuthState } from "../Context";
import request from "../utils/request";
import { useParams, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";

function MemberDetail() {
  const navigate = useNavigate();
  const userDetails = useAuthState();
  const [groupData, setGroupData] = useState(null);
  const [member, setMember] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const { group, id } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=groups/member/" + id.id);
    }
    async function getGroup() {
      await request
        .get("group/" + group + "/general", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("currentUser"))
              .token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setGroupData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    async function getMember() {
      await request
        .get("group/" + group + "/details", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("currentUser"))
              .token,
          },
        })
        .then((res) => {
          setMember(res.data);
          for (var i = 0; i < res.data.groups_data.length; i++) {
            if (res.data.groups_data[i].user_id.id == id) {
              console.log(res.data.groups_data[i].user_id.username);
              setUsername(res.data.groups_data[i].user_id.username);
              setRole(res.data.groups_data[i].role);
              setUserId(res.data.groups_data[i].user_id.id);
              setEmail(res.data.groups_data[i].user_id.email);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getGroup();
    getMember();
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
          <GroupMemberDetail
            username={username ? username : null}
            id={userId}
            email={email}
            role={role}
            idgroup={group}
          />
        </div>
      </Row>
      <Footer />
    </>
  );
}

export default MemberDetail;
