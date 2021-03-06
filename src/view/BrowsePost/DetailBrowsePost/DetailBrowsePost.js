import React, { useState, useEffect } from "react";  //78
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";
import Card from "../../../component/Card/Card.js";
//import CardAvatar from "../../../component/Card/CardAvatar.js";
import SlideShow from "../../../component/SlideShow/SlideShow.js"
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useParams, useHistory } from "react-router-dom";
import { handleData, title, content } from "./ServiceDetailBrowsePost.js";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
import PushNotiAdmin from "../../PushNotiAdmin.js"
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
  myButton:{
    float: "right",
    width:"200px"
  }
}));
export default function DetailRequestSelfRepair() {
  //const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const [data, setData] = useState({
  
  });
  const {PushNotificationAdmin}=PushNotiAdmin()
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [reason, setReason] = useState();
  const [reload, setReload] = useState(false);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);

  const [selected, setSelected] = useState(true); // true:ch???p nh???n|| false:kh??ng ch???p nh???n
  //   const token = useSelector((state) => state.user.token);
  const [isHandle, setIsHandle] = useState(false);

  const handleChangeStatus = async (status) => {
    handleClose();
    handleClose1();
    handleOpenLoading()
    let body = {};
    let url = ``;
    try { 
       //chap nh???n
      if (status === 1) {
      
        body = {
          post_id: data._id,
        };
        url=process.env.REACT_APP_API_LINK + `/api/post/confirm-post`
      }
      // khong chap nhan
      if (status === 2) {
        body = {
          post_id: data._id,
          reason: reason,
        };
        url=process.env.REACT_APP_API_LINK + `/api/post/reject-post`
      }

      console.log(body);
      const res = await fetch(url,
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
        console.log("ok");
        console.log(result.data)
        await PushNotification();
        PushNotificationAdmin()
        setReload(!reload);
        handleOpenSnackBar(true)
        handleCloseLoading()
        //history.push(`/admin/reportbill`);
      } else {
        console.log("SOMETHING WENT WRONG");
        
        handleOpenSnackBar(false)
        handleCloseLoading()
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
    }
  };
  const PushNotification = async () => {
    try {
      const body = {
        tokens: [data.token_device],
        title: title,
        body: content,
        type: 2,
      };

      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/push-noti/add-notice`,
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
        //const result = await res.json();
        console.log("push noti ok");
        //history.push(`/admin/reportbill`);
      } else {
        console.log("SOMETHING WENT WRONG");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUrl = async (key) => {
    let temp=[];
    if (key.length >= 1) {
      try {
        for (let i=0;i<key.length;i++)
       { const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/uploadv2/image-url?key=${key[i]}`,
          {
            // get apart
            method: "GET",
            headers: {
              Authorization: "Bearer " + `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          const result = await res.json();
          console.log("get url ok");
          temp[i]={value:result.imageUrl};
        } else {
          const result = await res.json();
        console.log(result.message);
       
        }}
        console.log(temp);
        return temp;
      } catch (err) {
        console.log(err);
      
      }
    }else return [""]
    setIsLoad(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const getUser = async (data) => {
    try{
    const res = await fetch(
      process.env.REACT_APP_API_LINK + `/api/user/${data.user_id}`,
      {
        // get apart
        method: "GET",
        headers: {
          Authorization: "Bearer " + `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      const result = await res.json();

      console.log("user ok");
      setData(handleData(data, result.data));
      //setData(result.data);
      setIsLoad(false);
    } else {
      const result = await res.json();
      console.log(result.message);
      handleOpenSnackBar(false)
    }}catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
    }
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
  useEffect(() => {
    const getRes = async () => {
      setIsLoad(true);
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/post/all-post?_id=${id}`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        const result = await res.json();
        console.log("Vo 200OK");
        console.log(result.data[0].images);
        await getUser(result.data[0]);
        if (result.data[0].images!==[])
          setImage(await getUrl(result.data[0].images));

        setIsLoad(false);
      
     
      } else {
        const result = await res.json();
      console.log(result.message);
      handleOpenSnackBar(false)
      
      }
    }catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
     
    }
    };
    getRes();
  }, [reload]);

  return (
    <div> <LoadingOverlay active={isHandle} spinner text="??ang x??? l?? vui l??ng ch???...">
      {!isLoad ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
              <SlideShow  images={image}></SlideShow>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Chi ti???t b??i ????ng</h4>
            </CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="title"
                  label="Ti??u ?????"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                  InputProps={{
                              readOnly: true,
                            }}
                  
                  variant="outlined"
                  defaultValue={data.title || ""}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="content"
                  label="N???i dung"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                  InputProps={{
                              readOnly: true,
                            }}
                  
                  multiline={true}
                  variant="outlined"
                  defaultValue={data.content}
                  //onChange={(e) => setName(e.target.value)}
                />
                 <TextField
                  id="user_name"
                  label="Ng?????i g???i"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                  InputProps={{
                              readOnly: true,
                            }}
                  
                  variant="outlined"
                  defaultValue={data.user_name}
                  //onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="time"
                  label="Th???i gian"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                  InputProps={{
                              readOnly: true,
                            }}
                  
                  variant="outlined"
                  defaultValue={data.time}
                  //onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="contact"
                  label="Li??n h???"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                  InputProps={{
                              readOnly: true,
                            }}
                  
                  variant="outlined"
                  defaultValue={data.contact}
                  //onChange={(e) => setName(e.target.value)}
                />
                
                <TextField
                  id="status"
                  label="Tr???ng th??i hi???n t???i"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                  InputProps={{
                              readOnly: true,
                            }}
                  
                  variant="outlined"
                  defaultValue={data.status_value}
                  //onChange={(e) => setName(e.target.value)}
                ></TextField>
              </GridItem>
            </GridContainer>
          </GridItem>
          <div />
          <GridItem xs={12} sm={12} md={3} />
          
          {data.status === 0 && (
            <GridItem xs={12} sm={12} md={9}>
              <Button
                className={classes.myButton}
                color="primary"
                onClick={(e) => handleClickOpen(true)}
              >
                Ch???p nh???n
              </Button>
              <Button
                className={classes.myButton}
                color="primary"
                onClick={(e) => handleClickOpen1(true)}
              >
                Kh??ng ch???p nh???n
              </Button>
            </GridItem>
          )}
        </GridContainer>
      ) : (
        <div>??ang x??? l??, vui l??ng ch???...</div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          X??c nh???n ch???p nh???n b??i ????ng
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            H???y
          </Button>
          <Button onClick={e=>handleChangeStatus(1)} color="primary">
            X??c nh???n
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          X??c nh???n kh??ng ch???p nh???n b??i ????ng
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="L?? do"
              type="text"
              fullWidth
              onChange={(e) => setReason(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            H???y
          </Button>
          <Button onClick={e=>handleChangeStatus(2)} color="primary">
            X??c nh???n
          </Button>
        </DialogActions>
      </Dialog>

      </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
