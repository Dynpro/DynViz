// // src/api/cells/getQueryResult.js

// import axios from 'axios';

// const getQueryResult = async (connectionId, query, cellId) => {
//   const token = localStorage.getItem('accessToken');
  
//   if (!token) {
//     throw new Error('No access token found');
//   }

//   try {
//     const response = await axios.put(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/Cell/runcell?id=${cellId}`,
//       {
//         ConnectionID: connectionId,
//         Query: query,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching query result:', error);
//     throw error;
//   }
// };

// export default getQueryResult;






//  modifed by arman khan - 2




import axios from 'axios';
import CryptoJS from 'crypto-js';

const getQueryResult = async (connectionId, query, cellId) => {
  // const NEXT_PUBLIC_AES_SECRET_KEY = '12345678901234567890123456789012'; 
  const NEXT_PUBLIC_AES_SECRET_KEY = process.env.NEXT_PUBLIC_AES_SECRET_KEY;
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
    console.log("This is my secret key----", NEXT_PUBLIC_AES_SECRET_KEY)
    console.log("this is my encrypted query-----", encryptedQuery)

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

export default getQueryResult;
