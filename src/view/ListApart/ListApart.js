import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceListApart.js";
import Button from "@material-ui/core/Button";
import CustomButton from "../../component/CustomButtons/Button.js"
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
export default function ListApart() {
  const history = useHistory();
  const userInfo = useSelector((state) => state.user.info);
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
  };
  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: false,
        filter: true,
        sort: true,
      },
    },
    {
      name: "order",
      label: "Số thứ tự",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Tên phòng",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "block",
      label: "Toà nhà",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Tình trạng",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Chi tiết",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleClick(tableMeta.rowData[0])}
            >
              Chi tiết
            </Button>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {
    // e.preventDefault();
    console.log(id);
    //history.push(`/userdetails/${id}`);
  };

  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
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
      if (res.status === 200 || res1.status === 200) {
        console.log("Vo 200OK");
        const result = await res.json();
        const result1 = await res1.json();
        setData(await handleData(result.data, result1.data));
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, []);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>  
        <CustomButton 
              variant="outlined"
              color="success"
            >
              Thêm căn hộ
            </CustomButton>
        </GridItem>
      </GridContainer>

      {/* "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "white",
    "transparent" */}
      <MUIDataTable
        title={"Danh sách căn hộ "}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
