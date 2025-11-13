import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomChip from 'src/@core/components/mui/chip';
import CustomAvatar from 'src/@core/components/mui/avatar';
import { getInitials } from 'src/@core/utils/get-initials';
import { AiOutlineComment } from 'react-icons/ai';

const ProjectAvatar = ({ project }) => {
  const { name = 'Unnamed Project', avatar, avatarColor = 'primary' } = project || {};

  return avatar ? (
    <CustomAvatar src={avatar} sx={{ width: 38, height: 38 }} />
  ) : (
    <CustomAvatar skin='light' color={avatarColor} sx={{ width: 38, height: 38 }}>
      {getInitials(name)}
    </CustomAvatar>
  );
};

const ProjectCard = ({ project = {}, onEditClick, onDeleteClick }) => {
  const {
    id = 'default-id',
    name = 'Project Name',
    client = 'N/A',
    budgetSpent = 'N/A',
    budget = 'N/A',
    startDate = 'N/A',
    deadline = 'N/A',
    description = 'No description available',
    hours = 'N/A',
    completedTask = 0,
    totalTask = 0,
    chipColor = 'default',
    teamMembers = 'N/A',
    comments = '0'
  } = project;

  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNameClick = (event) => {
    event.stopPropagation();
    router.push(`/project/${id}`);
  };

  return (
    <Card
      sx={{ cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CardHeader
        avatar={<ProjectAvatar project={project} />}
        sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
        subheader={
          <Typography sx={{ color: 'text.secondary' }}>
            <strong>Client:</strong> {client}
          </Typography>
        }
        action={
          <IconButton
            sx={{
              size: 'small',
              borderRadius: '8px',
              padding: '8px',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: '#e3f2fd',
                color: '#1565c0'
              }
            }}
            onClick={handleMenuClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography
            variant='h6'
            onClick={handleNameClick}
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {name}
          </Typography>
        }
      />
      <CardContent>
        <Box
          sx={{
            mb: 4,
            gap: 2,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <CustomChip
            rounded
            size='small'
            skin='light'
            sx={{ height: 60 }}
            label={
              <>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ fontWeight: 500 }}>{budgetSpent}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{`/${budget}`}</Typography>
                </Box>
                <Typography sx={{ color: 'text.secondary' }}>Total Budget</Typography>
              </>
            }
          />
          <Box sx={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: 1, fontWeight: 500 }}>Start Date:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{startDate}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ mr: 1, fontWeight: 500 }}>Deadline:</Typography>
              <Typography sx={{ color: 'text.secondary' }}>{deadline}</Typography>
            </Box>
          </Box>
        </Box>
        <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
      </CardContent>
      <Divider sx={{ my: '0 !important' }} />
      <CardContent>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 1, fontWeight: 500 }}>All Hours:</Typography>
            <Typography sx={{ color: 'text.secondary' }}>{hours}</Typography>
          </Box>
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={chipColor}
            label={`${project.daysLeft || 'N/A'} days left`}
          />
        </Box>
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='body2'>{`Tasks: ${completedTask}/${totalTask}`}</Typography>
          <Typography variant='body2'>
            {`${Math.round(((completedTask || 0) / (totalTask || 1)) * 100)}% Completed`}
          </Typography>
        </Box>
        <LinearProgress
          color='primary'
          variant='determinate'
          value={Math.round(((completedTask || 0) / (totalTask || 1)) * 100)}
          sx={{
            mb: 4,
            height: 8,
            borderRadius: 2,
            '& .MuiLinearProgress-bar': { borderRadius: 2 }
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' sx={{ color: 'text.disabled' }}>
              {teamMembers} Team Members
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              '& svg': { mr: 1, color: 'text.secondary' }
            }}
          >
            <AiOutlineComment style={{ marginRight: 8, color: 'text.secondary' }} />
            <Typography sx={{ color: 'text.secondary' }}>{comments}</Typography>
          </Box>
        </Box>
      </CardContent>
      <Menu
        id={`project-menu-${id}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(id);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(id);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default ProjectCard;
