import {
  aerisweather,
  openWeatherMap,
  visualCrossing,
  weatherapi,
  weatherbit,
} from "../../api/httpService";
import { temp_C, temp_F, temp_K } from "../../utils/typeOfTemperature";
import { SET_WEATHER_DATA } from "../actionTypes";

const getDay = (indexDay) => {
  switch (indexDay) {
    case 0:
      return "ВС";
    case 1:
      return "ПН";
    case 2:
      return "ВТ";
    case 3:
      return "СР";
    case 4:
      return "ЧТ";
    case 5:
      return "ПТ";
    case 6:
      return "СБ";
    default:
      break;
  }
};
const parseCtoAllTemp = (C) => ({
  [temp_C]: Math.round(C),
  [temp_F]: Math.round(C * (9 / 5) + 32),
  [temp_K]: Math.round(C + 273.15),
});
const getDate = (time) => {
  const _month = new Date(time).getMonth() + 1;
  const month = _month > 12 ? 1 : _month;
  return {
    day: getDay(new Date(time).getDay()),
    date: new Date(time).getDate(),
    month,
    year: new Date(time).getFullYear(),
    hours: new Date(time).getHours(),
  };
};
export const setWeather = (payload) => ({
  type: SET_WEATHER_DATA,
  payload,
});

export const getWeather = (coord) => async (dispatch) => {
  try {
    const { data } = await weatherapi(coord);
    const _list = data.forecast.forecastday.reduce((acc, item) => {
      item.hour.forEach((hour) => {
        if (new Date(hour.time).getHours() % 3 === 0) {
          acc.push({
            date: getDate(hour.time),
            weatherType: {
              title: hour.condition.text,
              icon: `https://${hour.condition.icon.slice(2)}`,
            },
            ...parseCtoAllTemp(hour.temp_c),
          });
        }
      });
      return acc;
    }, []);
    dispatch(setWeather({ weatherapi: _list }));
  } catch (error) {
    console.log(`error`, error);
  }
  try {
    const { data } = await openWeatherMap(coord);
    const openweathermap = data.list.map((item) => ({
      date: getDate(item.dt_txt),
      weatherType: {
        title: item.weather[0].description,
        icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
      },
      ...parseCtoAllTemp(item.main.temp - 273.15),
    }));
    dispatch(setWeather({ openweathermap }));
  } catch (error) {
    console.log(`error`, error);
  }

  try {
    const { data } = await aerisweather(coord);
    const { periods } = data.response[0];

    const _list = periods?.reduce((acc, item) => {
      if (new Date(item.dateTimeISO).getHours() % 3 === 0) {
        acc.push({
          date: getDate(item.dateTimeISO),
          weatherType: {
            title: item.weather,
            icon: `https://cdn.aerisapi.com/wxicons/v2/${item.icon}`,
          },
          ...parseCtoAllTemp(item.avgTempC),
        });
      }

      return acc;
    }, []);

    dispatch(setWeather({ aerisweather: _list }));
  } catch (error) {
    console.log(`error`, error);
  }

  try {
    const { data } = await weatherbit(coord);

    const _list = data.data.reduce((acc, item) => {
      acc.push({
        date: getDate(item.timestamp_local),
        ...parseCtoAllTemp(item.temp),
      });

      return acc;
    }, []);
    dispatch(setWeather({ weatherbit: _list }));
  } catch (error) {
    console.log(`error`, error);
  }
  try {
    const { data } = await visualCrossing(coord);
    const locations =
      data?.locations[`${coord.coords.latitude},${coord.coords.longitude}`];

    const _list = locations.values.reduce((acc, item) => {
      if (new Date(item.datetimeStr).getHours() % 3 === 0) {
        acc.push({
          date: getDate(item.datetimeStr),
          weatherType: {
            title: item.conditions,
          },
          ...parseCtoAllTemp((item.temp - 32) / (9 / 5)),
        });
      }

      return acc;
    }, []);

    dispatch(setWeather({ visualCrossing: _list }));
  } catch (error) {
    console.log(`error`, error);
  }
};
