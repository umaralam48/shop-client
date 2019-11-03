import React from "react";
import Context from "./categoryContext";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export default function itemForm(props) {
  const URL = "/item";
  const title = "Add item";
  const { handleForm, setFormURL, setTitle } = props;

  setFormURL(URL);
  setTitle(title);
  return (
    <Context.Consumer>
      {({ categories }) => (
        <form>
          <TextField
            autoComplete="off"
            onChange={handleForm}
            autoFocus
            margin="dense"
            name="name"
            label="Item"
            type="text"
            fullWidth
          />
          <TextField
            autoComplete="off"
            onChange={handleForm}
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
          />
          <TextField
            select
            defaultValue=""
            autoComplete="off"
            onChange={handleForm}
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
          >
            {categories.map(option => {
              option = option ? option : "";
              return (
                <MenuItem key={option.name} value={option._id}>
                  {option.name}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            autoComplete="off"
            onChange={handleForm}
            margin="dense"
            name="itemUnit"
            label="Unit"
            type="text"
            fullWidth
          />
          <TextField
            autoComplete="off"
            onChange={handleForm}
            margin="dense"
            name="unitSize"
            label="Container Size"
            type="number"
            fullWidth
          />
        </form>
      )}
    </Context.Consumer>
  );
}
