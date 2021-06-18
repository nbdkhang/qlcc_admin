import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../../component/Grid/GridItem.js";
import GridContainer from "../../../../component/Grid/GridContainer.js";
import Button from "../../../../component/CustomButtons/Button.js";
import { directionList, typeList } from "./ServiceEditApart.js";
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../../../component/SnackBar/Snackbar.js";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  alerts: {
    marginTop: "18px",
  },
  myButton: {
    float: "right",
  },
}));
export default function EditApart(props) {
  const classes = useStyles();
  // const [blockList, setBlockList] = useState([]);
  const nameCheck = /^[a-zA-Z0-9]+$/;
  const phoneCheck = /^[0-9]+$/;
  const token = useSelector((state) => state.user.token);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackType, setSnackType] = useState(true);
  const [open, setOpen] = useState(false);
  const { data, isLoad, blockList,setIsHandle } = props;
  const [alertBlock, setAlertBlock] = useState(false);
  const [alertDirection, setAlertDirection] = useState(false);

  const [block, setBlock] = useState(data.block);
  const [direction, setDirection] = useState(data.direction);

  
  const checkBlock = (block) => {
    if (block !== "") {
      setAlertBlock(false);
      setBlock(block);
      return true;
    } else {
      setAlertBlock(true);
      return false;
    }
  };
 
  const checkDirection = (direction) => {
    if (direction !== "") {
      console.log(direction);
      setAlertDirection(false);
      setDirection(direction);
      return true;
    } else {
      setAlertDirection(true);
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

  const editApart = async () => {
    handleClose();
    setIsHandle(true);
    if (
     
      checkBlock(block) &&
    
      checkDirection(direction)

    ) {
      const body = {
        apart_id: data._id,    
      };
      console.log(body);

      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/apart/update`,
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

          console.log("edit ok");
          console.log(result);
          setIsHandle(false);
          handleOpenSnackBar(true);
        } else {
         console.log("SOMETHING WENT WRONG");
         setIsHandle(false);
         handleOpenSnackBar(false);
          }
      } catch (err) {
        console.log(err); 
        setIsHandle(false);
        handleOpenSnackBar(false);
       
      }
    }
  };

  return (
    <div>
    
      {!isLoad && (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>

              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Tòa nhà"
                  margin="normal"
                  defaultValue={data.block}
                  onChange={(e) => checkBlock(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {blockList.map((option) => (
                    <option key={option.id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertBlock && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>

              <GridItem xs={12} sm={12} md={9}>
                <TextField
                  id="direction"
                  select
                  label="Hướng căn hộ"
                  margin="normal"
                  defaultValue={data.direction}
                  onChange={(e) => checkDirection(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  variant="outlined"
                >
                  {directionList.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </TextField>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                {alertDirection && (
                  <Alert className={classes.alerts} severity="error">
                    Không hợp lệ
                  </Alert>
                )}
              </GridItem>
     
            </GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <Button
                className={classes.myButton}
                color="primary"
                onClick={e=>handleClickOpen()}
              >
                Lưu lại
              </Button>
            </GridItem>
          </GridItem>
         
          <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>

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
          <Button onClick={(e) => editApart(e)} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
        </GridContainer>
      )}
    </div>
  );
}
