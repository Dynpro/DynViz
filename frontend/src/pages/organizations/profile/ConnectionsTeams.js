// ** React Imports
import { useEffect, useState } from 'react'
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'

// ** API Import
import getAllConnections from 'src/api/connections/getAllConnections'
import getAllTeams from 'src/api/teams/getAllTeams'

const ConnectionsTeams = () => {
  const [connections, setConnections] = useState([])
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const result = await getAllConnections()
        // console.log('Connections data:', result)
        setConnections(result.Data.slice(0, 5)) // Show only the first 5 connections
      } catch (error) {
        console.error('Error fetching connections:', error)
      }
    }

    const fetchTeams = async () => {
      try {
        const result = await getAllTeams()
        console.log('Teams data:', result)

        // const teamsData = result.Data && Array.isArray(result.Data) ? result.Data.slice(0, 5) : []
        const teamsData = result
        // console.log('Teams data after slicing:', teamsData)
        setTeams(teamsData) // Set the teams state with the fetched data or an empty array
      } catch (error) {
        console.error('Error fetching teams:', error)
      }
    }

    fetchConnections()
    fetchTeams()
  }, [])

  const BASE_URL = process.env.NEXT_DEPLOYED_URL

  return (
    <>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader
            title='Connections'
            action={
              <OptionsMenu
                iconButtonProps={{ size: 'small' }}
                options={['Share connections', 'Suggest edits', { divider: true }, 'Report bug']}
              />
            }
          />
          <CardContent>
            {connections &&
              connections.map((connection, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:not(:last-of-type)': { mb: 4 }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={connection.Params.logo} sx={{ mr: 4, width: 38, height: 38 }} />
                      <div>
                        <Typography sx={{ lineHeight: 1.1, fontWeight: 500 }}>{connection.Name}</Typography>
                        <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                          {connection.Params.username} - {connection.Params.host}
                        </Typography>
                      </div>
                    </Box>
                    <Button
                      size='small'
                      color='primary'
                      variant='outlined'
                      sx={{ minWidth: 38, p: theme => `${theme.spacing(1.5)} !important` }}
                    >
                      <Icon icon='bx:user' />
                    </Button>
                  </Box>
                )
              })}
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography
                href={BASE_URL + '/connections/'}
                component={Link}
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                View all connections
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader
            title='Teams'
            action={
              <OptionsMenu
                iconButtonProps={{ size: 'small' }}
                options={['Share teams', 'Suggest edits', { divider: true }, 'Report bug']}
              />
            }
          />
          <CardContent>
            {teams &&
              teams.map((team, index) => {
                // console.log('Rendering team:', team)
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      '&:not(:last-of-type)': { mb: 4 }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 4, width: 38, height: 38 }}>
                        <Icon icon='bx:group' />
                      </Avatar>
                      <div>
                        <Typography sx={{ lineHeight: 1.1, fontWeight: 500 }}>{team.name}</Typography>
                        <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                          {team.user_count} Members
                        </Typography>
                      </div>
                    </Box>
                    <Box
                      href='/'
                      component={Link}
                      onClick={e => e.preventDefault()}
                      sx={{ height: 0, textDecoration: 'none', '& .MuiChip-root': { cursor: 'pointer' } }}
                    >
                      <CustomChip rounded size='small' skin='light' color='primary' label='Active' />
                    </Box>
                  </Box>
                )
              })}
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography
                href={BASE_URL + '/teams/'}
                component={Link}
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                View all teams
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default ConnectionsTeams
