import axios from 'axios';
import refreshAccessToken from './refreshTokenUtil'

const getSegments = async (accessToken, refreshToken) => {
    const apiUrl = 'https://www.strava.com/api/v3/segments/explore';
    const queryParams = {
      bounds: '37.821362,-122.505373,37.842038,-122.465977',
      activity_type: 'riding',
    };
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  
    try {
      accessToken = await refreshAccessToken(refreshToken); //refresh the access token before making the GET request
      const response = await axios.get(apiUrl, { params: queryParams, headers });
      console.log(response.data);
      return response;
    } catch (error) {
      console.error('Error making GET request:', error);
      return null;
    }
}

export default getSegments;