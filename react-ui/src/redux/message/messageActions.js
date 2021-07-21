import messageTypes from "./messageTypes";
import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

// Get all the driver's number of new booking

export const getDriverNewRidesRequestsRequested = () => {
  return {
    type: messageTypes.GET_DRIVER_NEW_RIDES_REQUESTS_REQUEST,
  };
};

export const getDriverNewRidesRequests = (driverId) => {
  return (dispatch) => {
    dispatch(getDriverNewRidesRequestsRequested());

    axios
      .get(URL_API + "/ride/driver-new-rides-requests", {
        params: {
          driverId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getDriverNewRidesRequestsSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getDriverNewRidesRequestsFail(error));
      });
  };
};

export const getDriverNewRidesRequestsSuccess = (data) => {
  return {
    type: messageTypes.GET_DRIVER_NEW_RIDES_REQUESTS_SUCCESS,
    payload: data,
  };
};

export const getDriverNewRidesRequestsFail = (error) => {
  return {
    type: messageTypes.GET_DRIVER_NEW_RIDES_REQUESTS_FAIL,
    payload: error,
  };
};
