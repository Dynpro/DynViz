/**
 * API function to delete a dashboard
 * @param {string} dashboardId - The ID of the dashboard to delete
 * @returns {Promise<Object>} - Response from the server
 */
const deleteDashboard = async (dashboardId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        throw new Error('Authentication token not found');
      }
  
      const response = await fetch(`http://localhost:8080/dashboard/delete?id=${dashboardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete dashboard');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting dashboard:', error);
      throw error;
    }
  };
  
  export default deleteDashboard;