// TestingPyramid.jsx - Complete file with TestRail automation coverage
import React, { useState, useEffect } from 'react';

// Import technology icons
import katalonLogo from '../assets/Katalon.png';
import espressoLogo from '../assets/espresso_logo.png';
import maestroLogo from '../assets/maestro.jpg';
import questionMark from '../assets/question_mark.png';
import sonarcloudLogo from '../assets/Sonarcloud.png';

// === API SERVICE LAYER ===
// Environment detection
const isGitHubPages = window.location.hostname.includes('github.io') ||
                     window.location.hostname.includes('githubusercontent.com') ||
                     window.location.hostname === 'dyptorden.github.io';
const isLocalhost = window.location.hostname === 'localhost' ||
                   window.location.hostname === '127.0.0.1' ||
                   window.location.hostname === '';

// Debug logging
console.log('Environment Detection:', {
  hostname: window.location.hostname,
  href: window.location.href,
  isGitHubPages,
  isLocalhost
});

// API Configuration
const API_CONFIG = {
  // Local development - use mock data for simplicity
  local: {
    base: '/api-data',
    usePrebuiltData: false,
    useMockData: true
  },
  // GitHub Pages - Fixed path for tp1 repo
  github: {
    base: '/tp1/api-data',
    usePrebuiltData: true,
    useMockData: false
  },
  // Production with your backend
  production: {
    base: '/api',
    usePrebuiltData: false,
    useMockData: false
  }
};

// Environment config selection
const getCurrentConfig = () => {
  console.log('Environment check:', {
    hostname: window.location.hostname,
    pathname: window.location.pathname,
    isLocalhost,
    isGitHubPages
  });

  if (window.location.hostname === 'dyptorden.github.io') {
    console.log('Using GitHub Pages config');
    return API_CONFIG.github;
  }

  if (isLocalhost) {
    console.log('Using localhost config');
    return API_CONFIG.local;
  }

  if (isGitHubPages) {
    console.log('Using GitHub Pages config (generic)');
    return API_CONFIG.github;
  }

  console.log('Using production config');
  return API_CONFIG.production;
};

const config = getCurrentConfig();
console.log('Using configuration:', config);

// Mock data for fallbacks
const MOCK_DATA = {
  androidCoverage: '85.2%',
  iosCoverage: '78.9%'
};

// API Service
const apiService = {
  async fetchTestRailCoverage() {
    if (config.useMockData) {
      console.log('Using mock data for TestRail coverage (local development)');
      return {
        androidCoverage: '72.5%',
        iosCoverage: '68.3%'
      };
    }

    try {
      let allCases = [];
      let offset = 0;
      const limit = 250;
      let hasMore = true;

      // Fetch all pages of test cases
      while (hasMore) {
        let url, data;

        if (config.usePrebuiltData) {
          // GitHub Pages: Use pre-built data
          // For simplicity, we'll assume the GitHub Action fetches all cases into one file
          url = `${config.base}/testrail-cases.json`;
          const response = await fetch(url);
          if (!response.ok) throw new Error('Failed to fetch pre-built data');
          data = await response.json();
          allCases = data.cases || [];
          hasMore = false; // GitHub Action should fetch all cases
        } else {
          // Local development or production - handle pagination
          const endpoint = `https://specialized.testrail.io/index.php?/api/v2/get_cases/13&suite_id=6596&limit=${limit}&offset=${offset}`;
          url = isLocalhost ? `http://localhost:3001/api/testrail/cases?offset=${offset}` : endpoint;
          const response = await fetch(url);
          if (!response.ok) throw new Error('API request failed');
          data = await response.json();

          if (data.cases && data.cases.length > 0) {
            allCases = allCases.concat(data.cases);
            offset += limit;
            hasMore = data.cases.length === limit; // Continue if we got a full page
          } else {
            hasMore = false;
          }
        }
      }

      console.log(`Fetched ${allCases.length} total test cases`);

      // Calculate coverage
      const totalTests = allCases.length;
      const androidAutomated = allCases.filter(test => test.custom_automation_taco_android === 1).length;
      const iosAutomated = allCases.filter(test => test.custom_automation_taco_ios === 1).length;

      const androidCoverage = totalTests > 0 ? ((androidAutomated / totalTests) * 100).toFixed(1) : '0.0';
      const iosCoverage = totalTests > 0 ? ((iosAutomated / totalTests) * 100).toFixed(1) : '0.0';

      console.log(`Android: ${androidAutomated}/${totalTests} = ${androidCoverage}%`);
      console.log(`iOS: ${iosAutomated}/${totalTests} = ${iosCoverage}%`);

      return {
        androidCoverage: `${androidCoverage}%`,
        iosCoverage: `${iosCoverage}%`
      };

    } catch (error) {
      console.error('Error fetching TestRail coverage:', error);
      return {
        androidCoverage: '72.5%',
        iosCoverage: '68.3%'
      };
    }
  },

  async fetchAndroidCoverage() {
    if (config.useMockData) {
      console.log('Using mock data for Android coverage (local development)');
      return MOCK_DATA.androidCoverage;
    }

    try {
      let url, data;

      if (config.usePrebuiltData) {
        url = `${config.base}/android-coverage.json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch pre-built data');
        data = await response.json();
      } else {
        url = isLocalhost ? 'http://localhost:3001/api/sonar/android-coverage' : `${config.base}/sonar/android-coverage`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('API request failed');
        data = await response.json();
      }

      const coverageValue = data.component?.measures?.find(m => m.metric === 'coverage')?.value;
      return coverageValue ? `${coverageValue}%` : MOCK_DATA.androidCoverage;
    } catch (error) {
      console.error('Error fetching Android coverage:', error);
      return MOCK_DATA.androidCoverage;
    }
  },

  async fetchIOSCoverage() {
    if (config.useMockData) {
      console.log('Using mock data for iOS coverage (local development)');
      return MOCK_DATA.iosCoverage;
    }

    try {
      let url, data;

      if (config.usePrebuiltData) {
        url = `${config.base}/ios-coverage.json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch pre-built data');
        data = await response.json();
      } else {
        url = isLocalhost ? 'http://localhost:3001/api/sonar/ios-coverage' : `${config.base}/sonar/ios-coverage`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('API request failed');
        data = await response.json();
      }

      const coverageValue = data.component?.measures?.find(m => m.metric === 'coverage')?.value;
      return coverageValue ? `${coverageValue}%` : MOCK_DATA.iosCoverage;
    } catch (error) {
      console.error('Error fetching iOS coverage:', error);
      return MOCK_DATA.iosCoverage;
    }
  }
};

// === CUSTOM HOOKS ===
const usePyramidData = () => {
  const [testRailAndroidCoverage, setTestRailAndroidCoverage] = useState('Loading...');
  const [testRailIOSCoverage, setTestRailIOSCoverage] = useState('Loading...');
  const [sonarAndroidCoverage, setSonarAndroidCoverage] = useState('Loading...');
  const [sonarIOSCoverage, setSonarIOSCoverage] = useState('Loading...');

  useEffect(() => {
    const fetchAllData = async () => {
      console.log('Fetching data...');
      const [testRailCoverage, sonarAndroid, sonarIOS] = await Promise.all([
        apiService.fetchTestRailCoverage(),
        apiService.fetchAndroidCoverage(),
        apiService.fetchIOSCoverage()
      ]);

      setTestRailAndroidCoverage(testRailCoverage.androidCoverage);
      setTestRailIOSCoverage(testRailCoverage.iosCoverage);
      setSonarAndroidCoverage(sonarAndroid);
      setSonarIOSCoverage(sonarIOS);
    };
    fetchAllData();
  }, []);

  return {
    testRailAndroidCoverage,
    testRailIOSCoverage,
    sonarAndroidCoverage,
    sonarIOSCoverage
  };
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
    { src: maestroLogo, alt: 'Maestro', name: 'Maestro' },
    { src: questionMark, alt: 'To_Research', name: 'To_Research' }
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
      fontSize: '20px', textAlign: 'center', textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
      pointerEvents: 'none'
    }}>
      <div>{title}</div>
      <div style={{ fontSize: '18px', marginTop: '2px', opacity: 0.9 }}>{value}</div>
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
            title="Integration Tests" value="N/A" isDisabled={middleLayerDisabled} />
          <PyramidLayer theme={theme} layerIndex={2} dimensions={dimensions[2]} clipPath={clipPaths[2]}
            layerKey={`${sidePrefix}3`} hoveredLayer={hoveredLayer}
            onMouseEnter={() => setHoveredLayer(`${sidePrefix}3`)}
            onMouseLeave={() => setHoveredLayer(null)}
            title="Unit Tests Coverage" value={bottomValue} />
        </div>
      </div>
    </div>
  );
};

// === MAIN COMPONENT ===
const TestingPyramid = () => {
  const { testRailAndroidCoverage, testRailIOSCoverage, sonarAndroidCoverage, sonarIOSCoverage } = usePyramidData();
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [middleLayerDisabled] = useState(true);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative', overflow: 'hidden'
    }}>
      <style>{`
        @keyframes cloudMotion {
          0% { transform: translateX(-10px) translateY(-5px); }
          100% { transform: translateX(10px) translateY(5px); }
        }
      `}</style>

      {/* Connection Lines */}
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
        topValue={testRailAndroidCoverage} bottomValue={sonarAndroidCoverage} hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer} middleLayerDisabled={middleLayerDisabled}
        sidePrefix="android" />

      <PyramidSide
        theme={COLORS.IOS} title="iOS Testing" subtitle="Test Coverage Visualization"
        topValue={testRailIOSCoverage} bottomValue={sonarIOSCoverage} hoveredLayer={hoveredLayer}
        setHoveredLayer={setHoveredLayer} middleLayerDisabled={middleLayerDisabled}
        sidePrefix="ios" />

      {/* Technology Icons */}
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