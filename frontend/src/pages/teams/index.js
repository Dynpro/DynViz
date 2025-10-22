import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import PageHeader from 'src/@core/components/page-header'; // Adjust import path as needed
import Teams from '../../pages/components/cards/Teams/Teams';
import AddTeamModal from 'src/@core/components/option-menu/teams/AddTeamModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getAllTeams from 'src/api/teams/getAllTeams';
import getUser from 'src/api/user/getUser';

const TeamsPage = () => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamData, userData] = await Promise.all([getAllTeams(), getUser()]);
        setTeams(teamData);
        setUsers(userData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateTeam = (updatedTeam) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) => (team.title === updatedTeam.title ? updatedTeam : team))
    );
  };

  const handleTeamAdded = (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  return (
    <Box sx={{ p: 4 }}>
      <PageHeader
        title={
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Typography variant='h4' fontWeight={700}>
              Teams List
            </Typography>
            <Button variant='contained' color='primary' onClick={handleClickOpen}>
              Add Team
            </Button>
          </Box>
        }
        subtitle={
          <Typography color='text.secondary'>
            Manage your teams and their members. You can create new teams and view existing ones below.
          </Typography>
        }
      />
      <Grid container spacing={6} sx={{ mt: 4 }}>
        <Teams data={teams} users={users} handleUpdateTeam={handleUpdateTeam} />
      </Grid>
      <AddTeamModal open={open} handleClose={handleClose} onTeamAdded={handleTeamAdded} />
      <ToastContainer />
    </Box>
  );
};

export default TeamsPage;
