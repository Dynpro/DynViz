import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Icon from 'src/@core/components/icon';
import getUserById from 'src/api/user/getUserById';

// Styled component for the avatar
const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4),
  },
}));

const UserProfileHeader = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getUserById()
      .then((response) => {
        setData(response.Data[0]);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const designationIcon = data?.designationIcon || 'bx:briefcase';

  // Function to extract initials from the user's name
  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part[0]).join('');
    return initials.toUpperCase();
  };

  return data !== null ? (
    <Card>
      <CardMedia
        component="img"
        alt="profile-header"
        image="/images/pages/profile-banner.png"
        sx={{
          height: { xs: 150, md: 250 },
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        {/* Display the profile image if available; otherwise, display initials */}
        {data.profileImg ? (
          <ProfileAvatar src={data.profileImg} alt="profile-picture" />
        ) : (
          <ProfileAvatar>{getInitials(data.Name)}</ProfileAvatar>
        )}

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between'],
          }}
        >
          <Box
            sx={{
              mb: [6, 0],
              display: 'flex',
              flexDirection: 'column',
              alignItems: ['center', 'flex-start'],
            }}
          >
            <Typography variant="h5" sx={{ mb: 4, fontSize: '1.375rem' }}>
              {data.Name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start'],
              }}
            >
              <Box
                sx={{
                  mr: 4,
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1, color: 'text.secondary' },
                }}
              >
                <Icon icon={designationIcon} />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {data.designation}
                </Typography>
              </Box>
              <Box
                sx={{
                  mr: 4,
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1, color: 'text.secondary' },
                }}
              >
                <Icon icon="bx:map" />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {data.location}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': { mr: 1, color: 'text.secondary' },
                }}
              >
                <Icon icon="bx:calendar-alt" />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Joined {data.joiningDate}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<Icon icon="bx:user-check" fontSize={20} />}
          >
            Connected
          </Button>
        </Box>
      </CardContent>
    </Card>
  ) : null;
};

export default UserProfileHeader;
