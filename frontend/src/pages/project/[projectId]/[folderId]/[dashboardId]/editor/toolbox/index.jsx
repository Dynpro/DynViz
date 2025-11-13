// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiTabList from '@mui/lab/TabList'
import { useRouter } from 'next/router'

// ** Custom Component Import
import TabsWrapper from 'src/@core/styles/mui/TabsWrapper'
import TableStickyHeader from 'src/views/table/mui/TableStickyHeader'
import DataPreview from '../previewpanel/datapreview'
import CardPreview from '../previewpanel/cardpreview'
import QueryEditor from './querybox'
import { Divider, Grid, Link } from '@mui/material'
import getWorksheet from 'src/api/worksheet/getWorksheet'
import SkeletonTypography from 'src/@core/components/skeleton'
import getCellsByTile from 'src/api/cells/getCellByTile'

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
  const [data, setData] = useState(null) // To store the fetched data
  const [loading, setLoading] = useState(false) // To track the loading state
  const router = useRouter()
  const currentPath = router.asPath
  console.log(currentPath)
  const fetchData = async () => {
    setLoading(true) // Start loading
    try {
      let cells = null
      if (!data) {
        const TileID = currentPath.split('/?tileId=')[1]
        console.log(TileID)
        cells = await getCellsByTile(TileID)
      }
      // const result = await response.json()
      setData(cells) // Set the fetched data
      console.log(cells)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false) // Stop loading
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)

    fetchData() // Fetch data only if it hasn't been loaded yet
  }
  // const handleTabSwitch = () => {
  //   if (!data) {
  //     fetchData() // Fetch data only if it hasn't been loaded yet
  //   }
  // }

  // let cells = null

  // const fetchCells = async () => {
  //   cells = await getWorksheet()
  //   // console.log(cells)
  //   setcellBlocks(cells)
  // }

  // const [cellBlocks, setcellBlocks] = useState(() => fetchCells())
  // console.log(cellBlocks)

  return (
    <div>
      <TabsWrapper panelTopRound='both' sx={{ p: 3 }}>
        <TabContext value={value}>
          <Grid justifyContent='space-between' container alignItems='center'>
            <Grid item>
              <TabList onChange={handleChange} aria-label='customized tabs example' sx={{ p: 2, marginBottom: 0 }}>
                <Tab value='1' label='Editor' />
                <Tab value='2' label='SQL' />
                <Tab value='3' label='DASHBOARD' />
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
            {loading ? (
              <>
                <SkeletonTypography /> <SkeletonTypography /> <SkeletonTypography />
              </>
            ) : (
              <QueryEditor cells={data} />
            )}
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
