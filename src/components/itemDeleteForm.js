import React from "react";

import { Typography } from "@material-ui/core";
export default function itemDeleteForm(props) {
  console.log("rendering form");
  console.log(props.form);
  if (props.form) {
    const formAtt = {
      URL: "/item/" + props.form._id,
      title: "Delete item",
      sButton: "Delete",
      method: "delete"
    };
    const { handleForm, setDialog } = props;
    setDialog(formAtt);

    const msg = ` Are you sure you want to delete `;

    return (
      <span>
        <Typography display="inline" variant="h6">
          {msg}
        </Typography>
        <Typography display="inline" variant="h6" color="secondary">
          {props.form.name}
        </Typography>
        &nbsp;?
      </span>
    );
  } else return <></>;
}
