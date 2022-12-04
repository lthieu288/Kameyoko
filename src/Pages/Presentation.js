import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";
import AddIcon from "@mui/icons-material/Add";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Frozen yoghurt", "me", "about 2 hours ago", "about 2 hours ago"),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Presentation() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("currentUser"));
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=presentation");
    }
  }, [userInfo]);

  return (
    <>
      <Navbar username={userInfo ? userInfo.user.username : null} />
      <div className="App">
        <div className="container my-5">
          <div className="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-primary"
              onClick={handleShowCreate}
            >
              <AddIcon></AddIcon>
              New presentation
            </button>

            <Modal show={showCreate} onHide={handleCloseCreate}>
              <Modal.Header closeButton>
                <Modal.Title>Create new presentation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TextField
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
                  onClick={handleCloseCreate}
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
            <div className="form-outline d-flex">
              <TextField
                label="Search"
                variant="outlined"
                className="form-control"
                size="small"
              />
              <Button variant="contained" className="mx-1" size="small">
                <SearchIcon> </SearchIcon>
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold fs-5" align="left">
                      Name
                    </TableCell>
                    <TableCell className="fw-bold fs-5" align="left">
                      Owner
                    </TableCell>
                    <TableCell className="fw-bold fs-5" align="left">
                      Modified
                    </TableCell>
                    <TableCell className="fw-bold fs-5" align="left">
                      Created
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell
                        className="pointer"
                        component="th"
                        scope="row"
                        id="row-table"
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <PlayCircleOutlineIcon fontSize="large"></PlayCircleOutlineIcon>
                          </ListItemAvatar>
                          <ListItemText
                            primary={row.name}
                            secondary={row.protein}
                          />
                        </ListItem>
                      </TableCell>
                      <TableCell align="left" id="row-table">
                        {row.calories}
                      </TableCell>
                      <TableCell align="left" id="row-table">
                        {row.fat}
                      </TableCell>
                      <TableCell align="left" id="row-table">
                        {row.carbs}
                      </TableCell>
                      <TableCell align="left" id="row-table">
                        <button
                          type="button"
                          class="btn btn-light"
                          onClick={handleShowEdit}
                        >
                          <EditIcon></EditIcon>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Modal show={showEdit} onHide={handleCloseEdit}>
              <Modal.Header closeButton>
                <Modal.Title>Rename presentation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TextField
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
                  onClick={handleCloseEdit}
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
      <Footer />
    </>
  );
}

export default Presentation;
