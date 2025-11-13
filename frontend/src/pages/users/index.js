// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import CustomTable from 'src/pages/users/CustomTable'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const DataGridPage = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h5'>
            <LinkStyled href='https://mui.com/x/react-data-grid/' target='_blank'>
              Users List
            </LinkStyled>
          </Typography>
        }
        subtitle={
          <Typography variant='body2'>
            Here , you can manage your users.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <CustomTable />
      </Grid>
    </Grid>
  )
}

export default DataGridPage
