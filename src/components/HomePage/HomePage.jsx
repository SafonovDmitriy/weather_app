import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Chart } from "..";
import { weatherSelector } from "../../redux/selectors";
import useStyles from "./HomePageStyle";

const HomePage = () => {
  const classes = useStyles();
  const weather = useSelector(weatherSelector);

  return (
    <Box className={classes.home}>
      <Chart data={{ ...weather }} />
    </Box>
  );
};

export default HomePage;
