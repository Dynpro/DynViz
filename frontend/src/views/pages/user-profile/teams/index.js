import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Modal from '@mui/material/Modal'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import getAllTeams from 'src/api/teams/getAllTeams'
import createTeam from 'src/api/teams/createTeam'
import updateTeam from 'src/api/teams/updateTeam'
import getTeam from 'src/api/teams/getTeam'

const AddTeamCard = ({ onAddTeam }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button variant='contained' onClick={onAddTeam}>
        ADD TEAM
      </Button>
    </Card>
  )
}

const Team = ({ team, onViewTeam, onEditTeam, onDeleteTeam }) => {
  return (
    <Card sx={{ position: 'relative', mb: 4 }}>
      <CardContent>
        <Box
          sx={{
            mb: 8.75,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ mr: 2, mb: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant='h6'>{team.Name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Tooltip title='Edit Team'>
                <IconButton onClick={() => onEditTeam(team)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='View Team'>
                <IconButton onClick={() => onViewTeam(team)}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Delete Team'>
                <IconButton onClick={() => onDeleteTeam(team)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* <Typography variant='subtitle2' sx={{ whiteSpace: 'nowrap', color: 'text.primary' }}>
            {team.members || 0} members
          </Typography> */}
          <AvatarGroup max={4}>
            {team.user?.map(user => (
              <Tooltip title={user.name} key={user.name}>
                <Avatar src={user.src} alt={user.name} />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Box>
      </CardContent>
    </Card>
  )
}

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [users, setUsers] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedTeam, setEditedTeam] = useState(null)
  const [addTeamMode, setAddTeamMode] = useState(false)
  const [newTeam, setNewTeam] = useState({ name: '', user: [] })

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getAllTeams()
        if (response && response.Data) {
          setTeams(response.Data)
        }
      } catch (error) {
        console.error('Error fetching teams:', error)
      }
    }

    fetchTeams()
  }, [])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getall`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (data && data.Data) {
          setUsers(
            data.Data.map(user => ({
              id: user.ID,
              name: user.Name,
              src: '/images/avatars/1.png' // You might want to use actual avatar URLs if available in your data
            }))
          )
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  const handleViewTeam = team => {
    setSelectedTeam(team)
  }

  const handleEditTeam = async team => {
    setEditMode(true)
    try {
      const response = await getTeam(team.ID)
      if (response && response.Data) {
        setEditedTeam({
          ID: response.Data.ID,
          Name: response.Data.Name,
          user: response.Data.User || []
        })
      }
    } catch (error) {
      console.error('Error fetching team details:', error)
    }
  }

  const handleAddTeam = () => {
    setAddTeamMode(true)
  }

  const handleDeleteTeam = team => {
    setTeams(teams.filter(t => t.ID !== team.ID))
  }

  const handleSaveEditedTeam = async () => {
    try {
      const teamData = {
        ID: editedTeam.ID,
        Name: editedTeam.Name,
        UserID: editedTeam.user.map(user => user.id)
      }
      const response = await updateTeam(teamData)
      console.log(response)

      if (response && response.code === 200) {
        setTeams(teams.map(team => (team.ID === editedTeam.ID ? editedTeam : team)))
        setEditMode(false)
        setEditedTeam(null)
      }
    } catch (error) {
      console.error('Error updating team:', error)
    }
  }

  const handleSaveNewTeam = async () => {
    try {
      const teamData = {
        Name: newTeam.name,
        UserID: newTeam.user.map(user => user.id)
      }
      const response = await createTeam(teamData)
      console.log(response)

      // Assuming the response contains the new team details
      setTeams([
        ...teams,
        {
          ...response.Data, // Use the actual data from response
          members: newTeam.user.length,
          image: '/images/cards/background-user.png',
          avatar: '/images/avatars/1.png'
        }
      ])
      // Close the modal
      setAddTeamMode(false)
      setNewTeam({ name: '', user: [] })
    } catch (error) {
      console.error('Error saving new team:', error)
    }
  }

  return (
    <Box>
      <Typography variant='h5' gutterBottom>
        Teams
      </Typography>
      <Grid container spacing={4}>
        {teams.map(team => (
          <Grid item xs={12} sm={6} md={4} key={team.ID}>
            <Team team={team} onViewTeam={handleViewTeam} onEditTeam={handleEditTeam} onDeleteTeam={handleDeleteTeam} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4}>
          <AddTeamCard onAddTeam={handleAddTeam} />
        </Grid>
      </Grid>
      <Modal
        open={selectedTeam !== null || editMode || addTeamMode}
        onClose={() => {
          setSelectedTeam(null)
          setEditMode(false)
          setAddTeamMode(false)
        }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card sx={{ p: 4, minWidth: 300 }}>
          {editMode && editedTeam ? (
            <Box>
              <TextField
                label='Team Name'
                value={editedTeam.Name}
                onChange={e => setEditedTeam({ ...editedTeam, Name: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Autocomplete
                multiple
                options={users}
                getOptionLabel={option => option.name}
                value={editedTeam.user}
                onChange={(event, newValue) => {
                  setEditedTeam({ ...editedTeam, user: newValue })
                }}
                renderInput={params => (
                  <TextField {...params} label='Add Members' placeholder='Select members to add' />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    <Avatar src={option.src} alt={option.name} sx={{ mr: 2 }} />
                    {option.name}
                  </li>
                )}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='contained' onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
                <Button variant='contained' onClick={handleSaveEditedTeam}>
                  Save
                </Button>
              </Box>
            </Box>
          ) : selectedTeam ? (
            <Box>
              <Typography variant='h6'>{selectedTeam.Name}</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedTeam.user?.map(user => (
                  <Tooltip key={user.name} title={user.name}>
                    <Avatar src={user.src} alt={user.name} sx={{ cursor: 'pointer' }} />
                  </Tooltip>
                ))}
              </Box>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='contained' onClick={() => setSelectedTeam(null)}>
                  Close
                </Button>
              </Box>
            </Box>
          ) : addTeamMode ? (
            <Box>
              <TextField
                label='Team Name'
                value={newTeam.name}
                onChange={e => setNewTeam({ ...newTeam, name: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Autocomplete
                multiple
                options={users}
                getOptionLabel={option => option.name}
                value={newTeam.user}
                onChange={(event, newValue) => {
                  setNewTeam({ ...newTeam, user: newValue })
                }}
                renderInput={params => (
                  <TextField {...params} label='Add Members' placeholder='Select members to add' />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    <Avatar src={option.src} alt={option.name} sx={{ mr: 2 }} />
                    {option.name}
                  </li>
                )}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='contained' onClick={() => setAddTeamMode(false)}>
                  Cancel
                </Button>
                <Button variant='contained' onClick={handleSaveNewTeam}>
                  Save
                </Button>
              </Box>
            </Box>
          ) : null}
        </Card>
      </Modal>
    </Box>
  )
}

export default Teams
