import './MapPage.css'
import DistanceSlider from './DistanceSlider';
import SizeSlider from './SizeSlider';
import Button from '@mui/material/Button';

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
                    Look for routes up to <span className="sizeSliderValue">{sizeSliderValue}</span> miles away:
                </p>

                <div className="sizeSlider">
                    <SizeSlider
                        sizeSliderValue={sizeSliderValue}
                        onSizeSliderChange={onSizeSliderChange}>
                    </SizeSlider>
                </div>
            </div>

            
            <Button className="Button" variant="contained">Find</Button>

        </div>
    );
}

export default MapPage;