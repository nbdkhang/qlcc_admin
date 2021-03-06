import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
import Button from "../../component/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
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
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  alerts: {
    marginTop: "18px",
  },
  myButton:{
    float: "right"
 }

}));
export default function AddAdmin() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
  const [isHandle,setIsHandle]=useState(false);
  //   const [content, setContent] = useState("");
  //   const userInfo = useSelector((state) => state.user.info);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const token = useSelector((state) => state.user.token);
  const [alertName, setAlertName] = useState(false);
  const [alertPhone, setAlertPhone] = useState(false);
  const [alertEmail, setAlertEmail] = useState(false);
  const [alertUsername, setAlertUsername] = useState(false);
  const [alertPassword, setAlertPassword] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);


  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
 

  
  const checkName = (name) => {
    if (name !== "") {
      setAlertName(false);
      setName(name);
      return true;
    } else {
      setAlertName(true);
      return false;
    }
  };
  const checkPhone = (phone) => {
    if (phone !== "" && phone.match(phoneCheck)) {
      setAlertPhone(false);
      setPhone(phone);
      return true;
    } else {
      setAlertPhone(true);
      return false;
    }
  };
  const checkEmail = (email) => {
    setEmail(email);
    if (email !== "" && email.match(emailCheck)) {
      setAlertEmail(false);
      return true;
    } else {
      setAlertEmail(true);
      return false;
    }
  };
  const checkUsername = (value) => { 
    setUsername(value);
    if (value !== "" && value.match(nameCheck)) {
      setAlertUsername(false);
      return true;
    } else {
      setAlertUsername(true);
      return false;
    }
  };
  const checkPassword = (value) => { 
     setPassword(value);
     checkconfirm(confirm,value)
    if (value !== "") {
      setAlertPassword(false);
      return true;
    } else {
      setAlertPassword(true);
      return false;
    }
  };
  const checkconfirm = (value,password) => {
    setConfirm(value);
    if (value !== "" && value===password) {
      setAlertConfirm(false);
      return true;
    } else {
      setAlertConfirm(true);
      return false;
    }
  };
  
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenSnackBar = (type) => {
    if (type) setSnackType(true);
    else setSnackType(false);
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };
 const handleOpenLoading=()=>{
    setIsHandle(true);
  }
  const handleCloseLoading=()=>{
    setIsHandle(false);
  }

  const handleSubmit = async () => {
    handleClose()
    handleOpenLoading()
    if (
      checkName(name) &&
      checkPhone(phone) &&
      checkEmail(email) &&
      checkUsername(username) &&
      checkPassword(password)&&
      checkconfirm(confirm,password)
    ) {
      const body = {
        name: name,
        phone: phone,
        email: email,
        username: username,
        password: password,
        role:1
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/auth/add`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (res.status === 200) {
          const result = await res.json();
          console.log("success");
          console.log(result);
          handleCloseLoading()
        handleOpenSnackBar(true);
        }  else {
          console.log("SOMETHING WENT WRONG")
        handleCloseLoading()
        handleOpenSnackBar(false);};
      } catch (err) {
        console.log(err);
        handleCloseLoading()
        handleOpenSnackBar(false);
      }
    } else {
      handleCloseLoading()
      handleOpenSnackBar(false);
    }
    
  };

  return (
    <div>
      <LoadingOverlay active={isHandle} spinner text="??ang x??? l?? vui l??ng ch???...">
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="name"
                  label="H??? v?? t??n"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => checkName(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertName && (
                  <Alert className={classes.alerts} severity="error">
                    T??n kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>
              <GridContainer />
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="email"
                  label="Email"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={email}
                  onChange={(e) => checkEmail(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertEmail && (
                  <Alert className={classes.alerts} severity="error">
                    Email kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="phone"
                  label="S??? ??i??n tho???i"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  type="number"
                  variant="outlined"
                  onChange={(e) => checkPhone(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertPhone && (
                  <Alert severity="error" className={classes.alerts}>
                    S??? ??i???n tho???i kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="username"
                  label="T??n ????ng nh???p"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  //defaultValue={cmnd}
                  onChange={(e) => checkUsername(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertUsername && (
                  <Alert className={classes.alerts} severity="error">
                    T??n kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="pass"
                  label="M???t kh???u"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  type="password"
                  onChange={(e) => checkPassword(e.target.value)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertPassword && (
                  <Alert className={classes.alerts} severity="error">
                    Kh??ng h???p l???
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="confirm"
                  label="Nh???p l???i m???t kh???u"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  type="password"
                  onChange={(e) => checkconfirm(e.target.value,password)}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertConfirm && (
                  <Alert className={classes.alerts} severity="error">
                   Kh??ng tr??ng kh???p m???t kh???u
                  </Alert>
                )}
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
             
            
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <Button className={classes.myButton} color="primary" onClick={(e) => handleClickOpen()}>
                  L??u l???i
                </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
                  X??c nh???n t???o t??i kho???n
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            H???y
          </Button>
          <Button onClick={(e) => handleSubmit()} color="primary">
            X??c nh???n
          </Button>
        </DialogActions>
      </Dialog>
      </LoadingOverlay>
     
		
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>

    </div>
  );
}
