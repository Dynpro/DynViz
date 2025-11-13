// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTabList from '@mui/lab/TabList'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'
import TableStickyHeader from 'src/views/table/mui/TableStickyHeader'
import DataPreview from './datapreview'
import CardPreview from './cardpreview'
import emitter from 'src/utils/eventEmitter'
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

const TabsCustomized = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    // console.log('eventemitter callel')
    setValue(newValue)
  }
  useEffect(() => {
    const handleTabSwitch = tabValue => {
      console.log(typeof tabValue)
      setValue(tabValue)
    }

    // Listen for the 'switchTab' event and update the tab
    emitter.on('switchTab', handleTabSwitch)

    // Clean up the event listener when the component unmounts
    return () => {
      emitter.off('switchTab', handleTabSwitch)
    }
  }, [])
  // emitter.on('switchTab', { handleChange })
  // emitter.off('switchTab', { handleChange })

  return (
    <div>
      <TabsWrapper panelTopRound='both'>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label='customized tabs example'>
            <Tab value='1' label='Result' />
            <Tab value='2' label='Preview' />
            {/* <Tab value='3' label='Suggestions' /> */}
          </TabList>
          <TabPanel value='1' sx={{ p: 0, boxShadow: 0 }}>
            <DataPreview></DataPreview>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0, boxShadow: 0, backgroundColor: 'transparent' }}>
            <CardPreview></CardPreview>
          </TabPanel>
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

export default TabsCustomized

//  api binding- 2 update data bloack
