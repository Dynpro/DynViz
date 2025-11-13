




// version 3- session management by arman khan- added spinner


// // ** Next Imports
// import Head from 'next/head'
// import { Router } from 'next/router'
// import { useEffect, useState } from 'react'

// // ** Store Imports
// import { store } from 'src/store'
// import { Provider } from 'react-redux'

// // ** Loader Import
// import NProgress from 'nprogress'

// // ** Emotion Imports
// import { CacheProvider } from '@emotion/react'

// // ** Config Imports
// import 'src/configs/i18n'
// import themeConfig from 'src/configs/themeConfig'

// // ** Fake-DB Import
// import 'src/@fake-db'

// // ** Third Party Imports
// import { Toaster } from 'react-hot-toast'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// // ** Component Imports
// import UserLayout from 'src/layouts/UserLayout'
// import ThemeComponent from 'src/@core/theme/ThemeComponent'

// // ** Spinner Import
// import Spinner from 'src/@core/components/spinner'

// // ** Contexts
// import { AuthProvider } from 'src/context/AuthContext'
// import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// // ** Styled Components
// import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// // ** Utils Imports
// import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// // ** Prismjs Styles
// import 'prismjs'
// import 'prismjs/themes/prism-tomorrow.css'
// import 'prismjs/components/prism-jsx'
// import 'prismjs/components/prism-tsx'

// // ** React Perfect Scrollbar Style
// import 'react-perfect-scrollbar/dist/css/styles.css'
// import 'src/iconify-bundle/icons-bundle-react'

// // ** Global css styles
// import '../../styles/globals.css'

// // ** Guard Import
// import AuthGuard from 'src/@core/components/auth/guard'

// const clientSideEmotionCache = createEmotionCache()

// const App = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
//   const [loading, setLoading] = useState(false)
//   const contentHeightFixed = Component.contentHeightFixed ?? false

//   const getLayout = Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
//   const setConfig = Component.setConfig ?? undefined

//   useEffect(() => {
//     const handleRouteChangeStart = () => {
//       NProgress.start()
//       setLoading(true)
//     }
//     const handleRouteChangeComplete = () => {
//       NProgress.done()
//       setLoading(false)
//     }
//     const handleRouteChangeError = () => {
//       NProgress.done()
//       setLoading(false)
//     }

//     Router.events.on('routeChangeStart', handleRouteChangeStart)
//     Router.events.on('routeChangeComplete', handleRouteChangeComplete)
//     Router.events.on('routeChangeError', handleRouteChangeError)

//     return () => {
//       Router.events.off('routeChangeStart', handleRouteChangeStart)
//       Router.events.off('routeChangeComplete', handleRouteChangeComplete)
//       Router.events.off('routeChangeError', handleRouteChangeError)
//     }
//   }, [])

//   return (
//     <Provider store={store}>
//       <CacheProvider value={emotionCache}>
//         <Head>
//           <title>{`${themeConfig.templateName}`}</title>
//           <meta name='description' content={`${themeConfig.templateName}`} />
//           <meta name='keywords' content='' />
//           <meta name='viewport' content='initial-scale=1, width=device-width' />
//         </Head>

//         <AuthProvider>
//           <AuthGuard>
//             <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
//               <SettingsConsumer>
//                 {({ settings }) => {
//                   return (
//                     <ThemeComponent settings={settings}>
//                       {loading && <Spinner />} {/* Show spinner during loading */}
//                       {getLayout(<Component {...pageProps} />)}
//                       <ReactHotToast>
//                         <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
//                       </ReactHotToast>
//                       <ToastContainer />
//                     </ThemeComponent>
//                   )
//                 }}
//               </SettingsConsumer>
//             </SettingsProvider>
//           </AuthGuard>
//         </AuthProvider>
//       </CacheProvider>
//     </Provider>
//   )
// }

// export default App




//  issue fixed for react tostify







// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import { useEffect, useState } from 'react'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import 'src/configs/i18n'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'

// ** Guard Import
import AuthGuard from 'src/@core/components/auth/guard'

// ** Create client-side cache for Emotion
const clientSideEmotionCache = createEmotionCache()

const App = ({ Component, pageProps, emotionCache = clientSideEmotionCache }) => {
  const [loading, setLoading] = useState(false)
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const getLayout = Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined

  useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.start()
      setLoading(true)
    }
    const handleRouteChangeComplete = () => {
      NProgress.done()
      setLoading(false)
    }
    const handleRouteChangeError = () => {
      NProgress.done()
      setLoading(false)
    }

    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeComplete)
    Router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeComplete)
      Router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [])

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName}`}</title>
          <meta name='description' content={`${themeConfig.templateName}`} />
          <meta name='keywords' content='' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <AuthProvider>
          <AuthGuard>
            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>
                      {loading && <Spinner />} {/* Show spinner during loading */}
                      {getLayout(<Component {...pageProps} />)}
                      <ToastContainer position={settings.toastPosition} toastOptions={{ className: 'react-toastify' }} /> {/* Removed react-hot-toast */}
                    </ThemeComponent>
                  )
                }}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthGuard>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
