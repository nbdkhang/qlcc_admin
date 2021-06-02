import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleData } from "./ServiceListBrowsePost.js";
import CustomButton from "../../../component/CustomButtons/Button.js"
import { useHistory } from "react-router-dom";
import MUIDataTable from "mui-datatables";

export default function ListApart() {
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
      name: "title",
      label: "Tiêu đề",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "content",
      label: "Nội dung",
      options: {
        display: false,
        filter: true,
        sort: false,
      },
    },
    {
      name: "create_date",
      label: "Ngày tạo",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "is_read_value",
      label: "Tình trạng",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "Chi tiết",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <CustomButton
              variant="outlined"
              color="primary"
              onClick={() => handleClick(tableMeta.rowData[0])}
            >
              Chi tiết
            </CustomButton>
          );
        },
      },
    },
  ];
  const handleClick = (id) => {

    history.push(`/admin/browse_post/detail/${id}`);
  };

  useEffect(() => {
    const getRes = async () => {
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/post/all-post?status=0`,
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
        console.log("Vo 200OK");
        const result = await res.json();
        console.log(result.data);
        setData(await handleData(result.data));
      } else {
        const result = await res.json();
        alert(result.message);
      }
    };
    getRes();
  }, []);
  return (
    <div>
      <MUIDataTable
        title={""}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}
