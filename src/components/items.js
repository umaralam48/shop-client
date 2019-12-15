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
import DeleteForm from "./itemDeleteForm";
import StockForm from "./stockForm";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    borderTop: theme.palette.secondary.main,
    borderTopWidth: 2,
    borderTopStyle: "solid"
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
      item: {},
      form: null
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleStock = this.handleStock.bind(this);
  }

  handleUpdate(item) {
    this.setState({ item: item, dialogOpen: true, form: UpdateForm });
    //console.log(this.state.item);
  }

  handleDelete(item) {
    //console.log("handling delete at items");
    this.setState({ item: item, dialogOpen: true, form: DeleteForm });
    //console.log(this.state.item);
  }
  handleDialogClose() {
    this.setState({
      dialogOpen: false,
      item: {}
    });
  }

  handleStock(item) {
    //console.log("handling stock at items");
    this.setState({ item: item, dialogOpen: true, form: StockForm });
  }
  render() {
    //console.log("items rerendering");
    //console.log(this.state.item);
    const { classes } = this.props;
    let items =
      this.props.items.length > 0 ? (
        this.props.items.map(item => (
          <Item
            key={item._id}
            item={item}
            handlers={{
              handleUpdate: this.handleUpdate,
              handleDelete: this.handleDelete,
              handleStock: this.handleStock
            }}
          />
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={5}>No such item exists</TableCell>
        </TableRow>
      );
    return (
      <Paper className={classes.root}>
        <Table stickyHeader={true} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Cost Price</StyledTableCell>
              <StyledTableCell>Container Size</StyledTableCell>
              <StyledTableCell>Wholesale Rate</StyledTableCell>
              <StyledTableCell>Last Stock</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{items}</TableBody>
        </Table>
        <FormDialog
          open={this.state.dialogOpen}
          handleCloseParent={this.handleDialogClose}
          form={this.state.form}
          formData={this.state.item}
        />
      </Paper>
    );
  }
}

export default useStyles(Items);
