import React, { useState } from 'react';
import '../styles/slider.css'; 
const HourPicker = ({ highlightedDates }) => {

    const displayHours = () => {
        const isHighlighted = highlightedDates.includes(dateObj.dateStr);
        console.log(isHighlighted)
    }

    return (
       <div className="hourpicker">
            <button className="hour" onClick={() => {displayHours()}}>
                
            </button>
       </div>
    );
};




export default HourPicker;
