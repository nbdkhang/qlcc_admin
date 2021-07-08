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
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
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
  const [image, setImage] = useState("");
  const [nameFile, setNameFile] = useState([]);
  const [fileExtension, setFileExtenstion] = useState([]);
  const [fileMediaType, setFileMediaType] = useState([]);
  //const [fileData, setFileData] = useState([]);
  const [review, setReview] = useState([{ src: "" }]);
  const [isSelectFile, setIsSelectFile] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handeFile = async (file, imageUrl) => {
    console.log(file);
    console.log(imageUrl);
    setImage(file);
    let name = [];
    let extension = [];
    let type = [];
    let data = [];
    let reviewImage = [];
    if (file !== undefined) {
      for (let i = 0; i < file.length; i++) {
        let arr = file[i].type.split("/");
        extension.push(arr.pop());
        type.push(arr.pop());
        name.push(file[i].name.split(".").shift());
        reviewImage[i] = {
          src: URL.createObjectURL(file[i]),
        };
      }
      // console.log(name);
      // console.log(extension);
      // console.log(type);
      // console.log(review);
      setReview(reviewImage);
      setNameFile(name);
      setFileExtenstion(extension);
      setFileMediaType(type);
      //setFileData(data);
      setIsSelectFile(true);
    }
  };

  const getlink = async () => {
    handleClose()
    handleOpenLoading()
    if (nameFile.length !== 0) {
      try {
        let url = [];
        let key = [];
        for (let i = 0; i < nameFile.length; i++) {
          console.log(fileExtension[i] + fileMediaType[i]);
          const res = await fetch(
            process.env.REACT_APP_API_LINK +
              `/api/uploadv2/signed-url?fileName=${nameFile[i]}&extension=${fileExtension[i]}&mediaType=${fileMediaType[i]}`, ///api/upload-csv/signed-url?fileName=electric&extension=vnd.ms-excel&mediaType=application
            {
              method: "GET",
              mode: "cors",
              headers: {
                Authorization: "Bearer " + `${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (res.status === 200) {
            const result = await res.json();
            console.log("image ok" + i);
            url.push(result.uploadUrl);
            key.push(result.key);
          }  else {
            console.log("SOMETHING WENT WRONG");
          handleCloseLoading()
          handleOpenSnackBar(false)}
        }
        console.log(key);
        upload(url, key);
      } catch (err) {
        console.log(err);
        handleCloseLoading()
        handleOpenSnackBar(false)
      }
    } else {
      console.log("no image");
      handleCloseLoading()
      handleOpenSnackBar(false)
    }
  };
  const upload = async (url, key) => {
    try {
      for (let i = 0; i < url.length; i++) {
        console.log(fileMediaType[i] + "/" + fileExtension[i]);
        //console.log(fileData[i]);
        const res = await fetch(url[i], {
          method: "PUT",
          headers: {
            "Content-Type": fileMediaType[i] + "/" + fileExtension[i],
          },
          body: image[i],
        });
        if (res.status === 200) {
          //const result = await res.json();
          console.log("upload ok" + i);
        } else {
          console.log("SOMETHING WENT WRONG");
          handleCloseLoading()
          handleOpenSnackBar(false)
        }
      }
      console.log(key);
      handleSubmit(key);
    } catch (err) {
      console.log(err);
      handleCloseLoading()
      handleOpenSnackBar(false)
    }
  };
  const handleSubmit = async (key) => {
    
      const body = {
        service_id: data._id,
        images:key
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
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {/* <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thông tin cá nhân</h4>
            </CardHeader> */}
          <GridContainer>
          <GridItem xs={12} sm={12} md={2} style={{ marginTop: "15px" }}>
              <label style={{ marginTop: "50px" }}>Ảnh </label>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <input
                style={{ marginTop: "15px" }}
                type="file"
                multiple
                onChange={(e) => handeFile(e.target.files, e.target.value)}
                accept="image/*"
              />
            </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                {isSelectFile &&
                  review.map((option) => (
                    <Zoom zoomMargin={40}>
                    <img
                      src={option.src}
                      alt="Girl in a jacket"
                      style={{ width: "100px", height: "100px" }}
                    ></img></Zoom>
                  ))}
                
              </GridItem>
          </GridContainer>
          <br></br>
          <br></br>
          <br></br>
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
          <Button onClick={(e) => getlink(e)} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
