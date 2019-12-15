import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import axios from "axios";
import Context from "./dataContext";

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};

const useStyles1 = withStyles(theme => ({
  success: {
    backgroundColor: theme.palette.secondary.main
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  dialog: {
    [theme.breakpoints.down("md")]: {
      height: "100vh"
    }
  }
}));

const MySnackbarContentWrapper = useStyles1(function(props) {
  const { className, message, onClose, variant, classes, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
});

class FormDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSnackOpen: false,
      form: props.formData,
      snackbarVariant: "",
      snackbarMessage: "",
      formURL: "",
      title: "",
      sButton: "",
      method: "",
      handleCloseParent: props.handleCloseParent
    };

    this.handleClose = this.handleClose.bind(this);
    this.setDialog = this.setDialog.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSnackClose = this.handleSnackClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Any time props.formData changes, update state.
    if (nextProps.formData !== this.state.form) {
      this.setState({
        form: nextProps.formData
      });
    }
  }

  handleClose() {
    this.state.handleCloseParent();
    console.log("Closing dialog");
    this.setState({
      form: {}
    });
  }

  setDialog(formAtt) {
    const { URL, title, sButton, method } = formAtt;

    this.setState({
      formURL: URL,
      title,
      sButton,
      method
    });
  }

  handleForm(e) {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
  }

  handleSubmit() {
    const { method, formURL, form } = this.state;
    axios({ method, url: formURL, data: form })
      .then(res => {
        console.log(res.data);
        this.setState({
          snackbarVariant: "success",
          snackbarMessage: res.data.success,
          isSnackOpen: true
        });
        //console.log(this.context);
        this.context.update(true);
        this.handleClose();
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          if (err.response.data.error.substr(0, 6) === "E11000")
            this.setState({
              snackbarVariant: "error",
              snackbarMessage: "Already exists!",
              isSnackOpen: true
            });
          else
            this.setState({
              snackbarVariant: "error",
              snackbarMessage: err.response.data.error,
              isSnackOpen: true
            });
        } else {
          this.setState({
            snackbarVariant: "error",
            snackbarMessage: "Network error!",
            isSnackOpen: true
          });
        }
      });
  }

  handleSnackClose() {
    this.setState({
      isSnackOpen: false
    });
  }

  render() {
    console.log("Dialog rerender");
    console.log(this.state);
    console.log(this.props);
    const FormToDisplay = this.props.form;
    const { classes, open } = this.props;
    const {
      title,
      sButton,
      form,
      snackbarMessage,
      snackbarVariant,
      isSnackOpen
    } = this.state;
    return (
      <>
        <Dialog
          className={classes.dialog}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <FormToDisplay
              handleForm={this.handleForm}
              setDialog={this.setDialog}
              form={form}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              {sButton}
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={isSnackOpen}
          autoHideDuration={2000}
          onClose={this.handleSnackClose}
        >
          <MySnackbarContentWrapper
            variant={snackbarVariant}
            message={snackbarMessage}
          />
        </Snackbar>
      </>
    );
  }
}
FormDialog.contextType = Context;

export default useStyles1(FormDialog);
