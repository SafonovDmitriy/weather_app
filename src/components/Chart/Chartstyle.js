import { makeStyles } from "@material-ui/core";

export default makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: 250,
    height: 780,
  },
  selectType: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "20px 0",
  },
  tooltip: {
    backgroundColor: "#918B8B",
    padding: "7px 12px",
    borderRadius: 10,
    color: "white",
    boxShadow: "2px 2px 4px 0 #112B8B",
  },
  chart: {
    height: 500,
  },
});
