const axios = require('axios');

async function getLatLongFromAddress(province, city_name) {
  const address = `${city_name}, ${province}`;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.OPENCAGE_API_KEY}`;
  try {
    const response = await axios.get(url);
    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      console.log('Tidak dapat menemukan koordinat untuk alamat ini.');
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = getLatLongFromAddress