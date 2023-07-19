import './MapPage.css'
import DistanceSlider from './DistanceSlider';
import SizeSlider from './SizeSlider';

function MapPage({ sliderValue, onSliderChange, sizeSliderValue, onSizeSliderChange }) {


    return (
        <div className="sliders">
            <div className="innerSliders">
                <p className="distance">
                    Route Distance:
                </p>

                <DistanceSlider
                    sliderValue={sliderValue}
                    onSliderChange={onSliderChange}>
                </DistanceSlider>

                <p className="size">
                    Look for routes up to <p className="sizeSliderValue">{sizeSliderValue}</p> miles away:
                </p>

                <SizeSlider
                    sizeSliderValue={sizeSliderValue}
                    onSizeSliderChange={onSizeSliderChange}>
                </SizeSlider>
            </div>
        </div>
    );
}

export default MapPage;