import axios from 'axios';
import refreshAccessToken from './refreshTokenUtil'

function calculateCoords(location) {
  const { latitude, longitude } = location;

  //earth's radius in miles
  const earthRadius = 3963.2;
  //convert latitude and longitude to radians
  const latRad = (latitude * Math.PI) / 180;
  const lonRad = (longitude * Math.PI) / 180;
  //distance in radians (10 miles)
  const distance = 10 / earthRadius;

  //calculate the coordinates
  const lat1 = (latRad * 180) / Math.PI + (distance * 180) / Math.PI;
  const lat2 = (latRad * 180) / Math.PI - (distance * 180) / Math.PI;
  const lon1 = (lonRad * 180) / Math.PI + ((distance * 180) / Math.PI) / Math.cos(latRad);
  const lon2 = (lonRad * 180) / Math.PI - ((distance * 180) / Math.PI) / Math.cos(latRad);

  const coordinates = [lat1, lon1, lat2, lon2];
  return coordinates;
}

const getSegments = async (accessToken, refreshToken, location) => {
  
    try {
      let newTokens = await refreshAccessToken(refreshToken); //refresh the access token before making the GET request
      location = { latitude: 34.042223, longitude: -117.991964 }
      let coords = calculateCoords(location);
      console.log(coords[0]);
      console.log(coords[1]);
      console.log(coords[2]);
      console.log(coords[3]);


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