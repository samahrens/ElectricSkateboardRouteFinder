import './MapPage.css'
import DistanceSlider from './DistanceSlider';
import SizeSlider from './SizeSlider';
import LoadingButton from '@mui/lab/LoadingButton';
import MapContainer from '../../map/Map';
import { useState, useEffect } from 'react';
import getSegments from '../../auth/getSegments';
import CircularProgress from '@mui/material/CircularProgress';

//initial access token and refresh token
let accessToken = process.env.REACT_APP_accessToken;
let refreshToken = process.env.REACT_APP_refreshToken;

const buttonStyle = {
    backgroundColor: '#44A729',
    color: 'white',
    fontFamily: 'Century Gothic, CenturyGothic, AppleGothic, sans-serif',
    fontWeight: 'bold'
};

const loadingButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#c951e5',
    cursor: 'not-allowed',
  };

function MapPage() {

    const [polylines, setPolylines] = useState([]);
    const [location, setLocation] = useState(null);
    const [sliderValue, setSliderValue] = useState(1);
    const [sizeSliderValue, setSizeSliderValue] = useState(1);
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        function handleResize() {
            setBrowserWidth(window.innerWidth);
        }

        //event listener for resize
        window.addEventListener('resize', handleResize);

        //remove the event listener when it's no longer needed
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        setIsLoading(true);

        if (!location) {
            return;
        }

        const { response, newTokens } = await getSegments(accessToken, refreshToken, location, sizeSliderValue);
        if (response == null) {
            return;
        }
        accessToken = newTokens.newAccessToken;
        refreshToken = newTokens.newRefreshToken;
        // console.log("new accessToken: " + accessToken + " new refreshToken: " + refreshToken);

        setIsLoading(false);
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
        <div>
            <div className="sliders">
                <div className="innerSliders">
                    <p className="distance">
                        Route Distance:
                    </p>

                    <DistanceSlider
                        sliderValue={sliderValue}
                        onSliderChange={handleSliderChange}>
                    </DistanceSlider>

                    <p className="size">
                        Look for routes up to <span className="sizeSliderValue">{sizeSliderValue}</span> miles away:
                    </p>

                    <SizeSlider
                        sizeSliderValue={sizeSliderValue}
                        onSizeSliderChange={handleSizeSliderChange}>
                    </SizeSlider>

                    <div className="button">
                        <LoadingButton className="Button"
                            variant="contained"
                            style={isLoading ? loadingButtonStyle : buttonStyle}
                            onClick={getPolylines}
                            loading={isLoading}
                            loadingIndicator={<CircularProgress size={20} color="inherit" />}
                            >
                            Find Routes
                        </LoadingButton>
                    </div>
                </div>
            </div>

            <div className="map">
                {
                    (location ?
                        <MapContainer
                            polylines={polylines}
                            location={location}
                            width={`${browserWidth / 2}px`}

                        />
                        : <div className="locationError">Please enable your location and reload the page in order to see the map!</div>)
                }
            </div>
        </div>


    );
}

export default MapPage;