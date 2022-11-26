import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import img from "../images.png";

function GroupDetailLeft() {
  return (
    <div className="container bg-white py-3">
      <div className="text-center">
        <img
          src={img}
          className="rounded"
          style={{ height: "100px" }}
          alt="Cinque Terre"
        />
      </div>
      <h4 className="text-center my-3">Group Name</h4>
      <div className="form-outline d-flex">
        <TextField
          label="Fullname"
          variant="outlined"
          className="form-control"
          size="small"
        />
        <Button variant="contained" className="mx-1" size="small">
          <SearchIcon> </SearchIcon>
        </Button>
      </div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </div>
  );
}

export default GroupDetailLeft;
