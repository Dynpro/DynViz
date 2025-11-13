// ** React Imports
import { useState } from 'react'
import Box from '@mui/material/Box'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// Styled component for Accordion component
const Accordion = styled(MuiAccordion)(({ theme }) => ({
  margin: 0,
  borderRadius: 0,
  boxShadow: 'none !important',
  border:
    theme.palette.mode === 'light' ? `0px solid ${theme.palette.grey[300]}` : `0px solid ${theme.palette.divider}`,
  '&:not(:last-of-type)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: 'auto'
  },
  '&:first-of-type': {
    '& .MuiButtonBase-root': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    }
  },
  '&:last-of-type': {
    '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    }
  }
}))

// Styled component for AccordionSummary component
const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  marginBottom: 0,
  padding: theme.spacing(0, 4),
  minHeight: theme.spacing(12),
  transition: 'min-height 0.15s ease-in-out',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderBottom:
    theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
  '&.Mui-expanded': {
    minHeight: theme.spacing(12)
  },
  '& .MuiAccordionSummary-content.Mui-expanded': {
    margin: '12px 0'
  },
  '& .MuiTypography-root': {
    fontWeight: 400
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.secondary
  }
}))

// Styled component for AccordionSummary component
const ConfigsHeader = styled(MuiAccordionSummary)(({ theme }) => ({
  marginTop: 2,
  borderRadius: 5,

  //   padding: theme.spacing(0, 4),
  //   minHeight: theme.spacing(12),
  transition: 'min-height 0.15s ease-in-out',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderBottom:
    theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`
}))

// Styled component for AccordionDetails component
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(2)} !important`
}))

const ConfigBox = () => {
  // ** State
  const [expanded, setExpanded] = useState('panel1')

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const expandIcon = value => <Icon icon={expanded === value ? 'bx:minus' : 'bx:plus'} />

  return (
    <div>
      <ConfigsHeader>
        <Typography variant='h6' component='div' align='left'>
          Customize
        </Typography>
      </ConfigsHeader>

      {/* style accordion */}
      <Accordion expanded={expanded === 'stylepanel'} onChange={handleChange('stylepanel')}>
        <AccordionSummary
          id='customized-panel-header-stylepanel'
          expandIcon={expandIcon('stylepanel')}
          aria-controls='customized-panel-content-stylepanel'
        >
          <Typography>Style</Typography>
        </AccordionSummary>

        <AccordionDetails paddingTop={2}>
          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Height' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Width' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Color' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Opacity' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* datablocks accordions */}
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          id='customized-panel-header-1'
          expandIcon={expandIcon('panel1')}
          aria-controls='customized-panel-content-1'
        >
          <Typography>Header</Typography>
        </AccordionSummary>

        <AccordionDetails paddingTop={2}>
          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Size' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Color' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Weight' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Style' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Font' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Opacity' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <TextField fullWidth label='Text' id='size-small' defaultValue='' size='normal' />
          </Grid>
          <Grid container paddingBottom={2}>
            <Button fullWidth variant='contained' endIcon={<Icon icon='bx:link-alt' />} size='small'>
              Get from connection
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* datablocks accordions */}
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          id='customized-panel-header-2'
          expandIcon={expandIcon('panel2')}
          aria-controls='customized-panel-content-2'
        >
          <Typography>Body</Typography>
        </AccordionSummary>

        <AccordionDetails paddingTop={2}>
          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Size' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Color' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Weight' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Style' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Font' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Opacity' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <TextField fullWidth label='Value' id='size-small' defaultValue='' size='normal' />
          </Grid>
          <Grid container paddingBottom={2}>
            <Button fullWidth variant='contained' endIcon={<Icon icon='bx:link-alt' />} size='small'>
              Get from connection
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* datablocks accordions */}
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          id='customized-panel-header-3'
          expandIcon={expandIcon('panel3')}
          aria-controls='customized-panel-content-3'
        >
          <Typography>Footer</Typography>
        </AccordionSummary>

        <AccordionDetails paddingTop={2}>
          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Size' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Color' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Weight' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Style' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <Grid xs={6} paddingRight={1}>
              <TextField label='Font' id='size-small' defaultValue='' size='small' />
            </Grid>
            <Grid xs={6} paddingLeft={1}>
              <TextField label='Opacity' id='size-small' defaultValue='' size='small' />
            </Grid>
          </Grid>

          <Grid container paddingBottom={2}>
            <TextField fullWidth label='Text' id='size-small' defaultValue='' size='normal' />
          </Grid>
          <Grid container paddingBottom={2}>
            <Button fullWidth variant='contained' endIcon={<Icon icon='bx:link-alt' />} size='small'>
              Get from connection
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default ConfigBox
