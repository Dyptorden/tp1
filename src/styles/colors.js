// styles/colors.js
export const COLORS = {
  // Android Green Theme
  ANDROID: {
    BACKGROUND_GRADIENT: 'linear-gradient(135deg, #0f1f0a 0%, #1e2f1b 25%, #2d4d27 50%, #3d5d37 75%, #4d6d47 100%)',
    TITLE_GRADIENT: 'linear-gradient(135deg, #22c55e, #4ade80, #86efac)',
    LAYER_1: 'linear-gradient(135deg, #dcfce7, #bbf7d0, #86efac)',
    LAYER_2: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)',
    LAYER_3: 'linear-gradient(135deg, #14532d, #166534, #15803d)',
    GLOW: {
      PRIMARY: 'rgba(34, 197, 94, 0.6)',
      SECONDARY: 'rgba(34, 197, 94, 0.4)',
      TERTIARY: 'rgba(34, 197, 94, 0.3)'
    },
    CLOUD_EFFECTS: `
      radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 40% 70%, rgba(52, 211, 153, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.06) 0%, transparent 70%)
    `
  },

  // iOS Blue Theme
  IOS: {
    BACKGROUND_GRADIENT: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
    TITLE_GRADIENT: 'linear-gradient(135deg, #60a5fa, #93c5fd, #dbeafe)',
    LAYER_1: 'linear-gradient(135deg, #dbeafe, #bfdbfe, #93c5fd)',
    LAYER_2: 'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)',
    LAYER_3: 'linear-gradient(135deg, #1e3a8a, #1e40af, #1d4ed8)',
    GLOW: {
      PRIMARY: 'rgba(59, 130, 246, 0.6)',
      SECONDARY: 'rgba(59, 130, 246, 0.4)',
      TERTIARY: 'rgba(59, 130, 246, 0.3)'
    },
    CLOUD_EFFECTS: `
      radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.08) 0%, transparent 60%),
      radial-gradient(circle at 40% 70%, rgba(96, 165, 250, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 70%)
    `
  },

  // Common Colors
  COMMON: {
    TEXT_PRIMARY: '#cbd5e1',
    TEXT_WHITE: 'white',
    DISABLED_STRIPES: 'rgba(128, 128, 128, 0.7)',
    SHADOW_BASE: '0 8px 32px rgba(0, 0, 0, 0.3)',
    SHADOW_INSET: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
  }
};