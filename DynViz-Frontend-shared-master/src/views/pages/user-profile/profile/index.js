// // ** MUI Components
// import Grid from '@mui/material/Grid'

// // ** Demo Components
// import AboutOverivew from 'src/views/pages/user-profile/profile/AboutOverivew'
// import ProjectsTable from 'src/views/pages/user-profile/profile/ProjectsTable'
// import ActivityTimeline from 'src/views/pages/user-profile/profile/ActivityTimeline'
// import ConnectionsTeams from 'src/views/pages/user-profile/profile/ConnectionsTeams'

// const ProfileTab = ({ data }) => {
//   return data && Object.values(data).length ? (
//     <Grid container spacing={6}>
//       <Grid item lg={4} md={5} xs={12}>
//         <AboutOverivew about={data.about} contacts={data.contacts} teams={data.teams} overview={data.overview} />
//       </Grid>
//       <Grid item lg={8} md={7} xs={12}>
//         <Grid container spacing={6}>
//           <Grid item xs={12}>
//             <ActivityTimeline />
//           </Grid>
//           <ConnectionsTeams connections={data.connections} teams={data.teamsTech} />
//           <Grid item xs={12}>
//             <ProjectsTable />
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   ) : null
// }

// export default ProfileTab




//  modified by arman khan




// // ** MUI Components
// import Grid from '@mui/material/Grid'

// // ** Demo Components
// import AboutOverivew from 'src/views/pages/user-profile/profile/AboutOverivew'


// const ProfileTab = ({ data }) => {
//   return data && Object.values(data).length ? (
//     <Grid container spacing={6}>
//       <Grid item lg={4} md={5} xs={12}>
//         <AboutOverivew about={data.about} contacts={data.contacts} teams={data.teams} overview={data.overview} />
//       </Grid>

//     </Grid>
//   ) : null
// }

// export default ProfileTab



//  binded user api


// src/views/pages/user-profile/profile/ProfileTab.js

import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import AboutOverivew from 'src/views/pages/user-profile/profile/AboutOverivew';
import getUserById from 'src/api/user/getUserById';

const ProfileTab = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getUserById()
      .then(response => {
        const userData = response.Data[0];
        const about = [
          { property: 'Full Name', value: userData.Name },
          { property: 'Status', value: userData.Status === 1 ? 'Active' : 'Inactive' },
          { property: 'Role', value: userData.RoleID },  // Assuming role ID can be used directly
          { property: 'Country', value: userData.Country },
          { property: 'Language', value: userData.Language || 'N/A' },
        ];
        const contacts = [
          { property: 'Contact', value: userData.PhoneNo },
          { property: 'Email', value: userData.Email },
        ];
        const teams = [
          { property: 'Team', value: userData.Team?.Name || 'N/A', color: 'primary', icon: 'bx:group' }
        ];
        setData({ about, contacts, teams });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return data ? (
    <Grid container spacing={6}>
      <Grid item lg={4} md={5} xs={12}>
        <AboutOverivew about={data.about} contacts={data.contacts} teams={data.teams} />
      </Grid>
    </Grid>
  ) : null;
};

export default ProfileTab;
