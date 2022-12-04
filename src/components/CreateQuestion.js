import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";

function CreateQuestion() {
  const [numberOption, setNumberOption] = useState(3);

  function renderOption() {
    for (var i = 0; i < numberOption; i++) {}
  }

  return (
    <div
      className="bg-white p-3"
      style={{ borderRadius: "10px", minHeight: "100vh" }}
    >
      <div class="list-group">
        <h6 className="fw-bold mb-3">Slide type</h6>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Popular question type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Popular question type"
          >
            <MenuItem value={1}>Multiple choice</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="my-3">
        <h6 className="fw-bold">Question</h6>
        <TextField
          label="Your question"
          variant="outlined"
          className="form-control"
          size="medium"
        />
      </div>
      <div className="my-3">
        <h6 className="fw-bold">Options</h6>
        {new Array(numberOption).fill(0).map((_, index) => (
          <div key={index} className="d-flex mb-2">
            <TextField
              label={"Option " + index}
              variant="outlined"
              className="form-control"
              size="small"
            />
            <button
              style={{ border: "none", backgroundColor: "white" }}
              type="button"
              onClick={() => {
                setNumberOption(numberOption - 1);
              }}
            >
              <DeleteIcon className=""></DeleteIcon>
            </button>
          </div>
        ))}
      </div>
      <div class="d-grid gap-2">
        <button
          class="btn btn-secondary"
          type="button"
          onClick={() => {
            setNumberOption(numberOption + 1);
          }}
        >
          <AddIcon></AddIcon>
          Add option
        </button>
      </div>
    </div>
  );
}

export default CreateQuestion;
