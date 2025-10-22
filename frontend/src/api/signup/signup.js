// // This function sends a POST request to the signup API endpoint
// export const signUp = async userData => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/organization/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData)
//     })

//     if (!response.ok) {
//       // Handle error responses
//       throw new Error('Error signing up')
//     }

//     // Return the response data
//     return await response.json()
//   } catch (error) {
//     // Handling error for API call
//     console.error('Error signing up:', error.message)
//     throw error
//   }
// }





//  issue fixed for deployment 





// export const signUp = async (userData) => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/organization/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       // Handle error responses
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Error signing up');
//     }

//     // Return the response data
//     const responseData = await response.json();
//     return responseData;
//   } catch (error) {
//     // Handling error for API call
//     console.error('Error signing up:', error.message);
//     throw error;
//   }
// };





//  level 1.1



// signup.js

// This function sends a POST request to the signup API endpoint
export const signUp = async (userData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/organization/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Handle error responses
      throw new Error(responseData.message || 'Error signing up');
    }

    // Return the response data
    return responseData;
  } catch (error) {
    // Handling error for API call
    console.error('Error signing up:', error.message);
    throw error;
  }
};
