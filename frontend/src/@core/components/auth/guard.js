// import { useEffect } from 'react'
// import { useRouter } from 'next/router'
// import authConfig from 'src/configs/auth'

// const AuthGuard = ({ children }) => {
//   const router = useRouter()

//   useEffect(() => {
//     const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
//     if (!accessToken && router.pathname !== '/login') {
//       router.replace('/login')
//     }
//   }, [router])

//   return children
// }

// export default AuthGuard




// fixed issue of redirection to register page


// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Auth Config
import authConfig from 'src/configs/auth'

const AuthGuard = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
    
    // Allow access to login and register routes without an access token
    if (!accessToken && !['/login', '/register'].includes(router.pathname)) {
      router.replace('/login')
    }
  }, [router])

  return children
}

export default AuthGuard