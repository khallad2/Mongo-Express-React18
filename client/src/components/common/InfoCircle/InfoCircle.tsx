import React, { useState } from 'react';
import './InfoCircle.css';

interface InfoCircleProps {
    description: string;
}

const InfoCircle: React.FC<InfoCircleProps> = ({ description }) => {
    const [showHint, setShowHint] = useState(false);

    const handleInfoClick = () => {
        setShowHint(!showHint);
    };

    return (
        <div className="info-circle-container">
            <div className="info-circle" onClick={handleInfoClick}>
                ?
            </div>
            {showHint && <div className="info-hint-container">{description}</div>}
        </div>
    );
};

export default InfoCircle;
