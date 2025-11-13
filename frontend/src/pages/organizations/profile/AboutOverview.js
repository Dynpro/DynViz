import React, { useState, useEffect } from 'react'
import axios from 'axios'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import OptionsMenu from 'src/@core/components/option-menu/organization/index'

// ** API
import getOrganizationDetails from 'src/api/aboutoverview/getOrg'
import updateOrganizationDetails from 'src/api/aboutoverview/updateOrg'

const renderList = arr => {
  if (arr && arr.length) {
    return arr.map((item, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          '&:not(:last-of-type)': { mb: 4 },
          '& svg': { color: 'text.secondary' }
        }}
      >
        <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon icon={item.icon} />
        </Box>
        <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {typeof item.value === 'string' && item.value
              ? item.value.charAt(0).toUpperCase() + item.value.slice(1)
              : String(item.value)}
          </Typography>
        </Box>
      </Box>
    ))
  } else {
    return null
  }
}

const AboutOverview = () => {
  const [data, setData] = useState({
    about: [],
    contacts: [],
    teams: [],
    overview: [],
    id: null // Add ID to the state
  })

  // ** State for dialog
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const orgData = await getOrganizationDetails()
        setData({
          about: [
            { icon: 'bx:bx-home', property: 'Name', value: orgData.Name },
            { icon: 'bx:bx-mail-send', property: 'Email', value: orgData.Email },
            { icon: 'bx:bx-link', property: 'Domain', value: orgData.Domain },
            { icon: 'bx:bx-briefcase', property: 'AccountType', value: orgData.AccountType },
            { icon: 'bx:bx-shield', property: 'Status', value: orgData.Status },
            { icon: 'bx:bx-world', property: 'Country', value: orgData.Country }
          ],
          contacts: [{ icon: 'bx:bx-phone', property: 'PhoneNo', value: orgData.PhoneNo }],
          teams: [],
          overview: [],
          id: orgData.ID // Store the ID in the state
        })
      } catch (error) {
        console.error('Error fetching organization data:', error)
      }
    }

    fetchOrganizationData()
  }, [])

  const handleClickOpen = () => {
    const combinedData = [...data.about, ...data.contacts].reduce((acc, item) => {
      acc[item.property] = item.value
      return acc
    }, {})
    setFormData(combinedData)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      // Prepare the payload with all necessary fields
      const payload = {
        ID: data.id, // use the ID from the state
        Name: formData.Name,
        Email: formData.Email,
        Domain: formData.Domain,
        AccountType: formData.AccountType,
        Status: formData.Status,
        Country: formData.Country,
        CountryCode: formData.CountryCode || '+91', // use existing country code or set default
        PhoneNo: formData.PhoneNo.replace(/[^0-9]/g, ''), // Ensure phone number is in numeric format
        Logo: formData.Logo || '',
        CreatedByID: formData.CreatedByID || 1181592705,
        CreatedDate: formData.CreatedDate || '2024-05-14T15:23:49.672035+05:30',
        LastModifiedBy: formData.LastModifiedBy || 1181592705,
        LastModifiedDate: new Date().toISOString(), // set the current date-time
        DeactivateByID: formData.DeactivateByID || 0,
        DeactivateDate: formData.DeactivateDate || null,
        Users: formData.Users || null,
        Role: formData.Role || null,
        Team: formData.Team || null,
        UAC: formData.UAC || null
      }

      const response = await updateOrganizationDetails(payload)

      if (response.code === 200) {
        // Update the data state with the new form data
        const updatedData = {
          about: data.about.map(item => ({ ...item, value: formData[item.property] || item.value })),
          contacts: data.contacts.map(item => ({ ...item, value: formData[item.property] || item.value })),
          teams: data.teams,
          overview: data.overview,
          id: data.id // Keep the ID unchanged
        }
        setData(updatedData)
        handleClose()
      } else {
        console.error('Error saving organization details:', response.message)
      }
    } catch (error) {
      console.error('Error saving organization details:', error)
    }
  }

  const menuOptions = [
    { text: 'Edit', onClick: handleClickOpen },
    { text: 'Deactivate Account', onClick: () => alert('Deactivate action') }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 7, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                  About Organization
                </Typography>
                <OptionsMenu options={menuOptions} iconButtonProps={{ size: 'small' }} />
              </Box>
              {renderList(data.about)}
              {renderList(data.contacts)}
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 7, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                  Teams
                </Typography>
              </Box>
              {renderList(data.teams)}
            </CardContent>
          </Card>
        </Grid> */}
        {/* <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                  Overview
                </Typography>
              </Box>
              {renderList(data.overview)}
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Information</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((key, index) => (
            <TextField
              key={index}
              margin='dense'
              name={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              fullWidth
              value={formData[key]}
              onChange={handleChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AboutOverview
