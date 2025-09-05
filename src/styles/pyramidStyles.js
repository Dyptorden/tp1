// styles/pyramidStyles.js
import { COLORS } from './colors.js';

export const LAYER_DIMENSIONS = {
  LAYER_1: { width: '180px', height: '150px' },
  LAYER_2: { width: '360px', height: '150px' },
  LAYER_3: { width: '540px', height: '150px' }
};

export const LAYER_CLIP_PATHS = {
  TRIANGLE: 'polygon(50% 0%, 0% 100%, 100% 100%)',
  TRAPEZOID_MIDDLE: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
  TRAPEZOID_BOTTOM: 'polygon(16.67% 0%, 83.33% 0%, 100% 100%, 0% 100%)'
};

export const createLayerStyles = (theme, layerType, dimensions, clipPath) => ({
  width: dimensions.width,
  height: dimensions.height,
  background: theme[`LAYER_${layerType}`],
  clipPath: clipPath,
  marginBottom: '0px',
  position: 'relative',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
});

export const createContainerStyles = (hoveredLayer, layerIndex) => ({
  position: 'relative',
  transition: 'all 0.3s ease',
  transform: hoveredLayer === layerIndex ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
  zIndex: hoveredLayer === layerIndex ? 100 : 10
});

export const createHoverStyles = (theme, hoveredLayer, layerIndex) => ({
  boxShadow: hoveredLayer === layerIndex ?
    `0 0 20px ${theme.GLOW.PRIMARY}, 0 0 40px ${theme.GLOW.SECONDARY}, 0 0 60px ${theme.GLOW.TERTIARY}, inset 0 0 20px rgba(255, 255, 255, 0.1), ${COLORS.COMMON.SHADOW_BASE}` :
    `${COLORS.COMMON.SHADOW_BASE}, ${COLORS.COMMON.SHADOW_INSET}`,
  filter: hoveredLayer === layerIndex ? 'brightness(1.2)' : 'brightness(1)'
});

export const LAYOUT_STYLES = {
  mainContainer: {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    position: 'relative',
    overflow: 'hidden'
  },

  sideContainer: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px',
    position: 'relative'
  },

  contentCenter: {
    textAlign: 'center',
    position: 'relative',
    zIndex: 10
  },

  pyramidContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))'
  },

  cloudBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    animation: 'cloudMotion 20s ease-in-out infinite alternate',
    pointerEvents: 'none'
  }
};

export const TEXT_STYLES = {
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '8px',
    textShadow: '0 0 30px rgba(34, 197, 94, 0.3)',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  subtitle: {
    color: COLORS.COMMON.TEXT_PRIMARY,
    marginBottom: '48px',
    fontSize: '1.1rem',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
  },

  labelOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: COLORS.COMMON.TEXT_WHITE,
    fontWeight: '700',
    fontSize: '12px',
    textAlign: 'center',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
    pointerEvents: 'none'
  },

  topLabel: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: COLORS.COMMON.TEXT_WHITE,
    fontWeight: '700',
    fontSize: '12px',
    textAlign: 'center',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
    pointerEvents: 'none'
  }
};