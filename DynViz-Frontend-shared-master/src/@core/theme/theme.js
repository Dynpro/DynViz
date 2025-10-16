import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Toaster } from 'react-hot-toast'

const ThemeComponent = props => {
  const { settings, children } = props

  const theme = createTheme({
    palette: {
      mode: settings.theme
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position={settings.toastPosition} />
      {children}
    </ThemeProvider>
  )
}

export default ThemeComponent
