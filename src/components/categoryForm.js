import React from "react";

import TextField from "@material-ui/core/TextField";
export default function categoryForm(props) {
  const formAtt = {
    URL: "/category/",
    title: "Add category",
    sButton: "Create",
    method: "post"
  };

  const { handleForm, setDialog } = props;
  setDialog(formAtt);

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
