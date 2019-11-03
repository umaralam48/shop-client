import React from "react";

import TextField from "@material-ui/core/TextField";
export default function categoryForm(props) {
  const URL = "/category/";
  const title = "Add category";
  const { handleForm, setFormURL, setTitle } = props;
  setFormURL(URL);
  setTitle(title);
  return (
    <TextField
      onChange={handleForm}
      autoFocus
      margin="dense"
      name="name"
      label="Category"
      type="text"
      fullWidth
    />
  );
}
