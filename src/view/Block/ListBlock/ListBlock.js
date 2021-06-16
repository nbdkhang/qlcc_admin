import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceListBlock.js";
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";

import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from '@material-ui/core/Fab';
import styles from "../../../asset/jss/material-dashboard-react/components/tasksStyle.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);
export default function ListBlock() {
  const classes = useStyles();
  const history = useHistory();
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
    // {
    //   name: "block",
    //   label: "Toà nhà",
    //   options: {
    //     filter: true,
    //     sort: false,
    //   },
    // },
    
    {
      name: "",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
            <Tooltip
            id="tooltip-top"
            title="Chi tiết"
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              className={classes.margin}
              onClick={() => handleClick(tableMeta.rowData[0])}
            >
              <EditIcon />
            </Fab>
          </Tooltip>
          </div>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {
    // e.preventDefault();
    console.log(id);
    history.push(`/admin/block/detail/${id}`);
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
      if (res1.status === 200) {
        console.log("Vo 200OK");
        
        const result1 = await res1.json();
        setData(handleData(result1.data));
        console.log(result1.data);
      } else {
        const result1 = await res1.json();
        alert(result1.message);
      }
    };
    getRes();
  }, []);
  return (
    <div>
      <MUIDataTable
        title={"Danh sách tòa nhà "}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
