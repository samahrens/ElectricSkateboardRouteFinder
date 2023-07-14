import './MapPage.css'
import DistanceSlider from './DistanceSlider';
import SizeSlider from './SizeSlider';

function MapPage({ sliderValue, onSliderChange, sizeSliderValue, onSizeSliderChange }) {


    return (
        <div className="">
            Route Distance:
            <DistanceSlider sliderValue={sliderValue} onSliderChange={onSliderChange}></DistanceSlider>
            Look for routes up to '' miles away:
            <SizeSlider sizeSliderValue={sizeSliderValue} onSizeSliderChange={onSizeSliderChange}></SizeSlider>
        </div>
    );
}

export default MapPage;