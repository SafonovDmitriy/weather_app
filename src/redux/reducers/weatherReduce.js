import { DATA_CLEAR, SET_WEATHER_DATA } from "../actionTypes";

const initialStore = {};

const weatherReduce = (state = initialStore, action) => {
  switch (action.type) {
    case SET_WEATHER_DATA:
      return { ...state, ...action.payload };
    case DATA_CLEAR:
      return initialStore;
    default:
      return { ...state };
  }
};

export default weatherReduce;
