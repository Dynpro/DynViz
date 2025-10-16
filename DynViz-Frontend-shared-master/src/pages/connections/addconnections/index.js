import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { checkConnection } from '../../../api/connections/checkConnections'
import { createConnection } from 'src/api/connections/createConnection'

const recommendedApps = [
  {
    id: 1,
    name: 'SNOWFLAKE',
    image: '/images/logos/snowflake.png',
    fields: [
      { label: 'Name', value: '', type: 'text' },
      { label: 'Username', value: '', type: 'text' },
      { label: 'Password', value: '', type: 'password' },
      { label: 'Account', value: '', type: 'text' },
      { label: 'Database', value: '', type: 'text' },
      // { label: 'Schema', value: '', type: 'text' },
      { label: 'Warehouse', value: '', type: 'text' },
      { label: 'Connection Master ID', value: 10002, type: 'number' },
      { label: 'DB Type', value: 'SQL', type: 'text' },
      { label: 'Status', value: 1, type: 'text' }
    ]
  },
  {
    id: 2,
    name: 'MYSQL',
    image: '/images/logos/mySQL.jpg',
    fields: [
      { label: 'MySQL Username', value: '', type: 'text' },
      { label: 'MySQL Password', value: '', type: 'password' }
    ]
  },
  {
    id: 3,
    name: 'POSTGRE SQL',
    image: '/images/logos/postgreSQL.png',
    fields: [
      { label: 'Name', value: '', type: 'text' },
      { label: 'Host', value: '', type: 'text' },
      { label: 'Port', value: '', type: 'number' },
      { label: 'Database Name', value: '', type: 'text' },
      { label: 'Username', value: '', type: 'text' },
      { label: 'Password', value: '', type: 'password' },
      { label: 'Connection Master ID', value: 10001, type: 'number' },
      { label: 'DB Type', value: 'SQL', type: 'text' },
      { label: 'Status', value: 1, type: 'text' }
    ]
  },
  {
    id: 4,
    name: 'SQL SERVER',
    image: '/images/logos/SQLServer.png',
    fields: [
      { label: 'SQL Server Username', value: '', type: 'text' },
      { label: 'SQL Server Password', value: '', type: 'password' }
    ]
  },
  {
    id: 5,
    name: 'ORACLE',
    image: '/images/logos/oracle.png',
    fields: [
      { label: 'Oracle Username', value: '', type: 'text' },
      { label: 'Oracle Password', value: '', type: 'password' }
    ]
  },
  {
    id: 6,
    name: 'DYNAMO DB',
    image: '/images/logos/DynamoDB.png',
    fields: [
      { label: 'DynamoDB Username', value: '', type: 'text' },
      { label: 'DynamoDB Password', value: '', type: 'password' }
    ]
  },
  {
    id: 7,
    name: 'NEO 4j',
    image: '/images/logos/Neo4j-logo_color.png',
    fields: [
      { label: 'Neo4j Username', value: '', type: 'text' },
      { label: 'Neo4j Password', value: '', type: 'password' }
    ]
  },
  {
    id: 8,
    name: 'COUCHBASE',
    image: '/images/logos/couchbase.png',
    fields: [
      { label: 'Couchbase Username', value: '', type: 'text' },
      { label: 'Couchbase Password', value: '', type: 'password' }
    ]
  },
  {
    id: 9,
    name: 'REDIS',
    image: '/images/logos/redis.png',
    fields: [
      { label: 'Redis Username', value: '', type: 'text' },
      { label: 'Redis Password', value: '', type: 'password' }
    ]
  },
  {
    id: 10,
    name: 'ELASTIC SEARCH',
    image: '/images/logos/elasticsearch.png',
    fields: [
      { label: 'Elasticsearch Username', value: '', type: 'text' },
      { label: 'Elasticsearch Password', value: '', type: 'password' }
    ]
  },
  // {
  //   id: 11,
  //   name: 'DJANGO',
  //   image: '/images/logos/django.png',
  //   fields: [
  //     { label: 'Django Username', value: '', type: 'text' },
  //     { label: 'Django Password', value: '', type: 'password' }
  //   ]
  // },
  // {
  //   id: 12,
  //   name: 'PHP',
  //   image: '/images/logos/php.png',
  //   fields: [
  //     { label: 'Php Username', value: '', type: 'text' },
  //     { label: 'Php Password', value: '', type: 'password' }
  //   ]
  // },
  // {
  //   id: 13,
  //   name: 'RUBY',
  //   image: '/images/logos/ruby.png',
  //   fields: [
  //     { label: 'Ruby Username', value: '', type: 'text' },
  //     { label: 'Ruby Password', value: '', type: 'password' }
  //   ]
  // },
  // {
  //   id: 14,
  //   name: 'MONGO DB',
  //   image: '/images/logos/mongoDB.png',
  //   fields: [
  //     { label: 'MongoDB Username', value: '', type: 'text' },
  //     { label: 'MongoDB Password', value: '', type: 'password' }
  //   ]
  // },
  // {
  //   id: 15,
  //   name: 'PYTHON',
  //   image: '/images/logos/python.jpg',
  //   fields: [
  //     { label: 'Python Username', value: '', type: 'text' },
  //     { label: 'Python Password', value: '', type: 'password' }
  //   ]
  // }
]

const AddConnections = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState(null)
  const [formData, setFormData] = useState({})
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState('success')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredApps, setFilteredApps] = useState(recommendedApps)

  // const handleConnectButtonClick = app => {
  //   setSelectedApp(app)
  //   setFormData({})
  //   setDialogOpen(true)
  // }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const handleConnectButtonClick = app => {
    const initialFormData = app.fields.reduce((acc, field) => {
      acc[field.label] = field.value || '' // Prepopulate with the value or an empty string
      return acc
    }, {})
    setFormData(initialFormData) // Set the initial formData
    setSelectedApp(app)
    setDialogOpen(true)
  }

  const handleConnect = async () => {
    // console.log('Connecting with data:', formData)

    try {
      const result = await createConnection(formData)
      if (result.success) {
        setSnackbarMessage('Connection created successfully')
        setSnackbarSeverity('success')

        handleCloseDialog()
      } else {
        setSnackbarMessage(`Error in created Connection: ${result.message}`)
        setSnackbarSeverity('error')
      }
    } catch (error) {
      setSnackbarMessage(`Failed to create connection: ${error.message}`)
      setSnackbarSeverity('error')
    } finally {
      setSnackbarOpen(true)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleTestConnection = async () => {
    try {
      const result = await checkConnection(formData)
      if (result.success) {
        setSnackbarMessage('Connection Tested Successfully')
        setSnackbarSeverity('success')
      } else {
        setSnackbarMessage(`Error in Testing Connection: ${result.message}`)
        setSnackbarSeverity('error')
      }
    } catch (error) {
      setSnackbarMessage(`Connection failed: ${error.message}`)
      setSnackbarSeverity('error')
    } finally {
      setSnackbarOpen(true)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  const handleSearch = () => {
    const results = recommendedApps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredApps(results)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Recommended Apps' />
          <CardContent>
            {/* Search Input Field */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                label='Search Apps'
                variant='outlined'
                fullWidth
                margin='dense'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
              />
              <IconButton onClick={handleSearch} color='primary'>
                <SearchIcon />
              </IconButton>
            </Box>
            <Typography sx={{ mb: 8, color: 'text.secondary' }}>
              Select recommended apps for your connections
            </Typography>
            <Grid container spacing={3}>
              {recommendedApps.map(app => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={app.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      mb: 10, // Add bottom margin for space between rows
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                      }
                    }}
                    onClick={() => handleConnectButtonClick(app)}
                  >
                    <img src={app.image} alt={`${app.name} logo`} width={100} height={100} />
                    <Typography sx={{ fontWeight: 500, mt: 2 }}>{app.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedApp && `Connect to ${selectedApp.name}`}</DialogTitle>
        <DialogContent>
          {selectedApp &&
            selectedApp.fields.map((field, index) => (
              <TextField
                key={index}
                autoFocus={index === 0}
                margin='dense'
                label={field.label}
                type={field.type}
                fullWidth
                value={formData[field.label] || ''}
                onChange={e => handleInputChange(field.label, e.target.value)}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTestConnection} color='primary'>
            Test
          </Button>
          <Button onClick={handleConnect} color='primary'>
            Connect
          </Button>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default AddConnections
