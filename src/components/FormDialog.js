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
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import axios from "axios";

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
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

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
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
}

export default function FormDialog(props) {
  const { open, handleCloseParent, formData } = props;
  const [isSnackOpen, setSnackOpen] = React.useState(false);
  const [form, setFormData] = React.useState(formData);
  const [snackbarVariant, setSnackbarVariant] = React.useState("");
  const [snackbarMsg, setSnackbarMsg] = React.useState("");
  const [formURL, setFormURL] = React.useState("");
  const [title, setTitle] = React.useState("");
  const FormToDisplay = props.form;
  const classes = useStyles1();
  console.log("dialog rerendering");
  // if (props.form == "category") FormToDisplay = CategoryForm;
  // else if (props.form == "additem") FormToDisplay = ItemForm;
  // else (props.form == "addstock") FormToDisplay = CategoryForm;

  React.useEffect(() => {
    setFormData(props.formData);
  }, [props.formData]);

  const handleClose = () => {
    handleCloseParent();
    console.log("Closing dialog");
    setFormData({});
  };
  const handleForm = e => {
    setFormData({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleSubmit = () => {
    console.log(form);
    axios
      .post(formURL, form)
      .then(res => {
        console.log(res.data);
        setSnackbarVariant("success");
        setSnackbarMsg(res.data.success);
        setSnackOpen(true);
        handleClose();
      })
      .catch(err => {
        console.log(err);
        setSnackbarVariant("error");
        if (err.response) {
          if (err.response.data.error.substr(0, 6) === "E11000")
            setSnackbarMsg("Already exists !");
          else setSnackbarMsg(err.response.data.error);
          setSnackOpen(true);
        } else {
          setSnackbarMsg("Network error!");
          setSnackOpen(true);
        }
      });
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <div>
      <Dialog
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <FormToDisplay
            handleForm={handleForm}
            setFormURL={setFormURL}
            setTitle={setTitle}
            form={form || formData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
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
        onClose={handleSnackClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={snackbarVariant}
          message={snackbarMsg}
        />
      </Snackbar>
    </div>
  );
}
