// components/DisabledOverlay.jsx
import React from 'react';
import { COLORS } from '../styles/colors.js';

export const DisabledOverlay = ({ clipPath, isVisible = true }) => {
  if (!isVisible) return null;

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `repeating-linear-gradient(
      45deg,
      ${COLORS.COMMON.DISABLED_STRIPES} 0px,
      ${COLORS.COMMON.DISABLED_STRIPES} 8px,
      transparent 8px,
      transparent 16px
    )`,
    clipPath: clipPath,
    pointerEvents: 'none',
    zIndex: 10
  };

  return <div style={overlayStyle}></div>;
};