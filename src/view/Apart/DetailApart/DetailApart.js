import React from "react";
import {useSelector} from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import { useDispatch } from "react-redux";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../../component/Grid/GridItem.js";
import GridContainer from "../../../component/Grid/GridContainer.js";
import Button from "../../../component/CustomButtons/Button.js";

import CustomTabs from "../../../component/CustomTabs/CustomTabs.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Apart() {
  const classes = useStyles();
  const userInfo=useSelector(state=>state.user.info);
  const token=useSelector(state=>state.user.token);

  return (
    <div>
      <GridContainer>
      
      {/* <GridItem xs={12} sm={12} md={5}>
            <Card profile>
              <CardAvatar>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={image} alt="không có ảnh" width="400" height="auto" />
                </a>
              </CardAvatar>
            </Card>
          </GridItem> */}
        <GridItem xs={12} sm={12} md={7}>
        <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "Chi tiết",
                //tabIcon: BugReport,
                tabContent: (      
                    <div></div>
                )
              },
              {
                tabName: "Chỉnh sửa",
                //tabIcon: BugReport,
                tabContent: (      
                    <div></div>
                )
              },

              
              
            ]}
          />
        </GridItem>
       
      </GridContainer>
    </div>
  );
}