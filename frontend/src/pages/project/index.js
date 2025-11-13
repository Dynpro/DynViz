import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ProjectCard from '../components/cards/ProjectCard';
import ProjectPopUp from 'src/@core/components/option-menu/projects/projectPopUp';
import UpdateProjectPopUp from 'src/@core/components/option-menu/projects/UpdateProjectPopUp';
import { useRouter } from 'next/router';
import getAllProjects from 'src/api/projects/getAllProjects';
import createProject from 'src/api/projects/createProject'; // Import createProject function
import updateProject from 'src/api/projects/updateProject';
import deleteProject from 'src/api/projects/deleteProject';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import PageHeader from 'src/@core/components/page-header';
import Button from '@mui/material/Button';
import { AiOutlinePlus } from 'react-icons/ai';
import Box from '@mui/material/Box';

const colors = ['red', 'blue', 'green', 'orange', 'purple', 'pink', 'yellow', 'brown'];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects();

      const projectsWithColors = data.map((project, index) => ({
        id: project.ID,
        name: project.Name,
        iconColor: colors[index % colors.length],
      }));
      setProjects([...projectsWithColors]);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleMenuClick = (event, projectId) => {
    event.stopPropagation(); // Prevent triggering the card's onClick
    setAnchorEl({ anchor: event.currentTarget, projectId });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProjectClick = (projectId) => {
    router.push(`/project/${projectId}`);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handlePopupSave = async (projectName) => {
    try {
      await createProject(projectName);
      toast.success('Project created successfully');
      setPopupOpen(false);
      fetchProjects(); 
    } catch (error) {
      toast.error(error.message || 'Failed to create project');
    }
  };

  const handleEditClick = (projectId) => {
    setSelectedProjectId(projectId);
    setUpdatePopupOpen(true);
    handleMenuClose();
  };

  const handleUpdatePopupClose = () => {
    setUpdatePopupOpen(false);
  };

  const handleUpdatePopupSave = async (projectId, projectName) => {
    try {
      await updateProject(projectId, projectName);
      toast.success('Project updated successfully');
      setUpdatePopupOpen(false);

      setProjects((prevProjects) =>
        prevProjects.map((project) => (project.id === projectId ? { ...project, name: projectName } : project))
      );
    } catch (error) {
      toast.error(error.message || 'Failed to update project');
    }
  };

  const handleDeleteClick = async (projectId) => {
    try {
      await deleteProject(projectId);
      toast.success('Project deleted successfully');
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
    } catch (error) {
      toast.error(error.message || 'Failed to delete project');
    }
    handleMenuClose();
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{ position: 'relative', mb: 4 }}>
        <PageHeader
          title={
            <Typography sx={{ mb: 4, fontSize: '1.375rem', fontWeight: 700 }}>
              Project Overview
            </Typography>
          }
          subtitle={
            <Typography sx={{ color: 'text.secondary' }}>
              Manage and view details of all your projects. <br />
              Here you can create, update, or delete projects as needed.
            </Typography>
          }
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AiOutlinePlus />}
          onClick={() => setPopupOpen(true)}
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            borderRadius: '8px',
            padding: '8px 16px',
            textTransform: 'none',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          Create Project
        </Button>
      </Box>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={3} key={project.id}>
            <ProjectCard
              project={project}
              onClick={() => handleProjectClick(project.id)}
              onMenuClick={handleMenuClick}
              anchorEl={anchorEl}
              onMenuClose={handleMenuClose}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          </Grid>
        ))}
      </Grid>
      <ProjectPopUp open={popupOpen} onClose={handlePopupClose} onSave={handlePopupSave} />
      <UpdateProjectPopUp
        projectId={selectedProjectId}
        open={updatePopupOpen}
        onClose={handleUpdatePopupClose}
        onSave={handleUpdatePopupSave}
      />
      <ToastContainer />
    </>
  );
};

export default ProjectsPage;
