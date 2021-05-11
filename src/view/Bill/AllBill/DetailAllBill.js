import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import CardHeader from "../../../component/Card/CardHeader.js";
import Button from "../../../component/CustomButtons/Button.js";

import TextField from "@material-ui/core/TextField";
import { month, year, type } from "./ImportBillService.js";

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
export default function DetailAllBill() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const [isHandle, setIsHandle] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK +
          `/api/all-bill/${bill_id}`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res1 = await fetch(
        process.env.REACT_APP_API_LINK + `/api/apart/all-aparts`,
        {
          // get apart
          method: "GET",
          headers: {
            Authorization: "Bearer " + `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200 || res1.status === 200) {
        console.log("Vo 200OK");
        
        const result = await res.json();
        const result1 = await res1.json();
       console.log(result);
        //setData(await handleData(result.data, result1.data));
        //setStatis(calTotal(result.data));
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, [reLoad,reload2]);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Nhập hóa đơn</h4>
          </CardHeader>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Tháng"
                margin="normal"
                //defaultValue={currentMonth}
                //onChange={(e) => setSelectMonth(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {month.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Năm"
                margin="normal"
                //defaultValue={currentYear}
                //onChange={(e) => setSelectYear(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {year.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                id="outlined-select-currency-native"
                select
                label="Loại hóa đơn"
                margin="normal"
                //defaultValue={currentYear}
                //onChange={(e) => setSelectType(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                fullWidth
                variant="outlined"
              >
                {type.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                  </option>
                ))}
              </TextField>
            </GridItem>

            <input
              style={{ margin: "15px" }}
              type="file"
              //onChange={(e) => handeFile(e.target.files, e.target.value)}
            />
          </GridContainer>
        </GridItem>
        <div />
        <GridItem xs={12} sm={12} md={6} />
        <GridItem xs={12} sm={12} md={3}>
          {isHandle && (
            <div style={{ marginTop: "15px" }}>Đang xử lý, vui lòng chờ...</div>
          )}
          {isError && <div style={{ marginTop: "15px" }}>Vui lòng thử lại</div>}
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <Button color="primary" onClick={}>
            Tạo
          </Button>
          <Button color="primary">Thông báo</Button>
        </GridItem>
      </GridContainer>
    </div>
  );
}
