import './MapPage.css'
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#ec39d5',
                },
                thumb: {
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0px 0px 0px 8px rgba(221, 78, 203, 0.16)',
                    },
                },
                track: {
                    color: '#ec39d5',
                },
                rail: {
                    color: '#ec39d5',
                },
                mark: {
                    backgroundColor: '#ec39d5',
                },
            },
        },
    },
});

function DistanceSlider({ sliderValue, onSliderChange }) {

    const handleSliderChange = (event, newValue) => {
        onSliderChange(newValue);
    };
    
    return (
        <ThemeProvider theme={theme}>
            <Slider
                aria-label="Temperature"
                value={sliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
            />
        </ThemeProvider>
    )
}

export default DistanceSlider;