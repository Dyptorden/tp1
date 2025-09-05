// services/apiService.js
export const apiService = {
  // Fetch year data from MacBook Pro
  async fetchYearData() {
    try {
      const response = await fetch('https://api.restful-api.dev/objects/7');
      const data = await response.json();
      return data.data.year;
    } catch (error) {
      console.error('Error fetching year data:', error);
      return 'Error';
    }
  },

  // Fetch price data from Samsung Galaxy Z Fold2
  async fetchPriceData() {
    try {
      const response = await fetch('https://api.restful-api.dev/objects?id=3&id=5&id=10');
      const data = await response.json();
      const samsungDevice = data.find(item => item.id === "5");

      if (samsungDevice && samsungDevice.data && samsungDevice.data.price) {
        return `$${samsungDevice.data.price}`;
      }
      return 'No price';
    } catch (error) {
      console.error('Error fetching price data:', error);
      return 'Error';
    }
  },

  // Fetch capacity data from iPhone 12 Pro Max
  async fetchCapacityData() {
    try {
      const response = await fetch('https://api.restful-api.dev/objects');
      const data = await response.json();
      const appleDevice = data.find(item => item.id === "3");

      if (appleDevice && appleDevice.data && appleDevice.data['capacity GB']) {
        return `${appleDevice.data['capacity GB']}GB`;
      }
      return 'No capacity';
    } catch (error) {
      console.error('Error fetching capacity data:', error);
      return 'Error';
    }
  }
};