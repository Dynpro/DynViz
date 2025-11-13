// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
// ** React Imports
import { useState, useEffect, useCallback } from 'react'
// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import Table from 'src/views/apps/roles/Table'
import RoleCards from 'src/views/apps/roles/RoleCards'

const RolesList = () => {
  const [value, setValue] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography sx={{ mb: 4, fontSize: '1.375rem', fontWeight: 700 }}>Roles List</Typography>}
        subtitle={
          <Typography sx={{ color: 'text.secondary' }}>
            A role provides access to predefined menus and features so that depending on <br /> the assigned role, an
            administrator can have access to what he needs.
          </Typography>
        }
      />
      <Grid item xs={12} sx={{ mb: 2 }}>
        <RoleCards />
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}
// const RolesComponent = () => {
//   return (
//     <Grid container spacing={6}>
//       <PageHeader
//         title={<Typography sx={{ mb: 4, fontSize: '1.375rem', fontWeight: 700 }}>Roles List</Typography>}
//         subtitle={
//           <Typography sx={{ color: 'text.secondary' }}>
//             A role provides access to predefined menus and features so that depending on <br /> the assigned role, an
//             administrator can have access to what he needs.
//           </Typography>
//         }
//       />
//       <Grid item xs={12} sx={{ mb: 2 }}>
//         <RoleCards />
//       </Grid>
//       <Grid item xs={12}>
//         <Table />
//       </Grid>
//     </Grid>
//   )
// }

export default RolesList
