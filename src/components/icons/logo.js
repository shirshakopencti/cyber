import React from 'react';

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
    <title>Logo</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        {/* Hexagon */}
        <polygon
          id="Shape"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="39 0 0 22 0 67 39 90 78 68 78 23"
        />

        {/* Replaced "B" with "S" using text element */}
        <text
          x="39" // horizontal center of hexagon
          y="58" // vertical positioning
          textAnchor="middle"
          fontSize="40"
          fontFamily="Arial, Helvetica, sans-serif"
          fill="currentColor">
          S
        </text>
      </g>
    </g>
  </svg>
);

export default IconLogo;
