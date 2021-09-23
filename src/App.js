import { Box } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./AppStyle";
import { Header, Root, SideBar } from "./components";
import { getWeather } from "./redux/actions/weather";

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      dispatch(getWeather(res));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={classes.app}>
      <Header />
      <SideBar />
      <Root />
    </Box>
  );
}

export default App;
