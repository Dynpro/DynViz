// ** MUI Components
import Grid from '@mui/material/Grid'

// ** Demo Components
import AboutOverview from './profile/AboutOverview'
import ProjectsTable from './profile/ProjectsTable'
// import ActivityTimeline from './profile/ActivityTimeline'
import ConnectionsTeams from './profile/ConnectionsTeams'

// ** Import OrganizationHeader
import OrganizationHeader from './OrganizationHeader'

const OrganizationProfile = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* Add OrganizationHeader at the top */}
        <OrganizationHeader />
      </Grid>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverview />
      </Grid>
      <Grid item lg={8} md={7} xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            {/* <ActivityTimeline /> */}
          </Grid>
          <ConnectionsTeams />
          <Grid item xs={12}>
            <ProjectsTable />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OrganizationProfile
