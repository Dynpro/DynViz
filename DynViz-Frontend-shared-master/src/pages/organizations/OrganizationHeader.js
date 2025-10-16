import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import axios from 'axios'
import Icon from 'src/@core/components/icon'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const OrganizationHeader = () => {
  const [data, setData] = useState(null)
  const [open, setOpen] = useState(false)

  const [formValues, setFormValues] = useState({
    coverImg: '',
    profileImg: '',
    fullName: '',
    designation: '',
    location: '',
    joiningDate: ''
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    axios.get('/pages/profile-header').then(response => {
      setData(response.data)
      setFormValues({
        coverImg: response.data.coverImg,
        profileImg: response.data.profileImg,
        fullName: response.data.fullName,
        designation: response.data.designation,
        location: response.data.location,
        joiningDate: response.data.joiningDate
      })
    })
  }, [])

  const handleClickOpen = () => {
    setFormValues({
      coverImg: data.coverImg,
      profileImg: data.profileImg,
      fullName: data.fullName,
      designation: data.designation,
      location: data.location,
      joiningDate: data.joiningDate
    })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  const handleChange = event => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleFileChange = event => {
    const { name, files } = event.target
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormValues({ ...formValues, [name]: reader.result })
    }
    if (files[0]) {
      reader.readAsDataURL(files[0])
    }
  }

  const handleSave = () => {
    axios
      .post('/pages/update-profile', formValues)
      .then(response => {
        setData(response.data)
        setOpen(false)
        setSnackbarMessage('Profile updated successfully!')
        setSnackbarOpen(true)
      })
      .catch(error => {
        console.error('Error updating profile:', error)
        setSnackbarMessage('Failed to update profile.')
        setSnackbarOpen(true)
      })
  }

  const designationIcon = data?.designationIcon || 'bx:briefcase'

  return data !== null ? (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component='img'
          alt='profile-header'
          image={data.coverImg}
          sx={{
            height: { xs: 150, md: 250 }
          }}
        />
      </Box>
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <ProfilePicture src={data.profileImg} alt='profile-picture' />
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 4, fontSize: '1.375rem' }}>
              {data.fullName}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon={designationIcon} />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{data.designation}</Typography>
              </Box>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='bx:map' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{data.location}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='bx:calendar-alt' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{data.joiningDate}</Typography>
              </Box>
            </Box>
          </Box>
          <Button variant='contained' startIcon={<Icon icon='bx:edit' fontSize={20} />} onClick={handleClickOpen}>
            EDIT ORGANIZATION
          </Button>
        </Box>
      </CardContent>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Organization</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            name='fullName'
            label='Full Name'
            type='text'
            fullWidth
            value={formValues.fullName}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='designation'
            label='Designation'
            type='text'
            fullWidth
            value={formValues.designation}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='location'
            label='Location'
            type='text'
            fullWidth
            value={formValues.location}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='joiningDate'
            label='Joining Date'
            type='text'
            fullWidth
            value={formValues.joiningDate}
            onChange={handleChange}
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept='image/*'
              style={{ display: 'none' }}
              id='coverImg'
              type='file'
              name='coverImg'
              onChange={handleFileChange}
            />
            <label htmlFor='coverImg'>
              <Button variant='contained' color='primary' component='span'>
                Upload Cover Photo
              </Button>
            </label>
          </Box>
          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept='image/*'
              style={{ display: 'none' }}
              id='profileImg'
              type='file'
              name='profileImg'
              onChange={handleFileChange}
            />
            <label htmlFor='profileImg'>
              <Button variant='contained' color='primary' component='span'>
                Upload Profile Picture
              </Button>
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage === 'Profile updated successfully!' ? 'success' : 'error'}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  ) : null
}

export default OrganizationHeader
