//  modified by armsn khan- version - 1

// // ** React Imports
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import Box from '@mui/material/Box'

// // ** MUI Imports
// import { styled } from '@mui/material/styles'
// import Typography from '@mui/material/Typography'
// import MuiAccordion from '@mui/material/Accordion'
// import MuiAccordionSummary from '@mui/material/AccordionSummary'
// import MuiAccordionDetails from '@mui/material/AccordionDetails'
// import TextField from '@mui/material/TextField'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** API Import
// import getTileByID from 'src/api/tiles/getTileByID'

// const Accordion = styled(MuiAccordion)(({ theme }) => ({
//   margin: 0,
//   borderRadius: 0,
//   boxShadow: 'none !important',
//   border:
//     theme.palette.mode === 'light' ? `0px solid ${theme.palette.grey[300]}` : `0px solid ${theme.palette.divider}`,
//   '&:not(:last-of-type)': {
//     borderBottom: 0
//   },
//   '&:before': {
//     display: 'none'
//   },
//   '&.Mui-expanded': {
//     margin: 'auto'
//   },
//   '&:first-of-type': {
//     '& .MuiButtonBase-root': {
//       borderTopLeftRadius: theme.shape.borderRadius,
//       borderTopRightRadius: theme.shape.borderRadius
//     }
//   },
//   '&:last-of-type': {
//     '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
//       borderBottomLeftRadius: theme.shape.borderRadius,
//       borderBottomRightRadius: theme.shape.borderRadius
//     }
//   }
// }))

// const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
//   marginBottom: 0,
//   padding: theme.spacing(0, 4),
//   minHeight: theme.spacing(12),
//   transition: 'min-height 0.15s ease-in-out',
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   borderBottom:
//     theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
//   '&.Mui-expanded': {
//     minHeight: theme.spacing(12)
//   },
//   '& .MuiAccordionSummary-content.Mui-expanded': {
//     margin: '12px 0'
//   },
//   '& .MuiTypography-root': {
//     fontWeight: 400
//   },
//   '& .MuiAccordionSummary-expandIconWrapper': {
//     color: theme.palette.text.secondary
//   }
// }))

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: `${theme.spacing(2)} !important`
// }))

// const ConfigBox = () => {

//   const [expanded, setExpanded] = useState('')
//   const [datablocks, setDatablocks] = useState({})
//   const [tileStyle, settileStyle]= useState({})
//   const router = useRouter()
//   const { tileId } = router.query

//   useEffect(() => {
//     if (tileId) {
//       const fetchTileData = async () => {
//         try {
//           const response = await getTileByID(tileId)

//           if (response.datablocks) {
//             setDatablocks(response.datablocks)
//           }
//           if(response.styles) {
//             settileStyle(response.styles)
//           }
//         } catch (error) {
//           console.error('Error fetching tile data:', error)
//         }
//       }
//       fetchTileData()
//     }
//   }, [tileId])

//   const handleChange = panel => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false)
//   }

//   const expandIcon = value => <Icon icon={expanded === value ? 'bx:minus' : 'bx:plus'} />

//   return (
//     <div>
//       <AccordionSummary>
//         <Typography variant='h6' component='div' align='left'>
//           Customize
//         </Typography>
//       </AccordionSummary>

//       {/* for datablock style*/}

//       {Object.keys(datablocks).map(key => (
//         <Accordion key={datablocks[key].datablock_id} expanded={expanded === key} onChange={handleChange(key)}>
//           <AccordionSummary
//             id={`customized-panel-header-${key}`}
//             expandIcon={expandIcon(key)}
//             aria-controls={`customized-panel-content-${key}`}
//           >
//             <Typography>{key}</Typography>
//           </AccordionSummary>
//           <AccordionDetails paddingTop={2}>
//             {datablocks[key].styles &&
//               Object.keys(datablocks[key].styles).map(styleKey => (
//                 <Grid container paddingBottom={2} key={styleKey}>
//                   <TextField
//                     fullWidth
//                     label={styleKey}
//                     id={styleKey}
//                     defaultValue={datablocks[key].styles[styleKey]}
//                     size='small'
//                   />
//                 </Grid>
//               ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

// {/* For containter style  */}

// {Object.keys(tileStyle).map(key => (
//         <Accordion key={"1"} expanded={expanded === key} onChange={handleChange(key)}>
//           <AccordionSummary
//             id={`customized-panel-header-${key}`}
//             expandIcon={expandIcon(key)}
//             aria-controls={`customized-panel-content-${key}`}
//           >
//             <Typography>Styles</Typography>
//           </AccordionSummary>
//           <AccordionDetails paddingTop={2}>
//             {tileStyle[key] &&
//               Object.keys(tileStyle[key]).map(styleKey => (
//                 <Grid container paddingBottom={2} key={styleKey}>
//                   <TextField
//                     fullWidth
//                     label={styleKey}
//                     id={styleKey}
//                     defaultValue={tileStyle[key][styleKey]}
//                     size='small'
//                   />
//                   {/* {tileStyle[styleKey]} */}
//                 </Grid>
//               ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//     </div>
//   )
// }

// export default ConfigBox

//  modified by arman khan - version -2

// // ** React Imports
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import Box from '@mui/material/Box'

// // ** MUI Imports
// import { styled } from '@mui/material/styles'
// import Typography from '@mui/material/Typography'
// import MuiAccordion from '@mui/material/Accordion'
// import MuiAccordionSummary from '@mui/material/AccordionSummary'
// import MuiAccordionDetails from '@mui/material/AccordionDetails'
// import TextField from '@mui/material/TextField'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** API Import
// import getTileByID from 'src/api/tiles/getTileByID'

// const Accordion = styled(MuiAccordion)(({ theme }) => ({
//   margin: 0,
//   borderRadius: 0,
//   boxShadow: 'none !important',
//   border:
//     theme.palette.mode === 'light' ? `0px solid ${theme.palette.grey[300]}` : `0px solid ${theme.palette.divider}`,
//   '&:not(:last-of-type)': {
//     borderBottom: 0
//   },
//   '&:before': {
//     display: 'none'
//   },
//   '&.Mui-expanded': {
//     margin: 'auto'
//   },
//   '&:first-of-type': {
//     '& .MuiButtonBase-root': {
//       borderTopLeftRadius: theme.shape.borderRadius,
//       borderTopRightRadius: theme.shape.borderRadius
//     }
//   },
//   '&:last-of-type': {
//     '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
//       borderBottomLeftRadius: theme.shape.borderRadius,
//       borderBottomRightRadius: theme.shape.borderRadius
//     }
//   }
// }))

// const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
//   marginBottom: 0,
//   padding: theme.spacing(0, 4),
//   minHeight: theme.spacing(12),
//   transition: 'min-height 0.15s ease-in-out',
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   borderBottom:
//     theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
//   '&.Mui-expanded': {
//     minHeight: theme.spacing(12)
//   },
//   '& .MuiAccordionSummary-content.Mui-expanded': {
//     margin: '12px 0'
//   },
//   '& .MuiTypography-root': {
//     fontWeight: 400
//   },
//   '& .MuiAccordionSummary-expandIconWrapper': {
//     color: theme.palette.text.secondary
//   }
// }))

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: `${theme.spacing(2)} !important`
// }))

// const ConfigBox = () => {

//   const [expanded, setExpanded] = useState('')
//   const [datablocks, setDatablocks] = useState({})
//   const [tileStyle, settileStyle]= useState({})
//   const router = useRouter()
//   const { tileId } = router.query

//   useEffect(() => {
//     if (tileId) {
//       const fetchTileData = async () => {
//         try {
//           const response = await getTileByID(tileId)

//           if (response.datablocks) {
//             setDatablocks(response.datablocks)
//           }
//           if(response.styles) {
//             settileStyle(response.styles)
//           }
//         } catch (error) {
//           console.error('Error fetching tile data:', error)
//         }
//       }
//       fetchTileData()
//     }
//   }, [tileId])

//   const handleChange = panel => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false)
//   }

//   const expandIcon = value => <Icon icon={expanded === value ? 'bx:minus' : 'bx:plus'} />

//   const handleSave = () => {
//     // Logic for handling save action can be added here
//     console.log('Save button clicked')
//   }

//   return (
//     <Box position='relative'>
//       <AccordionSummary>
//         <Typography variant='h6' component='div' align='left'>
//           Customize
//         </Typography>
//       </AccordionSummary>

//       {/* for datablock style */}
//       {Object.keys(datablocks).map(key => (
//         <Accordion key={datablocks[key].datablock_id} expanded={expanded === key} onChange={handleChange(key)} data-cell-id={datablocks[key].cell_id}>
//           <AccordionSummary
//             id={`customized-panel-header-${key}`}
//             expandIcon={expandIcon(key)}
//             aria-controls={`customized-panel-content-${key}`}
//           >
//             <Typography>{key}</Typography>
//           </AccordionSummary>
//           <AccordionDetails paddingTop={2}>
//             {datablocks[key].styles &&
//               Object.keys(datablocks[key].styles).map(styleKey => (
//                 <Grid container paddingBottom={2} key={styleKey}>
//                   <TextField
//                     fullWidth
//                     label={styleKey}
//                     id={styleKey}
//                     defaultValue={datablocks[key].styles[styleKey]}
//                     size='small'
//                   />
//                 </Grid>
//               ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       {/* For container style */}
//       {Object.keys(tileStyle).map(key => (
//         <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
//           <AccordionSummary
//             id={`customized-panel-header-${key}`}
//             expandIcon={expandIcon(key)}
//             aria-controls={`customized-panel-content-${key}`}
//           >
//             <Typography>Styles</Typography>
//           </AccordionSummary>
//           <AccordionDetails paddingTop={2}>
//             {tileStyle[key] &&
//               Object.keys(tileStyle[key]).map(styleKey => (
//                 <Grid container paddingBottom={2} key={styleKey}>
//                   <TextField
//                     fullWidth
//                     label={styleKey}
//                     id={styleKey}
//                     defaultValue={tileStyle[key][styleKey]}
//                     size='small'
//                   />
//                 </Grid>
//               ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       {/* Save Button */}
//       <Box position='absolute' bottom={-50} right={16}>
//         <Button variant='contained' color='primary' onClick={handleSave}>
//           Save
//         </Button>
//       </Box>
//     </Box>
//   )
// }

// export default ConfigBox

//  api binding 1- update datablock

// // ** React Imports
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import Box from '@mui/material/Box'

// // ** MUI Imports
// import { styled } from '@mui/material/styles'
// import Typography from '@mui/material/Typography'
// import MuiAccordion from '@mui/material/Accordion'
// import MuiAccordionSummary from '@mui/material/AccordionSummary'
// import MuiAccordionDetails from '@mui/material/AccordionDetails'
// import TextField from '@mui/material/TextField'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** API Imports
// import getTileByID from 'src/api/tiles/getTileByID'
// import updateDatablock from 'src/api/tiles/updateDatablock'

// const Accordion = styled(MuiAccordion)(({ theme }) => ({
//   margin: 0,
//   borderRadius: 0,
//   boxShadow: 'none !important',
//   border:
//     theme.palette.mode === 'light' ? `0px solid ${theme.palette.grey[300]}` : `0px solid ${theme.palette.divider}`,
//   '&:not(:last-of-type)': {
//     borderBottom: 0
//   },
//   '&:before': {
//     display: 'none'
//   },
//   '&.Mui-expanded': {
//     margin: 'auto'
//   },
//   '&:first-of-type': {
//     '& .MuiButtonBase-root': {
//       borderTopLeftRadius: theme.shape.borderRadius,
//       borderTopRightRadius: theme.shape.borderRadius
//     }
//   },
//   '&:last-of-type': {
//     '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
//       borderBottomLeftRadius: theme.shape.borderRadius,
//       borderBottomRightRadius: theme.shape.borderRadius
//     }
//   }
// }))

// const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
//   marginBottom: 0,
//   padding: theme.spacing(0, 4),
//   minHeight: theme.spacing(12),
//   transition: 'min-height 0.15s ease-in-out',
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   borderBottom:
//     theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
//   '&.Mui-expanded': {
//     minHeight: theme.spacing(12)
//   },
//   '& .MuiAccordionSummary-content.Mui-expanded': {
//     margin: '12px 0'
//   },
//   '& .MuiTypography-root': {
//     fontWeight: 400
//   },
//   '& .MuiAccordionSummary-expandIconWrapper': {
//     color: theme.palette.text.secondary
//   }
// }))

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: `${theme.spacing(2)} !important`
// }))

// const ConfigBox = () => {
//   const [expanded, setExpanded] = useState('')
//   const [datablocks, setDatablocks] = useState({})
//   const [tileStyle, setTileStyle] = useState({})
//   const router = useRouter()
//   const { tileId } = router.query

//   useEffect(() => {
//     if (tileId) {
//       const fetchTileData = async () => {
//         try {
//           const response = await getTileByID(tileId)
//           if (response.datablocks) {
//             setDatablocks(response.datablocks)
//           }
//           if (response.styles) {
//             setTileStyle(response.styles)
//           }
//         } catch (error) {
//           console.error('Error fetching tile data:', error)
//         }
//       }
//       fetchTileData()
//     }
//   }, [tileId])

//   const handleChange = panel => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false)
//   }

//   const expandIcon = value => <Icon icon={expanded === value ? 'bx:minus' : 'bx:plus'} />

//   const handleSave = async () => {
//     const payload = Object.keys(datablocks).map(key => ({
//       ID: datablocks[key].datablock_id,
//       TileID: parseInt(tileId, 10),
//       Configs: {}, // Add configs here if needed
//       CellID: datablocks[key].cell_id,
//       Data: {
//         value: datablocks[key].data.value
//       },
//       Styles: datablocks[key].styles,
//       Type: datablocks[key].type || 'text'
//     }))

//     try {
//       const response = await updateDatablock(payload)
//       if (response.code === 200) {
//         console.log('Datablocks updated successfully:', response.message)
//         // Optionally, you can refetch the tile data or trigger a re-render of the CardPreview component
//       }
//     } catch (error) {
//       console.error('Error updating datablocks:', error)
//     }
//   }

//   return (
//     <Box position='relative'>
//       <AccordionSummary>
//         <Typography variant='h6' component='div' align='left'>
//           Customize
//         </Typography>
//       </AccordionSummary>

//       {/* for datablock style */}
//       {Object.keys(datablocks).map(key => (
//         <Accordion
//           key={datablocks[key].datablock_id}
//           expanded={expanded === key}
//           onChange={handleChange(key)}
//           data-cell-id={datablocks[key].cell_id}
//         >
//           <AccordionSummary
//             id={`customized-panel-header-${key}`}
//             expandIcon={expandIcon(key)}
//             aria-controls={`customized-panel-content-${key}`}
//           >
//             <Typography>{key}</Typography>
//           </AccordionSummary>
//           <AccordionDetails paddingTop={2}>
//             {datablocks[key].styles &&
//               Object.keys(datablocks[key].styles).map(styleKey => (
//                 <Grid container paddingBottom={2} key={styleKey}>
//                   <TextField
//                     fullWidth
//                     label={styleKey}
//                     id={styleKey}
//                     defaultValue={datablocks[key].styles[styleKey]}
//                     size='small'
//                     onChange={e => {
//                       setDatablocks(prevState => ({
//                         ...prevState,
//                         [key]: {
//                           ...prevState[key],
//                           styles: {
//                             ...prevState[key].styles,
//                             [styleKey]: e.target.value
//                           }
//                         }
//                       }))
//                     }}
//                   />
//                 </Grid>
//               ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       {/* For container style */}
//       {Object.keys(tileStyle).map(key => (
//         <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
//           <AccordionSummary
//             id={`customized-panel-header-${key}`}
//             expandIcon={expandIcon(key)}
//             aria-controls={`customized-panel-content-${key}`}
//           >
//             <Typography>Styles</Typography>
//           </AccordionSummary>
//           <AccordionDetails paddingTop={2}>
//             {tileStyle[key] &&
//               Object.keys(tileStyle[key]).map(styleKey => (
//                 <Grid container paddingBottom={2} key={styleKey}>
//                   <TextField
//                     fullWidth
//                     label={styleKey}
//                     id={styleKey}
//                     defaultValue={tileStyle[key][styleKey]}
//                     size='small'
//                     onChange={e => {
//                       setTileStyle(prevState => ({
//                         ...prevState,
//                         [key]: {
//                           ...prevState[key],
//                           [styleKey]: e.target.value
//                         }
//                       }))
//                     }}
//                   />
//                 </Grid>
//               ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       {/* Save Button */}
//       <Box position='absolute' bottom={-50} right={16}>
//         <Button variant='contained' color='primary' onClick={handleSave}>
//           Save
//         </Button>
//       </Box>
//     </Box>
//   )
// }

// export default ConfigBox

//  api binding - 2 update datablock

// // ** React Imports
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import Box from '@mui/material/Box'

// // ** MUI Imports
// import { styled } from '@mui/material/styles'
// import Typography from '@mui/material/Typography'
// import MuiAccordion from '@mui/material/Accordion'
// import MuiAccordionSummary from '@mui/material/AccordionSummary'
// import MuiAccordionDetails from '@mui/material/AccordionDetails'
// import TextField from '@mui/material/TextField'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'

// // ** Icon Imports
// import Icon from 'src/@core/components/icon'

// // ** API Imports
// import getTileByID from 'src/api/tiles/getTileByID'
// import updateDatablock from 'src/api/tiles/updateDatablock'

// // ** Utils Import
// import eventEmitter from 'src/utils/eventEmitter'

// const Accordion = styled(MuiAccordion)(({ theme }) => ({
//   margin: 0,
//   borderRadius: 0,
//   boxShadow: 'none !important',
//   border:
//     theme.palette.mode === 'light' ? `0px solid ${theme.palette.grey[300]}` : `0px solid ${theme.palette.divider}`,
//   '&:not(:last-of-type)': {
//     borderBottom: 0
//   },
//   '&:before': {
//     display: 'none'
//   },
//   '&.Mui-expanded': {
//     margin: 'auto'
//   },
//   '&:first-of-type': {
//     '& .MuiButtonBase-root': {
//       borderTopLeftRadius: theme.shape.borderRadius,
//       borderTopRightRadius: theme.shape.borderRadius
//     }
//   },
//   '&:last-of-type': {
//     '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
//       borderBottomLeftRadius: theme.shape.borderRadius,
//       borderBottomRightRadius: theme.shape.borderRadius
//     }
//   }
// }))

// const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
//   marginBottom: 0,
//   padding: theme.spacing(0, 4),
//   minHeight: theme.spacing(12),
//   transition: 'min-height 0.15s ease-in-out',
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   borderBottom:
//     theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
//   '&.Mui-expanded': {
//     minHeight: theme.spacing(12)
//   },
//   '& .MuiAccordionSummary-content.Mui-expanded': {
//     margin: '12px 0'
//   },
//   '& .MuiTypography-root': {
//     fontWeight: 400
//   },
//   '& .MuiAccordionSummary-expandIconWrapper': {
//     color: theme.palette.text.secondary
//   }
// }))

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: `${theme.spacing(2)} !important`
// }))

// const ConfigBox = () => {
//   const [expanded, setExpanded] = useState('')
//   const [datablocks, setDatablocks] = useState({})
//   const [tileStyle, setTileStyle] = useState({})
//   const router = useRouter()
//   const { tileId } = router.query

//   useEffect(() => {
//     if (tileId) {
//       const fetchTileData = async () => {
//         try {
//           const response = await getTileByID(tileId)
//           if (response.datablocks) {
//             setDatablocks(response.datablocks)
//           }
//           if (response.styles) {
//             setTileStyle(response.styles)
//           }
//         } catch (error) {
//           console.error('Error fetching tile data:', error)
//         }
//       }
//       fetchTileData()
//     }
//   }, [tileId])

//   const handleChange = panel => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false)
//   }

//   const expandIcon = value => <Icon icon={expanded === value ? 'bx:minus' : 'bx:plus'} />

//   const handleSave = async () => {
//     const payload = Object.keys(datablocks).map(key => ({
//       ID: datablocks[key].datablock_id,
//       TileID: parseInt(tileId, 10),
//       Configs: {}, // Add configs here if needed
//       CellID: datablocks[key].cell_id,
//       Data: {
//         value: datablocks[key].data.value
//       },
//       Styles: datablocks[key].styles,
//       Type: datablocks[key].type || 'text'
//     }))

//     try {

//       const response = await updateDatablock(payload)
//       if (response.code === 200) {
//         console.log('Datablocks updated successfully:', response.message)
//         eventEmitter.emit('tileUpdated') // Emit an event to notify that the tile has been updated
//       }
//     } catch (error) {
//       console.error('Error updating datablocks:', error)

//     }
//   }

//   return (
//     <Box position='relative'>
//       <AccordionSummary>
//         <Typography variant='h6' component='div' align='left'>
//           Customize
//         </Typography>
//       </AccordionSummary>

//       {/* for datablock style */}
//       {Object.keys(datablocks).map(key => (
//         <Accordion
//           key={datablocks[key].datablock_id}
//           expanded={expanded === key}
//           onChange={handleChange(key)}
//           data-cell-id={datablocks[key].cell_id}
//         >
//           <AccordionSummary
//             id={`customized-panel-header-${key}`}
//             expandIcon={expandIcon(key)}
//             aria-controls={`customized-panel-content-${key}`}
//           >
//             <Typography>{key}</Typography>
//           </AccordionSummary>
//           <AccordionDetails paddingTop={2}>
//             {datablocks[key].styles &&
//               Object.keys(datablocks[key].styles).map(styleKey => (
//                 <Grid container paddingBottom={2} key={styleKey}>
//                   <TextField
//                     fullWidth
//                     label={styleKey}
//                     id={styleKey}
//                     defaultValue={datablocks[key].styles[styleKey]}
//                     size='small'
//                     onChange={e => {
//                       setDatablocks(prevState => ({
//                         ...prevState,
//                         [key]: {
//                           ...prevState[key],
//                           styles: {
//                             ...prevState[key].styles,
//                             [styleKey]: e.target.value
//                           }
//                         }
//                       }))
//                     }}
//                   />
//                 </Grid>
//               ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       {/* For container style */}
//       {Object.keys(tileStyle).map(key => (
//         <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
//           <AccordionSummary
//             id={`customized-panel-header-${key}`}
//             expandIcon={expandIcon(key)}
//             aria-controls={`customized-panel-content-${key}`}
//           >
//             <Typography>Styles</Typography>
//           </AccordionSummary>
//           <AccordionDetails paddingTop={2}>
//             {tileStyle[key] &&
//               Object.keys(tileStyle[key]).map(styleKey => (
//                 <Grid container paddingBottom={2} key={styleKey}>
//                   <TextField
//                     fullWidth
//                     label={styleKey}
//                     id={styleKey}
//                     defaultValue={tileStyle[key][styleKey]}
//                     size='small'
//                     onChange={e => {
//                       setTileStyle(prevState => ({
//                         ...prevState,
//                         [key]: {
//                           ...prevState[key],
//                           [styleKey]: e.target.value
//                         }
//                       }))
//                     }}
//                   />
//                 </Grid>
//               ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       {/* Save Button */}
//       <Box position='absolute' bottom={-50} right={16}>
//         <Button variant='contained' color='primary' onClick={handleSave}>
//           Save
//         </Button>
//       </Box>
//     </Box>
//   )
// }

// export default ConfigBox





//  modified by arman khan - to get datablock id'




import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import getTileByID from 'src/api/tiles/getTileByID'
import updateDatablock from 'src/api/tiles/updateDatablock'
import eventEmitter from 'src/utils/eventEmitter'

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  margin: 0,
  borderRadius: 0,
  boxShadow: 'none !important',
  border:
    theme.palette.mode === 'light' ? `0px solid ${theme.palette.grey[300]}` : `0px solid ${theme.palette.divider}`,
  '&:not(:last-of-type)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  },
  '&.Mui-expanded': {
    margin: 'auto'
  },
  '&:first-of-type': {
    '& .MuiButtonBase-root': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    }
  },
  '&:last-of-type': {
    '& .MuiAccordionSummary-root:not(.Mui-expanded)': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius
    }
  }
}))

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
  marginBottom: 0,
  padding: theme.spacing(0, 4),
  minHeight: theme.spacing(12),
  transition: 'min-height 0.15s ease-in-out',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderBottom:
    theme.palette.mode === 'light' ? `1px solid ${theme.palette.grey[300]}` : `1px solid ${theme.palette.divider}`,
  '&.Mui-expanded': {
    minHeight: theme.spacing(12)
  },
  '& .MuiAccordionSummary-content.Mui-expanded': {
    margin: '12px 0'
  },
  '& .MuiTypography-root': {
    fontWeight: 400
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    color: theme.palette.text.secondary
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(2)} !important`
}))

const ConfigBox = () => {
  const [expanded, setExpanded] = useState('')
  const [datablocks, setDatablocks] = useState({})
  const [tileStyle, setTileStyle] = useState({})
  const router = useRouter()
  const { tileId } = router.query
  const currentPath = router.asPath
  console.log(currentPath)

  const navigateToDashboard = () => {
    const basePath = currentPath.split('/editor')[0]
    router.push(basePath)
  }

  useEffect(() => {
    if (tileId) {
      const fetchTileData = async () => {
        try {
          const response = await getTileByID(tileId)
          if (response.datablocks) {
            setDatablocks(response.datablocks)
          }
          if (response.styles) {
            setTileStyle(response.styles)
          }
        } catch (error) {
          console.error('Error fetching tile data:', error)
        }
      }
      fetchTileData()
    }
  }, [tileId])

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)

    // emit id
    if (isExpanded) {
      const datablockId = datablocks[panel]?.datablock_id
      if (datablockId) {
        eventEmitter.emit('accordionExpanded', datablockId)
      }
    }
  }

  const expandIcon = value => <Icon icon={expanded === value ? 'bx:minus' : 'bx:plus'} />

  const handleSave = async () => {


    // try {
    //   const payload = Object.keys(datablocks).map(key => ({
    //     ID: datablocks[key].datablock_id,
    //     TileID: parseInt(tileId, 10),
    //     Configs: {},
    //     CellID: datablocks[key].cell_id,
    //     Data: {
    //       value: datablocks[key].data.value
    //     },
    //     Styles: datablocks[key].styles,
    //     Type: datablocks[key].type || 'text'
    //   }))
    // } catch (error) {
    //   const payload = Object.keys(datablocks).map(key => ({
    //     ID: datablocks[key].datablock_id,
    //     TileID: parseInt(tileId, 10),
    //     Configs: {},
    //     CellID: datablocks[key].cell_id,
    //     // Data: {
    //     //   value: datablocks[key].data.value
    //     // },
    //     Styles: datablocks[key].styles,
    //     Type: datablocks[key].type || 'text'
    //   }))
    // }


    //  modified by arman khan

      const payload = Object.keys(datablocks).map(key => ({
        ID: datablocks[key].datablock_id,
        TileID: parseInt(tileId, 10),
        Configs: {},
        CellID: datablocks[key].cell_id,
        Data: {
          value: datablocks[key].data.value
        },
        Styles: datablocks[key].styles,
        Type: datablocks[key].type || 'text'
      }))

    try {
      const response = await updateDatablock(payload)
      if (response.code === 200) {
        console.log('Datablocks updated successfully:', response.message)
        eventEmitter.emit('tileUpdated')
      }
    } catch (error) {
      console.error('Error updating datablocks:', error)
    }
  }

  return (
    <Box position='relative'>
      <AccordionSummary>
        <Typography variant='h6' component='div' align='left'>
          Customize
        </Typography>
      </AccordionSummary>

      {/* for datablock style */}
      {Object.keys(datablocks).map(key => (
        <Accordion
          key={datablocks[key].datablock_id}
          expanded={expanded === key}
          onChange={handleChange(key)}
          data-cell-id={datablocks[key].cell_id}
        >
          <AccordionSummary
            id={`customized-panel-header-${key}`}
            expandIcon={expandIcon(key)}
            aria-controls={`customized-panel-content-${key}`}
          >
            <Typography>{key}</Typography>
          </AccordionSummary>
          <AccordionDetails paddingTop={2}>
            {datablocks[key].styles &&
              Object.keys(datablocks[key].styles).map(styleKey => (
                <Grid container paddingBottom={2} key={styleKey}>
                  <TextField
                    fullWidth
                    label={styleKey}
                    id={styleKey}
                    defaultValue={datablocks[key].styles[styleKey]}
                    size='small'
                    onChange={e => {
                      setDatablocks(prevState => ({
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          styles: {
                            ...prevState[key].styles,
                            [styleKey]: e.target.value
                          }
                        }
                      }))
                    }}
                  />
                </Grid>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* For container style */}
      {Object.keys(tileStyle).map(key => (
        <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
          <AccordionSummary
            id={`customized-panel-header-${key}`}
            expandIcon={expandIcon(key)}
            aria-controls={`customized-panel-content-${key}`}
          >
            <Typography>Styles</Typography>
          </AccordionSummary>
          <AccordionDetails paddingTop={2}>
            {tileStyle[key] &&
              Object.keys(tileStyle[key]).map(styleKey => (
                <Grid container paddingBottom={2} key={styleKey}>
                  <TextField
                    fullWidth
                    label={styleKey}
                    id={styleKey}
                    defaultValue={tileStyle[key][styleKey]}
                    size='small'
                    onChange={e => {
                      setTileStyle(prevState => ({
                        ...prevState,
                        [key]: {
                          ...prevState[key],
                          [styleKey]: e.target.value
                        }
                      }))
                    }}
                  />
                </Grid>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Grid justifyContent='space-between' container alignItems='center' paddingTop={5} paddingLeft={4}>
        <Grid item>
          <Button variant='contained' color='primary' onClick={handleSave}>
            Save
          </Button>
        </Grid>
        <Grid item paddingX={4}>
          <Button variant='contained' color='secondary' onClick={navigateToDashboard}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ConfigBox
