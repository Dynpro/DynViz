import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import getProjectById from 'src/api/projects/getProjectById';

const UpdateProjectPopUp = ({ projectId, open, onClose, onSave }) => {
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        try {
          const projectData = await getProjectById(projectId);
          setProjectName(projectData.Name);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch project:', error);
          setLoading(false);
        }
      }
    };

    fetchProject();
  }, [projectId]);

  const handleSave = () => {
    onSave(projectId, projectName);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProjectPopUp;



