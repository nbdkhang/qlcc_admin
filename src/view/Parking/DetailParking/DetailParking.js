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
import CardAvatar from "../../../component/Card/CardAvatar.js";

import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useParams, useHistory } from "react-router-dom";
import { handleData, title,content } from "./ServiceDetailParking.js";


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
}));
export default function DetailPublicArea(props) {
  //const dispatch = useDispatch();

  const classes = useStyles();
  const history = useHistory();
  const token = useSelector((state) => state.user.token);
  const { notice_id } = useParams();
  const [data, setData] = useState({
    id: "",
    apart_id: "",
    apart_name: "",
    electric_bill: 0,
    water_bill: 0,
    year: 0,
    status_value: "",
    next_status_value: "",
  });
  const [isError, setIsError] = useState(false);
  const [image, setImage] = useState();
  const [commentImage, setCommentImage] = useState();
  const [isLoad, setIsLoad] = useState(true);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [selected, setSelected] = useState(true); // true:chấp nhận|| false:không chấp nhận
  //   const token = useSelector((state) => state.user.token);

  const handleChangeStatus = async () => {
    try {
      handleClose();
      const body = {
        notice_id: data._id,
        status: data.next_status,
      };

      console.log(body);
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/noti-parking/change-confirm`,
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
        console.log(" changestatus ok"); 
        await createNotification();
        setIsError(false);
        setReload(!reload);
       
      } else {
        console.log("SOMETHING WENT WRONG");
        setIsError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const createNotification= async ()=>
  {
    try {
        const body = {
            title: "Xác nhận khiếu nại",
            content: "Báo cáo của anh/chị đã được tiếp nhận. BQL sẽ tiến hành xử lý. Cảm ơn báo cáo của anh/chị.",
            user_id: data.author
        }

        console.log(body);
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/noti-parking/create`,
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
          console.log("noti ok");
          await PushNotification();
        } else {
          console.log("SOMETHING WENT WRONG");
        
        }
      } catch (err) {
        console.log(err);
      }
  }
  const PushNotification=async()=>
  {
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
  }
  const renderButton = () => {
    //let str=returnStatus(data.status)
    return (
      <Button color="primary" onClick={(e) => handleClickOpen(true)}>
       Đã xử lý
      </Button>
    );
  };

  const getUrl = async (key) => {
    if (key.length >= 1) {
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/uploadv2/image-url?key=${key}`,
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
          console.log("get image OK");
          return result.imageUrl;
          // setImage(result.imageUrl);
          // setIsLoad(false);
        } else {
          const result = await res.json();
          alert(result.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoad(false);
  };
  const handleClickOpen = (temp) => {
    setSelected(temp);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getUserAndApart = async (data) => {
    const res = await fetch(
      process.env.REACT_APP_API_LINK + `/api/user/${data.author}`,
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
      setData(handleData(data, result.data));
      //setData(result.data);
      setIsLoad(false);
    } else {
      const result = await res.json();
      alert(result.message);
    }
  };
  useEffect(() => {
    setIsLoad(true);
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/noti-parking/notice/${notice_id}`,
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
        console.log(" useEffect OK");
        await getUserAndApart(result.data);
        if (result.data.image !== "") setImage(await getUrl(result.data.image));
        setIsLoad(false);
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, [reload]);

  return (
    <div>
      {!isLoad ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
              <CardAvatar>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    src={image}
                    alt="Không có ảnh"
                    width="400"
                    height="auto"
                  />
                </a>
              </CardAvatar>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Chi tiết khiếu nại bãi xe
              </h4>
            </CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <TextField
                  id="author"
                  label="Người gửi"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={data.author_name}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="time"
                  label="Thời gian"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={data.time}
                  //onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  id="title"
                  label="Tiêu đề"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={data.title}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="content"
                  label="Nội dung"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={data.content}
                  //onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  id="status"
                  label="Trạng thái hiện tại"
                  //style={{ margin: 8 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  defaultValue={data.is_confirm_value}
                  //onChange={(e) => setName(e.target.value)}
                ></TextField>
              </GridItem>
            </GridContainer>
          </GridItem>
          <div />
          <GridItem xs={12} sm={12} md={3} />
          <GridItem xs={12} sm={12} md={6}>
            {/* {isHandle && (
            <div style={{ marginTop: "15px" }}>Đang xử lý, vui lòng chờ...</div>
          )}*/}
            {isError && (
              <div style={{ marginTop: "15px" }}>Vui lòng thử lại</div>
            )}
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            {!data.is_confirm && renderButton()}
          </GridItem>
        </GridContainer>
      ) : (
        <div>Đang xử lý, vui lòng chờ...</div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Xác nhận chuyển trạng thái
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Chuyển từ "Chưa xử lý" thành "Đã xử lý"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleChangeStatus} color="primary">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
