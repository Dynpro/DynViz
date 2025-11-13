import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** API Imports
import getAllConnections from '../../api/connections/getAllConnections';
import getConnection from 'src/api/connections/getConnection';
import updateConnection from '../../api/connections/updateConnections';
import deleteConnection from '../../api/connections/deleteConnections';

const Connections = () => {
  // ** States
  const [openEditCard, setOpenEditCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const result = await getAllConnections();
        if (result.code === 200) {
          setConnections(result.Data);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Failed to fetch connections', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  const handleEditCardClickOpen = async (id) => {
    try {
      const result = await getConnection(id);
      const card = result.Data;

      setSelectedCard({
        cardId: card.ID,
        focus: undefined,
        name: card.Name,
        host: card.Params.host,
        port: card.Params.port,
        password: card.Params.password,
        username: card.Params.username,
        database_name: card.Params.database_name,
        DBType: card.DBType,
        Status: card.Status,
        ConnectionMasterID: card.ConnectionMasterID,
        expiry: card.CreatedDate,
      });
      setOpenEditCard(true);
    } catch (error) {
      console.error('Failed to fetch connection details', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await updateConnection(accessToken, selectedCard.cardId, selectedCard);

      // Update the connection details in the state
      const updatedConnections = connections.map((conn) => {
        if (conn.ID === response.Data.ID) {
          return response.Data;
        } else {
          return conn;
        }
      });

      setConnections(updatedConnections);

      toast.success('Connection Details Updated Successfully', {
        toastId: toastId,
      });

      console.log(response.message);
    } catch (error) {
      toast.error('Error in updating the connection details', {
        toastId: toastId,
      });
      console.error('Failed to update connection', error);
    } finally {
      handleEditCardClose();
    }
  };

  const handleDelete = async (id) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await deleteConnection(accessToken, id);

      // Remove the deleted connection from the state
      const updatedConnections = connections.filter((conn) => conn.ID !== id);
      setConnections(updatedConnections);

      toast.success('Connection Deleted Successfully', {
        toastId: toastId,
      });

      console.log(response.message);
    } catch (error) {
      toast.error('Error in deleting the connection', {
        toastId: toastId,
      });
      console.error('Failed to delete connection', error);
    }
  };

  const handleEditCardClose = () => {
    setOpenEditCard(false);
    setTimeout(() => {
      setSelectedCard(null);
    }, 200);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography color='error'>{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      {/* Header Section */}
      <Box
        sx={{
          mb: 4,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='h4'>Connections</Typography>
          <Link href='/connections/addconnections' passHref>
            <Button variant='contained' component='a'>
              Create Connection
            </Button>
          </Link>
        </Box>
        <Typography sx={{ color: 'text.secondary', mt: 1 }}>
          Manage and view details of all connections. Here you can add, edit, or delete connections as needed.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Typography sx={{ mb: 4, fontWeight: 500 }}>My Connections</Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              {connections.map((item, index) => (
                <Box
                  key={item.ID}
                  sx={{
                    p: 5,
                    display: 'flex',
                    borderRadius: 1,
                    justifyContent: 'space-between',
                    backgroundColor: 'action.hover',
                    flexDirection: ['column', 'row'],
                    alignItems: ['flex-start', 'center'],
                    mb: index !== connections.length - 1 ? 4 : undefined
                  }}
                >
                  <div>
                    <Typography sx={{ fontWeight: 500 }}>{item.Name}</Typography>
                  </div>

                  <Box sx={{ mt: [3, 0], textAlign: ['start', 'end'] }}>
                    <Button variant='outlined' sx={{ mr: 2 }} onClick={() => handleEditCardClickOpen(item.ID)}>
                      Edit
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={() => handleDelete(item.ID)}>
                      Delete
                    </Button>
                    <Typography variant='caption' sx={{ mt: 8, display: 'block', color: 'text.secondary' }}>
                      Connection created on: {new Date(item.CreatedDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog
        open={openEditCard}
        onClose={handleEditCardClose}
        aria-labelledby='user-view-billing-edit-card'
        aria-describedby='user-view-billing-edit-card-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
      >
        <DialogTitle
          id='user-view-billing-edit-card'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: (theme) => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          Edit Connection
        </DialogTitle>
        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(6)} !important`,
            px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <DialogContentText
            variant='body2'
            id='user-view-billing-edit-card-description'
            sx={{ textAlign: 'center', mb: 7 }}
          >
            Edit your saved connection details
          </DialogContentText>
          {selectedCard !== null && (
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Connection Name'
                    name='connectionNameDialog'
                    value={selectedCard.name}
                    onChange={(e) => setSelectedCard({ ...selectedCard, name: e.target.value })}
                    onFocus={(e) => setSelectedCard({ ...selectedCard, focus: e.target.name })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Host'
                    name='host'
                    value={selectedCard.host}
                    onChange={(e) => setSelectedCard({ ...selectedCard, host: e.target.value })}
                    onFocus={(e) => setSelectedCard({ ...selectedCard, focus: e.target.name })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Port'
                    name='port'
                    value={selectedCard.port}
                    onChange={(e) => setSelectedCard({ ...selectedCard, port: e.target.value })}
                    onFocus={(e) => setSelectedCard({ ...selectedCard, focus: e.target.name })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Username'
                    name='username'
                    value={selectedCard.username}
                    onChange={(e) => setSelectedCard({ ...selectedCard, username: e.target.value })}
                    onFocus={(e) => setSelectedCard({ ...selectedCard, focus: e.target.name })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Password'
                    name='password'
                    type='password'
                    value={selectedCard.password}
                    onChange={(e) => setSelectedCard({ ...selectedCard, password: e.target.value })}
                    onFocus={(e) => setSelectedCard({ ...selectedCard, focus: e.target.name })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Database Name'
                    name='databaseName'
                    value={selectedCard.database_name}
                    onChange={(e) => setSelectedCard({ ...selectedCard, database_name: e.target.value })}
                    onFocus={(e) => setSelectedCard({ ...selectedCard, focus: e.target.name })}
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 5 }}>
          <Button color='inherit' onClick={handleEditCardClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant='contained'>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default Connections;
