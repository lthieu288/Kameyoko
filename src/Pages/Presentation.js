import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/ResponsiveAppBar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  Paper,
  TextField,
  Button,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import {
  Search,
  PlayCircleOutline,
  Edit,
  Add,
  HighlightOff,
} from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import {
  getListPresentation,
  createPresentation,
  deletePresentation,
  editPresentation,
} from "../services/PresentationService";
import Swal from "sweetalert2";

function Presentation() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [render, setRender] = useState(true);
  const [listPresent, setListPresent] = useState([]);
  const [inputRename, setInputRename] = useState("");
  const [inputCreate, setInputCreate] = useState("");
  const [index, setIndex] = useState();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=presentation");
    }
    async function getAPIListPresent() {
      const response = await getListPresentation(userInfo.token);
      setListPresent(response.data.data);
      setRender(true);
    }
    getAPIListPresent();
  }, [render]);

  const handleCloseCreate = async () => {
    const body = {
      token: userInfo.token,
      name: inputCreate,
    };
    const response = await createPresentation(body);
    if (response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Register successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      setRender(false);
    }
    setRender(false);
    setShowCreate(false);
  };
  const handleCloseEdit = async () => {
    const response = await editPresentation(userInfo.token, index, inputRename);
    if (response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Register successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      setRender(false);
    }
    setRender(false);
    setShowEdit(false);
  };
  const handleShowEdit = (e) => {
    setShowEdit(true);
    setIndex(e);
    console.log(e);
  };
  const handleDelete = async (e) => {
    const body = {
      token: userInfo.token,
      id: e,
    };
    Swal.fire({
      title: "Do you want to delete this presentation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deletePresentation(body);
        if (response.status === 204) {
          Swal.fire({
            icon: "success",
            title: "Delete successfully",
            showConfirmButton: false,
            timer: 1000,
          });
          setRender(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Delete fail",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    });
  };

  return (
    <>
      <Navbar username={userInfo ? userInfo.user.username : null} />
      <div className="App gradient-custom-3">
        <div className="container py-3">
          <div
            className="d-flex justify-content-between bg-white p-3"
            style={{ borderRadius: "10px" }}
          >
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                setShowCreate(true);
              }}
            >
              <Add></Add>
              New presentation
            </button>
            <div className="form-outline d-flex">
              <TextField
                label="Search"
                variant="outlined"
                className="form-control"
                size="small"
              />
              <Button variant="contained" className="mx-1" size="small">
                <Search> </Search>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold fs-5" align="center">
                      ID
                    </TableCell>
                    <TableCell className="fw-bold fs-5" align="center">
                      Name
                    </TableCell>
                    <TableCell className="fw-bold fs-5" align="center">
                      Owner
                    </TableCell>
                    <TableCell className="fw-bold fs-5" align="center">
                      Modified
                    </TableCell>
                    <TableCell className="fw-bold fs-5" align="center">
                      Created
                    </TableCell>
                    <TableCell className="fw-bold fs-5" align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(listPresent) ? (
                    listPresent.map((row, index) => (
                      <TableRow key={row.name}>
                        <TableCell align="center" id="row-table">
                          {index + 1}
                        </TableCell>
                        <TableCell
                          className="pointer"
                          component="th"
                          scope="row"
                          id="row-table"
                          align="center"
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <PlayCircleOutline fontSize="large"></PlayCircleOutline>
                            </ListItemAvatar>
                            <ListItemText
                              primary={row.name}
                              secondary={row.protein}
                              onClick={() =>
                                navigate("/presentation/" + row.id)
                              }
                            />
                          </ListItem>
                        </TableCell>
                        <TableCell align="center" id="row-table">
                          {row.owner.id === userInfo.user.id
                            ? "Me"
                            : "Stranger"}
                        </TableCell>
                        <TableCell align="center" id="row-table">
                          {format(
                            new Date(row.modified_at),
                            "kk:mm:ss dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell align="center" id="row-table">
                          {format(
                            new Date(row.created_at),
                            "kk:mm:ss dd/MM/yyyy"
                          )}
                        </TableCell>
                        <TableCell align="center" id="row-table">
                          <button
                            type="button"
                            class="btn "
                            onClick={() => handleShowEdit(row.id)}
                            title="Edit presentation"
                          >
                            <Edit></Edit>
                          </button>
                          <button
                            type="button"
                            class="btn"
                            onClick={() => handleDelete(row.id)}
                            title="Delete presentation"
                          >
                            <HighlightOff></HighlightOff>
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
            <Modal show={showEdit} onHide={() => setShowEdit(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Rename presentation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TextField
                  onChange={(event) => setInputRename(event.target.value)}
                  label="Presentation name"
                  variant="outlined"
                  className="form-control"
                  size="small"
                />
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleCloseEdit}
                >
                  Rename
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <Modal
        show={showCreate}
        onHide={() => {
          setShowCreate(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create new presentation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            onChange={(e) => {
              setInputCreate(e.target.value);
            }}
            label="Presentation name"
            variant="outlined"
            className="form-control"
            size="small"
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={() => {
              setShowCreate(false);
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleCloseCreate}
          >
            Create new presentation
          </button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}

export default Presentation;
