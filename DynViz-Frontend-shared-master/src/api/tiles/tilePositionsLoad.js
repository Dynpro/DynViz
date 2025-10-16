import axios from 'axios';

// Function to save tile positions via API
export const saveTilePositionsToAPI = async (dashboardId, positions) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    // Format the payload as required by the API
    const payload = {
      id: parseInt(dashboardId, 10),
      Configs: JSON.stringify(positions)
    };

    const response = await axios.put('http://localhost:8080/tile/TileLoc', payload, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error saving tile positions to API:', error);
    throw error;
  }
};

// Function to load tile positions (placeholder for future implementation)
export const loadTilePositionsFromAPI = async (dashboardId) => {
  // This function is a placeholder for your future implementation
  // For now, it returns null to use the fallback logic in your component
  return null;
};