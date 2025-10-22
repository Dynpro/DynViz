const createFilter = async (payload) => {
    const accessToken = localStorage.getItem('accessToken');
    
    try {
      const response = await fetch('http://localhost:8080/filter/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create filter');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export default createFilter;