import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Dropdown } from "react-bootstrap";
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
  TextField,
  InputAdornment,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Swal from "sweetalert2";
import { AccountCircle, MoreHoriz, GroupAdd } from "@mui/icons-material";
import { format } from "date-fns";
import Navbar from "../components/ResponsiveAppBar";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDetailGroup,
  getListMember,
  assignRole,
  sendEmail,
  kickOff,
} from "../services/GroupService";
import {getGroupsJoinedGroup, getGroupsManage} from "../services/auth";

function GroupDetail() {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState();
  const [member, setMember] = useState(null);
  const [render, setRender] = useState(false);
  const [email, setEmail] = useState("");
  const [groupPresInfo,setGroupPresInfo] = useState()
  const id = useParams();
  const host = "https://kameyoko-lime.vercel.app";
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const [link, setLink] = useState(host);

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=group/" + id.id);
    }
    getDetailGroup(userInfo?.token, id?.id).then((res) => {
      setGroupData(res.group_data);
      setLink(host + "/join-group/" + res.group_data?.id);
    });
    getGroupsManage(userInfo?.token).then((data)=>{
      let obj = null;
      for (let i = 0; i < data.groups_data?.length; i++) {
        obj = data.groups_data[i];
        if(obj.id.toString() === id?.id.toString()){
          if(obj.group_pres_info !== undefined){
            console.log(obj.group_pres_info)
            setGroupPresInfo(obj.group_pres_info)
          }
        }
      }
    });
    getGroupsJoinedGroup(userInfo?.token).then((data)=>{
      let obj = null;
      for (let i = 0; i < data?.groups_data?.length; i++) {
        obj = data.groups_data[i].group;
        if(obj.id.toString() === id?.id.toString()){
          if(obj.group_pres_info !== undefined){
            setGroupPresInfo(obj.group_pres_info)
          }
        }
      }
    });
    getListMember(userInfo?.token, id?.id).then((res) => {
      setMember(res.groups_data);
    });
  }, [render,]);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleSendEmail = () => {
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Email is invalid",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      sendEmail(userInfo?.token, id?.id, email, link).then((res) => {
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
          setEmail("");
        } else {
          Swal.fire({
            icon: "error",
            title: "Fail to send email",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    }
  };

  const handleShowEdit = (e) => {
    if (userInfo.user.id === groupData.owner.id) {
      if (e.role !== "owner") {
        const role = e.role === "member" ? "co-owner" : "member";
        const roleId = e.role === "member" ? 2 : 3;
        Swal.fire({
          title: "Assign " + e.user_id.username + " to " + role + "?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Assign",
        }).then(async (result) => {
          if (result.isConfirmed) {
            assignRole(userInfo.token, id.id, e.user_id.id, roleId).then(
              (res) => {
                if (res.status === 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Assign successfully",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                  setRender(!render);
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Can't assign role",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                }
              }
            );
          }
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "You are owner already",
        });
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "You don't have permission",
      });
    }
  };

  const handleKickOff = (row) => {
    if (userInfo.user.id === groupData.owner.id) {
      Swal.fire({
        title: "Delete " + row.user_id.username + " this group?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Delete",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (row.role !== "owner") {
            kickOff(userInfo.token, id.id, row.user_id.id).then((res) => {
              if (res.status === 200) {
                Swal.fire({
                  icon: "success",
                  title: "Delete successfully",
                  showConfirmButton: false,
                  timer: 1000,
                });
                setRender(!render);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Can't delete role",
                  showConfirmButton: false,
                  timer: 1000,
                });
              }
            });
          } else {
            Swal.fire({
              icon: "info",
              title: "Can't delete owner group",
            });
          }
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "You don't have permission",
      });
    }
  };
  return (
    <>
      <Navbar username={userInfo?.user ? userInfo.user.username : null} />
      <div className="gradient-custom-3">
        <div className="container py-5">
          <div style={{ minHeight: "100vh" }}>
            <div
              className="row d-flex justify-content-center"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-3 bg-white py-3">
                <div className="text-center">
                  <img
                    src="https://cdn.memiah.co.uk/blog/wp-content/uploads/counselling-directory.org.uk/2019/04/shutterstock_1464234134-1024x684.jpg"
                    className="rounded"
                    style={{ height: "100px" }}
                    alt="Cinque Terre"
                  />
                </div>
                <h4 className="text-center my-3">{groupData?.name}</h4>
                <hr />
                <TextField
                  value={link}
                  label="Join group via link"
                  type="text"
                  className="form-control form-control-lg"
                />
                <hr />
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abc@gmail.com"
                  label="Invite via email"
                  type="email"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <GroupAdd
                          style={{ cursor: "pointer" }}
                          onClick={handleSendEmail}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
                {
                  groupPresInfo !== undefined ?
                      <>
                        <hr />
                        <TextField
                            placeholder="abc@gmail.com"
                            label="Slide is being shown"
                            value={groupPresInfo.pres_id}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                  <ArrowForwardIosIcon position="start" onClick={()=> {navigate("/presentation/group/" + id.id +"/"+groupPresInfo.pres_id)}}>
                                  </ArrowForwardIosIcon>
                              ),
                            }}
                        />
                      </>
                      :
                      ""
                }


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
                        <div style={{ marginLeft: "20px" }}>Username</div>
                      </TableCell>
                      <TableCell className="fw-bold fs-5" align="center">
                        Join at
                      </TableCell>
                      <TableCell className="fw-bold fs-5" align="center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(member) ? (
                      member.map((row, index) => (
                        <TableRow key={row.name}>
                          <TableCell align="center" id="row-table">
                            {index + 1}
                          </TableCell>
                          <TableCell
                            align="left"
                            id="row-table"
                            style={{ cursor: "pointer" }}
                          >
                            <ListItem>
                              <ListItemAvatar>
                                <AccountCircle fontSize="large"></AccountCircle>
                              </ListItemAvatar>
                              <ListItemText
                                primary={row.user_id.username}
                                secondary={row.role}
                              />
                            </ListItem>
                          </TableCell>
                          <TableCell align="center" id="row-table">
                            {format(new Date(row?.joined_at), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell align="center" id="row-table">
                            <Dropdown>
                              <Dropdown.Toggle variant="light">
                                <MoreHoriz></MoreHoriz>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => handleShowEdit(row)}
                                >
                                  Assign role
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => handleKickOff(row)}
                                >
                                  Kick off
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <p className="text-center p-3">No Data</p>
                    )}
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

export default GroupDetail;
