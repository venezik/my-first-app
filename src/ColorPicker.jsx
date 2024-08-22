import React, { useState, useRef } from 'react';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);
  const colorRefs = useRef([]);

  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
  ];

  const handleClick = (color) => {
    setSelectedColor(color);
  };

  const handleMouseEnter = (hex) => {
    setSelectedColor({ hex, name: null });
  };

  const handleMouseLeave = () => {
    setSelectedColor({ hex: null, name: null });
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent default action to avoid unwanted behavior
      handleClick(colors[focusedIndex]);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault(); // Prevent default action to avoid unwanted behavior
      const nextIndex = focusedIndex !== null && focusedIndex < colors.length - 1 ? focusedIndex + 1 : focusedIndex;
      setFocusedIndex(nextIndex);
      colorRefs.current[nextIndex]?.focus(); // Move focus to the new item
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault(); // Prevent default action to avoid unwanted behavior
      const prevIndex = focusedIndex !== null && focusedIndex > 0 ? focusedIndex - 1 : focusedIndex;
      setFocusedIndex(prevIndex);
      colorRefs.current[prevIndex]?.focus(); // Move focus to the new item
    }
  };

  return (
    <div className="color-picker">
      <h1>Color Picker</h1>
      <div className="color-list">
        {colors.map((color, index) => (
          <div
            key={index}
            ref={el => colorRefs.current[index] = el} // Store reference to each color item
            className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleClick(color)}
            onMouseEnter={() => handleMouseEnter(color.hex)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, index)}
            tabIndex={0}
          >
            {selectedColor.hex === color.hex && (
              <span className="color-code">{selectedColor.name || color.hex}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
