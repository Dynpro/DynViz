import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import BreadCrumbs from './breadcrumbs'
import ConfigBox from './configbox'
import EditorControlled from 'src/views/forms/form-elements/editor/EditorControlled'
import TabsCustomized from './previewpanel'
import ToolBox from './toolbox'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,

  padding: theme.spacing(1),
  textAlign: 'center'

  //   color: theme.palette.text.secondary
}))

const FullScreenHeight = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,

  // padding: 2,
  height: '88vh',
  scrollBehavior: 'smooth',
  overflowY: 'auto'

  //   color: theme.palette.text.secondary
}))

const QueryBoxHeight = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,

  padding: theme.spacing(1),
  height: '44vh',
  scrollBehavior: 'smooth',
  overflowY: 'auto',
  boxSizing: 'border-box'
  // padding: theme.spacing(2)

  //   color: theme.palette.text.secondary
}))

const PreviewPanelHeight = styled('div')(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,

  padding: theme.spacing(2),
  height: '43vh',
  scrollBehavior: 'smooth',
  overflowY: 'auto'

  //   color: theme.palette.text.secondary
}))

export default function AutoGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item lg={2} md={4} xs={12}>
          <FullScreenHeight>
            <BreadCrumbs></BreadCrumbs>
          </FullScreenHeight>
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <Grid item xs={12} paddingBottom={2}>
            <QueryBoxHeight sx={{ p: 2 }}>
              <ToolBox sx={{ p: 2 }}></ToolBox>
            </QueryBoxHeight>
          </Grid>

          <Grid item xs={12}>
            <PreviewPanelHeight>
              <TabsCustomized></TabsCustomized>
            </PreviewPanelHeight>
          </Grid>
        </Grid>

        <Grid item lg={2} md={4} xs={12}>
          <FullScreenHeight>
            <ConfigBox></ConfigBox>
          </FullScreenHeight>
        </Grid>
      </Grid>
    </Box>
  )
}
