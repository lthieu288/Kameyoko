import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Groups, Person, Add } from "@mui/icons-material";
import { getGroups } from "../services/auth";
import Footer from "../components/Footer";
import Navbar from "../components/ResponsiveAppBar";
import {
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  Paper,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
function Homepage(props) {
  const navigate = useNavigate();
  const [state, setState] = useState(1);
  const [groups, setGroups] = useState([]);
  const [groupOwner, setGroupOwner] = useState([]);
  const [groupJoin, setGroupJoin] = useState([]);
  const [groupRender, setGroupRender] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=");
    }
    getGroups(user?.token).then((data) => {
      setGroupOwner([]);
      setGroupJoin([]);
      setGroupRender([]);
      let obj = null;
      let owner = [];
      let join = [];
      for (var i = 0; i < data.groups_data.length; i++) {
        obj = data.groups_data[i];
        if (data.groups_data[i].role === "owner") {
          owner.push(obj);
        } else {
          join.push(obj);
        }
      }
      setGroupOwner(owner);
      setGroupRender(owner);
      setGroupJoin(join);
    });
  }, [localStorage.getItem("currentUser")]);
  return (
    <>
      <Navbar />
      <div className="gradient-custom-3">
        <div className="container py-5">
          <div style={{ minHeight: "100vh" }}>
            <div
              className="row d-flex justify-content-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-3 bg-white py-3">
                <div class="list-group" id="list-tab" role="tablist">
                  <div
                    class={`list-group-item list-group-item-action ${
                      state === 1 ? "active" : ""
                    }`}
                    id="list-home-list"
                    data-toggle="list"
                    href="#"
                    role="tab"
                    aria-controls="home"
                    onClick={() => {
                      setState(1);
                      setGroupRender(groupOwner);
                    }}
                  >
                    <Groups style={{ marginRight: "10px" }}></Groups> Group I
                    manage
                  </div>
                  <div
                    class={`list-group-item list-group-item-action ${
                      state === 2 ? "active" : ""
                    }`}
                    id="list-profile-list"
                    data-toggle="list"
                    role="tab"
                    aria-controls="profile"
                    onClick={() => {
                      setState(2);
                      setGroupRender(groupJoin);
                    }}
                  >
                    <Person style={{ marginRight: "10px" }}></Person>Group I've
                    joined
                  </div>
                </div>
                <hr />
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    onClick={() => navigate("/create-group")}
                  >
                    <Add style={{ marginRight: "10px" }}></Add>
                    New presentation
                  </button>
                </div>
              </div>
              <TableContainer
                className="col-9 mx-3"
                component={Paper}
                style={{ width: "800px" }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="fw-bold fs-5" align="center">
                        ID
                      </TableCell>
                      <TableCell className="fw-bold fs-5" align="left">
                        Name
                      </TableCell>
                      <TableCell
                        className="fw-bold fs-5"
                        align="center"
                      ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupRender?.map((row, index) => (
                      <TableRow
                        key={index}
                        onClick={() => {
                          navigate("/group/" + row.group.id);
                        }}
                      >
                        <TableCell align="center" id="row-table">
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align="left"
                          id="row-table"
                          style={{ cursor: "pointer" }}
                        >
                          {row?.group.name}
                        </TableCell>
                        <TableCell align="center" id="row-table">
                          <AccountCircle fontSize="large"></AccountCircle>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
