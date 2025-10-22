// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import { CardContent, Typography } from '@mui/material'
// import FolderCard from '../../../pages/components/cards/FolderCard'
// import FolderPopUp from 'src/@core/components/option-menu/projects/folderPopup'
// import UpdateFolderPopUp from 'src/@core/components/option-menu/folders/UpdateFolderPopUp'
// import { MdFolderCopy } from 'react-icons/md'
// import getAllFolders from 'src/api/folders/getAllFolders'
// import createFolder from 'src/api/folders/createFolder'
// import updateFolder from 'src/api/folders/updateFolder'
// import deleteFolder from 'src/api/folders/deleteFolder'

// const getRandomColor = () => {
//   const colors = [
//     '#f44336',
//     '#e91e63',
//     '#9c27b0',
//     '#673ab7',
//     '#3f51b5',
//     '#2196f3',
//     '#03a9f4',
//     '#00bcd4',
//     '#009688',
//     '#4caf50',
//     '#8bc34a',
//     '#cddc39',
//     '#ffeb3b',
//     '#ffc107',
//     '#ff9800',
//     '#ff5722',
//     '#795548',
//     '#607d8b'
//   ]
//   return colors[Math.floor(Math.random() * colors.length)]
// }

// const FolderPage = () => {
//   const router = useRouter()
//   const { projectId } = router.query
//   const [folders, setFolders] = useState([])
//   const [popupOpen, setPopupOpen] = useState(false)
//   const [updatePopupOpen, setUpdatePopupOpen] = useState(false)
//   const [selectedFolder, setSelectedFolder] = useState(null)
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [accessToken, setAccessToken] = useState(null)

//   // Get accessToken from localStorage on client side
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setAccessToken(localStorage.getItem('accessToken'))
//     }
//   }, [])

//   useEffect(() => {
//     if (projectId) {
//       getAllFolders(projectId)
//         .then(data => setFolders(data))
//         .catch(error => console.error('Failed to fetch folders:', error))
//     }
//   }, [projectId])

//   const handleCreateFolder = () => {
//     setPopupOpen(true)
//   }

//   const handleSaveFolder = async folderName => {
//     if (folderName.trim() !== '') {
//       try {
//         const response = await createFolder(accessToken, projectId, folderName)
//         console.log('Folder created successfully:', response)

//         const newFolder = {
//           ID: response.Data?.ID || folders.length + 1,
//           Name: folderName.trim(),
//           iconColor: getRandomColor()
//         }
//         setFolders([...folders, newFolder])
//         setPopupOpen(false)
//       } catch (error) {
//         console.error('Failed to create folder:', error)
//       }
//     }
//   }

//   const handleMenuClick = (event, folder) => {
//     setAnchorEl({ anchor: event.currentTarget, folder })
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleEditFolder = folder => {
//     setSelectedFolder(folder)
//     setUpdatePopupOpen(true)
//     handleMenuClose()
//   }

//   const handleSaveUpdatedFolder = async (id, folderName) => {
//     try {
//       const response = await updateFolder(accessToken, id, folderName)
//       console.log('Folder updated successfully:', response)

//       setFolders(folders.map(folder => (folder.ID === id ? { ...folder, Name: folderName } : folder)))
//       setUpdatePopupOpen(false)
//     } catch (error) {
//       console.error('Failed to update folder:', error)
//     }
//   }

//   const handleDeleteFolder = async id => {
//     try {
//       const response = await deleteFolder(accessToken, id)
//       console.log('Folder deleted successfully:', response)

//       setFolders(folders.filter(folder => folder.ID !== id))
//     } catch (error) {
//       console.error('Failed to delete folder:', error)
//     }
//   }

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} sm={6} md={3}>
//         <Card
//           sx={{
//             position: 'relative',
//             cursor: 'pointer',
//             '&:hover': { boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }
//           }}
//           onClick={handleCreateFolder}
//         >
//           <CardContent>
//             <Typography
//               variant='h5'
//               component='div'
//               sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//             >
//               <div
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   marginBottom: '18px',
//                   width: '42px',
//                   height: '42px',
//                   borderRadius: '50%',
//                   boxShadow: '0 0 0 5px rgba(0,0,0,0.1)',
//                   backgroundColor: 'white'
//                 }}
//               >
//                 <MdFolderCopy style={{ color: '#1976d2' }} />
//               </div>
//             </Typography>
//             <Typography variant='h6' sx={{ textAlign: 'center', mt: 2 }}>
//               Create Folder
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//       {folders.map(folder => (
//         <Grid item xs={12} sm={6} md={3} key={folder.ID}>
//           <FolderCard
//             projectId={projectId}
//             folder={{ id: folder.ID, name: folder.Name, iconColor: folder.iconColor || getRandomColor() }}
//             onMenuClick={handleMenuClick}
//             anchorEl={anchorEl}
//             onMenuClose={handleMenuClose}
//             onEdit={handleEditFolder}
//             onDelete={handleDeleteFolder}
//           />
//         </Grid>
//       ))}
//       <FolderPopUp open={popupOpen} onClose={() => setPopupOpen(false)} onSave={handleSaveFolder} />
//       {selectedFolder && (
//         <UpdateFolderPopUp
//           open={updatePopupOpen}
//           onClose={() => setUpdatePopupOpen(false)}
//           onSave={handleSaveUpdatedFolder}
//           folder={selectedFolder}
//         />
//       )}
//     </Grid>
//   )
// }

// export default FolderPage









//  make create folder card as button



import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { CardContent, Typography, Box, Button } from '@mui/material'
import FolderCard from '../../../pages/components/cards/FolderCard'
import FolderPopUp from 'src/@core/components/option-menu/projects/folderPopup'
import UpdateFolderPopUp from 'src/@core/components/option-menu/folders/UpdateFolderPopUp'
import { MdFolderCopy, MdCreateNewFolder } from 'react-icons/md'
import getAllFolders from 'src/api/folders/getAllFolders'
import createFolder from 'src/api/folders/createFolder'
import updateFolder from 'src/api/folders/updateFolder'
import deleteFolder from 'src/api/folders/deleteFolder'
import PageHeader from 'src/@core/components/page-header'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Set all folder icons to yellow
const folderIconColor = '#ffc107' // Yellow color

const FolderPage = () => {
  const router = useRouter()
  const { projectId } = router.query
  const [folders, setFolders] = useState([])
  const [popupOpen, setPopupOpen] = useState(false)
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Get accessToken from localStorage on client side

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken'))
    }
  }, [])




  // useEffect(() => {
  //   if (projectId) {
  //     getAllFolders(projectId)
  //       .then(data => setFolders(data))
  //       .catch(error => console.error('Failed to fetch folders:', error))
  //   }
  // }, [projectId])

  const fetchFolders = async () => {
    if (projectId) {
      setIsLoading(true)
      try {
        const data = await getAllFolders(projectId)
        setFolders(data)
      } catch (error) {
        console.error('Failed to fetch folders:', error)
        toast.error('Failed to load folders')
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchFolders()
  }, [projectId])




  const handleCreateFolder = () => {
    setPopupOpen(true)
  }

  const handleSaveFolder = async folderName => {
    if (folderName.trim() !== '') {
      setIsLoading(true)
      try {
        const response = await createFolder(accessToken, projectId, folderName)
        console.log('Folder created successfully:', response)

        const newFolder = {
          ID: response.Data?.ID || folders.length + 1,
          Name: folderName.trim(),
          iconColor: folderIconColor
        }
        setFolders([...folders, newFolder])
        setPopupOpen(false)
        toast.success('Folder created successfully')
      } catch (error) {
        console.error('Failed to create folder:', error)
        toast.error('Failed to create folder')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleMenuClick = (event, folder) => {
    setAnchorEl({ anchor: event.currentTarget, folder })
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEditFolder = folder => {
    setSelectedFolder(folder)
    setUpdatePopupOpen(true)
    handleMenuClose()
  }

  const handleSaveUpdatedFolder = async (id, folderName) => {
    setIsLoading(true)
    try {
      const response = await updateFolder(accessToken, id, folderName)
      console.log('Folder updated successfully:', response)

      setFolders(folders.map(folder => (folder.ID === id ? { ...folder, Name: folderName } : folder)))
      setUpdatePopupOpen(false)
      toast.success('Folder updated successfully')
    } catch (error) {
      console.error('Failed to update folder:', error)
      toast.error('Failed to update folder')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteFolder = async id => {
    setIsLoading(true)
    try {
      const response = await deleteFolder(accessToken, id)
      console.log('Folder deleted successfully:', response)

      setFolders(folders.filter(folder => folder.ID !== id))
      toast.success('Folder deleted successfully')
    } catch (error) {
      console.error('Failed to delete folder:', error)
      toast.error('Failed to delete folder')
    } finally {
      setIsLoading(false)
      handleMenuClose()
    }
  }

  return (
    <>

<ToastContainer position="top-right" autoClose={3000} />

      <Box sx={{ position: 'relative', mb: 6 }}>
        <PageHeader
          title={
            <Typography sx={{ mb: 4, fontSize: '1.5rem', fontWeight: 700 }}>
              Folder Overview
            </Typography>
          }
          subtitle={
            <Typography sx={{ color: 'text.secondary' }}>
              Manage and organize your project files in folders. <br />
              Create, update, or delete folders to keep your project organized.
            </Typography>
          }
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<MdCreateNewFolder />}
          onClick={handleCreateFolder}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            borderRadius: '8px',
            padding: '8px 16px',
            textTransform: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            // bgcolor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          Create Folder
        </Button>
      </Box>

      {folders.length === 0 ? (
        <Card
          sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: '12px',
            bgcolor: '#f9f9f9',
            border: '1px dashed #ccc',
            mb: 6
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No folders yet. Click the "Create Folder" button to get started!
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {folders.map(folder => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={folder.ID}>
              <FolderCard
                projectId={projectId}
                folder={{ id: folder.ID, name: folder.Name, iconColor: folderIconColor }}
                onMenuClick={handleMenuClick}
                anchorEl={anchorEl}
                onMenuClose={handleMenuClose}
                onEdit={handleEditFolder}
                onDelete={handleDeleteFolder}
                isLoading={isLoading}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <FolderPopUp open={popupOpen} onClose={() => setPopupOpen(false)} onSave={handleSaveFolder} isLoading={isLoading}/>
      {selectedFolder && (
        <UpdateFolderPopUp
          open={updatePopupOpen}
          onClose={() => setUpdatePopupOpen(false)}
          onSave={handleSaveUpdatedFolder}
          folder={selectedFolder}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default FolderPage