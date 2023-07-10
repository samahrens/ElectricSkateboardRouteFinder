import './App.css';
import getSegments from './auth/getSegments';
import MapContainer from './map/Map';
import { useState, useEffect } from 'react';

//initial access token and refresh token
let accessToken = process.env.REACT_APP_accessToken;
let refreshToken = process.env.REACT_APP_refreshToken;

function App() {

  const [polylines, setPolylines] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.log('Error getting location:', error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };
    getLocation();
  }, []);
  

  const getPolylines = async () => {
    const { response, newTokens } = await getSegments(accessToken, refreshToken, location);
    if (response == null) {
      return;
    }
    accessToken = newTokens.newAccessToken;
    refreshToken = newTokens.newRefreshToken;
    console.log("new accessToken: " + accessToken + " new refreshToken: " + refreshToken);

    console.log(response.data.segments);

    const newPolylines = response.data.segments.map(segment => segment.points);
    setPolylines(newPolylines);
  };

  return (
    <div className="App">
      <button onClick={getPolylines}>hello</button>
      {polylines.length === 10 ? 
        (location ? 
          <MapContainer polylines={polylines} location={location} /> 
        : <div>Please enable your location in order to see the map!</div>) 
      : <div></div>}
        
    </div>
  );
}

export default App;
