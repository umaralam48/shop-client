import React from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Item from "./item";
import UpdateForm from "./updateForm";
import FormDialog from "./FormDialog";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = withStyles(theme => ({
  root: {
    margin: "auto",
    overflowX: "auto"
  }
}));

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      item: {}
    };
    this.handleDialog = this.handleDialog.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleDialog(item) {
    this.setState({ item: item, dialogOpen: true });
    console.log(this.state.item);
  }

  handleDialogClose() {
    this.setState({
      dialogOpen: false,
      item: {}
    });
  }
  render() {
    console.log("items rerendering");
    console.log(this.state.item);
    const { classes } = this.props;
    let items =
      this.props.items.length > 0 ? (
        this.props.items.map(item => (
          <Item key={item._id} item={item} handleDialog={this.handleDialog} />
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5}>No such item exists</TableCell>
        </TableRow>
      );
    return (
      <Paper className={classes.root}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Container Size</StyledTableCell>
              <StyledTableCell>Wholesale Rate</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{items}</TableBody>
        </Table>
        <FormDialog
          open={this.state.dialogOpen}
          handleCloseParent={this.handleDialogClose}
          form={UpdateForm}
          formData={this.state.item}
        />
      </Paper>
    );
  }
}

export default useStyles(Items);
