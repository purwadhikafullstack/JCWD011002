const { warehouse } = require("../../database");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});
const axios = require("axios");
async function getDistance(myLatitude, myLongitude) {
  try {
    const warehouses = await warehouse.findAll({
      attributes: ["id", "latitude", "longitude"],
    });

    let nearestDistance = Infinity;
    let nearestWarehouse = null;

    warehouses.forEach((warehouse) => {
      const distance = calculateDistance(
        myLatitude,
        myLongitude,
        warehouse.latitude,
        warehouse.longitude
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestWarehouse = warehouse;
      }
    });

    if (!nearestWarehouse) {
      return null;
    }

    const cityName = await fetchCityName(
      nearestWarehouse.latitude,
      nearestWarehouse.longitude
    );

    return {
      data: {
        id: nearestWarehouse.id,
        latitude: nearestWarehouse.latitude,
        longitude: nearestWarehouse.longitude,
        nearestWH: cityName,
      },
    };
  } catch (error) {
    console.error("Error calculating nearest warehouse:", error);
    throw error;
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const radLat1 = (Math.PI * lat1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
}

async function fetchCityName(latitude, longitude) {
  const apiKey = process.env.GMAPS_API_KEY;
  const language = "id";

  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=${language}`;

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    const cityName = extractData(data);
    return cityName;
  } catch (error) {
    console.error("Error fetching city name:", error);
  }
}
function extractData(data) {
  const compoundCode = data.plus_code.compound_code;
  if (compoundCode) {
    const cityNameMatch = compoundCode.match(/, (\w[^,]+)/);
    if (cityNameMatch && cityNameMatch.length > 1) {
      let cityName = cityNameMatch[1];
      if (cityName.startsWith("Kota ")) {
        // remove "Kota"
        cityName = cityName.replace(/^Kota /i, "");
      } else if (cityName.startsWith("Kabupaten ")) {
        // remove "Kabupaten"
        cityName = cityName.replace(/^Kabupaten /i, "");
      }
      return cityName;
    }
  }
  return "";
}
module.exports = getDistance;
