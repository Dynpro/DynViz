
import axios from 'axios';

const getAllTemplateCards = async () => {
  try {
   
    const token = localStorage.getItem('accessToken');

  
    const response = await axios.get('http://localhost:8080/TemplateMaster/getall', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

 
    return response.data.Data;

  } catch (error) {
    console.error('Error fetching template cards:', error);
    return [];
  }
};

export default getAllTemplateCards;






