// hooks/usePyramidData.js
import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService.js';

export const usePyramidData = () => {
  const [yearData, setYearData] = useState('Loading...');
  const [priceData, setPriceData] = useState('Loading...');
  const [capacityData, setCapacityData] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const [year, price, capacity] = await Promise.all([
          apiService.fetchYearData(),
          apiService.fetchPriceData(),
          apiService.fetchCapacityData()
        ]);

        setYearData(year);
        setPriceData(price);
        setCapacityData(capacity);
      } catch (error) {
        console.error('Error fetching pyramid data:', error);
        setYearData('Error');
        setPriceData('Error');
        setCapacityData('Error');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return {
    yearData,
    priceData,
    capacityData,
    loading
  };
};