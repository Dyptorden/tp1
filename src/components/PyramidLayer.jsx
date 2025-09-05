// components/PyramidLayer.jsx
import React from 'react';
import { DisabledOverlay } from './DisabledOverlay.jsx';
import {
  createLayerStyles,
  createContainerStyles,
  createHoverStyles,
  TEXT_STYLES
} from '../styles/pyramidStyles.js';

export const PyramidLayer = ({
  theme,
  layerType,
  dimensions,
  clipPath,
  layerIndex,
  hoveredLayer,
  onMouseEnter,
  onMouseLeave,
  title,
  value,
  isDisabled = false,
  isTopLayer = false
}) => {
  const baseLayerStyle = createLayerStyles(theme, layerType, dimensions, clipPath);
  const containerStyle = createContainerStyles(hoveredLayer, layerIndex);
  const hoverStyle = createHoverStyles(theme, hoveredLayer, layerIndex);

  const layerStyle = {
    ...baseLayerStyle,
    ...hoverStyle
  };

  const textStyle = isTopLayer ? TEXT_STYLES.topLabel : TEXT_STYLES.labelOverlay;

  return (
    <div
      style={containerStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={layerStyle}></div>

      {isDisabled && (
        <DisabledOverlay clipPath={clipPath} isVisible={true} />
      )}

      <div style={textStyle}>
        <div>{title}</div>
        <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.9 }}>
          {value}
        </div>
      </div>
    </div>
  );
};