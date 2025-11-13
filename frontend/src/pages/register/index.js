
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import IconButton from '@mui/material/IconButton';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import { styled, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Icon from 'src/@core/components/icon';
// import themeConfig from 'src/configs/themeConfig';
// import BlankLayout from 'src/@core/layouts/BlankLayout';
// import { signUp } from 'src/api/signup/signup';
// import { useSettings } from 'src/@core/hooks/useSettings';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import { fetchCountries, fetchCountryCode } from 'src/api/signup/countryApi';
 
// const RegisterIllustration = styled('img')({
//   height: 'auto',
//   maxWidth: '100%',
// });
 
// const RightWrapper = styled(Box)(({ theme }) => ({
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: theme.spacing(6),
//   backgroundColor: theme.palette.background.paper,
//   [theme.breakpoints.up('lg')]: {
//     maxWidth: 480,
//   },
//   [theme.breakpoints.up('xl')]: {
//     maxWidth: 635,
//   },
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(12),
//   },
// }));
 
// const LinkStyled = styled(Link)(({ theme }) => ({
//   fontSize: '0.875rem',
//   textDecoration: 'none',
//   color: theme.palette.primary.main,
// }));
 
// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState('');
//   const [retypePassword, setRetypePassword] = useState('');
//   const [passwordMatchError, setPasswordMatchError] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [countryCode, setCountryCode] = useState('');
//   const { settings } = useSettings();
//   const theme = useTheme();
//   const hidden = useMediaQuery(theme.breakpoints.down('lg'));
 
//   useEffect(() => {
//     const loadCountries = async () => {
//       try {
//         const countryList = await fetchCountries();
//         console.log("countyr list", countryList)
//         setCountries(countryList);
//       } catch (error) {
//         toast.error('Error fetching countries');
//       }
//     };
 
//     loadCountries();
//   }, []);
 
//   const handleCountryChange = async (event) => {
//     const country = event.target.value;
//     setSelectedCountry(country);
 
//     try {
//       const code = await fetchCountryCode(country);
//       setCountryCode(code[0]); 
//     } catch (error) {
//       toast.error('Error fetching country code');
//     }
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
 
//     if (password !== retypePassword) {
//       setPasswordMatchError(true);
     
//       return;
//     }
 
//     try {
//       const userData = {
//         name: e.target.name.value,
//         email: e.target.email.value,
//         password: password,
//         organization: e.target.organization.value,
//         domain: e.target.domain.value,
//         accountType: e.target.accountType.value,
//         country: selectedCountry,
//         countryCode: countryCode,
//         phoneNo: e.target.phoneNo.value,
//       };
 

    
//       const response = await signUp(userData);
//         console.log('Signup successful:', response);
//         toast.success('Successfully Signed Up');
//         window.location.href = '/login';


//     } catch (error) {
//       console.error('Error signing up:', error);
//       toast.error('Error in sign up');
//     }
//   };
 
//   return (
//     <Box className="content-right">
//       <ToastContainer />
//       {!hidden ? (
//         <Box sx={{ p: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <RegisterIllustration
//             width={700}
//             alt="register-illustration"
//             src={`/images/pages/girl-with-laptop-${theme.palette.mode}.png`}
//           />
//         </Box>
//       ) : null}
//       <RightWrapper
//         sx={{ ...(settings.skin === 'bordered' && !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }) }}
//       >
//        <Box sx={{ mx: 'auto', maxWidth: 400 }}>
//           <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
//             <img
//               src='/images/dynviz_logo.png' // Adjust the path as needed relative to the 'public' directory
//               alt='Your Logo'
//               width={200} // Adjust width and height as needed
//               height={50}
//             />
//           </Box>
//           <Typography variant="h6" sx={{ mb: 1.5 }}>
//             Sign Up Here!
//           </Typography>
//           <Typography sx={{ mb: 6, color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
//           <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//             <TextField autoFocus fullWidth sx={{ mb: 2 }} label="Name" placeholder="johndoe" name="name" required />
//             <TextField fullWidth label="Email" sx={{ mb: 2 }} placeholder="user@email.com" name="email" required />
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel htmlFor="auth-login-v2-password">Password</InputLabel>
//               <OutlinedInput
//                 label="Password"
//                 id="auth-login-v2-password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       edge="end"
//                       onMouseDown={(e) => e.preventDefault()}
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 required
//               />
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Retype Password"
//               type="password"
//               value={retypePassword}
//               onChange={(e) => setRetypePassword(e.target.value)}
//               error={passwordMatchError}
//               helperText={passwordMatchError ? 'Passwords do not match' : ''}
//               required
//               sx={{ mb: 2 }}
//             />
//             <TextField fullWidth label="Organization" sx={{ mb: 2 }} name="organization" required />
//             <TextField fullWidth label="Domain" sx={{ mb: 2 }} name="domain" />
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Account Type</InputLabel>
//               <Select defaultValue="" name="accountType" required>
//                 <MenuItem value="Business">Business</MenuItem>
//                 <MenuItem value="Personal">Personal</MenuItem>
//               </Select>
//             </FormControl>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Country</InputLabel>
//               <Select value={selectedCountry} onChange={handleCountryChange} name="country" required>
//                 {countries.map((country) => (
//                   <MenuItem key={country} value={country}>
//                     {country}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Country Code"
//               value={countryCode}
//               onChange={(e) => setCountryCode(e.target.value)}
//               sx={{ mb: 2 }}
//               name="countryCode"
//               required
//             />
//             <TextField fullWidth label="Phone Number" sx={{ mb: 2 }} name="phoneNo" required />
//             <FormControlLabel
//               control={<Checkbox />}
//               label={
//                 <>
//                   <span>I agree to </span>
//                   <LinkStyled href="/" onClick={(e) => e.preventDefault()}>
//                     privacy policy & terms
//                   </LinkStyled>
//                 </>
//               }
//               sx={{ mb: 2, '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
//             />
//             <Button fullWidth size="large" type="submit" variant="contained" sx={{ mb: 4 }}>
//               Sign up
//             </Button>
//             <Divider sx={{ mb: 5 }}>or</Divider>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <LinkStyled href="/login">
//                 <Typography variant="body2">Already have an account? Sign in instead</Typography>
//               </LinkStyled>
//             </Box>
//           </form>
//         </Box>
//       </RightWrapper>
//     </Box>
//   );
// };
 
// Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
 
// Register.guestGuard = true;
 
// export default Register;







//  modified by arman khan - toast message issue fixed







// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import IconButton from '@mui/material/IconButton';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import FormControl from '@mui/material/FormControl';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import { styled, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Icon from 'src/@core/components/icon';
// import themeConfig from 'src/configs/themeConfig';
// import BlankLayout from 'src/@core/layouts/BlankLayout';
// import { signUp } from 'src/api/signup/signup';
// import { useSettings } from 'src/@core/hooks/useSettings';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import { fetchCountries, fetchCountryCode } from 'src/api/signup/countryApi';

// const RegisterIllustration = styled('img')({
//   height: 'auto',
//   maxWidth: '100%',
// });

// const RightWrapper = styled(Box)(({ theme }) => ({
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: theme.spacing(6),
//   backgroundColor: theme.palette.background.paper,
//   [theme.breakpoints.up('lg')]: {
//     maxWidth: 480,
//   },
//   [theme.breakpoints.up('xl')]: {
//     maxWidth: 635,
//   },
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(12),
//   },
// }));

// const LinkStyled = styled(Link)(({ theme }) => ({
//   fontSize: '0.875rem',
//   textDecoration: 'none',
//   color: theme.palette.primary.main,
// }));

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState('');
//   const [retypePassword, setRetypePassword] = useState('');
//   const [passwordMatchError, setPasswordMatchError] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [countryCode, setCountryCode] = useState('');
//   const { settings } = useSettings();
//   const theme = useTheme();
//   const hidden = useMediaQuery(theme.breakpoints.down('lg'));

//   useEffect(() => {
//     const loadCountries = async () => {
//       try {
//         const countryList = await fetchCountries();
//         console.log('country list', countryList);
//         setCountries(countryList);
//       } catch (error) {
//         toast.error('Error fetching countries');
//       }
//     };

//     loadCountries();
//   }, []);

//   const handleCountryChange = async (event) => {
//     const country = event.target.value;
//     setSelectedCountry(country);

//     try {
//       const code = await fetchCountryCode(country);
//       setCountryCode(code[0]);
//     } catch (error) {
//       toast.error('Error fetching country code');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== retypePassword) {
//       setPasswordMatchError(true);

//       return;
//     }

//     try {
//       const userData = {
//         name: e.target.name.value,
//         email: e.target.email.value,
//         password: password,
//         organization: e.target.organization.value,
//         domain: e.target.domain.value,
//         accountType: e.target.accountType.value,
//         country: selectedCountry,
//         countryCode: countryCode,
//         phoneNo: e.target.phoneNo.value,
//       };

//       const response = await signUp(userData);
//       console.log('Signup successful:', response);

//       // Display the success message from the backend in a toast
//       toast.success(response.message);

//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Error signing up:', error);

//       // Display the error message from the backend in a toast
//       toast.error(error.message);
//     }
//   };

//   return (
//     <Box className="content-right">
//       <ToastContainer />
//       {!hidden ? (
//         <Box
//           sx={{ p: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//         >
//           <RegisterIllustration
//             width={700}
//             alt="register-illustration"
//             src={`/images/pages/girl-with-laptop-${theme.palette.mode}.png`}
//           />
//         </Box>
//       ) : null}
//       <RightWrapper
//         sx={{
//           ...(settings.skin === 'bordered' &&
//             !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }),
//         }}
//       >
//         <Box sx={{ mx: 'auto', maxWidth: 400 }}>
//           <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
//             <img
//               src="/images/dynviz_logo.png" // Adjust the path as needed relative to the 'public' directory
//               alt="Your Logo"
//               width={200} // Adjust width and height as needed
//               height={50}
//             />
//           </Box>
//           <Typography variant="h6" sx={{ mb: 1.5 }}>
//             Sign Up Here!
//           </Typography>
//           <Typography sx={{ mb: 6, color: 'text.secondary' }}>
//             Make your app management easy and fun!
//           </Typography>
//           <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//             <TextField
//               autoFocus
//               fullWidth
//               sx={{ mb: 2 }}
//               label="Name"
//               placeholder="johndoe"
//               name="name"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Email"
//               sx={{ mb: 2 }}
//               placeholder="user@email.com"
//               name="email"
//               required
//             />
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel htmlFor="auth-login-v2-password">Password</InputLabel>
//               <OutlinedInput
//                 label="Password"
//                 id="auth-login-v2-password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       edge="end"
//                       onMouseDown={(e) => e.preventDefault()}
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 required
//               />
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Retype Password"
//               type="password"
//               value={retypePassword}
//               onChange={(e) => setRetypePassword(e.target.value)}
//               error={passwordMatchError}
//               helperText={passwordMatchError ? 'Passwords do not match' : ''}
//               required
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               fullWidth
//               label="Organization"
//               sx={{ mb: 2 }}
//               name="organization"
//               required
//             />
//             <TextField fullWidth label="Domain" sx={{ mb: 2 }} name="domain" />
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Account Type</InputLabel>
//               <Select defaultValue="" name="accountType" required>
//                 <MenuItem value="Business">Business</MenuItem>
//                 <MenuItem value="Personal">Personal</MenuItem>
//               </Select>
//             </FormControl>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Country</InputLabel>
//               <Select
//                 value={selectedCountry}
//                 onChange={handleCountryChange}
//                 name="country"
//                 required
//               >
//                 {countries.map((country) => (
//                   <MenuItem key={country} value={country}>
//                     {country}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Country Code"
//               value={countryCode}
//               onChange={(e) => setCountryCode(e.target.value)}
//               sx={{ mb: 2 }}
//               name="countryCode"
//               required
//             />
//             <TextField
//               fullWidth
//               label="Phone Number"
//               sx={{ mb: 2 }}
//               name="phoneNo"
//               required
//             />
//             <FormControlLabel
//               control={<Checkbox />}
//               label={
//                 <>
//                   <span>I agree to </span>
//                   <LinkStyled href="/" onClick={(e) => e.preventDefault()}>
//                     privacy policy & terms
//                   </LinkStyled>
//                 </>
//               }
//               sx={{ mb: 2, '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
//             />
//             <Button
//               fullWidth
//               size="large"
//               type="submit"
//               variant="contained"
//               sx={{ mb: 4 }}
//             >
//               Sign up
//             </Button>
//             <Divider sx={{ mb: 5 }}>or</Divider>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//               <LinkStyled href="/login">
//                 <Typography variant="body2">
//                   Already have an account? Sign in instead
//                 </Typography>
//               </LinkStyled>
//             </Box>
//           </form>
//         </Box>
//       </RightWrapper>
//     </Box>
//   );
// };

// Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

// Register.guestGuard = true;

// export default Register;




//  level 1.1



import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Icon from 'src/@core/components/icon';
import themeConfig from 'src/configs/themeConfig';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import { signUp } from 'src/api/signup/signup';
import { useSettings } from 'src/@core/hooks/useSettings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { fetchCountries, fetchCountryCode } from 'src/api/signup/countryApi';

const RegisterIllustration = styled('img')({
  height: 'auto',
  maxWidth: '100%',
});

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('lg')]: {
    maxWidth: 480,
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 635,
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(12),
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const { settings } = useSettings();
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countryList = await fetchCountries();
        console.log('country list', countryList);
        setCountries(countryList);
      } catch (error) {
        toast.error('Error fetching countries');
      }
    };

    loadCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const country = event.target.value;
    setSelectedCountry(country);

    try {
      const code = await fetchCountryCode(country);
      setCountryCode(code[0]);
    } catch (error) {
      toast.error('Error fetching country code');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      setPasswordMatchError(true);

      return;
    }

    try {
      const userData = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: password,
        organization: e.target.organization.value,
        domain: e.target.domain.value,
        accountType: e.target.accountType.value,
        country: selectedCountry,
        countryCode: countryCode,
        phoneNo: e.target.phoneNo.value,
      };

      const response = await signUp(userData);
      console.log('Signup successful:', response);

      // Display the success message from the backend in a toast
      toast.success(response.message);

      window.location.href = '/login';
    } catch (error) {
      console.error('Error signing up:', error);

      // Display the error message from the backend in a toast
      toast.error(error.message);
    }
  };

  return (
    <Box className="content-right">
      <ToastContainer /> {/* Ensure ToastContainer is included */}
      {!hidden ? (
        <Box
          sx={{ p: 12, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <RegisterIllustration
            width={700}
            alt="register-illustration"
            src={`/images/pages/girl-with-laptop-${theme.palette.mode}.png`}
          />
        </Box>
      ) : null}
      <RightWrapper
        sx={{
          ...(settings.skin === 'bordered' &&
            !hidden && { borderLeft: `1px solid ${theme.palette.divider}` }),
        }}
      >
        <Box sx={{ mx: 'auto', maxWidth: 400 }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/dynviz_logo.png" // Adjust the path as needed relative to the 'public' directory
              alt="Your Logo"
              width={200} // Adjust width and height as needed
              height={50}
            />
          </Box>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Sign Up Here!
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Make your app management easy and fun!
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              sx={{ mb: 2 }}
              label="Name"
              placeholder="johndoe"
              name="name"
              required
            />
            <TextField
              fullWidth
              label="Email"
              sx={{ mb: 2 }}
              placeholder="user@email.com"
              name="email"
              required
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel htmlFor="auth-login-v2-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                id="auth-login-v2-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                    </IconButton>
                  </InputAdornment>
                }
                required
              />
            </FormControl>
            <TextField
              fullWidth
              label="Retype Password"
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              error={passwordMatchError}
              helperText={passwordMatchError ? 'Passwords do not match' : ''}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Organization"
              sx={{ mb: 2 }}
              name="organization"
              required
            />
            <TextField fullWidth label="Domain" sx={{ mb: 2 }} name="domain" />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Account Type</InputLabel>
              <Select name="accountType" required>
                <MenuItem value="Basic">Business</MenuItem>
                <MenuItem value="Pro">Personal</MenuItem>
       
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel id="country-label">Country</InputLabel>
  <Select
    labelId="country-label"
    value={selectedCountry || ""}
    onChange={handleCountryChange}
    name="country"
    required
  >
    {countries.length > 0 ? (
      countries.map((country) => (
        <MenuItem key={country} value={country}>
          {country}
        </MenuItem>
      ))
    ) : (
      <MenuItem value="" disabled>Loading countries...</MenuItem>
    )}
  </Select>
</FormControl>

            <TextField
              fullWidth
              label="Country Code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              sx={{ mb: 2 }}
              name="countryCode"
			  required
            />
            <TextField
              fullWidth
              label="Phone Number"
              sx={{ mb: 2 }}
              name="phoneNo"
              required
            />
            <FormControlLabel
              control={<Checkbox />}
              label={
                <>
                  <span>I agree to </span>
                  <LinkStyled href="/" onClick={(e) => e.preventDefault()}>
                    privacy policy & terms
                  </LinkStyled>
                </>
              }
              sx={{ mb: 2, '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ mb: 4 }}
            >
              Sign up
            </Button>
            <Divider sx={{ mb: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LinkStyled href="/login">
                <Typography variant="body2">
                  Already have an account? Sign in instead
                </Typography>
              </LinkStyled>
            </Box>
          </form>
        </Box>
      </RightWrapper>
    </Box>
  );
};

Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

Register.guestGuard = true;

export default Register;
