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
  alerts:{
    marginTop:"18px"
  }
}));
export default function ChangeProfile() {
  const classes = useStyles();
  //   const [open, setOpen] = useState(false);
  //   const [content, setContent] = useState("");
  //   const userInfo = useSelector((state) => state.user.info);
  const nameCheck =  /^[a-zA-Z0-9]+$/;
  const phoneCheck =  /^[0-9]+$/;
  const emailCheck=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const token = useSelector((state) => state.user.token);
  const [alertName, setAlertName] = useState(true);
  const [alertPhone, setAlertPhone] = useState(true);
  const [alertEmail, setAlertEmail] = useState(true);
  const [alertID_Card, setAlertID_Card] = useState(true);
  const [alertAddress, setAlertAddress] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [id_card, setId_card] = useState("");
  const [address, setAddress] = useState("");

  const checkName = (name) => {
    if (name !== ""&& name.match(nameCheck)) {
      setAlertName(false);
      setName(name);
    } else setAlertName(true);
  };
  const checkPhone = (phone) => {
    if (phone !== "" && phone.match(phoneCheck)) {
      setAlertPhone(false);
      setPhone(phone);
    } else setAlertPhone(true);
  };
  const checkEmail = (email) => {
    if (email !== "" && email.match(emailCheck)) {
      setAlertEmail(false);
      setEmail(email);
    } else setAlertEmail(true);
  };
  const checkID_Card = (id_card) => {
    if (id_card !== ""&& id_card.match(nameCheck)) {
      setAlertID_Card(false);
      setId_card(id_card);
    } else setAlertID_Card(true);
  };
  const checkAddress = (address) => {
    if (address !== "") {
      setAlertAddress(false);
      setAddress(address);
    } else setAlertAddress(true);
  };
  const handleSubmit = async () => {
    if (checkUser) {
      const body = {};
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
                onChange={(e) => checkName(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertName && <Alert className={classes.alerts} severity="error">Tên không hợp lệ</Alert>}
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
              {alertEmail && <Alert className={classes.alerts} severity="error">Email không hợp lệ</Alert>}
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
                onChange={(e) => checkPhone(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertPhone && (
                <Alert severity="error" className={classes.alerts}>Số điện thoại không hợp lệ</Alert>
              )}
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
                onChange={(e) => checkID_Card(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertID_Card && (
                <Alert className={classes.alerts} severity="error">Số CMND không hợp lệ</Alert>
              )}
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
                onChange={(e) => checkAddress(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertAddress && (
                <Alert className={classes.alerts} severity="error">Quê quán không hợp lệ</Alert>
              )}
            </GridItem>
          </GridContainer>
          
          <Button color="primary" onClick={(e) => handleSubmit(e)}>
            Lưu lại
          </Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
