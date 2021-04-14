import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import Button from "../../../component/CustomButtons/Button.js";
import { checkUser } from "./ServiceAddUserAccount.js";
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
    },
  }));
export default function ChangeProfile() {
  const classes = useStyles();
//   const [open, setOpen] = useState(false);
//   const [content, setContent] = useState("");
//   const userInfo = useSelector((state) => state.user.info);
   const token = useSelector((state) => state.user.token);
   const [alertName,setAlertName]= useState(true);
   
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [email, setEmail] = useState("");
   const [cmnd, setCmnd] = useState("");
   const [address, setAddress] = useState("");

  const handleSubmit = async () => {
    if (checkUser) {
      const body = {
       
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/auth/update-info`,
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
        } else if (res.status === 500) {
        } else console.log("SOMETHING WENT WRONG");
      } catch (err) {
        console.log(err);
      }
    } else {
        // trả về trang lỗi
    //   setContent("Thay đổi không thành công");
    //   setOpen(true);
    }
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="name"
                label="Họ và tên"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                //onChange={(e) => setName(e.target.value)}
              />
            </GridItem>
             <GridItem xs={12} sm={12} md={3}>
             {alertName && <Alert severity="error">Tên không hợp lệ</Alert>}
            </GridItem>
            <GridContainer/>
            
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
                //onChange={(e) => setEmail(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
             {alertName && <Alert severity="error">Email không hợp lệ</Alert>}
            </GridItem>


            <GridItem xs={12} sm={12} md={9}>
            <TextField
                id="phone"
                label="Số điên thoại"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
             {alertName && <Alert severity="error">Số điện thoại không hợp lệ</Alert>}
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
            <TextField
                id="cmnd"
                label="Số CMND"
                //style={{ margin: 8 }}         
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                //defaultValue={cmnd}
                //onChange={(e) => setCmnd(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
             {alertName && <Alert severity="error">Số CMND không hợp lệ</Alert>}
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
            <TextField
                id="address"
                label="Quê quán"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                //defaultValue={address}
                //onChange={(e) => setAddress(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
             {alertName && <Alert severity="error">Quê quán không hợp lệ</Alert>}
            </GridItem>
          </GridContainer>
          {alert && <Alert severity="error">This is an error alert — check it out!</Alert>}
          <Button color="primary" onClick={(e) => handleSubmit(e)}>
            Lưu lại
          </Button>
        </GridItem>
                
      </GridContainer>
    </div>
  );
}
