// components/PyramidSide.jsx
import React from 'react';
import { PyramidLayer } from './PyramidLayer.jsx';
import {
  LAYER_DIMENSIONS,
  LAYER_CLIP_PATHS,
  LAYOUT_STYLES,
  TEXT_STYLES
} from '../styles/pyramidStyles.js';

export const PyramidSide = ({
  theme,
  title,
  subtitle,
  topValue,
  bottomValue,
  hoveredLayer,
  setHoveredLayer,
  middleLayerDisabled = true,
  side = 'left' // 'left' or 'right'
}) => {
  const sideStyle = {
    ...LAYOUT_STYLES.sideContainer,
    background: theme.BACKGROUND_GRADIENT
  };

  const titleStyle = {
    ...TEXT_STYLES.title,
    background: theme.TITLE_GRADIENT,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const cloudStyle = {
    ...LAYOUT_STYLES.cloudBackground,
    background: theme.CLOUD_EFFECTS
  };

  const layerPrefix = side === 'left' ? 'android' : 'ios';

  return (
    <div style={sideStyle}>
      <div style={cloudStyle}></div>
      <div style={LAYOUT_STYLES.contentCenter}>
        <h1 style={titleStyle}>{title}</h1>
        <p style={TEXT_STYLES.subtitle}>{subtitle}</p>

        <div style={LAYOUT_STYLES.pyramidContainer}>
          {/* Layer 1 - Top Triangle */}
          <PyramidLayer
            theme={theme}
            layerType={1}
            dimensions={LAYER_DIMENSIONS.LAYER_1}
            clipPath={LAYER_CLIP_PATHS.TRIANGLE}
            layerIndex={`${layerPrefix}1`}
            hoveredLayer={hoveredLayer}
            onMouseEnter={() => setHoveredLayer(`${layerPrefix}1`)}
            onMouseLeave={() => setHoveredLayer(null)}
            title="UI Tests"
            value={topValue}
            isTopLayer={true}
          />

          {/* Layer 2 - Middle Trapezoid */}
          <PyramidLayer
            theme={theme}
            layerType={2}
            dimensions={LAYER_DIMENSIONS.LAYER_2}
            clipPath={LAYER_CLIP_PATHS.TRAPEZOID_MIDDLE}
            layerIndex={`${layerPrefix}2`}
            hoveredLayer={hoveredLayer}
            onMouseEnter={() => setHoveredLayer(`${layerPrefix}2`)}
            onMouseLeave={() => setHoveredLayer(null)}
            title="Integration Tests"
            value="20%"
            isDisabled={middleLayerDisabled}
          />

          {/* Layer 3 - Bottom Trapezoid */}
          <PyramidLayer
            theme={theme}
            layerType={3}
            dimensions={LAYER_DIMENSIONS.LAYER_3}
            clipPath={LAYER_CLIP_PATHS.TRAPEZOID_BOTTOM}
            layerIndex={`${layerPrefix}3`}
            hoveredLayer={hoveredLayer}
            onMouseEnter={() => setHoveredLayer(`${layerPrefix}3`)}
            onMouseLeave={() => setHoveredLayer(null)}
            title="Unit Tests"
            value={bottomValue}
          />
        </div>
      </div>
    </div>
  );
};