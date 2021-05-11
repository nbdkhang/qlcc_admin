import React, { useState,useEffect } from "react";
import {useSelector } from "react-redux";
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
import CardBody from "../../../component/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import avatar from "../../../asset/img/faces/marc.jpg";

import {useParams} from 'react-router-dom';
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
export default function DetailReport(props) {
  //const dispatch = useDispatch();
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const [selectType, setSelectType] = useState("Hóa đơn điện");
  const [selectMonth, setSelectMonth] = useState(1);
  const [selectYear, setSelectYear] = useState(2020);
  const {id}=useParams();
  const [data,setData]=useState();
  const [isError, setIsError] = useState(false);
  const [image,setImage]=useState();
  const [isLoad,setIsLoad]=useState(true);
  //   const token = useSelector((state) => state.user.token);
  

  const getUrl =async(key)=>
  {
    const res = await fetch(
      process.env.REACT_APP_API_LINK +
        `/api/uploadv2/image-url?key=${key}`,
      {
        // get apart
        method: "GET",
        headers: {
          Authorization: "Bearer " + `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200 ) {
      const result = await res.json();
      console.log("Vo 200OK");
     setImage(result.imageUrl);     
      setIsLoad(false);
    } else {
      const result = await res.json();
      alert(result.message);
    }
  }
  useEffect(() => {
    
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/all-bill/${id}`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     
      if (res.status === 200 ) {
       
        const result = await res.json();
        console.log("Vo 200OK");
        setData(result.data);
        getUrl(result.data.image)
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, []);

  return (
    <div>
      {!isLoad?
      <GridContainer>  
      <GridItem xs={12} sm={12} md={5}>
          <Card profile>
            <CardAvatar >
              <a href="#pablo" onClick={e => e.preventDefault()}  >
                <img src={image} alt="..." width="400" height="auto" />
              </a>
            </CardAvatar>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{data.report?"Khiếu nại chưa xử lý":"Khiếu nại đã xử lý"}</h4>
          </CardHeader>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            <TextField
                id="aprt_name"
                label="Tên Phòng"
                //style={{ margin: 8 }}       
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={data.apart_name||""}
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
                defaultValue={data.month+"/"+data.year}
                //onChange={(e) => setName(e.target.value)}
              />
            
            <TextField
                id="elec"
                label="Hóa đơn điện"
                //style={{ margin: 8 }}       
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={data.electric_bill}
                //onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="water"
                label="Hóa đơn nước"
                //style={{ margin: 8 }}       
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={data.water_bill}
                //onChange={(e) => setName(e.target.value)}
              />
            <TextField
                id="other"
                label="Hóa đơn khác"
                //style={{ margin: 8 }}       
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={data.other_bill}
                //onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="total"
                label="Tổng tiền"
                //style={{ margin: 8 }}       
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={data.total_money}
                //onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="is_pay"
                label="Tình trạng"
                //style={{ margin: 8 }}       
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                defaultValue={data.is_pay?"Đã thanh toán":"Chưa thanh toán"}
                //onChange={(e) => setName(e.target.value)}
              ></TextField>   
            </GridItem>
          </GridContainer>
        </GridItem>
        <div />
        <GridItem xs={12} sm={12} md={3} />
        <GridItem xs={12} sm={12} md={3}>
          {/* {isHandle && (
            <div style={{ marginTop: "15px" }}>Đang xử lý, vui lòng chờ...</div>
          )}
          {isError && <div style={{ marginTop: "15px" }}>Vui lòng thử lại</div>} */}
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          {data.report?
          <>
          <Button color="primary" >
            Chấp nhận
          </Button>
          <Button color="primary" >
           Không chấp nhận
          </Button>
          </> :
          <div/>}
         
        </GridItem>
  
      </GridContainer> :<div>Đang xử lý, vui lòng chờ...</div>}
    </div>
  );
}
