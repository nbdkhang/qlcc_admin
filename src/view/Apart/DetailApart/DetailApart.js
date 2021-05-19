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
import { directionList ,typeList } from "./ServiceAddApart.js";
import TextField from "@material-ui/core/TextField";
import CardHeader from "../../../component/Card/CardHeader.js"
import { Block } from "@material-ui/icons";

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
export default function AddApart() {
  const classes = useStyles();
  //   const [open, setOpen] = useState(false);
  //   const [content, setContent] = useState("");
  //   const userInfo = useSelector((state) => state.user.info);
  const [blockList,setBlockList]=useState([]);
  const nameCheck =  /^[a-zA-Z0-9]+$/;
  const phoneCheck =  /^[0-9]+$/;
  const emailCheck=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const token = useSelector((state) => state.user.token);
  const [alertApartName, setAlertApartName] = useState(false);
  const [alertBlock, setAlertBlock] = useState(false);
  const [alertArea, setAlertArea] = useState(false);
  const [alertDirection, setAlertDirection] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertDescription, setAlertDescription] = useState(false);

  const [apartName, setApartName] = useState("");
  const [block, setBlock] = useState("");
  const [area, setArea] = useState("");
  const [direction,setDirection] = useState("");
  const [type, setType] = useState("");
  const [image,setImage]=useState("");
  const [description,setDescription]=useState("");

  const checkApartName = (name) => {
    if (name !== ""&& name.match(nameCheck)) {
      setAlertApartName(false);
      setApartName(name);
    } else setAlertApartName(true);
  };
  const checkBlock = (block) => {
    if (block !== "") {
      setAlertBlock(false);
      setBlock(block);
    } else setAlertBlock(true);
   
  };
  const checkArea = (area) => {
    if (area !== "" && area.match(phoneCheck)) {
      setAlertArea(false);
      setArea(area);
    } else setAlertArea(true);
  };
  const checkDirection = (direction) => {
    if (true) {
      setAlertDescription(false);
      setDirection(direction);
    } else setAlertDescription(true);
  };
  const checkType= (Type) => {
    if (true) {
      setAlertType(false);
      setType(Type);
    } else setAlertType(true);
  };
  const checkDescription = (address) => {
    if (address !== "") {
      setAlertDescription(false);
      setDescription(address);
    } else setAlertDescription(true);
  };
  const handleSubmit = async () => {
    if (true) {
      const body = {       
          name: apartName,
          block: block,
          area: area,
          direction:direction,
          type: type,
          images:[] ,
          description: description,
      
      };
      console.log(body);
      try {
        const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/apart/add`,
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
        } else if (res.status === 500) {
        } else console.log("SOMETHING WENT WRONG");
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  
  useEffect(() => {
    const getRes = async () => {
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/block/all`,
        {
          // get block
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if ( res1.status === 200) {
        
        console.log("Vo 200OK");
        const result1 = await res1.json();
        console.log(result1.data);
        setBlockList(result1.data)
        setBlock(result1.data[0]._id);
        setType(typeList[0]);
        setDirection(directionList[0]);
       // setData(await handleData(result.data, result1.data));
      } else {
        const result = await res1.json();
        alert(result.message);
      }
    };
    getRes();
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
          <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Thông tin tòa nhà</h4>
            </CardHeader>
            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="apartname"
                label="Tên căn hộ"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => checkApartName(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertApartName && <Alert className={classes.alerts} severity="error">Tên căn hộ không hợp lệ</Alert>}
            </GridItem>
            <GridContainer />

            <GridItem xs={12} sm={12} md={9}>
            <TextField
                id="outlined-select-currency-native"
                select
                label="Tòa nhà"
                margin="normal"
                onChange={(e) => checkBlock(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {blockList.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertBlock && <Alert className={classes.alerts} severity="error">Tòa nhà không hợp lệ</Alert>}
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="area"
                label="Diện tích căn hộ(m2)"
                //style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => checkArea(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertArea && (
                <Alert severity="error" className={classes.alerts}>Diện tích không hợp lệ</Alert>
              )}
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
            <TextField
                id="direction"
                select
                label="Hướng căn hộ"
                margin="normal"
                onChange={(e) => checkDirection(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {directionList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {/* {alertBlock && <Alert className={classes.alerts} severity="error">Tòa nhà không hợp lệ</Alert>} */}
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
            <TextField
                id="direction"
                select
                label="Loại căn hộ"
                margin="normal"
                defaultValue={typeList[0]}
                onChange={(e) => checkDirection(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {typeList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertDirection && (
                <Alert className={classes.alerts} severity="error">Hướng căn hộ không hợp lệ</Alert>
              )}
            </GridItem>

            <GridItem xs={12} sm={12} md={9}>
              <TextField
                id="description"
                label="Mô tả"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                //defaultValue={address}
                onChange={(e) => checkDescription(e.target.value)}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              {alertDescription && (
                <Alert className={classes.alerts} severity="error">Mô tả không hợp lệ</Alert>
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
