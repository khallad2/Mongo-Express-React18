import React, { useState } from 'react';
import './InfoCircle.css';

interface InfoCircleProps {
    description: string;
    title: string;
}

const InfoCircle: React.FC<InfoCircleProps> = ({ description, title }) => {
    const [showHint, setShowHint] = useState(false);

    const handleInfoClick = () => {
        setShowHint(!showHint);
    };

    const handleCloseClick = () => {
        setShowHint(false);
    };

    return (
        <div className="info-circle-container">
            <div className="info-circle" onClick={handleInfoClick}>
                {title}
            </div>
            {showHint && <div className="info-hint-container">
                <div onClick={handleCloseClick} className='close-button'>x</div>
                {description}
            </div>}
        </div>
    );
};

export default InfoCircle;
