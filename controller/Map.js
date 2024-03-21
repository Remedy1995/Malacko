const axios = require('axios');
exports.searchMapCordinates = (req, res, next) => {
  const geolocation = req.body.geolocation;

  if (!geolocation) {
    return res.status(404).json({
      message: "Please input user location to search"
    })
  }
  const formatted = geolocation.replace(/[^a-zA-Z ]/g, "");
  const data = [];
  axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=5GO2S6wZyL99zNmGtYAGUgKHpq4NVNMF&location=${formatted}`)
    .then(response => {
      data.push(response.data);
      data.forEach(number => {
        const geodata = number.results[0].locations[0].latLng;
        const location = number.results[0].providedLocation.location;
        res.json({ message: geodata, location: location });

      })

    }).catch(error => {
      console.log(error);
      return res.status(201).json({
        message  : error
      })
    });

};