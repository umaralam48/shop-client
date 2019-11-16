import React from "react";
import Context from "./dataContext";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

const useStyles = withStyles(theme => ({
  inlineInput: {
    display: "flex",
    justifyContent: "space-around"
  },
  inlineFields: {}
}));
export default useStyles(function itemForm(props) {
  const formAtt = {
    URL: "/item/update/" + props.form._id,
    title: "Update item",
    sButton: "Update",
    method: "post"
  };

  const { handleForm, setDialog, classes } = props;
  setDialog(formAtt);

  if (props.form._id) {
    return (
      <Context.Consumer>
        {({ categories }) => (
          <form>
            <TextField
              autoComplete="off"
              value={props.form.name}
              onChange={handleForm}
              autoFocus
              margin="dense"
              name="name"
              label="Item"
              type="text"
              fullWidth
            />
            <div className={classes.inlineInput}>
              <TextField
                className={classes.inlineFields}
                value={props.form.price}
                autoComplete="off"
                onChange={handleForm}
                margin="dense"
                name="price"
                label="Price"
                type="number"
              />
              <TextField
                className={classes.inlineFields}
                value={props.form.size}
                autoComplete="off"
                onChange={handleForm}
                margin="dense"
                name="size"
                label="Size"
                type="number"
              />
            </div>
            <TextField
              select
              defaultValue=""
              autoComplete="off"
              value={props.form.category._id}
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
              value={props.form.itemUnit}
              onChange={handleForm}
              margin="dense"
              name="itemUnit"
              label="Unit"
              type="text"
              fullWidth
            />
            <TextField
              autoComplete="off"
              value={props.form.unitSize}
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
  } else return <></>;
});
