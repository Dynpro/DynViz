



//  api binding for schema - modified by arman khan







// // ** React Imports
// import { Fragment, useState } from 'react'
// import React, { useEffect } from 'react'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Step from '@mui/material/Step'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import Select from '@mui/material/Select'
// import Divider from '@mui/material/Divider'
// import Stepper from '@mui/material/Stepper'
// import MenuItem from '@mui/material/MenuItem'
// import StepLabel from '@mui/material/StepLabel'
// import TextField from '@mui/material/TextField'
// import Typography from '@mui/material/Typography'
// import InputLabel from '@mui/material/InputLabel'
// import CardContent from '@mui/material/CardContent'
// import FormControl from '@mui/material/FormControl'
// import FormHelperText from '@mui/material/FormHelperText'

// // ** Third Party Imports
// import * as yup from 'yup'
// import toast from 'react-hot-toast'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

// // ** Custom Components Imports
// import StepperCustomDot from './StepperCustomDot'

// // ** Styled Components
// import StepperWrapper from 'src/@core/styles/mui/stepper'

// // ** API Calls
// import getAllConnections from 'src/api/data-model/getAllConnections'
// import getSchemasByConnection from 'src/api/data-model/getAllSchemas'

// const steps = [
//   {
//     title: 'Connection Details',
//     subtitle: 'Enter your Connection Details'
//   },
//   {
//     title: 'Schema Info',
//     subtitle: 'Schema Information'
//   },
//   {
//     title: 'Variables Info',
//     subtitle: 'Variables Information'
//   }
// ]

// const defaultAccountValues = {
//   connection: ''
// }

// const defaultPersonalValues = {
//   schema: '',
//   dataModelName: ''
// }

// const defaultSocialValues = {
//   variables: []
// }

// const accountSchema = yup.object().shape({
//   connection: yup.string().required('Please select a connection')
// })

// const personalSchema = yup.object().shape({
//   schema: yup.string().required('Please select a schema'),
//   dataModelName: yup.string().required('Please enter the data model name')
// })

// const socialSchema = yup.object().shape({
//   variables: yup.array().min(1, 'At least one variable must be created')
// })

// const StepperLinearWithValidation = () => {
//   // ** States
//   const [activeStep, setActiveStep] = useState(0)
//   const [variables, setVariables] = useState(['Variable 1', 'Variable 2', 'Variable 3'])
//   const [connections, setConnections] = useState([])
//   const [schemas, setSchemas] = useState([])

//   // Fetch connections on component mount
//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const connectionData = await getAllConnections()
//         setConnections(connectionData)
//       } catch (error) {
//         toast.error('Failed to load connections')
//       }
//     }

//     fetchConnections()
//   }, [])

//   // ** Hooks
//   const {
//     reset: accountReset,
//     control: accountControl,
//     handleSubmit: handleAccountSubmit,
//     formState: { errors: accountErrors }
//   } = useForm({
//     defaultValues: defaultAccountValues,
//     resolver: yupResolver(accountSchema)
//   })

//   const {
//     reset: personalReset,
//     control: personalControl,
//     handleSubmit: handlePersonalSubmit,
//     formState: { errors: personalErrors }
//   } = useForm({
//     defaultValues: defaultPersonalValues,
//     resolver: yupResolver(personalSchema)
//   })

//   const {
//     reset: socialReset,
//     control: socialControl,
//     handleSubmit: handleSocialSubmit,
//     formState: { errors: socialErrors }
//   } = useForm({
//     defaultValues: defaultSocialValues,
//     resolver: yupResolver(socialSchema)
//   })

//   // Handle Stepper
//   const handleBack = () => {
//     setActiveStep(prevActiveStep => prevActiveStep - 1)
//   }

//   const handleReset = () => {
//     setActiveStep(0)
//     accountReset({ connection: '' })
//     personalReset({ schema: '', dataModelName: '' })
//     socialReset({ variables: [] }) // Reset variables
//     setVariables([]) // Reset variables
//     setSchemas([]) // Reset schemas
//   }

//   const onSubmit = () => {
//     setActiveStep(activeStep + 1)
//     if (activeStep === steps.length - 1) {
//       toast.success('Form Submitted')
//     }
//   }

//   const handleConnectionChange = async connectionId => {
//     try {
//       const fetchedSchemas = await getSchemasByConnection(connectionId)
//       setSchemas(fetchedSchemas)
//     } catch (error) {
//       toast.error('Failed to load schemas')
//     }
//   }

//   const getStepContent = step => {
//     switch (step) {
//       case 0:
//         return (
//           <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[0].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[0].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id='stepper-linear-account-connection' error={Boolean(accountErrors.connection)}>
//                     Select Connection
//                   </InputLabel>
//                   <Controller
//                     name='connection'
//                     control={accountControl}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange } }) => (
//                       <Select
//                         value={value}
//                         onChange={e => {
//                           onChange(e)
//                           handleConnectionChange(e.target.value) // Fetch schemas
//                         }}
//                         label='Select Connection'
//                         labelId='stepper-linear-account-connection'
//                         error={Boolean(accountErrors.connection)}
//                       >
//                         {connections.map(connection => (
//                           <MenuItem key={connection.ID} value={connection.ID}>
//                             {connection.Name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                   {accountErrors.connection && (
//                     <FormHelperText sx={{ color: 'error.main' }}>{accountErrors.connection.message}</FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button size='large' variant='outlined' color='secondary' disabled>
//                   Back
//                 </Button>
//                 <Button size='large' type='submit' variant='contained'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 1:
//         return (
//           <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[1].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[1].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id='stepper-linear-personal-schema'>Select Schema</InputLabel>
//                   <Controller
//                     name='schema'
//                     control={personalControl}
//                     render={({ field: { value, onChange } }) => (
//                       <Select
//                         value={value}
//                         onChange={onChange}
//                         label='Select Schema'
//                         error={Boolean(personalErrors.schema)}
//                         aria-describedby='stepper-linear-personal-schema-helper'
//                       >
//                         {schemas.map(schema => (
//                           <MenuItem key={schema.ID} value={schema.Name}>
//                             {schema.Name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                   {personalErrors.schema && (
//                     <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-schema-helper'>
//                       {personalErrors.schema.message}
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <Controller
//                     name='dataModelName'
//                     control={personalControl}
//                     render={({ field: { value, onChange } }) => (
//                       <TextField
//                         value={value}
//                         onChange={onChange}
//                         label='Enter Data Model Name'
//                         placeholder='Data Model Name'
//                         error={Boolean(personalErrors.dataModelName)}
//                         aria-describedby='stepper-linear-personal-data-model-helper'
//                       />
//                     )}
//                   />
//                   {personalErrors.dataModelName && (
//                     <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-data-model-helper'>
//                       {personalErrors.dataModelName.message}
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button size='large' type='submit' variant='contained'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 2:
//         return (
//           <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[2].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[2].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <TextField
//                     label='Variables'
//                     multiline
//                     disabled
//                     value={variables.join('\n')}
//                     rows={5}
//                     sx={{ maxHeight: 200, overflowY: 'scroll' }}
//                   />
//                 </FormControl>
//                 <Typography variant='caption' color='text.secondary' sx={{ mt: 2 }}>
//                   {variables.length} variable created successfully
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button size='large' type='submit' variant='contained'>
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       default:
//         return null
//     }
//   }

//   const renderContent = () => {
//     if (activeStep === steps.length) {
//       return (
//         <Fragment>
//           <Typography>All steps are completed!</Typography>
//           <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
//             <Button size='large' variant='contained' onClick={handleReset}>
//               Reset
//             </Button>
//           </Box>
//         </Fragment>
//       )
//     } else {
//       return getStepContent(activeStep)
//     }
//   }

//   return (
//     <Card>
//       <CardContent>
//         <StepperWrapper>
//           <Stepper activeStep={activeStep}>
//             {steps.map((step, index) => (
//               <Step key={index}>
//                 <StepLabel StepIconComponent={StepperCustomDot}>
//                   <div className='step-label'>
//                     <Typography className='step-number'>{`0${index + 1}`}</Typography>
//                     <div>
//                       <Typography className='step-title'>{step.title}</Typography>
//                       <Typography className='step-subtitle'>{step.subtitle}</Typography>
//                     </div>
//                   </div>
//                 </StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </StepperWrapper>
//       </CardContent>

//       <Divider sx={{ m: '0 !important' }} />

//       <CardContent>{renderContent()}</CardContent>
//     </Card>
//   )
// }

// export default StepperLinearWithValidation



// fixing dropdown issue










// // ** React Imports
// import { Fragment, useState } from 'react'
// import React, { useEffect } from 'react'

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Step from '@mui/material/Step'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import Select from '@mui/material/Select'
// import Divider from '@mui/material/Divider'
// import Stepper from '@mui/material/Stepper'
// import MenuItem from '@mui/material/MenuItem'
// import StepLabel from '@mui/material/StepLabel'
// import TextField from '@mui/material/TextField'
// import Typography from '@mui/material/Typography'
// import InputLabel from '@mui/material/InputLabel'
// import CardContent from '@mui/material/CardContent'
// import FormControl from '@mui/material/FormControl'
// import FormHelperText from '@mui/material/FormHelperText'

// // ** Third Party Imports
// import * as yup from 'yup'
// import toast from 'react-hot-toast'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'

// // ** Custom Components Imports
// import StepperCustomDot from './StepperCustomDot'

// // ** Styled Components
// import StepperWrapper from 'src/@core/styles/mui/stepper'

// // ** API Calls
// import getAllConnections from 'src/api/data-model/getAllConnections'
// import getSchemasByConnection from 'src/api/data-model/getAllSchemas'

// const steps = [
//   {
//     title: 'Connection Details',
//     subtitle: 'Enter your Connection Details'
//   },
//   {
//     title: 'Schema Info',
//     subtitle: 'Schema Information'
//   },
//   {
//     title: 'Variables Info',
//     subtitle: 'Variables Information'
//   }
// ]

// const defaultAccountValues = {
//   connection: ''
// }

// const defaultPersonalValues = {
//   schema: '',
//   dataModelName: ''
// }

// const defaultSocialValues = {
//   variables: []
// }

// const accountSchema = yup.object().shape({
//   connection: yup.string().required('Please select a connection')
// })

// const personalSchema = yup.object().shape({
//   schema: yup.string().required('Please select a schema'),
//   dataModelName: yup.string().required('Please enter the data model name')
// })

// const socialSchema = yup.object().shape({
//   variables: yup.array().min(1, 'At least one variable must be created')
// })

// const StepperLinearWithValidation = () => {
//   // ** States
//   const [activeStep, setActiveStep] = useState(0)
//   const [variables, setVariables] = useState(['Variable 1', 'Variable 2', 'Variable 3'])
//   const [connections, setConnections] = useState([])
//   const [schemas, setSchemas] = useState([])

//   // Fetch connections on component mount
//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const connectionData = await getAllConnections()
//         setConnections(connectionData)
//       } catch (error) {
//         toast.error('Failed to load connections')
//       }
//     }

//     fetchConnections()
//   }, [])

//   // ** Hooks
//   const {
//     reset: accountReset,
//     control: accountControl,
//     handleSubmit: handleAccountSubmit,
//     formState: { errors: accountErrors }
//   } = useForm({
//     defaultValues: defaultAccountValues,
//     resolver: yupResolver(accountSchema)
//   })

//   const {
//     reset: personalReset,
//     control: personalControl,
//     handleSubmit: handlePersonalSubmit,
//     formState: { errors: personalErrors }
//   } = useForm({
//     defaultValues: defaultPersonalValues,
//     resolver: yupResolver(personalSchema)
//   })

//   const {
//     reset: socialReset,
//     control: socialControl,
//     handleSubmit: handleSocialSubmit,
//     formState: { errors: socialErrors }
//   } = useForm({
//     defaultValues: defaultSocialValues,
//     resolver: yupResolver(socialSchema)
//   })

//   // Handle Stepper
//   const handleBack = () => {
//     setActiveStep(prevActiveStep => prevActiveStep - 1)
//   }

//   const handleReset = () => {
//     setActiveStep(0)
//     accountReset({ connection: '' })
//     personalReset({ schema: '', dataModelName: '' })
//     socialReset({ variables: [] }) // Reset variables
//     setVariables([]) // Reset variables
//     setSchemas([]) // Reset schemas
//   }

//   const onSubmit = () => {
//     setActiveStep(activeStep + 1)
//     if (activeStep === steps.length - 1) {
//       toast.success('Form Submitted')
//     }
//   }

//   const handleConnectionChange = async connectionId => {
//     try {
//       const fetchedSchemas = await getSchemasByConnection(connectionId)
//       setSchemas(fetchedSchemas)
//     } catch (error) {
//       toast.error('Failed to load schemas')
//     }
//   }

//   const getStepContent = step => {
//     switch (step) {
//       case 0:
//         return (
//           <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[0].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[0].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id='stepper-linear-account-connection' error={Boolean(accountErrors.connection)}>
//                     Select Connection
//                   </InputLabel>
//                   <Controller
//                     name='connection'
//                     control={accountControl}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange } }) => (
//                       <Select
//                         value={value}
//                         onChange={e => {
//                           onChange(e)
//                           handleConnectionChange(e.target.value) // Fetch schemas
//                         }}
//                         label='Select Connection'
//                         labelId='stepper-linear-account-connection'
//                         error={Boolean(accountErrors.connection)}
//                       >
//                         {connections.map(connection => (
//                           <MenuItem key={connection.ID} value={connection.ID}>
//                             {connection.Name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                   {accountErrors.connection && (
//                     <FormHelperText sx={{ color: 'error.main' }}>{accountErrors.connection.message}</FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button size='large' variant='outlined' color='secondary' disabled>
//                   Back
//                 </Button>
//                 <Button size='large' type='submit' variant='contained'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 1:
//         return (
//           <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[1].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[1].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id='stepper-linear-personal-schema'>Select Schema</InputLabel>
//                   <Controller
//                     name='schema'
//                     control={personalControl}
//                     render={({ field: { value, onChange } }) => (
//                       <Select
//                         value={value}
//                         onChange={onChange}
//                         label='Select Schema'
//                         error={Boolean(personalErrors.schema)}
//                         MenuProps={{
//                           PaperProps: {
//                             style: {
//                               maxHeight: 48 * 5 + 8, // Limit height for 5 items + padding
//                               overflowY: 'auto'
//                             }
//                           }
//                         }}
//                         aria-describedby='stepper-linear-personal-schema-helper'
//                       >
//                         {schemas.map(schema => (
//                           <MenuItem key={schema.ID} value={schema.Name}>
//                             {schema.Name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                   {personalErrors.schema && (
//                     <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-schema-helper'>
//                       {personalErrors.schema.message}
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <Controller
//                     name='dataModelName'
//                     control={personalControl}
//                     render={({ field: { value, onChange } }) => (
//                       <TextField
//                         value={value}
//                         onChange={onChange}
//                         label='Enter Data Model Name'
//                         placeholder='Data Model Name'
//                         error={Boolean(personalErrors.dataModelName)}
//                         aria-describedby='stepper-linear-personal-data-model-helper'
//                       />
//                     )}
//                   />
//                   {personalErrors.dataModelName && (
//                     <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-data-model-helper'>
//                       {personalErrors.dataModelName.message}
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button size='large' type='submit' variant='contained'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       case 2:
//         return (
//           <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[2].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[2].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <TextField
//                     label='Variables'
//                     multiline
//                     disabled
//                     value={variables.join('\n')}
//                     rows={5}
//                     sx={{ maxHeight: 200, overflowY: 'scroll' }}
//                   />
//                 </FormControl>
//                 <Typography variant='caption' color='text.secondary' sx={{ mt: 2 }}>
//                   {variables.length} variable created successfully
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button size='large' type='submit' variant='contained'>
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         )
//       default:
//         return null
//     }
//   }

//   const renderContent = () => {
//     if (activeStep === steps.length) {
//       return (
//         <Fragment>
//           <Typography>All steps are completed!</Typography>
//           <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
//             <Button size='large' variant='contained' onClick={handleReset}>
//               Reset
//             </Button>
//           </Box>
//         </Fragment>
//       )
//     } else {
//       return getStepContent(activeStep)
//     }
//   }

//   return (
//     <Card>
//       <CardContent>
//         <StepperWrapper>
//           <Stepper activeStep={activeStep}>
//             {steps.map((step, index) => (
//               <Step key={index}>
//                 <StepLabel StepIconComponent={StepperCustomDot}>
//                   <div className='step-label'>
//                     <Typography className='step-number'>{`0${index + 1}`}</Typography>
//                     <div>
//                       <Typography className='step-title'>{step.title}</Typography>
//                       <Typography className='step-subtitle'>{step.subtitle}</Typography>
//                     </div>
//                   </div>
//                 </StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </StepperWrapper>
//       </CardContent>

//       <Divider sx={{ m: '0 !important' }} />

//       <CardContent>{renderContent()}</CardContent>
//     </Card>
//   )
// }

// export default StepperLinearWithValidation






// api binded for create set






// // ** React Imports
// import { Fragment, useState } from 'react';
// import React, { useEffect } from 'react';

// // ** MUI Imports
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Step from '@mui/material/Step';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import Select from '@mui/material/Select';
// import Divider from '@mui/material/Divider';
// import Stepper from '@mui/material/Stepper';
// import MenuItem from '@mui/material/MenuItem';
// import StepLabel from '@mui/material/StepLabel';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import InputLabel from '@mui/material/InputLabel';
// import CardContent from '@mui/material/CardContent';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';

// // ** Third Party Imports
// import * as yup from 'yup';
// import toast from 'react-hot-toast';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// // ** Custom Components Imports
// import StepperCustomDot from './StepperCustomDot';

// // ** Styled Components
// import StepperWrapper from 'src/@core/styles/mui/stepper';

// // ** API Calls
// import getAllConnections from 'src/api/data-model/getAllConnections';
// import getSchemasByConnection from 'src/api/data-model/getAllSchemas';
// import createSet from 'src/api/data-model/createSets'; 
// import createVariable from 'src/api/data-model/createVariable';

// const steps = [
//   {
//     title: 'Connection Details',
//     subtitle: 'Enter your Connection Details',
//   },
//   {
//     title: 'Schema Info',
//     subtitle: 'Schema Information',
//   },
//   {
//     title: 'Variables Info',
//     subtitle: 'Variables Information',
//   },
// ];

// const defaultAccountValues = {
//   connection: '',
// };

// const defaultPersonalValues = {
//   schema: '',
//   dataModelName: '',
// };

// const defaultSocialValues = {
//   variables: [],
// };

// const accountSchema = yup.object().shape({
//   connection: yup.string().required('Please select a connection'),
// });

// const personalSchema = yup.object().shape({
//   schema: yup.string().required('Please select a schema'),
//   dataModelName: yup.string().required('Please enter the data model name'),
// });

// const socialSchema = yup.object().shape({
//   variables: yup.array().min(1, 'At least one variable must be created'),
// });

// const StepperLinearWithValidation = () => {
//   // ** States
//   const [activeStep, setActiveStep] = useState(0);
//   const [variables, setVariables] = useState(['Variable 1', 'Variable 2', 'Variable 3']);
//   const [connections, setConnections] = useState([]);
//   const [schemas, setSchemas] = useState([]);
//   const [setID, setSetID] = useState(null); // State to store the Set ID from the API response

//   // Fetch connections on component mount
//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const connectionData = await getAllConnections();
//         setConnections(connectionData);
//       } catch (error) {
//         toast.error('Failed to load connections');
//       }
//     };

//     fetchConnections();
//   }, []);

//   // ** Hooks
//   const {
//     reset: accountReset,
//     control: accountControl,
//     handleSubmit: handleAccountSubmit,
//     getValues: accountGetValues,
//     formState: { errors: accountErrors },
//   } = useForm({
//     defaultValues: defaultAccountValues,
//     resolver: yupResolver(accountSchema),
//   });

//   const {
//     reset: personalReset,
//     control: personalControl,
//     handleSubmit: handlePersonalSubmit,
//     getValues: personalGetValues,
//     formState: { errors: personalErrors },
//   } = useForm({
//     defaultValues: defaultPersonalValues,
//     resolver: yupResolver(personalSchema),
//   });

//   const {
//     reset: socialReset,
//     control: socialControl,
//     handleSubmit: handleSocialSubmit,
//     formState: { errors: socialErrors },
//   } = useForm({
//     defaultValues: defaultSocialValues,
//     resolver: yupResolver(socialSchema),
//   });

//   // Handle Stepper
//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     accountReset({ connection: '' });
//     personalReset({ schema: '', dataModelName: '' });
//     socialReset({ variables: [] });
//     setVariables([]);
//     setSchemas([]);
//     setSetID(null); // Reset the Set ID
//   };

//   // const onSubmit = async () => {
//   //   if (activeStep === 1) {
//   //     // When in Schema Info step, call the API to create the set
//   //     const schemaID = personalGetValues('schema');
//   //     console.log("this is schema id",schemaID )
//   //     const connectionID = accountGetValues('connection');
//   //     const dataModelName = personalGetValues('dataModelName');

//   //     try {
//   //       const apiResponse = await createSet(dataModelName, schemaID, connectionID);
//   //       setSetID(apiResponse.Data); // Store the set ID
//   //       toast.success(`Set created successfully with ID ${apiResponse.Data}`);
//   //     } catch (error) {
//   //       toast.error('Failed to create set');
//   //       return; // Prevent moving to the next step if the set creation fails
//   //     }
//   //   }

//   //   setActiveStep(activeStep + 1);
//   //   if (activeStep === steps.length - 1) {
//   //     toast.success('Form Submitted');
//   //   }
//   // };


//   //  binded api to create variable on next button



//   const onSubmit = async () => {
//     if (activeStep === 1) {
//       // When in Schema Info step, call the API to create the set
//       const schemaID = personalGetValues('schema');
//       console.log("This is schema ID", schemaID);
//       const connectionID = accountGetValues('connection');
//       const dataModelName = personalGetValues('dataModelName');

//       try {
//         // Call createSet API
//         const apiResponse = await createSet(dataModelName, schemaID, connectionID);
//         setSetID(apiResponse.Data); // Store the set ID
//         toast.success(`Set created successfully with ID ${apiResponse.Data}`);

//         // Call createVariable API after createSet is successful
//         try {
//           const variableResponse = await createVariable(apiResponse.Data, connectionID);
//           toast.success(variableResponse.message); // Display success message from createVariable API
//         } catch (error) {
//           toast.error('Failed to create variables');
//         }
//       } catch (error) {
//         toast.error('Failed to create set');
//         return; // Prevent moving to the next step if the set creation fails
//       }
//     }

//     setActiveStep(activeStep + 1);
//     if (activeStep === steps.length - 1) {
//       toast.success('Form Submitted');
//     }
//   };





//   const handleConnectionChange = async (connectionId) => {
//     try {
//       const fetchedSchemas = await getSchemasByConnection(connectionId);
//       setSchemas(fetchedSchemas);
//     } catch (error) {
//       toast.error('Failed to load schemas');
//     }
//   };

//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[0].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[0].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id='stepper-linear-account-connection' error={Boolean(accountErrors.connection)}>
//                     Select Connection
//                   </InputLabel>
//                   <Controller
//                     name='connection'
//                     control={accountControl}
//                     rules={{ required: true }}
//                     render={({ field: { value, onChange } }) => (
//                       <Select
//                         value={value}
//                         onChange={(e) => {
//                           onChange(e);
//                           handleConnectionChange(e.target.value);
//                         }}
//                         label='Select Connection'
//                         labelId='stepper-linear-account-connection'
//                         error={Boolean(accountErrors.connection)}
//                       >
//                         {connections.map((connection) => (
//                           <MenuItem key={connection.ID} value={connection.ID}>
//                             {connection.Name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                   {accountErrors.connection && (
//                     <FormHelperText sx={{ color: 'error.main' }}>{accountErrors.connection.message}</FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button size='large' variant='outlined' color='secondary' disabled>
//                   Back
//                 </Button>
//                 <Button size='large' type='submit' variant='contained'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         );
//       case 1:
//         return (
//           <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[1].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[1].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel id='stepper-linear-personal-schema'>Select Schema</InputLabel>
//                   <Controller
//                     name='schema'
//                     control={personalControl}
//                     render={({ field: { value, onChange } }) => (
//                       <Select
//                         value={value}
//                         onChange={onChange}
//                         label='Select Schema'
//                         error={Boolean(personalErrors.schema)}
//                         MenuProps={{
//                           PaperProps: {
//                             style: {
//                               maxHeight: 48 * 5 + 8, // Limit height for 5 items + padding
//                               overflowY: 'auto',
//                             },
//                           },
//                         }}
//                         aria-describedby='stepper-linear-personal-schema-helper'
//                       >
//                         {schemas.map((schema) => (
//                           <MenuItem key={schema.ID} value={schema.ID}>
//                             {schema.Name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     )}
//                   />
//                   {personalErrors.schema && (
//                     <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-schema-helper'>
//                       {personalErrors.schema.message}
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <Controller
//                     name='dataModelName'
//                     control={personalControl}
//                     render={({ field: { value, onChange } }) => (
//                       <TextField
//                         value={value}
//                         onChange={onChange}
//                         label='Enter Data Model Name'
//                         placeholder='Data Model Name'
//                         error={Boolean(personalErrors.dataModelName)}
//                         aria-describedby='stepper-linear-personal-data-model-helper'
//                       />
//                     )}
//                   />
//                   {personalErrors.dataModelName && (
//                     <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-data-model-helper'>
//                       {personalErrors.dataModelName.message}
//                     </FormHelperText>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button size='large' type='submit' variant='contained'>
//                   Next
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         );
//       case 2:
//         return (
//           <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
//             <Grid container spacing={5}>
//               <Grid item xs={12}>
//                 <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
//                   {steps[2].title}
//                 </Typography>
//                 <Typography variant='caption' component='p'>
//                   {steps[2].subtitle}
//                 </Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <TextField
//                     label='Variables'
//                     multiline
//                     disabled
//                     value={variables.join('\n')}
//                     rows={5}
//                     sx={{ maxHeight: 200, overflowY: 'scroll' }}
//                   />
//                 </FormControl>
//                 <Typography variant='caption' color='text.secondary' sx={{ mt: 2 }}>
//                   {variables.length} variable created successfully
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
//                   Back
//                 </Button>
//                 <Button size='large' type='submit' variant='contained'>
//                   Submit
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         );
//       default:
//         return null;
//     }
//   };

//   const renderContent = () => {
//     if (activeStep === steps.length) {
//       return (
//         <Fragment>
//           <Typography>All steps are completed!</Typography>
//           <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
//             <Button size='large' variant='contained' onClick={handleReset}>
//               Reset
//             </Button>
//           </Box>
//         </Fragment>
//       );
//     } else {
//       return getStepContent(activeStep);
//     }
//   };

//   return (
//     <Card>
//       <CardContent>
//         <StepperWrapper>
//           <Stepper activeStep={activeStep}>
//             {steps.map((step, index) => (
//               <Step key={index}>
//                 <StepLabel StepIconComponent={StepperCustomDot}>
//                   <div className='step-label'>
//                     <Typography className='step-number'>{`0${index + 1}`}</Typography>
//                     <div>
//                       <Typography className='step-title'>{step.title}</Typography>
//                       <Typography className='step-subtitle'>{step.subtitle}</Typography>
//                     </div>
//                   </div>
//                 </StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </StepperWrapper>
//       </CardContent>

//       <Divider sx={{ m: '0 !important' }} />

//       <CardContent>{renderContent()}</CardContent>
//     </Card>
//   );
// };

// export default StepperLinearWithValidation;








// adding circular spinner in variable section





// ** React Imports
import { Fragment, useState } from 'react';
import React, { useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Step from '@mui/material/Step';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import MenuItem from '@mui/material/MenuItem';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { CircularProgress } from '@mui/material'

// ** Third Party Imports
import * as yup from 'yup';
import toast from 'react-hot-toast';
// import toast from 'react-toastify'; 
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot';

// ** Styled Components
import StepperWrapper from 'src/@core/styles/mui/stepper';

// ** API Calls
import getAllConnections from 'src/api/data-model/getAllConnections';
import getSchemasByConnection from 'src/api/data-model/getAllSchemas';
import createSet from 'src/api/data-model/createSets'; 
import createVariable from 'src/api/data-model/createVariable';
import { CheckCircleOutline, Cancel } from '@mui/icons-material'; 
import { useRouter } from 'next/router';

const steps = [
  {
    title: 'Connection Details',
    subtitle: 'Enter your Connection Details',
  },
  {
    title: 'Schema Info',
    subtitle: 'Schema Information',
  },
  {
    title: 'Variables Info',
    subtitle: 'Variables Information',
  },
];

const defaultAccountValues = {
  connection: '',
};

const defaultPersonalValues = {
  schema: '',
  dataModelName: '',
};

const defaultSocialValues = {
  variables: [],
};

const accountSchema = yup.object().shape({
  connection: yup.string().required('Please select a connection'),
});

const personalSchema = yup.object().shape({
  schema: yup.string().required('Please select a schema'),
  dataModelName: yup.string().required('Please enter the data model name'),
});

const socialSchema = yup.object().shape({
  variables: yup.array().min(1, 'At least one variable must be created'),
});

const StepperLinearWithValidation = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);
  const [variables, setVariables] = useState(['Variable 1', 'Variable 2', 'Variable 3']);
  const [connections, setConnections] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [setID, setSetID] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [isSuccess, setIsSuccess] = useState(null); 

  const router = useRouter();


  // Fetch connections on component mount
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const connectionData = await getAllConnections();
        setConnections(connectionData);
      } catch (error) {
        toast.error('Failed to load connections');
      }
    };

    fetchConnections();
  }, []);

  // ** Hooks
  const {
    reset: accountReset,
    control: accountControl,
    handleSubmit: handleAccountSubmit,
    getValues: accountGetValues,
    formState: { errors: accountErrors },
  } = useForm({
    defaultValues: defaultAccountValues,
    resolver: yupResolver(accountSchema),
  });

  const {
    reset: personalReset,
    control: personalControl,
    handleSubmit: handlePersonalSubmit,
    getValues: personalGetValues,
    formState: { errors: personalErrors },
  } = useForm({
    defaultValues: defaultPersonalValues,
    resolver: yupResolver(personalSchema),
  });

  const {
    reset: socialReset,
    control: socialControl,
    handleSubmit: handleSocialSubmit,
    formState: { errors: socialErrors },
  } = useForm({
    defaultValues: defaultSocialValues,
    resolver: yupResolver(socialSchema),
  });

  // Handle Stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    accountReset({ connection: '' });
    personalReset({ schema: '', dataModelName: '' });
    socialReset({ variables: [] });
    setVariables([]);
    setSchemas([]);
    setSetID(null); // Reset the Set ID
  };






  // binded api to create set


  // const onSubmit = async () => {
  //   if (activeStep === 1) {
  //     // When in Schema Info step, call the API to create the set
  //     const schemaID = personalGetValues('schema');
  //     console.log("this is schema id",schemaID )
  //     const connectionID = accountGetValues('connection');
  //     const dataModelName = personalGetValues('dataModelName');

  //     try {
  //       const apiResponse = await createSet(dataModelName, schemaID, connectionID);
  //       setSetID(apiResponse.Data); // Store the set ID
  //       toast.success(`Set created successfully with ID ${apiResponse.Data}`);
  //     } catch (error) {
  //       toast.error('Failed to create set');
  //       return; 
  //     }
  //   }

  //   setActiveStep(activeStep + 1);
  //   if (activeStep === steps.length - 1) {
  //     toast.success('Form Submitted');
  //   }
  // };




//  more optimized code with conditional check


// const onSubmit = async () => {
//   setLoading(true); 
//   setIsSuccess(null); 

//   if (activeStep === 1) {
//     const schemaID = personalGetValues('schema');
//     const connectionID = accountGetValues('connection');
//     const dataModelName = personalGetValues('dataModelName');

//     try {
      
//       const apiResponse = await createSet(dataModelName, schemaID, connectionID);

//       if (apiResponse && apiResponse.Data) {
//         setSetID(apiResponse.Data); 

       
//         try {
//           const variableResponse = await createVariable(apiResponse.Data, connectionID);

//           if (variableResponse && variableResponse.Data) {
//             setVariables(variableResponse.Data); 
//             toast.success(variableResponse.message); 
//             setIsSuccess(true); 
//           } else {
//             throw new Error('Variable response is empty or invalid');
//           }
//         } catch (error) {
//           console.error(error); 
//           toast.error('Failed to create variables');
//           setIsSuccess(false); 
//         }
//       } else {
//         throw new Error('Set creation response is empty or invalid');
//       }
//     } catch (error) {
//       console.error(error); 
//       toast.error('Failed to create set');
//       setIsSuccess(false); 
//     }
//   }

  
//   setLoading(false);

  
//   setActiveStep(activeStep + 1);
//   if (activeStep === steps.length - 1) {
//     toast.success('Form Submitted');
//   }

//   router.push('/data-model');
// };





//  binded api to create variable on next button



  const onSubmit = async () => {
    setLoading(true); 
    setIsSuccess(null); 

    if (activeStep === 1) {
      const schemaID = personalGetValues('schema');
      const connectionID = accountGetValues('connection');
      const dataModelName = personalGetValues('dataModelName');

      try {
        
        const apiResponse = await createSet(dataModelName, schemaID, connectionID);
        setSetID(apiResponse.Data); 

        
        try {
          const variableResponse = await createVariable(apiResponse.Data, connectionID);
          setVariables(variableResponse.Data); 
          toast.success(variableResponse.message); 
          setIsSuccess(true); 
        } catch (error) {
          toast.error('Failed to create variables');
          setIsSuccess(false); 
        }
      } catch (error) {
        toast.error('Failed to create set');
        setIsSuccess(false); 
      }
    }

    setLoading(false); 

    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted');
    }
  };




  const handleConnectionChange = async (connectionId) => {
    try {
      const fetchedSchemas = await getSchemasByConnection(connectionId);
      setSchemas(fetchedSchemas);
    } catch (error) {
      toast.error('Failed to load schemas');
    }
  };





  const navigator= async () => {
    router.push('/data-model');
  }



  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form key={0} onSubmit={handleAccountSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[0].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[0].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='stepper-linear-account-connection' error={Boolean(accountErrors.connection)}>
                    Select Connection
                  </InputLabel>
                  <Controller
                    name='connection'
                    control={accountControl}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        onChange={(e) => {
                          onChange(e);
                          handleConnectionChange(e.target.value);
                        }}
                        label='Select Connection'
                        labelId='stepper-linear-account-connection'
                        error={Boolean(accountErrors.connection)}
                      >
                        {connections.map((connection) => (
                          <MenuItem key={connection.ID} value={connection.ID}>
                            {connection.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {accountErrors.connection && (
                    <FormHelperText sx={{ color: 'error.main' }}>{accountErrors.connection.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' disabled>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      case 1:
        return (
          <form key={1} onSubmit={handlePersonalSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {steps[1].title}
                </Typography>
                <Typography variant='caption' component='p'>
                  {steps[1].subtitle}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='stepper-linear-personal-schema'>Select Schema</InputLabel>
                  <Controller
                    name='schema'
                    control={personalControl}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        onChange={onChange}
                        label='Select Schema'
                        error={Boolean(personalErrors.schema)}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 48 * 5 + 8, 
                              overflowY: 'auto',
                            },
                          },
                        }}
                        aria-describedby='stepper-linear-personal-schema-helper'
                      >
                        {schemas.map((schema) => (
                          <MenuItem key={schema.ID} value={schema.ID}>
                            {schema.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {personalErrors.schema && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-schema-helper'>
                      {personalErrors.schema.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='dataModelName'
                    control={personalControl}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        onChange={onChange}
                        label='Enter Data Model Name'
                        placeholder='Data Model Name'
                        error={Boolean(personalErrors.dataModelName)}
                        aria-describedby='stepper-linear-personal-data-model-helper'
                      />
                    )}
                  />
                  {personalErrors.dataModelName && (
                    <FormHelperText sx={{ color: 'error.main' }} id='stepper-linear-personal-data-model-helper'>
                      {personalErrors.dataModelName.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                  Back
                </Button>
                <Button size='large' type='submit' variant='contained'>
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      case 2:
        return (
          <form key={2} onSubmit={handleSocialSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[2].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[2].subtitle}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* Show spinner or success/failure messages based on loading and isSuccess */}
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                  <CircularProgress size={50} />
                </div>
              ) : isSuccess === null ? (
                <TextField
                  label='Variables'
                  multiline
                  disabled
                  value={variables.join('\n')}
                  rows={5}
                  sx={{ maxHeight: 200, overflowY: 'scroll' }}
                />
              ) : isSuccess ? (
                <div style={{ textAlign: 'center' }}>
                  <CheckCircleOutline style={{ color: 'green', fontSize: 50 }} />
                  <Typography variant='h6' color='green'>
                    Sets and Variable created successfully
                  </Typography>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Cancel style={{ color: 'red', fontSize: 50 }} />
                  <Typography variant='h6' color='red'>
                    Error in Creating Sets and Variable
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button size='large' variant='outlined' color='secondary' onClick={handleBack}>
                Back
              </Button>
              <Button size='large' type='submit' variant='contained' onClick={navigator}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      );
    } else {
      return getStepContent(activeStep);
    }
  };

  return (
    <Card>
      <CardContent>
        <StepperWrapper>
          <Stepper activeStep={activeStep}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <Typography className='step-number'>{`0${index + 1}`}</Typography>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default StepperLinearWithValidation;
