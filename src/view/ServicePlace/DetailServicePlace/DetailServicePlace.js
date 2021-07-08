import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import Card from "../../../component/Card/Card.js";
import SlideShow from "../../../component/SlideShow/SlideShow.js"
import Snackbar from "../../../component/SnackBar/Snackbar.js"
import LoadingOverlay from "react-loading-overlay";
import { useParams } from "react-router-dom";
import PushNotiAdmin from "../../PushNotiAdmin.js"
import CustomTabs from "../../../component/CustomTabs/CustomTabs.js";
import ChangeInfo from "./ChangeInfo.js"
import ChangeImage from "./ChangeImage.js"
const useStyles = makeStyles((theme) => ({

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
  myButton:{
    float: "right",
    width:"200px"
 }
}));
export default function DetailReport(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  const { id } = useParams();
  const [data, setData] = useState();
  
  const [image, setImage] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const [snackType,setSnackType]=useState(true);
const [isHandle,setIsHandle]=useState(false); 
const [reload,setReload]=useState(true);


  const handleOpenSnackBar = (type) => {
    if (type) setSnackType(true);
    else setSnackType(false);
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };
 const handleOpenLoading=()=>{
    setIsHandle(true);
  }
  const handleCloseLoading=()=>{
    setIsHandle(false);
  }
  const getUrl = async (key) => {
    let temp=[];
    if (key.length >= 1) {
      try {
        for (let i=0;i<key.length;i++)
       { const res = await fetch(
          process.env.REACT_APP_API_LINK + `/api/uploadv2/image-url?key=${key[i]}`,
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
          console.log("get url ok");
          temp[i]={value:result.imageUrl};
        } else {
          handleOpenSnackBar(false)
        }}
        console.log(temp);
        return temp;
      } catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
      }
    }
    else
   return [""]
  };
  useEffect(() => {
    const getRes = async () => {
      try{
      const res = await fetch(
        process.env.REACT_APP_API_LINK + `/api/service/all-services/?_id=${id}`,
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
        console.log("Vo 200OK");
        console.log(result.data);
        setData(result.data[0]);
        setImage(await getUrl(result.data[0].images));
        setIsLoad(false);
      } else {
        const result = await res.json();
        console.log(result.message);
        handleOpenSnackBar(false)  
      }}catch (err) {
        console.log(err);
        handleOpenSnackBar(false)
      }
    };
    getRes();
  }, [reload]);

  return (
    <div>
       <LoadingOverlay active={isHandle} spinner text="Đang xử lý vui lòng chờ...">
      {!isLoad ? (
        <GridContainer>
          <GridItem xs={12} sm={12} md={5}>
            <Card profile>
            <SlideShow  images={image}></SlideShow>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={7}>

            <GridContainer>
            <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Thông tin địa điểm",
                //tabIcon: BugReport,
                tabContent: (      
                    <ChangeInfo data={data} handleOpenLoading={handleOpenLoading} handleCloseLoading={handleCloseLoading} 
                    handleOpenSnackBar={handleOpenSnackBar} setReload={setReload} reload={reload}/>
                )
              },
              {
                tabName: "Thay đổi hình ảnh",
                //tabIcon: Code,
                tabContent: (
                    <ChangeImage data={data} handleOpenLoading={handleOpenLoading} handleCloseLoading={handleCloseLoading} 
                    handleOpenSnackBar={handleOpenSnackBar} setReload={setReload} reload={reload}/>
                )
              },
              
            ]}
          />
            </GridContainer>
          </GridItem>
          <div />
         
        </GridContainer>
      ) : (
        <div>Đang xử lý, vui lòng chờ...</div>
      )}
     </LoadingOverlay>
  <Snackbar open={openSnackBar} type={snackType} handleClose={handleCloseSnackBar}></Snackbar>
    </div>
  );
}
