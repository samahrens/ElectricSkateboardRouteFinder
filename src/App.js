import './App.css';
import getSegments from './auth/getSegments';
import MapContainer from './map/Map';
import { useState, useEffect } from 'react';
import Landing from './containers/landingPage/Landing';
import MapPage from './containers/mapPage/MapPage';

//initial access token and refresh token
let accessToken = process.env.REACT_APP_accessToken;
let refreshToken = process.env.REACT_APP_refreshToken;

function App() {

  const [polylines, setPolylines] = useState([]);
  const [location, setLocation] = useState(null);
  const [sliderValue, setSliderValue] = useState(1);
  const [sizeSliderValue, setSizeSliderValue] = useState(1);

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
    const { response, newTokens } = await getSegments(accessToken, refreshToken, location, sizeSliderValue);
    if (response == null) {
      return;
    }
    accessToken = newTokens.newAccessToken;
    refreshToken = newTokens.newRefreshToken;
    // console.log("new accessToken: " + accessToken + " new refreshToken: " + refreshToken);

    console.log(response.data.segments);

    const newPolylines = response.data.segments.map(segment => segment.points);
    setPolylines(newPolylines);
  };

  const handleSliderChange = (newSliderValue) => {
    setSliderValue(newSliderValue);
  };

  const handleSizeSliderChange = (newSizeSliderValue) => {
    setSizeSliderValue(newSizeSliderValue);
  };

  return (
    <div className="App">
      <Landing></Landing>
      <MapPage
        sliderValue={sliderValue}
        onSliderChange={handleSliderChange}
        sizeSliderValue={sizeSliderValue}
        onSizeSliderChange={handleSizeSliderChange}
      />
      <button onClick={getPolylines}>test</button>
      {
        (location ?
          <MapContainer
            polylines={polylines}
            location={location}
          />
          : <div>Please enable your location in order to see the map!</div>)
      }

    </div>
  );
}

export default App;
