import { Box } from "@material-ui/core";
import { ResponsiveLine } from "@nivo/line";
import React, { useState } from "react";
import { SelectTypeTemp } from "..";
import { temp_C } from "../../utils/typeOfTemperature";
import useStyles from "./Chartstyle";
export default function Chart({ data }) {
  const classes = useStyles();
  const [typeTemp, setTypeTemp] = useState(temp_C);
  const setTypeTempHendler = (e) => {
    setTypeTemp(e.target.value ? e.target.value : e.target.parentElement.value);
  };

  let _data = [];
  for (const key in data) {
    _data.push({
      id: key,
      color: `hsl(${Math.round(Math.random() * 327)}, ${Math.round(
        Math.random() * 100
      )}%, ${Math.round(Math.random() * 100)}%)`,

      data: data[key].map((item) => ({
        x: `${item.date.date}/${item.date.hours}`,
        y: item[typeTemp],
      })),
    });
  }
  return (
    <Box className={classes.wrapper}>
      <SelectTypeTemp
        typeTemp={typeTemp}
        setTypeTempHendler={setTypeTempHendler}
        className={classes.selectType}
      />
      <ResponsiveLine
        data={_data}
        margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
        curve="monotoneX"
        colors={{ scheme: "spectral" }}
        lineWidth={2}
        pointSize={4}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        useMesh={true}
        tooltip={(date) => CustomTooltip(date, typeTemp, data)}
      />
    </Box>
  );
}
const CustomTooltip = (props, typeTemp, dataBase) => {
  const classes = useStyles();

  const { data, serieId } = props.point;
  const _date = {
    date: data.x.slice(0, data.x.indexOf("/")),
    time: `${data.x.slice(data.x.indexOf("/") + 1)}:00`,
  };
  const { weatherType } = dataBase[serieId].find(
    (item) =>
      // eslint-disable-next-line eqeqeq
      item.date.date == _date.date &&
      // eslint-disable-next-line eqeqeq
      item.date.hours == _date.time.slice(0, _date.time.indexOf(":"))
  );

  return (
    <div className={classes.tooltip}>
      <p>{`${_date.date}-го числа в ${_date.time} будет ±${
        data.y
      }${typeTemp.slice(typeTemp.indexOf("_") + 1)}`}</p>
      {weatherType && (
        <>
          <p>{`Погода: ${weatherType?.title}`}</p>
          <img src={weatherType?.icon} alt="" />
        </>
      )}
      <p>{`По крайней мере ${serieId} так написал`}</p>
    </div>
  );
};
