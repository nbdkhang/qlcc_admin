import React, { useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "../../../component/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";

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
  },root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },myButton:{
      float: "right"
   }
 
  }));
export default function ChangeProfile(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.user.token);
  const {data,handleOpenLoading,handleCloseLoading,handleOpenSnackBar,setReload,reload}=props
  const [alertName, setAlertName] = useState(false);
  const [alertDescription, setAlertDescription] = useState(false);
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  const checkName = (name) => { 
    setName(name);
    if (name !== "") {
      setAlertName(false);
      return true;
    } else {
      setAlertName(true);
      return false;
    }
  };
  
  const checkDescription = (value) => {  
     setDescription(value);
    if (value !== "") {
      setAlertDescription(false);
      return true;
    } else {
      setAlertDescription(true);
      return false;
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmit = async () => {
    handleClose()
    handleOpenLoading()
    if (await checkName(name) && await checkDescription(description)) {
      const body = {
        service_id: data._id,
        name: name,
        description:description
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/service/update`,
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
          const result = await res.json();
          console.log("success");
          console.log(result);
          handleCloseLoading()
          handleOpenSnackBar(true)
          setReload(!reload)
        } else {console.log("SOMETHING WENT WRONG")
        handleCloseLoading()
        handleOpenSnackBar(false)};
      } catch (err) {
        console.log(err);
        handleCloseLoading()
    handleOpenSnackBar(false)
      }
    } else {
      handleCloseLoading()
      handleOpenSnackBar(false)
    }
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {/* <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thông tin cá nhân</h4>
            </CardHeader> */}
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="name"
                label="Tên địa điểm"
                //style={{ margin: 8 }}       
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={name}
                onChange={(e) => checkName(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
                {alertName && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
            <GridItem xs={12} sm={12} md={9}>
            <TextField
                id="description"
                label="Mô tả"
                multiline
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={description}
                onChange={(e) => checkDescription(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
                {alertDescription && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
           
          </GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          <Button className={classes.myButton} color="primary"  onClick={(e) => handleClickOpen()}>
            Lưu lại
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
                  Xác nhận chỉnh sửa
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={(e) => handleSubmit(e)} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
