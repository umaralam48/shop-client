import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import { TableCell } from "@material-ui/core";

export default class item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.handleDialog(this.state.item);
  }

  render() {
    return (
      <TableRow onClick={this.handleClick}>
        <TableCell>{this.props.item.name}</TableCell>
        <TableCell>{this.props.item.price}</TableCell>
        <TableCell>
          {this.props.item.unitSize + " " + this.props.item.itemUnit || ""}
        </TableCell>
        <TableCell>
          {this.props.item.unitSize * this.props.item.price}
        </TableCell>
        <TableCell>{this.props.item.category.name}</TableCell>
      </TableRow>
    );
  }
}
