import axios from 'axios';

const refreshUrl = 'https://www.strava.com/api/v3/oauth/token';

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(refreshUrl, {
      client_id: process.env.REACT_APP_client_id,
      client_secret: process.env.REACT_APP_client_secret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;
    // console.log('Access token refreshed:', newAccessToken);
    return { newAccessToken: newAccessToken, newRefreshToken: newRefreshToken };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

export default refreshAccessToken;