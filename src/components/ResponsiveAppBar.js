import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router";
import { Dropdown } from "react-bootstrap";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
  };
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        className="bg-color navbar navbar-expand-lg d-flex justify-content-between px-5"
      >
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => navigate("/")}
          >
            KAHOOT
          </Typography>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className="text-center"
          >
            <Button
              onClick={() => navigate("/")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Groups
            </Button>
            <Button
              onClick={() => navigate("/presentation")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Presentation
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              About us
            </Button>
          </Box>
        </Toolbar>
        <Dropdown>
          <Dropdown.Toggle variant="light">
            {user ? user.user.username : null}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate("/profile")}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleLogout()}
              href="/login?redirect="
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
