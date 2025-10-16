import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Avatar,
  Tooltip,
  Typography,
  AvatarGroup,
  CardContent,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import Icon from 'src/@core/components/icon';
import EditTeamPopUp from 'src/@core/components/option-menu/teams/EditTeamPopUp';
import UserListTeam from 'src/@core/components/option-menu/teams/userListTeam';
import { toast } from 'react-toastify';
import deleteTeam from 'src/api/teams/deleteTeam';
import getUsersByTeam from 'src/api/teams/getUsersByTeam';

// Function to generate light pastel colors
const getRandomPastelColor = () => {
  const r = Math.floor(Math.random() * 128) + 127; // Light red
  const g = Math.floor(Math.random() * 128) + 127; // Light green
  const b = Math.floor(Math.random() * 128) + 127; // Light blue
  return `rgb(${r}, ${g}, ${b})`;
};

// Function to get initials from a team name
const getInitials = name => {
  if (!name) return '';
  const words = name.split(' ');
  return words.map(word => word.charAt(0).toUpperCase()).join('');
};

const Teams = ({ data, users }) => {
  const [teams, setTeams] = useState(data);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [userListOpen, setUserListOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTeamForMenu, setSelectedTeamForMenu] = useState(null);

  useEffect(() => {
    setTeams(data);
  }, [data]);

  const handleEditClick = team => {
    setSelectedTeam(team);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedTeam(null);
  };

  const handleMemberCountClick = async teamId => {
    try {
      const response = await getUsersByTeam(teamId);
      if (response.code === 200) {
        if (response.Data && response.Data.length > 0) {
          setSelectedUsers(response.Data);
          setUserListOpen(true);
        } else {
          toast.info('No User Found');
        }
      } else {
        toast.error(response.message || 'Failed to fetch users');
      }
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleUserListClose = () => {
    setUserListOpen(false);
    setSelectedUsers([]);
  };

  const handleUpdateTeam = updatedTeam => {
    setTeams(prevTeams => prevTeams.map(team => (team.id === updatedTeam.id ? updatedTeam : team)));
    setEditOpen(false);
  };

  const handleDeleteTeam = async id => {
    try {
      const response = await deleteTeam(id);
      if (response.code === 200) {
        toast.success(response.message);
        setTeams(teams.filter(team => team.id !== id));
      } else {
        toast.error(response.message || 'Failed to delete team');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete team');
    }
  };

  const handleMenuClick = (event, team) => {
    setAnchorEl(event.currentTarget);
    setSelectedTeamForMenu(team);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTeamForMenu(null);
  };

  const handleEditMenuClick = () => {
    handleEditClick(selectedTeamForMenu);
    handleMenuClose();
  };

  return (
    <>
      {teams && Array.isArray(teams) && teams.map((item, index) => (
        <Grid key={index} item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    sx={{ mr: 2, height: 32, width: 32, bgcolor: getRandomPastelColor() }}
                  >
                    {getInitials(item.name)}
                  </Avatar>
                  <Typography variant='h6' sx={{ fontSize: '1.125rem', color: 'text.secondary' }}>
                    {item.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                  <IconButton
                    size='medium'
                    sx={{ color: 'text.secondary' }}
                    onClick={(event) => handleMenuClick(event, item)}
                  >
                    <Icon icon='bx:menu' fontSize='large' />
                  </IconButton>
                </Box>
              </Box>
              <Typography sx={{ my: 4, color: 'text.secondary' }}>
                {item.description || 'No description available'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AvatarGroup>
                    {item.users && item.users.slice(0, 3).map((person, index) => (
                      <Tooltip key={index} title={person.Name}>
                        <Avatar
                          sx={{ height: 32, width: 32, bgcolor: getRandomPastelColor() }}
                        >
                          {getInitials(person.Name)}
                        </Avatar>
                      </Tooltip>
                    ))}
                    {item.users && item.users.length > 3 && (
                      <Tooltip title={`${item.users.length - 3} more`}>
                        <Avatar
                          sx={{ height: 32, width: 32, bgcolor: getRandomPastelColor(), cursor: 'pointer' }}
                          onClick={() => handleMemberCountClick(item.id)}
                        >
                          +{item.users.length - 3}
                        </Avatar>
                      </Tooltip>
                    )}
                  </AvatarGroup>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {selectedTeam && (
        <EditTeamPopUp
          open={editOpen}
          handleClose={handleEditClose}
          users={users}
          team={selectedTeam}
          handleUpdateTeam={handleUpdateTeam}
        />
      )}
      <UserListTeam open={userListOpen} handleClose={handleUserListClose} users={selectedUsers} />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditMenuClick}>Edit Team</MenuItem>
        <MenuItem onClick={() => handleDeleteTeam(selectedTeamForMenu?.id)}>Delete Team</MenuItem>
      </Menu>
    </>
  );
};

export default Teams;
