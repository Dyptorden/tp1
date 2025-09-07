// TestingPyramid.jsx - Enhanced with connecting lines and technology icons
import React, { useState, useEffect } from 'react';

// Import technology icons
import katalonLogo from '../assets/Katalon.png';
import espressoLogo from '../assets/espresso_logo.png';
import maestroLogo from '../assets/maestro.jpg';
import sonarcloudLogo from '../assets/Sonarcloud.png';

// === API SERVICE LAYER ===
const apiService = {
  async fetchYearData() {
    try {
      const response = await fetch('https://api.restful-api.dev/objects/7');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.data?.year || '2023';
    } catch (error) {
      console.error('Error fetching year data:', error);
      return '2023'; // fallback value instead of 'Error'
    }
  },

  async fetchPriceData() {
    try {
      const response = await fetch('https://api.restful-api.dev/objects?id=3&id=5&id=10');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const samsungDevice = data.find(item => item.id === "5");
      if (samsungDevice && samsungDevice.data && samsungDevice.data.price) {
        return `${samsungDevice.data.price}`;
      }
      return '$1999'; // fallback value
    } catch (error) {
      console.error('Error fetching price data:', error);
      return '$1999'; // fallback value instead of 'Error'
    }
  },

  async fetchCapacityData() {
    try {
      const response = await fetch('https://api.restful-api.dev/objects');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const appleDevice = data.find(item => item.id === "3");
      if (appleDevice && appleDevice.data && appleDevice.data['capacity GB']) {
        return `${appleDevice.data['capacity GB']}GB`;
      }
      return '128GB'; // fallback value
    } catch (error) {
      console.error('Error fetching capacity data:', error);
      return '128GB'; // fallback value instead of 'Error'
    }
  }
};

// === CUSTOM HOOKS ===
const usePyramidData = () => {
  const [yearData, setYearData] = useState('Loading...');
  const [priceData, setPriceData] = useState('Loading...');
  const [capacityData, setCapacityData] = useState('Loading...');

  useEffect(() => {
    const fetchAllData = async () => {
      const [year, price, capacity] = await Promise.all([
        apiService.fetchYearData(),
        apiService.fetchPriceData(),
        apiService.fetchCapacityData()
      ]);
      setYearData(year);
      setPriceData(price);
      setCapacityData(capacity);
    };
    fetchAllData();
  }, []);

  return { yearData, priceData, capacityData };
};

// === STYLE CONSTANTS ===
const COLORS = {
  ANDROID: {
    BACKGROUND_GRADIENT: 'linear-gradient(135deg, #0f1f0a 0%, #1e2f1b 25%, #2d4d27 50%, #3d5d37 75%, #4d6d47 100%)',
    TITLE_GRADIENT: 'linear-gradient(135deg, #22c55e, #4ade80, #86efac)',
    LAYERS: ['linear-gradient(135deg, #dcfce7, #bbf7d0, #86efac)', 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)', 'linear-gradient(135deg, #14532d, #166534, #15803d)'],
    GLOW: ['rgba(34, 197, 94, 0.6)', 'rgba(34, 197, 94, 0.4)', 'rgba(34, 197, 94, 0.3)'],
    CLOUD_EFFECTS: 'radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(74, 222, 128, 0.08) 0%, transparent 60%), radial-gradient(circle at 40% 70%, rgba(52, 211, 153, 0.12) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(34, 197, 94, 0.06) 0%, transparent 70%)'
  },
  IOS: {
    BACKGROUND_GRADIENT: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
    TITLE_GRADIENT: 'linear-gradient(135deg, #60a5fa, #93c5fd, #dbeafe)',
    LAYERS: ['linear-gradient(135deg, #dbeafe, #bfdbfe, #93c5fd)', 'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)', 'linear-gradient(135deg, #1e3a8a, #1e40af, #1d4ed8)'],
    GLOW: ['rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.4)', 'rgba(59, 130, 246, 0.3)'],
    CLOUD_EFFECTS: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.08) 0%, transparent 60%), radial-gradient(circle at 40% 70%, rgba(96, 165, 250, 0.12) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 70%)'
  }
};

// === Technology Icons Configuration ===
const TECH_ICONS = {
  1: [{ src: katalonLogo, alt: 'Katalon', name: 'Katalon' }],
  2: [
    { src: espressoLogo, alt: 'Espresso', name: 'Espresso' },
    { src: maestroLogo, alt: 'Maestro', name: 'Maestro' }
  ],
  3: [{ src: sonarcloudLogo, alt: 'SonarCloud', name: 'SonarCloud' }]
};

// === UTILITY FUNCTIONS ===
const createLayerStyle = (theme, layerIndex, dimensions, clipPath, hoveredLayer, layerKey) => ({
  ...dimensions,
  background: theme.LAYERS[layerIndex],
  clipPath,
  marginBottom: '0px',
  position: 'relative',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  boxShadow: hoveredLayer === layerKey ?
    `0 0 20px ${theme.GLOW[0]}, 0 0 40px ${theme.GLOW[1]}, 0 0 60px ${theme.GLOW[2]}, inset 0 0 20px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.3)` :
    '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
  filter: hoveredLayer === layerKey ? 'brightness(1.2)' : 'brightness(1)'
});

// === REUSABLE COMPONENTS ===
const DisabledOverlay = ({ clipPath, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      background: 'repeating-linear-gradient(45deg, rgba(128, 128, 128, 0.7) 0px, rgba(128, 128, 128, 0.7) 8px, transparent 8px, transparent 16px)',
      clipPath, pointerEvents: 'none', zIndex: 10
    }}></div>
  );
};

const PyramidLayer = ({ theme, layerIndex, dimensions, clipPath, layerKey, hoveredLayer, onMouseEnter, onMouseLeave, title, value, isDisabled, isTopLayer }) => (
  <div style={{
    position: 'relative', transition: 'all 0.3s ease',
    transform: hoveredLayer === layerKey ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
    zIndex: hoveredLayer === layerKey ? 100 : 10
  }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <div style={createLayerStyle(theme, layerIndex, dimensions, clipPath, hoveredLayer, layerKey)}></div>
    <DisabledOverlay clipPath={clipPath} isVisible={isDisabled} />
    <div style={{
      position: 'absolute', top: isTopLayer ? '60%' : '50%', left: '50%',
      transform: 'translate(-50%, -50%)', color: 'white', fontWeight: '700',
      fontSize: '12px', textAlign: 'center', textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
      pointerEvents: 'none'
    }}>
      <div>{title}</div>
      <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.9 }}>{value}</div>
    </div>
  </div>
);

const PyramidSide = ({ theme, title, subtitle, topValue, bottomValue, hoveredLayer, setHoveredLayer, middleLayerDisabled, sidePrefix }) => {
  const dimensions = [
    { width: '180px', height: '150px' },
    { width: '360px', height: '150px' },
    { width: '540px', height: '150px' }
  ];
  const clipPaths = [
    'polygon(50% 0%, 0% 100%, 100% 100%)',
    'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
    'polygon(16.67% 0%, 83.33% 0%, 100% 100%, 0% 100%)'
  ];

  return (
    <div style={{
      width: '50%', background: theme.BACKGROUND_GRADIENT, display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '32px', position: 'relative'
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: theme.CLOUD_EFFECTS, animation: 'cloudMotion 20s ease-in-out infinite alternate',
        pointerEvents: 'none'
      }}></div>
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h1 style={{
          fontSize: '2.5rem', fontWeight: 'bold', background: theme.TITLE_GRADIENT,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '8px', textShadow: '0 0 30px rgba(34, 197, 94, 0.3)',
          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
        }}>{title}</h1>
        <p style={{
          color: '#cbd5e1', marginBottom: '48px', fontSize: '1.1rem',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
        }}>{subtitle}</p>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'relative', filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))'
        }}>
          <PyramidLayer theme={theme} layerIndex={0} dimensions={dimensions[0]} clipPath={clipPaths[0]}
            layerKey={`${sidePrefix}1`} hoveredLayer={hoveredLayer}
            onMouseEnter={() => setHoveredLayer(`${sidePrefix}1`)}
            onMouseLeave={() => setHoveredLayer(null)}
            title="UI Tests" value={topValue} isTopLayer={true} />
          <PyramidLayer theme={theme} layerIndex={1} dimensions={dimensions[1]} clipPath={clipPaths[1]}
            layerKey={`${sidePrefix}2`} hoveredLayer={hoveredLayer}
            onMouseEnter={() => setHoveredLayer(`${sidePrefix}2`)}
            onMouseLeave={() => setHoveredLayer(null)}
            title="Integration Tests" value="20%" isDisabled={middleLayerDisabled} />
          <PyramidLayer theme={theme} layerIndex={2} dimensions={dimensions[2]} clipPath={clipPaths[2]}
            layerKey={`${sidePrefix}3`} hoveredLayer={hoveredLayer}
            onMouseEnter={() => setHoveredLayer(`${sidePrefix}3`)}
            onMouseLeave={() => setHoveredLayer(null)}
            title="Unit Tests" value={bottomValue} />
        </div>
      </div>
    </div>
  );
};

// === MAIN COMPONENT ===
const TestingPyramid = () => {
  const { yearData, priceData, capacityData } = usePyramidData();
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [middleLayerDisabled] = useState(true);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative', overflow: 'hidden'
    }}>
      <style>{`@keyframes cloudMotion { 0% { transform: translateX(-10px) translateY(-5px); } 100% { transform: translateX(10px) translateY(5px); } }`}</style>

      {/* Connection Lines - Dotted lines linking pyramid layers */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-290px)', zIndex: 1 }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'repeating-linear-gradient(to right, #64748b 0px, #64748b 8px, transparent 8px, transparent 16px)',
          opacity: 0.6, top: '150px'
        }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'repeating-linear-gradient(to right, #64748b 0px, #64748b 8px, transparent 8px, transparent 16px)',
          opacity: 0.6, top: '300px'
        }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'repeating-linear-gradient(to right, #64748b 0px, #64748b 8px, transparent 8px, transparent 16px)',
          opacity: 0.6, top: '450px'
        }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'repeating-linear-gradient(to right, #64748b 0px, #64748b 8px, transparent 8px, transparent 16px)',
          opacity: 0.6, top: '600px'
        }} />
      </div>

      <PyramidSide
        theme={COLORS.ANDROID} title="Android Testing" subtitle="Test Coverage Visualization"
        topValue={priceData} bottomValue={yearData} hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer} middleLayerDisabled={middleLayerDisabled}
        sidePrefix="android" />

      <PyramidSide
        theme={COLORS.IOS} title="iOS Testing" subtitle="Test Coverage Visualization"
        topValue={capacityData} bottomValue={yearData} hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer} middleLayerDisabled={middleLayerDisabled}
        sidePrefix="ios" />

      {/* Technology Icons - ALL 77px size */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: 'translateY(-290px)', zIndex: 20 }}>
        <div style={{
          position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)',
          display: 'flex', gap: '12px', alignItems: 'center', top: '225px'
        }}>
          {TECH_ICONS[1].map((icon, index) => (
            <div key={`top-${index}`} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px',
              background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}>
              <img src={icon.src} alt={icon.alt} style={{
                width: '77px', height: '77px', objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
              }} onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }} />
              <div style={{
                display: 'none', width: '77px', height: '77px',
                background: 'linear-gradient(135deg, #60a5fa, #93c5fd)', borderRadius: '6px',
                alignItems: 'center', justifyContent: 'center', color: 'white',
                fontSize: '29px', fontWeight: 'bold'
              }}>{icon.name.charAt(0)}</div>
              <span style={{
                fontSize: '8px', color: 'white', fontWeight: '600',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)', textAlign: 'center', marginTop: '4px'
              }}>{icon.name}</span>
            </div>
          ))}
        </div>

        <div style={{
          position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)',
          display: 'flex', gap: '12px', alignItems: 'center', top: '375px'
        }}>
          {TECH_ICONS[2].map((icon, index) => (
            <div key={`middle-${index}`} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px',
              background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}>
              <img src={icon.src} alt={icon.alt} style={{
                width: '77px', height: '77px', objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
              }} onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }} />
              <div style={{
                display: 'none', width: '77px', height: '77px',
                background: 'linear-gradient(135deg, #60a5fa, #93c5fd)', borderRadius: '6px',
                alignItems: 'center', justifyContent: 'center', color: 'white',
                fontSize: '29px', fontWeight: 'bold'
              }}>{icon.name.charAt(0)}</div>
              <span style={{
                fontSize: '8px', color: 'white', fontWeight: '600',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)', textAlign: 'center', marginTop: '4px'
              }}>{icon.name}</span>
            </div>
          ))}
        </div>

        <div style={{
          position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)',
          display: 'flex', gap: '12px', alignItems: 'center', top: '525px'
        }}>
          {TECH_ICONS[3].map((icon, index) => (
            <div key={`bottom-${index}`} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px',
              background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}>
              <img src={icon.src} alt={icon.alt} style={{
                width: '77px', height: '77px', objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
              }} onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }} />
              <div style={{
                display: 'none', width: '77px', height: '77px',
                background: 'linear-gradient(135deg, #60a5fa, #93c5fd)', borderRadius: '6px',
                alignItems: 'center', justifyContent: 'center', color: 'white',
                fontSize: '29px', fontWeight: 'bold'
              }}>{icon.name.charAt(0)}</div>
              <span style={{
                fontSize: '8px', color: 'white', fontWeight: '600',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)', textAlign: 'center', marginTop: '4px'
              }}>{icon.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestingPyramid;