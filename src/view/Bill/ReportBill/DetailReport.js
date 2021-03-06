import React, { useState, useEffect } from "react";
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

import SlideShow from "../../../component/SlideShow/SlideShow.js"
import TextField from "@material-ui/core/TextField";
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useParams, useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';
import PushNotiAdmin from "../../PushNotiAdmin.js"
const useStyles = makeStyles((theme) => ({

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
export default function DetailReport(props) {
  //const dispatch = useDispatch();
  const {PushNotificationAdmin}=PushNotiAdmin()
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const [data, setData] = useState({
    id: "",
    apart_id: "",
    apart_name: "",
    electric_bill: 0,
    water_bill: 0,
    year: 0,
  });
  
  const [image, setImage] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(true);// true:ch???p nh???n|| false:kh??ng ch???p nh???n
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false); 
const [reload,setReload]=useState(true);
const [token_device,setToken_device]=useState("");

  const handleSubmit = async () => {
    handleClose();
    let body = {};
    handleOpenLoading()
    try {
      if (selected)
        body = {
          apart_id: data.apart_id,
          title: "Khi???u n???i ???? ???????c x??? l??",
          content:
            "BQL chung c?? th??ng b??o, khi???u n???i c???a anh/ch??? ???? ???????c gi???i quy???t. ????? ngh??? ki???m tra l???i.",
        };
      else
        body = {
          apart_id: data.apart_id,
          title: "Khi???u n???i kh??ng ???????c x??c nh???n",
          content:
            "BQL chung c?? th??ng b??o, khi???u n???i c???a anh/ch??? ch??a h???p l???. ????? ngh??? li??n h??? BQL ????? gi???i quy???t.",
        };
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/bill-noti/create-confirm`,
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
        console.log("ok");
        if(await handleChangeReport()){
          if (selected) await handleChangeStatus();
            
            setReload(!reload)
            handleCloseLoading()
            PushNotification()
            handleOpenSnackBar(true)
            PushNotificationAdmin()
        }
        else{ handleOpenSnackBar(false)
          handleCloseLoading()}
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
  const handleChangeStatus = async () => {
    try {
      const body = {
        bill_id: data.id,
        status: !data.is_pay,
      };
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/change-pay`,
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
        console.log("ok");
       
        handleOpenSnackBar(true)
        handleCloseLoading()
        return true
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false)
        handleCloseLoading()
        return false
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
      
    }
  };
  const PushNotification = async () => {
    try {
      let body
      if (selected)
      body = {
        tokens: [token_device],
        title: "Khi???u n???i ???? ???????c x??? l??",
        content:
          "BQL chung c?? th??ng b??o, khi???u n???i c???a anh/ch??? ???? ???????c gi???i quy???t. ????? ngh??? ki???m tra l???i.",
          type: 1,
      };
    else
      body = {
        tokens: [token_device],
        title: "Khi???u n???i kh??ng ???????c x??c nh???n",
        content:
          "BQL chung c?? th??ng b??o, khi???u n???i c???a anh/ch??? ch??a h???p l???. ????? ngh??? li??n h??? BQL ????? gi???i quy???t.",
          type: 1,
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
  const handleChangeReport = async () => {
    try {
      const body = {
        bill_id: data.id,
        status: false,
      };
      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/change-report`,
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
        console.log("ok");
        return true;
        
      } else {
        console.log("SOMETHING WENT WRONG");
        handleOpenSnackBar(false)
        handleCloseLoading()
        return false
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false)
      handleCloseLoading()
      return false
    }
  };
  
  const handleClickOpen = (temp) => {
    setSelected(temp);
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
          handleOpenSnackBar(false)
        }}
        console.log(temp);
        return temp;
      } catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
      }
    }
    else
   return [""]
  };

  const getTokenApart = async (data) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/user/token-device/${data}`,
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
        console.log("user OK");
        console.log(result);
        setToken_device(result.token_device)
      } else {
        const result = await res.json();
        console.log(result.message);
        handleOpenSnackBar(false);
      }
    } catch (err) {
      console.log(err);
      handleOpenSnackBar(false);
    }
  };
  useEffect(() => {
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/all-bill/${id}`,
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
        console.log(result.data);
        setData(result.data);
        await getTokenApart(result.data.apart_id)
        setImage(await getUrl(await result.data.image));
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
    getRes();
  }, [reload]);

  return (
    <div>
       <LoadingOverlay active={isHandle} spinner text="??ang x??? l?? vui l??ng ch???...">
      {!isLoad ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
            <SlideShow  images={image}></SlideShow>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                {data.report ? "Khi???u n???i ch??a x??? l??" : "Khi???u n???i ???? x??? l??"}
              </h4>
            </CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="aprt_name"
                  label="T??n Ph??ng"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  value={data.apart_name || ""}
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
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  value={data.month + "/" + data.year}
                  //onChange={(e) => setName(e.target.value)}
                />

<NumberFormat value={data.electric_bill} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) => <TextField
                  id="elec"
                  label="H??a ????n ??i???n"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                 value={value}
                />} />
                <NumberFormat value={data.water_bill} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) =>  <TextField
                  id="water"
                  label="H??a ????n n?????c"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                value={value}
                />} />
               <NumberFormat value={data.other_bill} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) =>  <TextField
                  id="other"
                  label="H??a ????n kh??c"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  value={value}
                />} />
               <NumberFormat value={data.total_money} className="foo" displayType={'text'} thousandSeparator={true} suffix={' VND'} renderText={(value, props) =>  
               <TextField
                  id="total"
                  label="T???ng ti???n"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  value={value}
                  //onChange={(e) => setName(e.target.value)}
                />} />
                <TextField
                  id="is_pay"
                  label="T??nh tr???ng"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="outlined"
                  value={
                    data.is_pay ? "???? thanh to??n" : "Ch??a thanh to??n"
                  }
                  //onChange={(e) => setName(e.target.value)}
                ></TextField>
              </GridItem>
            </GridContainer>
          </GridItem>
          <div />
          <GridItem xs={12} sm={12} md={3} />
          <GridItem xs={12} sm={12} md={3}>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            {data.report ? (
              <>
                <Button  className={classes.myButton} color="primary" onClick={(e) => handleClickOpen(true)}>
                  Ch???p nh???n
                </Button>
                <Button  className={classes.myButton} color="primary" onClick={(e) => handleClickOpen(false)}>
                  Kh??ng ch???p nh???n
                </Button>
              </>
            ) : (
              <div />
            )}
          </GridItem>
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
          {selected ? "X??c nh???n ???? x??? l??" : "X??c nh???n kh??ng x??? l??"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>C??n h???: {data.apart_name}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            H???y
          </Button>
          <Button onClick={handleSubmit} color="primary">
            X??c nh???n
          </Button>
        </DialogActions>
      </Dialog>

     </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
