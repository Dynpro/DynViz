
import axios from 'axios';

const getAllSchemas = async (connectionId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('Access token not found');

        const response = await axios.get(
            `http://localhost:8080/utils/getallschemas`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: { id: connectionId },
            }
        );

        if (response.data?.code === 200 && response.data?.Data?.Data) {
            return response.data.Data.Data;
        } else {
            throw new Error('Failed to fetch schemas');
        }
    } catch (error) {
        console.error('Error fetching schemas:', error);
        throw error;
    }
};

export default getAllSchemas;
