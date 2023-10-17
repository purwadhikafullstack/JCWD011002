import React, { useEffect, useState } from "react";
import axios from "axios";

function CalcDistance() {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const myLatitude = localStorage.getItem("myLatitude");
  const myLongitude = localStorage.getItem("myLongitude");

  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_URL}/transaction/distance`, {
        myLatitude,
        myLongitude,
      });
      console.log(response.data.data.nearestWH);
      localStorage.setItem("wh_city", response.data.data.nearestWH);
    } catch (error) {
      console.error("Error calculating nearest warehouse:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <></>;
}

export default CalcDistance;