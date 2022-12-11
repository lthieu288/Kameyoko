import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
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
import Swal from "sweetalert2";
import { AccountCircle, Edit } from "@mui/icons-material";
import { format } from "date-fns";
import Navbar from "../components/ResponsiveAppBar";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDetailGroup,
  getListMember,
  assignRole,
} from "../services/GroupService";

function GroupDetail() {
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState();
  const [member, setMember] = useState(null);
  const [render, setRender] = useState(false);
  const id = useParams();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!localStorage.getItem("currentUser")) {
      navigate("/login?redirect=group/" + id.id);
    }
    getDetailGroup(userInfo?.token, id?.id).then((res) => {
      setGroupData(res.group_data);
    });
    getListMember(userInfo?.token, id?.id).then((res) => {
      setMember(res.groups_data);
    });
  }, [render]);

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
                <h4 className="text-center my-3">name</h4>
                <hr />
                <input type="text" class="form-control" value="link"></input>
                <hr />
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
                            <button
                              type="button"
                              class="btn "
                              onClick={() => handleShowEdit(row)}
                              title="Edit presentation"
                            >
                              <Edit></Edit>
                            </button>
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
