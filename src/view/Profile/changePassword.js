import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import Alert from "@material-ui/lab/Alert";
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
import Button from "../../component/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../component/SnackBar/Snackbar.js";
import LoadingOverlay from "react-loading-overlay";
import PasswordStrengthBar from "react-password-strength-bar";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  myButton:{
    float:"right"
  }
};

const useStyles = makeStyles(styles);

export default function ChangePassword() {
  const classes = useStyles();
  const userInfo = useSelector((state) => state.user.info);
  const token = useSelector((state) => state.user.token);
  const [oldPass, setOldPass] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [alertOld, setAlertOld] = useState(false);
  const [alertPassword, setAlertPassword] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackType, setSnackType] = useState(true);
  const [isHandle, setIsHandle] = useState(false);
  const [open, setOpen] = useState(false);
  const [scorePass,setScorePass]=useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const checkOldPass = (data) => {
    setOldPass(data);
    if (data !== "") {
      setAlertOld(false);
      return true;
    } else {
      setAlertOld(true);

      return false;
    }
  };
  const checkScore =(value)=>{
      setScorePass(value)
      console.log(value>=3);
      checkPassword(password,value)
  }
  const checkPassword = (value,score) => {
    setPassword(value);
    checkConfirm(confirm, value);
    if (value !== "" && score>=3 ) {
      setAlertPassword(false);

      return true;
    } else {
      setAlertPassword(true);
      return false;
    }
  };
  const checkConfirm = (value, password) => {
    setConfirm(value);
    if (value !== "" && value === password) {
      setAlertConfirm(false);
      return true;
    } else {
      setAlertConfirm(true);
      return false;
    }
  };
  const handleOpenSnackBar = (type) => {
    if (type) setSnackType(true);
    else setSnackType(false);
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  const handleOpenLoading = () => {
    setIsHandle(true);
  };
  const handleCloseLoading = () => {
    setIsHandle(false);
  };
  const handleSubmit = async () => {
    handleOpenLoading();
    handleClose();
    console.log();
    if (
      (await checkOldPass(oldPass)) &&
      (await checkPassword(password,scorePass)) &&
      (await checkConfirm(confirm, password))
    ) {
      const body = {
        user_id: userInfo._id,
        new_pass: password,
        old_pass: oldPass,
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/auth/change-pass`,
          {
            method: "PUT",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (res.status === 200) {
          //const result = await res.json();
          console.log("success");
          //console.log(result);
          handleCloseLoading();
          handleOpenSnackBar(true);
          setAlertOld(false);
        } else if (res.status === 400) {
          console.log("400");
          setAlertOld(true);
          handleCloseLoading();
          handleOpenSnackBar(false);
        } else {
          console.log("SOMETHING WENT WRONG");
          handleCloseLoading();
          handleOpenSnackBar(false);
        }
      } catch (err) {
        console.log(err);
        handleCloseLoading();
        handleOpenSnackBar(false);
      }
    } else {
      console.log("else cuoi");
      handleCloseLoading();
      handleOpenSnackBar(false);
    }
  };

  return (
    <div>
      <LoadingOverlay
        active={isHandle}
        spinner
        text="??ang x??? l?? vui l??ng ch???..."
      >
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="old_pass"
                  label="M???t kh???u c??"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  type="password"
                  onChange={(e) => checkOldPass(e.target.value)}
                />
              </GridItem>
              {alertOld && (
                <Alert className={classes.alerts} severity="error">
                  Kh??ng h???p l???
                </Alert>
              )}
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="new_pass"
                  label="M???t kh???u m???i (n??n bao g???m c??? ch???, s??? v?? k?? t??? ?????c bi???t)"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="password"
                  variant="outlined"
                  onChange={(e) => checkPassword(e.target.value,scorePass)}
                />
              </GridItem>
              {alertPassword && (
                <Alert className={classes.alerts} severity="error">
                  Kh??ng h???p l???
                </Alert>
              )}
              <GridItem xs={12} sm={12} md={9}>
                <PasswordStrengthBar password={password} scoreWords={['y???u','y???u','th???p', 't???t', 'm???nh']} 
                shortScoreWord='qu?? ng???n' onChangeScore={score=>checkScore(score)} />
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="phone"
                  label="Nh???p l???i m???t kh???u m???i"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="password"
                  variant="outlined"
                  onChange={(e) => checkConfirm(e.target.value, password)}
                />
              </GridItem>
              {alertConfirm && (
                <Alert className={classes.alerts} severity="error">
                  Kh??ng tr??ng kh???p m???t kh???u
                </Alert>
              )}
            </GridContainer>
            <GridItem xs={12} sm={12} md={9}>
            <Button className={classes.myButton} color="primary" onClick={(e) => handleClickOpen(e)}>
              L??u l???i
            </Button></GridItem>
          </GridItem>
        </GridContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            X??c nh???n ch???nh s???a
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              H???y
            </Button>
            <Button  onClick={(e) => handleSubmit(e)} color="primary">
              X??c nh???n
            </Button>
          </DialogActions>
        </Dialog>
      </LoadingOverlay>
      <Snackbar
        open={openSnackBar}
        type={snackType}
        handleClose={handleCloseSnackBar}
      ></Snackbar>
    </div>
  );
}
