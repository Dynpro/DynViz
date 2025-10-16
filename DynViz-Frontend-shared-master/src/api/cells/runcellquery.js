// import axios from 'axios'

// const runCellQuery = async (cellID, connection_id, query) => {
//   let accessToken
//   try {
//     accessToken = localStorage.getItem('accessToken')
//   } catch (error) {
//     throw new Error(`Failed to get token: ${error.message}`)
//   }
//   try {
//     const response = await axios.put(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/Cell/runcell?id=${cellID}`,
//       { ConnectionID: connection_id, Query: query },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       }
//     )
//     return response.data
//   } catch (error) {
//     throw new Error(`Failed to update cell: ${error.message}`)
//   }
// }

// export default runCellQuery





//  modified by arman khan





import axios from 'axios';
import CryptoJS from 'crypto-js';

const runCellQuery = async (connectionId, query, cellId) => {
  const NEXT_PUBLIC_AES_SECRET_KEY = '12345678901234567890123456789012'; 
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('No access token found');
  }


  const encryptQuery = (query, secretKey) => {
    const key = CryptoJS.enc.Utf8.parse(secretKey); 
    const iv = CryptoJS.lib.WordArray.random(16); 
    
   
    const encrypted = CryptoJS.AES.encrypt(query, key, {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.NoPadding, 
    });


    const encryptedQuery = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64); 
    return encryptedQuery;
  };

  try {
    const encryptedQuery = encryptQuery(query, NEXT_PUBLIC_AES_SECRET_KEY);

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/Cell/runcell?id=${cellId}`,
      {
        SetID: connectionId,
        Query: encryptedQuery, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching query result:', error);
    throw error;
  }
};

export default runCellQuery;




// temp

