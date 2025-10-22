// import { useRef, useState, useEffect, Fragment, createRef } from 'react'
// import ButtonGroup from '@mui/material/ButtonGroup'
// import TextField from '@mui/material/TextField'
// import Paper from '@mui/material/Paper'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Popper from '@mui/material/Popper'
// import Grow from '@mui/material/Grow'
// import ClickAwayListener from '@mui/material/ClickAwayListener'
// import MenuList from '@mui/material/MenuList'
// import MenuItem from '@mui/material/MenuItem'
// import Icon from 'src/@core/components/icon'
// import { styled } from '@mui/material/styles'
// import getAllConnections from 'src/api/connections/getAllConnections'
// import runCellQuery from 'src/api/cells/runcellquery'

// const RunQueryBox = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   padding: theme.spacing(1)
// }))

// const QueryEditor = props => {
//   const [connections, setConnections] = useState([])
//   const [selectedIndexes, setSelectedIndexes] = useState([]) // Store selectedIndex for each cell
//   const [openStates, setOpenStates] = useState([]) // Store open state for each cell
//   const [queryValues, setQueryValues] = useState({}) // Store query values for each cell

//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const response = await getAllConnections()
//         console.log(response)
//         if (response.code === 200 && response.Data) {
//           setConnections(response.Data)
//         }
//       } catch (error) {
//         console.error('Error fetching connections:', error)
//       }
//     }
//     fetchConnections()
//   }, [])

//   useEffect(() => {
//     // Initialize selectedIndexes and openStates for each cell
//     const initialSelectedIndexes = props.cells.Cell.map(cell => {
//       const index = connections.findIndex(option => option.ID === cell.connectionID)
//       return index !== -1 ? index : 0
//     })
//     setSelectedIndexes(initialSelectedIndexes)
//     setOpenStates(props.cells.Cell.map(() => false))
//     setQueryValues(
//       props.cells.Cell.reduce((acc, cell) => {
//         acc[cell.ID] = cell.Query
//         return acc
//       }, {})
//     )
//   }, [connections, props.cells.Cell])

//   const handleMenuItemClick = (cellIndex, index) => {
//     const newSelectedIndexes = [...selectedIndexes]
//     newSelectedIndexes[cellIndex] = index
//     setSelectedIndexes(newSelectedIndexes)
//   }

//   const handleToggle = cellIndex => {
//     const newOpenStates = [...openStates]
//     newOpenStates[cellIndex] = !newOpenStates[cellIndex]
//     setOpenStates(newOpenStates)
//   }

//   const handleClose = (cellIndex, event) => {
//     const newOpenStates = [...openStates]
//     if (anchorRefs.current[cellIndex].current && anchorRefs.current[cellIndex].current.contains(event.target)) {
//       return
//     }
//     newOpenStates[cellIndex] = false
//     setOpenStates(newOpenStates)
//   }

//   const handleQueryChange = (cellId, value) => {
//     setQueryValues(prevValues => ({
//       ...prevValues,
//       [cellId]: value
//     }))
//   }

//   const handleRunQuery = async (cellId, connectionId) => {
//     try {
//       const query = queryValues[cellId]
//       console.log(cellId, connectionId, query)
//       const response = await runCellQuery(cellId, connectionId, query)
//       console.log('Query run response:', response)
//       // Handle the response as needed
//     } catch (error) {
//       console.error('Error running query:', error)
//     }
//   }

//   const anchorRefs = useRef(props.cells.Cell.map(() => createRef())) // Create refs for each cell

//   const cells = props.cells.Cell.slice(0, 25)

//   return (
//     <>
//       {cells.map((cell, cellIndex) => {
//         const options = [
//           { ID: -1, Name: 'No Connection' },
//           ...connections.map(item => ({
//             ID: item.ID,
//             Name: item.Name
//           }))
//         ]

//         return (
//           <RunQueryBox key={cell.ID} elevation={0} sx={{ paddingX: 4 }}>
//             <TextField
//               minRows={3}
//               maxRows={10}
//               multiline
//               fullWidth
//               value={queryValues[cell.ID] || ''}
//               onChange={e => handleQueryChange(cell.ID, e.target.value)}
//               type='code'
//               label={`#CL${cell.ID}`}
//               id='textarea-outlined-static'
//             />
//             <Box sx={{ display: 'flex', paddingY: 2, borderRadius: 1 }}>
//               <Box sx={{ flexGrow: 1, paddingY: 1 }}>
//                 <Button variant='outlined' size='small' startIcon={<Icon icon='bx:plus' />}>
//                   Add
//                 </Button>
//                 <Button
//                   variant='outlined'
//                   sx={{ marginX: 2 }}
//                   color='error'
//                   size='small'
//                   startIcon={<Icon icon='ic:delete' />}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//               <Box>
//                 <Fragment>
//                   <ButtonGroup
//                     variant='outlined'
//                     sx={{ paddingX: 2 }}
//                     color='secondary'
//                     size='small'
//                     ref={anchorRefs.current[cellIndex]}
//                     aria-label='split button'
//                   >
//                     <Button
//                       startIcon={<Icon icon='ic:baseline-brightness-1' style={{ color: 'lightgreen' }} />}
//                       onClick={() => {
//                         if (options[selectedIndexes[cellIndex]]) {
//                           console.log(`You clicked ${options[selectedIndexes[cellIndex]].Name}`)
//                         }
//                       }}
//                       id={`btn-${cell.ID}`}
//                     >
//                       {options[selectedIndexes[cellIndex]]?.Name || 'No Connection'}
//                     </Button>
//                     <Button
//                       size='small'
//                       aria-haspopup='menu'
//                       onClick={() => handleToggle(cellIndex)}
//                       sx={{ px: '0 !important' }}
//                       aria-label='select merge strategy'
//                       aria-expanded={openStates[cellIndex] ? 'true' : undefined}
//                       aria-controls={openStates[cellIndex] ? `split-button-menu-${cell.ID}` : undefined}
//                     >
//                       <Icon fontSize={12} icon='bxs:down-arrow' />
//                     </Button>
//                   </ButtonGroup>
//                   <Popper
//                     open={openStates[cellIndex]}
//                     anchorEl={anchorRefs.current[cellIndex].current}
//                     role={undefined}
//                     transition
//                     disablePortal
//                     sx={{ zIndex: 100 }}
//                   >
//                     {({ TransitionProps, placement }) => (
//                       <Grow
//                         {...TransitionProps}
//                         style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//                       >
//                         <Paper>
//                           <ClickAwayListener onClickAway={event => handleClose(cellIndex, event)}>
//                             <MenuList id={`split-button-menu-${cell.ID}`}>
//                               {options.map((option, index) => (
//                                 <MenuItem
//                                   key={option.ID}
//                                   selected={index === selectedIndexes[cellIndex]}
//                                   onClick={event => handleMenuItemClick(cellIndex, index)}
//                                 >
//                                   {option.Name}
//                                 </MenuItem>
//                               ))}
//                             </MenuList>
//                           </ClickAwayListener>
//                         </Paper>
//                       </Grow>
//                     )}
//                   </Popper>
//                 </Fragment>
//               </Box>
//               <Box>
//                 <Button
//                   variant='tonal'
//                   size='small'
//                   endIcon={<Icon icon='bx:send' />}
//                   onClick={() => handleRunQuery(cell.ID, options[selectedIndexes[cellIndex]].ID)}
//                 >
//                   Run
//                 </Button>
//               </Box>
//               <Box>
//                 <Button variant='tonal' size='small'>
//                   Apply
//                 </Button>
//               </Box>
//             </Box>
//           </RunQueryBox>
//         )
//       })}
//     </>
//   )
// }

// export default QueryEditor






//  modified by arman khan - to get the datablock id






// import { useRef, useState, useEffect, Fragment, createRef } from 'react'
// import ButtonGroup from '@mui/material/ButtonGroup'
// import TextField from '@mui/material/TextField'
// import Paper from '@mui/material/Paper'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Popper from '@mui/material/Popper'
// import Grow from '@mui/material/Grow'
// import ClickAwayListener from '@mui/material/ClickAwayListener'
// import MenuList from '@mui/material/MenuList'
// import MenuItem from '@mui/material/MenuItem'
// import Icon from 'src/@core/components/icon'
// import { styled } from '@mui/material/styles'
// import getAllConnections from 'src/api/connections/getAllConnections'
// import runCellQuery from 'src/api/cells/runcellquery'
// import applyCellQuery from 'src/api/cells/applyCellQuery'
// import eventEmitter from 'src/utils/eventEmitter'
// import { debounce } from 'lodash'



// const RunQueryBox = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   padding: theme.spacing(1)
// }))

// const QueryEditor = props => {
//   const [connections, setConnections] = useState([])
//   const [selectedIndexes, setSelectedIndexes] = useState([])
//   const [openStates, setOpenStates] = useState([])
//   const [queryValues, setQueryValues] = useState({})
//   const [datablockId, setDatablockId] = useState(null)

//   // Listening to the event emitter
//   console.log('props')
//   console.warn(props)

//   useEffect(() => {
//     const handleAccordionExpanded = id => {
//       setDatablockId(id)
//       console.log('Received datablock_id:', id)
//     }

//     eventEmitter.on('accordionExpanded', handleAccordionExpanded)

//     return () => {
//       eventEmitter.off('accordionExpanded', handleAccordionExpanded)
//     }
//   }, [])

//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const response = await getAllConnections()
    
//         console.log(response)
//         if (response.code === 200 && response.Data) {
//           setConnections(response.Data)
//         }
//       } catch (error) {
//         console.error('Error fetching connections:', error)
//       }
//     }
//     fetchConnections()
//   }, [])

//   useEffect(() => {
//     if (props.cells && props.cells.Data) {
//       const initialSelectedIndexes = props.cells.Data.map(cell => {
//         const index = connections.findIndex(option => option.ID === cell.connectionID)
//         return index !== -1 ? index : 0
//       })
//       setSelectedIndexes(initialSelectedIndexes)
//       setOpenStates(props.cells.Data.map(() => false))
//       setQueryValues(
//         props.cells.Data.reduce((acc, cell) => {
//           acc[cell.ID] = cell.Query
//           return acc
//         }, {})
//       )
//     }
//   }, [connections, props.cells])

//   const handleMenuItemClick = (cellIndex, index) => {
//     const newSelectedIndexes = [...selectedIndexes]
//     newSelectedIndexes[cellIndex] = index
//     setSelectedIndexes(newSelectedIndexes)
//   }

//   const handleToggle = cellIndex => {
//     const newOpenStates = [...openStates]
//     newOpenStates[cellIndex] = !newOpenStates[cellIndex]
//     setOpenStates(newOpenStates)
//   }

//   const handleClose = (cellIndex, event) => {
//     const newOpenStates = [...openStates]
//     if (anchorRefs.current[cellIndex].current && anchorRefs.current[cellIndex].current.contains(event.target)) {
//       return
//     }
//     newOpenStates[cellIndex] = false
//     setOpenStates(newOpenStates)
//   }

//   //  temp

//   const handleQueryChange = (cellId, value) => {
//     setQueryValues(prevValues => ({
//       ...prevValues,
//       [cellId]: value
//     }))
//   }

//   // const handleQueryChange = (cellId, value) => {
//   //   setQueryValues(prevValues => ({
//   //     ...prevValues,
//   //     [cellId]: value
//   //   }))
//   // }

//   // const handleQueryChange = debounce((cellId, value) => {
//   //   setQueryValues(prevValues => ({
//   //     ...prevValues,
//   //     [cellId]: value
//   //   }))
//   // }, 300)

//   const handleRunQuery = async (cellId, connectionId) => {
//     try {
//       const query = queryValues[cellId]
//       console.log('this is my value--', query)

//       // Emit event to switch tab to "Result" (value 1)
//       eventEmitter.emit('switchTab', '1')

//       eventEmitter.emit('runQuery', { connectionId, query, cellId })
//       eventEmitter.emit('switchTab', '1')
//     } catch (error) {
//       console.error('Error running query:', error)
//     }
//   }
//   const handleApplyQuery = async (cellId, datablock_id, connectionId) => {
//     try {
//       const query = queryValues[cellId]
//       console.log(cellId, datablock_id, query)
//       const response = await applyCellQuery(cellId, datablock_id, connectionId, query)
//       console.log('Query apply response:', response)

//       // Emit event to switch tab to "Preview" (value 2)
//       eventEmitter.emit('switchTab', '2')

//       eventEmitter.emit('tileUpdated')
//       eventEmitter.emit('switchTab', '2')
//     } catch (error) {
//       console.error('Error applying query:', error)
//     }
//   }

//   // const anchorRefs = useRef(props.cells?.Data?.map(() => createRef()) || [])

//   const anchorRefs = useRef([])

//   useEffect(() => {
//     // Ensure anchorRefs has the same length as the cells
//     anchorRefs.current = props.cells?.Data?.map(() => createRef()) || []
//   }, [props.cells])

//   const cells = props.cells?.Data?.slice(0, 25) || []

//   return (
//     <>
//       {cells.map((cell, cellIndex) => {
//         const options = [
//           { ID: -1, Name: 'No Connection' },
//           ...connections.map(item => ({
//             ID: item.ID,
//             Name: item.Name
//           }))
//         ]

//         return (
//           <RunQueryBox key={cell.ID} elevation={0} sx={{ paddingX: 4 }}>
//             <TextField
//               minRows={3}
//               maxRows={10}
//               multiline
//               fullWidth
//               // defaultValue={queryValues[cell.ID] || ''}
//               // onChange={e => handleQueryChange(cell.ID, e.target.value)}
//               value={queryValues[cell.ID] || ''}
//               onChange={e => handleQueryChange(cell.ID, e.target.value)}
//               type='code'
//               label={`#CL${cell.ID}`}
//               id='textarea-outlined-static'
//             />
//             <Box sx={{ display: 'flex', paddingY: 2, borderRadius: 1 }}>
//               <Box sx={{ flexGrow: 1, paddingY: 1 }}>
//                 <Button variant='outlined' size='small' startIcon={<Icon icon='bx:plus' />}>
//                   Add
//                 </Button>
//                 <Button
//                   variant='outlined'
//                   sx={{ marginX: 2 }}
//                   color='error'
//                   size='small'
//                   startIcon={<Icon icon='ic:delete' />}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//               <Box>
//                 <Fragment>
//                   <ButtonGroup
//                     variant='outlined'
//                     sx={{ paddingX: 2 }}
//                     color='secondary'
//                     size='small'
//                     ref={anchorRefs.current[cellIndex]}
//                     aria-label='split button'
//                   >
//                     <Button
//                       startIcon={<Icon icon='ic:baseline-brightness-1' style={{ color: 'lightgreen' }} />}
//                       onClick={() => {
//                         if (options[selectedIndexes[cellIndex]]) {
//                           console.log(`You clicked ${options[selectedIndexes[cellIndex]].Name}`)
//                         }
//                       }}
//                       id={`btn-${cell.ID}`}
//                     >
//                       {options[selectedIndexes[cellIndex]]?.Name || 'No Connection'}
//                     </Button>
//                     <Button
//                       size='small'
//                       aria-haspopup='menu'
//                       onClick={() => handleToggle(cellIndex)}
//                       sx={{ px: '0 !important' }}
//                       aria-label='select merge strategy'
//                       aria-expanded={openStates[cellIndex] ? 'true' : undefined}
//                       aria-controls={openStates[cellIndex] ? `split-button-menu-${cell.ID}` : undefined}
//                     >
//                       <Icon fontSize={12} icon='bxs:down-arrow' />
//                     </Button>
//                   </ButtonGroup>
//                   {anchorRefs.current[cellIndex] && anchorRefs.current[cellIndex].current && (
//                     <Popper
//                       open={openStates[cellIndex]}
//                       anchorEl={anchorRefs.current[cellIndex].current}
//                       role={undefined}
//                       transition
//                       disablePortal
//                       sx={{ zIndex: 100 }}
//                     >
//                       {({ TransitionProps, placement }) => (
//                         <Grow
//                           {...TransitionProps}
//                           style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//                         >
//                           <Paper>
//                             <ClickAwayListener onClickAway={event => handleClose(cellIndex, event)}>
//                               <MenuList id={`split-button-menu-${cell.ID}`}>
//                                 {options.map((option, index) => (
//                                   <MenuItem
//                                     key={option.ID}
//                                     selected={index === selectedIndexes[cellIndex]}
//                                     onClick={event => handleMenuItemClick(cellIndex, index)}
//                                   >
//                                     {option.Name}
//                                   </MenuItem>
//                                 ))}
//                               </MenuList>
//                             </ClickAwayListener>
//                           </Paper>
//                         </Grow>
//                       )}
//                     </Popper>
//                   )}
//                 </Fragment>
//               </Box>
//               <Box>
//                 <Button
//                   variant='tonal'
//                   size='small'
//                   endIcon={<Icon icon='bx:send' />}
//                   onClick={() => handleRunQuery(cell.ID, options[selectedIndexes[cellIndex]].ID)}
//                 >
//                   Run
//                 </Button>
//               </Box>
//               <Box>
//                 <Button
//                   variant='tonal'
//                   size='small'
//                   onClick={() => handleApplyQuery(cell.ID, datablockId, options[selectedIndexes[cellIndex]].ID)}
//                 >
//                   Apply
//                 </Button>
//               </Box>
//             </Box>
//           </RunQueryBox>
//         )
//       })}
//     </>
//   )
// }

// export default QueryEditor









//  fixing the setid issue








import { useRef, useState, useEffect, Fragment, createRef } from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Popper from '@mui/material/Popper'
import Grow from '@mui/material/Grow'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'
import getAllConnections from 'src/api/connections/getAllConnections'
import runCellQuery from 'src/api/cells/runcellquery'
import applyCellQuery from 'src/api/cells/applyCellQuery'
import eventEmitter from 'src/utils/eventEmitter'
import { debounce } from 'lodash'


import getAllSetsForEditor from 'src/api/sets/getAllSetsForEditor'




const RunQueryBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1)
}))

const QueryEditor = props => {
  const [connections, setConnections] = useState([])
  const [selectedIndexes, setSelectedIndexes] = useState([])
  const [openStates, setOpenStates] = useState([])
  const [queryValues, setQueryValues] = useState({})
  const [datablockId, setDatablockId] = useState(null)

  // Listening to the event emitter
  console.log('props')
  console.warn(props)

  useEffect(() => {
    const handleAccordionExpanded = id => {
      setDatablockId(id)
      console.log('Received datablock_id:', id)
    }

    eventEmitter.on('accordionExpanded', handleAccordionExpanded)

    return () => {
      eventEmitter.off('accordionExpanded', handleAccordionExpanded)
    }
  }, [])



  
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await getAllSetsForEditor()
    
        console.log(response)
        if (response.code === 200 && response.Data) {
          setConnections(response.Data)
        }
      } catch (error) {
        console.error('Error fetching connections:', error)
      }
    }
    fetchConnections()
  }, [])





  useEffect(() => {
    if (props.cells && props.cells.Data) {
      const initialSelectedIndexes = props.cells.Data.map(cell => {
        const index = connections.findIndex(option => option.ID === cell.connectionID)
        return index !== -1 ? index : 0
      })
      setSelectedIndexes(initialSelectedIndexes)
      setOpenStates(props.cells.Data.map(() => false))
      setQueryValues(
        props.cells.Data.reduce((acc, cell) => {
          acc[cell.ID] = cell.Query
          return acc
        }, {})
      )
    }
  }, [connections, props.cells])

  const handleMenuItemClick = (cellIndex, index) => {
    const newSelectedIndexes = [...selectedIndexes]
    newSelectedIndexes[cellIndex] = index
    setSelectedIndexes(newSelectedIndexes)
  }

  const handleToggle = cellIndex => {
    const newOpenStates = [...openStates]
    newOpenStates[cellIndex] = !newOpenStates[cellIndex]
    setOpenStates(newOpenStates)
  }

  const handleClose = (cellIndex, event) => {
    const newOpenStates = [...openStates]
    if (anchorRefs.current[cellIndex].current && anchorRefs.current[cellIndex].current.contains(event.target)) {
      return
    }
    newOpenStates[cellIndex] = false
    setOpenStates(newOpenStates)
  }

  //  temp

  const handleQueryChange = (cellId, value) => {
    setQueryValues(prevValues => ({
      ...prevValues,
      [cellId]: value
    }))
  }

  // const handleQueryChange = (cellId, value) => {
  //   setQueryValues(prevValues => ({
  //     ...prevValues,
  //     [cellId]: value
  //   }))
  // }

  // const handleQueryChange = debounce((cellId, value) => {
  //   setQueryValues(prevValues => ({
  //     ...prevValues,
  //     [cellId]: value
  //   }))
  // }, 300)

  const handleRunQuery = async (cellId, connectionId) => {
    try {
      const query = queryValues[cellId]
      console.log('this is my value--', query)

      // Emit event to switch tab to "Result" (value 1)
      eventEmitter.emit('switchTab', '1')

      eventEmitter.emit('runQuery', { connectionId, query, cellId })
      eventEmitter.emit('switchTab', '1')
    } catch (error) {
      console.error('Error running query:', error)
    }
  }
  const handleApplyQuery = async (cellId, datablock_id, connectionId) => {
    try {
      const query = queryValues[cellId]
      console.log(cellId, datablock_id, query)
      const response = await applyCellQuery(cellId, datablock_id, connectionId, query)
      console.log('Query apply response:', response)

      // Emit event to switch tab to "Preview" (value 2)
      eventEmitter.emit('switchTab', '2')

      eventEmitter.emit('tileUpdated')
      eventEmitter.emit('switchTab', '2')
    } catch (error) {
      console.error('Error applying query:', error)
    }
  }

  // const anchorRefs = useRef(props.cells?.Data?.map(() => createRef()) || [])

  const anchorRefs = useRef([])

  useEffect(() => {
    // Ensure anchorRefs has the same length as the cells
    anchorRefs.current = props.cells?.Data?.map(() => createRef()) || []
  }, [props.cells])

  const cells = props.cells?.Data?.slice(0, 25) || []

  return (
    <>
      {cells.map((cell, cellIndex) => {
        const options = [
          { ID: -1, Name: 'No Connection' },
          ...connections.map(item => ({
            ID: item.ID,
            Name: item.Name
          }))
        ]

        return (
          <RunQueryBox key={cell.ID} elevation={0} sx={{ paddingX: 4 }}>
            <TextField
              minRows={3}
              maxRows={10}
              multiline
              fullWidth
              // defaultValue={queryValues[cell.ID] || ''}
              // onChange={e => handleQueryChange(cell.ID, e.target.value)}
              value={queryValues[cell.ID] || ''}
              onChange={e => handleQueryChange(cell.ID, e.target.value)}
              type='code'
              label={`#CL${cell.ID}`}
              id='textarea-outlined-static'
            />
            <Box sx={{ display: 'flex', paddingY: 2, borderRadius: 1 }}>
              <Box sx={{ flexGrow: 1, paddingY: 1 }}>
                <Button variant='outlined' size='small' startIcon={<Icon icon='bx:plus' />}>
                  Add
                </Button>
                <Button
                  variant='outlined'
                  sx={{ marginX: 2 }}
                  color='error'
                  size='small'
                  startIcon={<Icon icon='ic:delete' />}
                >
                  Delete
                </Button>
              </Box>
              <Box>
                <Fragment>
                  <ButtonGroup
                    variant='outlined'
                    sx={{ paddingX: 2 }}
                    color='secondary'
                    size='small'
                    ref={anchorRefs.current[cellIndex]}
                    aria-label='split button'
                  >
                    <Button
                      startIcon={<Icon icon='ic:baseline-brightness-1' style={{ color: 'lightgreen' }} />}
                      onClick={() => {
                        if (options[selectedIndexes[cellIndex]]) {
                          console.log(`You clicked ${options[selectedIndexes[cellIndex]].Name}`)
                        }
                      }}
                      id={`btn-${cell.ID}`}
                    >
                      {options[selectedIndexes[cellIndex]]?.Name || 'No Connection'}
                    </Button>
                    <Button
                      size='small'
                      aria-haspopup='menu'
                      onClick={() => handleToggle(cellIndex)}
                      sx={{ px: '0 !important' }}
                      aria-label='select merge strategy'
                      aria-expanded={openStates[cellIndex] ? 'true' : undefined}
                      aria-controls={openStates[cellIndex] ? `split-button-menu-${cell.ID}` : undefined}
                    >
                      <Icon fontSize={12} icon='bxs:down-arrow' />
                    </Button>
                  </ButtonGroup>
                  {anchorRefs.current[cellIndex] && anchorRefs.current[cellIndex].current && (
                    <Popper
                      open={openStates[cellIndex]}
                      anchorEl={anchorRefs.current[cellIndex].current}
                      role={undefined}
                      transition
                      disablePortal
                      sx={{ zIndex: 100 }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={event => handleClose(cellIndex, event)}>
                              <MenuList id={`split-button-menu-${cell.ID}`}>
                                {options.map((option, index) => (
                                  <MenuItem
                                    key={option.ID}
                                    selected={index === selectedIndexes[cellIndex]}
                                    onClick={event => handleMenuItemClick(cellIndex, index)}
                                  >
                                    {option.Name}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  )}
                </Fragment>
              </Box>
              <Box>
                <Button
                  variant='tonal'
                  size='small'
                  endIcon={<Icon icon='bx:send' />}
                  onClick={() => handleRunQuery(cell.ID, options[selectedIndexes[cellIndex]].ID)}
                >
                  Run
                </Button>
              </Box>
              <Box>
                <Button
                  variant='tonal'
                  size='small'
                  onClick={() => handleApplyQuery(cell.ID, datablockId, options[selectedIndexes[cellIndex]].ID)}
                >
                  Apply
                </Button>
              </Box>
            </Box>
          </RunQueryBox>
        )
      })}
    </>
  )
}

export default QueryEditor






