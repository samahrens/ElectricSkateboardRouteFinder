import './Landing.css'
import React, { useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

function GithubButton() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleRedirect = () => {
        window.location.href = 'https://github.com/samahrens/ElectricSkateboardRouteFinder';
    };
    
    return (
        <GitHubIcon
            style={{
                cursor: 'pointer',
                fontSize: '2.5rem',
                transition: 'color 0.3s',
            }}
            className={`github-icon ${isHovered ? 'hovered' : ''}`}
            onClick={handleRedirect}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    )

}

export default GithubButton;