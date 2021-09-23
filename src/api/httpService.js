import axios from "axios";

export const instance = axios.create({
  // baseURL: process.env.REACT_APP_URL_SERVER,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "include",
  },
  // withCredentials: true,
});

export const request = ({ url, method = "get", props = {}, headers = {} }) => {
  return instance[method](url, props, headers);
};
export const requestCancel = ({
  url,
  method = "get",
  cancelToken,
  props = {},
}) => {
  return instance[method](url, {
    cancelToken: cancelToken.token,
    ...props,
  });
};
// eslint-disable-next-line no-unused-vars
const createCancelToken = () => {
  let cancelToken = new axios.CancelToken.source();
  return () => {
    if (cancelToken) cancelToken.cancel("");
    cancelToken = new axios.CancelToken.source();
    return cancelToken;
  };
};
export const openWeatherMap = async (coord) =>
  request({
    url: `https://api.openweathermap.org/data/2.5/forecast`,
    props: {
      params: {
        lat: coord.coords.latitude,
        lon: coord.coords.longitude,
        appid: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
      },
    },
  });
export const weatherapi = async (coord) =>
  request({
    url: `http://api.weatherapi.com/v1/forecast.json`,
    props: {
      params: {
        key: process.env.REACT_APP_WEATHER_API_KEY,
        q: `${coord.coords.latitude},${coord.coords.longitude}`,
        days: 5,
      },
    },
  });
export const weatherbit = async (coord) =>
  request({
    url: `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly`,
    props: {
      params: {
        lat: coord.coords.latitude,
        lon: coord.coords.longitude,
      },
      headers: {
        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    },
  });
export const aerisweather = async (coord) =>
  request({
    url: `https://aerisweather1.p.rapidapi.com/forecasts/${coord.coords.latitude},${coord.coords.longitude}`,
    props: {
      params: {
        // lat: coord.coords.latitude,
        // lon: coord.coords.longitude,
        filter: "1hr",
      },
      headers: {
        "x-rapidapi-host": "aerisweather1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    },
  });
export const visualCrossing = async (coord) =>
  request({
    url: `https://visual-crossing-weather.p.rapidapi.com/forecast`,
    props: {
      headers: {
        "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
      params: {
        location: `${coord.coords.latitude},${coord.coords.longitude}`,
        startDateTime: "2019-01-01T00:00:00",
        endDateTime: "2019-01-03T00:00:00",
        unitGroup: "us",
        dayStartTime: "8:00:00",
        contentType: "json",
        dayEndTime: "17:00:00",
        aggregateHours: 1,
        shortColumnNames: "0",
      },
    },
  });

//example how use CancelToken
// const  instanceWithToken = createCancelToken();
// const request = () =>
//   requestCancel({
//     url
//     cancelToken: instanceWithToken(),
//   });
