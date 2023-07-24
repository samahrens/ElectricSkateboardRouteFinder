import axios from 'axios';
import refreshAccessToken from './refreshTokenUtil'

function calculateCoords(location, sizeSliderValue) {
  const { latitude, longitude } = location;

  const LATITUDE_TO_MILES = 69;
  const LONGITUDE_TO_MILES = 54.6; //approximate conversion factor for longitude

  const lat = latitude;
  const lng = longitude;

  //calculate the distance in degrees for 6 miles in latitude and longitude
  const latDegrees = sizeSliderValue / LATITUDE_TO_MILES;
  const lngDegrees = sizeSliderValue / LONGITUDE_TO_MILES;

  //calculate the new southwest and northeast coordinates
  const newSWLat = lat - latDegrees;
  const newSWLng = lng - lngDegrees;
  const newNELat = lat + latDegrees;
  const newNELng = lng + lngDegrees;

  //return the new bounds
  return [newSWLat, newSWLng, newNELat, newNELng];
}

const getSegments = async (accessToken, refreshToken, location, sizeSliderValue) => {
  
    try {
      let newTokens = await refreshAccessToken(refreshToken); //refresh the access token before making the GET request
      // location = { latitude: 40.431701, longitude: -86.919180 }
      let coords = calculateCoords(location, sizeSliderValue);
      console.log("location: " + location.latitude, ", ", location.longitude)
      console.log(coords[0] + "," + coords[1]);
      console.log(coords[2] + "," + coords[3]);


      const apiUrl = 'https://www.strava.com/api/v3/segments/explore';
      const queryParams = {
        bounds: `${coords[0]},${coords[1]},${coords[2]},${coords[3]}`,
        activity_type: 'riding',
      };
      const headers = {
        'Authorization': `Bearer ${newTokens.newAccessToken}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(apiUrl, { params: queryParams, headers });
      console.log(response.data);
      return { response, newTokens };
    } catch (error) {
      console.error('Error making GET request:', error);
      return null;
    }
}

export default getSegments;