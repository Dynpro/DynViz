

// Saver function
export const saveTilePositions = (dashboardId, positions) => {
    if (typeof window !== 'undefined') {
      const existingPositions = JSON.parse(localStorage.getItem('tilePositions')) || {};
      existingPositions[dashboardId] = positions;
      localStorage.setItem('tilePositions', JSON.stringify(existingPositions));
    }
  };
  
  // Loader function
  export const loadTilePositions = (dashboardId) => {
    if (typeof window !== 'undefined') {
      const positions = JSON.parse(localStorage.getItem('tilePositions')) || {};
      return positions[dashboardId] || null;
    }
    return null;
  };
  




//  modified by arman khan for tile positions.

