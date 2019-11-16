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
    URL: "/stock",
    title: "Add new stock",
    sButton: "Add",
    method: "post"
  };

  const { handleForm, setDialog, classes } = props;
  setDialog(formAtt);

  return (
    <Context.Consumer>
      {({ categories }) => (
        <form>
          <TextField
            disabled
            value={props.form.name}
            autoComplete="off"
            onChange={handleForm}
            autoFocus
            margin="dense"
            name="itemId"
            label="Item"
            type="text"
            fullWidth
          />
          <div className={classes.inlineInput}>
            <TextField
              className={classes.inlineFields}
              autoComplete="off"
              onChange={handleForm}
              margin="dense"
              name="price"
              label="Amount"
              type="number"
            />
            <TextField
              className={classes.inlineFields}
              autoComplete="off"
              onChange={handleForm}
              margin="dense"
              name="quantity"
              label="Quantity"
              type="number"
            />
          </div>

          {/* <TextField
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
          /> */}
        </form>
      )}
    </Context.Consumer>
  );
});
