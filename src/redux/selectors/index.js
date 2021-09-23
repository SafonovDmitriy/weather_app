// eslint-disable-next-line no-unused-vars
import { get } from "lodash";
export const weatherSelector = (state) => get(state, "weather", {});
export const openweathermapSelector = (state) =>
  get(state, "weather.openweathermap", []);
export const weatherapiSelector = (state) =>
  get(state, "weather.weatherapi", []);
export const weatherbitSelector = (state) =>
  get(state, "weather.weatherbit", []);
