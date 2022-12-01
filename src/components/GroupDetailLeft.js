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
import { useNavigate } from "react-router-dom";

function GroupDetailLeft(props) {
  const navigate = useNavigate();

  function handleClick(e) {
    console.log(e);
    navigate("/groups/member/" + props.id + "/" + e);
  }
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
      <h4 className="text-center my-3">{props.name}</h4>
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
        {props.list.map((user, index) => {
          return (
            <ListItem
              key={user.user_id.id}
              onClick={() => {
                handleClick(user.user_id.id);
              }}
              className="pointer"
            >
              <ListItemAvatar>
                <Avatar></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user.user_id.username}
                secondary={user.role}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default GroupDetailLeft;
