import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
  };
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between px-5">
          <a className="navbar-brand" onClick={() => navigate("/")}>
            KAMEYOKO
          </a>
          <Dropdown>
            <Dropdown.Toggle variant="info">
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
        </nav>
      </div>
    </>
  );
}

export default Navbar;
