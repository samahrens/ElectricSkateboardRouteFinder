import './MapPage.css'
import MySlider from './MySlider';

function MapPage({ onSliderChange }) {

    return (
        <div className="">
            Route Distance:
            <MySlider onSliderChange={sliderValue => onSliderChange(sliderValue)}></MySlider>
        </div>
    );
}

export default MapPage;