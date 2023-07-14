import './MapPage.css'
import Slider from '@mui/material/Slider';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiSlider: {
            styleOverrides: {
                root: {
                    color: '#c951e5',
                },
                thumb: {
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0px 0px 0px 8px rgba(221, 78, 203, 0.16)',
                    },
                },
                track: {
                    color: '#c951e5',
                },
                rail: {
                    color: '#c951e5',
                },
                mark: {
                    backgroundColor: '#c951e5',
                },
            },
        },
    },
});

function SizeSlider({ sizeSliderValue, onSizeSliderChange }) {

    const handleSliderChange = (event, newValue) => {
        onSizeSliderChange(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Slider
                aria-label="Temperature"
                value={sizeSliderValue}
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

export default SizeSlider;