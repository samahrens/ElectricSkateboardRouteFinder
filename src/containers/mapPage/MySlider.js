import './MapPage.css'
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#dd4ecb',
                },
                thumb: {
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0px 0px 0px 8px rgba(221, 78, 203, 0.16)',
                    },
                },
                track: {
                    color: '#dd4ecb',
                },
                rail: {
                    color: '#dd4ecb',
                },
                mark: {
                    backgroundColor: '#dd4ecb',
                },
            },
        },
    },
});

function MySlider({ onSliderChange }) {
    const [sliderValue, setSliderValue] = useState(1);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
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

export default MySlider;