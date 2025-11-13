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
import TableStickyHeader from 'src/views/table/mui/TableStickyHeader'
import DataPreview from '../previewpanel/datapreview'
import CardPreview from '../previewpanel/cardpreview'
import QueryEditor from './querybox'
import { Divider, Grid, Link } from '@mui/material'

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

const ToolBox = () => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <TabsWrapper panelTopRound='both' sx={{ p: 3 }}>
        <TabContext value={value}>
          <Grid justifyContent='space-between' container alignItems='center'>
            <Grid item>
              <TabList onChange={handleChange} aria-label='customized tabs example' sx={{ p: 2, marginBottom: 0 }}>
                <Tab value='1' label='Editor' />
                <Tab value='2' label='SQL' />
                {/* <Tab value='3' label='Suggestions' /> */}
              </TabList>
            </Grid>
            <Grid item paddingX={4}>
              {/* <Link href='#' color='inherit' underline='hover'> */}
              <Typography typography={'subtitle-2'} color={'primary'}>
                <i>Worksheet #WS015561</i>
              </Typography>
              {/* </Link> */}
            </Grid>
          </Grid>
          <TabPanel value='1' sx={{ p: 0, boxShadow: 0 }}>
            <Typography sx={{ p: 4 }}>Coming soon...</Typography>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0, boxShadow: 0, backgroundColor: 'transparent' }}>
            <QueryEditor></QueryEditor>
            {/* <Divider variant='middle' sx={{ paddingBottom: 2 }}></Divider> */}
            <QueryEditor></QueryEditor>
            {/* <Divider variant='middle'></Divider> */}
            <QueryEditor></QueryEditor>
            {/* <Divider variant='middle'></Divider> */}
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

export default ToolBox
