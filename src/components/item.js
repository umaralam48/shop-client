import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import { TableCell, Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { withStyles } from "@material-ui/styles";

const styles = withStyles(theme => ({
  button: {
    margin: "0 5px"
  }
}));

class item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStock = this.handleStock.bind(this);
  }
  handleClick() {
    this.props.handlers.handleUpdate(this.state.item);
  }

  handleDelete(e) {
    e.stopPropagation();
    //console.log("handling delete");

    this.props.handlers.handleDelete(this.state.item);
  }

  handleStock(e) {
    e.stopPropagation();
    //console.log("handling stock");

    this.props.handlers.handleStock(this.state.item);
  }
  render() {
    const { classes } = this.props;
    return (
      <TableRow onClick={this.handleClick}>
        <TableCell>{this.props.item.name}</TableCell>
        <TableCell>{this.props.item.price}</TableCell>
        <TableCell>
          {Number(
            (this.props.item.costPrice / this.props.item.unitSize).toFixed(2)
          ) || "-"}
        </TableCell>
        <TableCell>
          {this.props.item.unitSize + " " + this.props.item.itemUnit || "-"}
        </TableCell>
        <TableCell>{this.props.item.costPrice || "-"}</TableCell>
        <TableCell>
          {new Date(this.props.item.createdAt).toDateString()}
        </TableCell>
        <TableCell>{this.props.item.category.name}</TableCell>
        <TableCell>
          <Fab
            className={classes.button}
            variant="round"
            size="small"
            color="primary"
            onClick={this.handleDelete}
            value={this.props.item._id}
          >
            <DeleteIcon />
          </Fab>
          <Fab
            className={classes.button}
            variant="round"
            size="small"
            color="secondary"
            onClick={this.handleStock}
            value={this.props.item._id}
          >
            <AddShoppingCartIcon />
          </Fab>
        </TableCell>
      </TableRow>
    );
  }
}
export default styles(item);
