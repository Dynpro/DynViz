// // ** React Imports
// import { createContext, useEffect, useState } from 'react'

// // ** Next Import
// import { useRouter } from 'next/router'

// // ** Axios
// import axios from 'axios'

// // ** Config
// import authConfig from 'src/configs/auth'

// // ** Defaults
// const defaultProvider = {
//   user: null,
//   loading: true,
//   setUser: () => null,
//   setLoading: () => Boolean,
//   login: () => Promise.resolve(),
//   logout: () => Promise.resolve()
// }
// const AuthContext = createContext(defaultProvider)

// const AuthProvider = ({ children }) => {
//   // ** States
//   const [user, setUser] = useState(defaultProvider.user)
//   const [loading, setLoading] = useState(defaultProvider.loading)

//   // ** Hooks
//   const router = useRouter()
//   useEffect(() => {
//     const initAuth = async () => {
//       const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
//       if (storedToken) {
//         setLoading(true)
//         await axios
//           .get(authConfig.meEndpoint, {
//             headers: {
//               Authorization: storedToken
//             }
//           })
//           .then(async response => {
//             setLoading(false)
//             setUser({ ...response.data.userData })
//           })
//           .catch(() => {
//             localStorage.removeItem('userData')
//             localStorage.removeItem('refreshToken')
//             localStorage.removeItem('accessToken')
//             setUser(null)
//             setLoading(false)
//             if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
//               router.replace('/login')
//             }
//           })
//       } else {
//         setLoading(false)
//       }
//     }
//     initAuth()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const handleLogin = (params, errorCallback) => {
//     axios
//       .post(authConfig.loginEndpoint, params)
//       .then(async response => {
//         params.rememberMe
//           ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
//           : null
//         const returnUrl = router.query.returnUrl
//         setUser({ ...response.data.userData })
//         params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
//         const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
//         console.log("Retuen url----",redirectURL)
//         router.replace(redirectURL)
//       })
//       .catch(err => {
//         if (errorCallback) errorCallback(err)
//       })
//   }

//   const handleLogout = () => {
//     setUser(null)
//     window.localStorage.removeItem('userData')
//     window.localStorage.removeItem(authConfig.storageTokenKeyName)
//     router.push('/login')
//   }

//   const values = {
//     user,
//     loading,
//     setUser,
//     setLoading,
//     login: handleLogin,
//     logout: handleLogout
//   }

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
// }

// export { AuthContext, AuthProvider }






//  modified by arman khan





// // ** React Imports
// import { createContext, useEffect, useState } from 'react'

// // ** Next Import
// import { useRouter } from 'next/router'

// // ** Axios
// import axios from 'axios'

// // ** Config
// import authConfig from 'src/configs/auth'

// // ** API Imports
// import { login as apiLogin } from 'src/api/login/loginApi'

// // ** Defaults
// const defaultProvider = {
//   user: null,
//   loading: true,
//   setUser: () => null,
//   setLoading: () => Boolean,
//   login: () => Promise.resolve(),
//   logout: () => Promise.resolve()
// }

// const AuthContext = createContext(defaultProvider)

// const AuthProvider = ({ children }) => {
//   // ** States
//   const [user, setUser] = useState(defaultProvider.user)
//   const [loading, setLoading] = useState(defaultProvider.loading)

//   // ** Hooks
//   const router = useRouter()
//   useEffect(() => {
//     const initAuth = async () => {
//       const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
//       if (storedToken) {
//         setLoading(true)
//         await axios
//           .get(authConfig.meEndpoint, {
//             headers: {
//               Authorization: storedToken
//             }
//           })
//           .then(async response => {
//             setLoading(false)
//             setUser({ ...response.data.userData })
//           })
//           .catch(() => {
//             localStorage.removeItem('userData')
//             localStorage.removeItem('refreshToken')
//             localStorage.removeItem('accessToken')
//             setUser(null)
//             setLoading(false)
//             if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
//               router.replace('/login')
//             }
//           })
//       } else {
//         setLoading(false)
//       }
//     }
//     initAuth()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const handleLogin = async (params, errorCallback) => {
//     try {
//       const { email, password, rememberMe } = params
//       const { accessToken, userData } = await apiLogin(email, password)

//       if (rememberMe) {
//         window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
//         window.localStorage.setItem('userData', JSON.stringify(userData))
//       }

//       setUser(userData)

//       const returnUrl = router.query.returnUrl
//       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
//       router.replace(redirectURL)
//     } catch (error) {
//       if (errorCallback) errorCallback(error)
//     }
//   }

//   const handleLogout = () => {
//     setUser(null)
//     window.localStorage.removeItem('userData')
//     window.localStorage.removeItem(authConfig.storageTokenKeyName)
//     router.push('/login')
//   }

//   const values = {
//     user,
//     loading,
//     setUser,
//     setLoading,
//     login: handleLogin,
//     logout: handleLogout
//   }

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
// }

// export { AuthContext, AuthProvider }





//  final modification by arman khan





// AuthContext.js

// import { createContext, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import axios from 'axios'
// import authConfig from 'src/configs/auth'
// import { login as apiLogin } from 'src/api/login/loginApi'

// const defaultProvider = {
//   user: null,
//   loading: true,
//   setUser: () => null,
//   setLoading: () => Boolean,
//   login: () => Promise.resolve(),
//   logout: () => Promise.resolve()
// }

// const AuthContext = createContext(defaultProvider)

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(defaultProvider.user)
//   const [loading, setLoading] = useState(defaultProvider.loading)
//   const router = useRouter()

//   useEffect(() => {
//     const initAuth = async () => {
//       const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
//       if (storedToken) {
//         setLoading(true)
//         await axios
//           .get(authConfig.meEndpoint, {
//             headers: {
//               Authorization: storedToken
//             }
//           })
//           .then(async response => {
//             setLoading(false)
//             setUser({ ...response.data.userData })
//           })
//           .catch(() => {
//             logout() // Automatically logout if token is invalid
//           })
//       } else {
//         setLoading(false)
//       }
//     }
//     initAuth()
//   }, [])

//   const login = async (params, errorCallback) => {
//     try {
//       const { email, password, rememberMe } = params
//       const { accessToken, userData } = await apiLogin(email, password)

//       if (rememberMe) {
//         window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
//         window.localStorage.setItem('userData', JSON.stringify(userData))
//         window.localStorage.setItem('userEmail', email) // Store the user's email
//       }

//       setUser(userData)

//       const returnUrl = router.query.returnUrl
//       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
//       router.replace(redirectURL)
//     } catch (error) {
//       if (errorCallback) errorCallback(error)
//     }
//   }

//   const logout = () => {
//     setUser(null)
//     window.localStorage.removeItem('userData')
//     window.localStorage.removeItem(authConfig.storageTokenKeyName)
//     window.localStorage.removeItem('userEmail') // Clear the stored email
//     router.push('/login')
//   }

//   // Retrieve user's email from local storage
//   const getUserEmail = () => {
//     return window.localStorage.getItem('userEmail')
//   }

//   const values = {
//     user,
//     loading,
//     setUser,
//     setLoading,
//     login,
//     logout,
//     getUserEmail
//   }

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
// }

// export { AuthContext, AuthProvider }





// last modification after merging all the branch in backend





// import { createContext, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import axios from 'axios'
// import authConfig from 'src/configs/auth'
// import { login as apiLogin } from 'src/api/login/loginApi'

// const defaultProvider = {
//   user: null,
//   loading: true,
//   setUser: () => null,
//   setLoading: () => Boolean,
//   login: () => Promise.resolve(),
//   logout: () => Promise.resolve()
// }

// const AuthContext = createContext(defaultProvider)

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(defaultProvider.user)
//   const [loading, setLoading] = useState(defaultProvider.loading)
//   const router = useRouter()

//   useEffect(() => {
//     const initAuth = async () => {
//       const storedToken = window.localStorage.getItem('accessToken')

//       if (storedToken) {
//         setLoading(true)
//         await axios
//           .get(authConfig.meEndpoint, {
//             headers: {
//               Authorization: storedToken
//             }
//           })
//           .then(async response => {
//             setLoading(false)
//             setUser({ ...response.data.userData })
//           })
//           .catch(() => {
//             logout() 
//           })
//       } else {
//         console.log(true)
//         setLoading(false)
//       }
//     }
//     initAuth()
//   }, [])

//   const login = async (params, errorCallback) => {
//     try {
//       const { email, password, rememberMe } = params
//       const { accessToken, userData } = await apiLogin(email, password)

//       if (rememberMe) {
//         window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
//         window.localStorage.setItem('userData', JSON.stringify(userData))
//         window.localStorage.setItem('userId', userData.userId)
//         window.localStorage.setItem('orgId', userData.orgId)
//       }

//       setUser(userData)

//       const returnUrl = router.query.returnUrl
//       const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
//       router.replace(redirectURL)
//     } catch (error) {
//       if (errorCallback) errorCallback(error)
//     }
//   }

//   const logout = () => {
//     setUser(null)
//     window.localStorage.removeItem('userData')
//     window.localStorage.removeItem(authConfig.storageTokenKeyName)
//     window.localStorage.removeItem('userEmail') // Clear the stored email
//     window.localStorage.removeItem('userId')
//     window.localStorage.removeItem('orgId')
//     router.push('/login')
//   }

//   // Retrieve user's email from local storage
//   const getUserEmail = () => {
//     return window.localStorage.getItem('userEmail')
//   }

//   const values = {
//     user,
//     loading,
//     setUser,
//     setLoading,
//     login,
//     logout,
//     getUserEmail
//   }

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
// }

// export { AuthContext, AuthProvider }





//  session management by arman khan






// import { createContext, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import { login as apiLogin } from 'src/api/login/loginApi'
// import authConfig from 'src/configs/auth'

// const defaultProvider = {
//   user: null,
//   loading: true,
//   setUser: () => null,
//   setLoading: () => Boolean,
//   login: () => Promise.resolve(),
//   logout: () => Promise.resolve()
// }

// const AuthContext = createContext(defaultProvider)

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(defaultProvider.user)
//   const [loading, setLoading] = useState(defaultProvider.loading)
//   const router = useRouter()

//   useEffect(() => {
//     const initAuth = () => {
//       const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
//       const storedUserData = window.localStorage.getItem('userData')
//       if (storedToken && storedUserData ) {
//         setUser(JSON.parse(storedUserData))
//         setLoading(false)
//       } else {
//         setLoading(false)
//       }
//     }
//     initAuth()
//   }, [])

//   const login = async (params, errorCallback) => {
//     try {
//       const { email, password, rememberMe } = params
//       const { accessToken, userData } = await apiLogin(email, password)

//       if (rememberMe) {
//         window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
//         window.localStorage.setItem('userData', JSON.stringify(userData))
//         window.localStorage.setItem('userId', userData.userId)
//         window.localStorage.setItem('orgId', userData.orgId)

//       }

//       setUser(userData)
//       router.replace('/dashboards/analytics')
//     } catch (error) {
//       if (errorCallback) errorCallback(error)
//     }
//   }

//   const logout = () => {
//     setUser(null)
//     window.localStorage.removeItem('userData')
//     window.localStorage.removeItem(authConfig.storageTokenKeyName)
//     window.localStorage.removeItem('userId')
//     window.localStorage.removeItem('orgId')
//     router.push('/login')
//   }

//   const values = {
//     user,
//     loading,
//     setUser,
//     setLoading,
//     login,
//     logout
//   }

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
// }

// export { AuthContext, AuthProvider }






// refresh db connection api binded 




import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { login as apiLogin } from 'src/api/login/loginApi';
import refreshDBConnection from 'src/api/login/refreshDBConnection'; 
import authConfig from 'src/configs/auth';

const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const router = useRouter();

  useEffect(() => {
    const initAuth = () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName);
      const storedUserData = window.localStorage.getItem('userData');
      if (storedToken && storedUserData) {
        setUser(JSON.parse(storedUserData));
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (params, errorCallback) => {
    try {
      const { email, password, rememberMe } = params;
      const { accessToken, userData } = await apiLogin(email, password);

      if (rememberMe) {
        window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken);
        window.localStorage.setItem('userData', JSON.stringify(userData));
        window.localStorage.setItem('userId', userData.userId);
        window.localStorage.setItem('orgId', userData.orgId);
      }

      setUser(userData);

      
      try {
        const refreshResponse = await refreshDBConnection();
        console.log('Refresh DB Connection Response:', refreshResponse);
      } catch (refreshError) {
        console.error('Failed to refresh DB connection:', refreshError);
      }

      router.replace('/dashboards/analytics');
    } catch (error) {
      if (errorCallback) errorCallback(error);
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('orgId');
    router.push('/login');
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };