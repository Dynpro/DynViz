// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTabList from '@mui/lab/TabList'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'

import DBStructure from './dbstructure'

// Styled TabList component
const TabList = styled(MuiTabList)(({ theme }) => ({
  minHeight: 40,
  marginBottom: theme.spacing(4),
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .MuiTab-root': {
    minHeight: 40,

    // paddingTop: theme.spacing(2.5),
    // paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    '&.Mui-selected': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main
    }
  }
}))

const BreadCrumbs = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <TabsWrapper panelTopRound='both' sx={{ p: 3 }}>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='customized tabs example' sx={{ p: 2, marginBottom: 0 }}>
            <Tab value='1' label='Connections' />
            <Tab value='2' label='Worksheets' />
            {/* <Tab value='3' label='Suggestions' /> */}
          </TabList>
          <TabPanel value='1' sx={{ p: 0, boxShadow: 0 }}>
            <DBStructure sx={{ p: 4 }}>Coming soon...</DBStructure>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0, boxShadow: 0, backgroundColor: 'transparent' }}></TabPanel>
          {/* <TabPanel value='3'>
            <Typography>
              Danish tiramisu jujubes cupcake chocolate bar cake cheesecake chupa chups. Macaroon ice cream tootsie roll
              carrot cake gummi bears.
            </Typography>
          </TabPanel> */}
        </TabContext>
      </TabsWrapper>
    </div>
  )
}

export default BreadCrumbs
