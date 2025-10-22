

// delete api binding for filters and made header sticky

// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Modal from '@mui/material/Modal'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import CircularProgress from '@mui/material/CircularProgress'
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import { Responsive, WidthProvider } from 'react-grid-layout'
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import getAllTiles from 'src/api/tiles/getAllTiles'
// import getAllTemplateCards from 'src/api/dashboards/getAllTemplateCards'
// import createTile from 'src/api/dashboards/createTile'
// import getAllDataBlocks from 'src/api/tiles/getAllDataBlocks'
// import { saveTilePositions, loadTilePositions } from 'src/utils/tilePosition'
// import dynamic from 'next/dynamic'
// import deleteTile from 'src/api/tiles/deleteTiles'
// import getAllFiltersByDashboardID from 'src/api/filters/getAllFiltersByDashboardID'
// import getAllFilters from 'src/api/filters/getAllFilters'
// import getAllDropDownValues from 'src/api/filters/getAllDropDownValues'
// import createMapping from 'src/api/filters/createMapping'
// import deleteFilterByID from 'src/api/filters/deleteFilterByID'

// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const ResponsiveGridLayout = WidthProvider(Responsive)

// const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// const DashboardPage = () => {
//   const [layouts, setLayouts] = useState({ lg: [] })
//   const [tiles, setTiles] = useState([])
//   const [modalOpen, setModalOpen] = useState(false)
//   const [filterModalOpen, setFilterModalOpen] = useState(false)
//   const [selectedFilter, setSelectedFilter] = useState('')
//   const [contextMenu, setContextMenu] = useState(null)
//   const [selectedTile, setSelectedTile] = useState(null)
//   const [cards, setCards] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState([])
//   const [filterMenuAnchor, setFilterMenuAnchor] = useState(null)
//   const [filterMenuIndex, setFilterMenuIndex] = useState(null)

//   //  select the card content

//   const [editMode, setEditMode] = useState(false) // To track edit mode
//   const [selectedBlocks, setSelectedBlocks] = useState({}) // To track selected blocks per tile
//   const [filterSelections, setFilterSelections] = useState({}) // To track selected values for each filter

//   const [dynamicFilters, setDynamicFilters] = useState([])

//   const [filterOptions, setFilterOptions] = useState([])

//   const [dropdownOptions, setDropdownOptions] = useState({})

//   const [currentFilterID, setCurrentFilterID] = useState(null) // New state to track the current FilterID

//   const router = useRouter()
//   const { dashboardId, projectId } = router.query

// // apply filter- start

// useEffect(() => {
//   const fetchTilesAndDataBlocks = async () => {
//     if (!dashboardId) return
//     setLoading(true)
//     try {
//       const fetchedTiles = await getAllTiles(dashboardId)
//       const savedLayout = loadTilePositions(dashboardId)

//       const tilesWithDataBlocks = await Promise.all(
//         fetchedTiles.map(async (tile, index) => {
//           // Pass empty filters object for initial load
//           const datablocks = await getAllDataBlocks(tile.ID, {})
//           console.log('this is all datablocks----', datablocks)

//           return {
//             i: `tile-${index + 1}`,
//             x: parseInt(savedLayout?.[index]?.x || tile.Layout.x),
//             y: parseInt(savedLayout?.[index]?.y || tile.Layout.y),
//             w: parseInt(savedLayout?.[index]?.w || tile.Layout.w),
//             h: parseInt(savedLayout?.[index]?.h || tile.Layout.h),
//             minW: tile.Layout.minW,
//             minH: tile.Layout.minH,
//             maxW: tile.Layout.maxW,
//             maxH: tile.Layout.maxH,
//             template: {
//               id: tile.ID,
//               url: tile.Url,
//               styles: tile.Styles,
//               datablocks: datablocks
//             }
//           }
//         })
//       )

//       setTiles(tilesWithDataBlocks)
//       setLayouts({ lg: tilesWithDataBlocks })
//     } catch (error) {
//       console.error('Error fetching tiles, data blocks, or filters:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   fetchTilesAndDataBlocks()
// }, [dashboardId])

// const handleApplyFilter = async () => {
//   try {
//     setLoading(true)
//     // Create a new array to store updated tiles
//     const updatedTiles = await Promise.all(
//       tiles.map(async (tile) => {
//         // Get the selected filter values
//         const filterPayload = {}
//         Object.entries(filterSelections).forEach(([filterName, selectedValue]) => {
//           // Find the filter ID based on the filter name
//           const filter = [...filters, ...dynamicFilters].find(f => f.name === filterName)
//           if (filter && selectedValue) {
//             filterPayload[filter.id] = [selectedValue.toString()]
//           }
//         })

//         // Fetch new datablocks with filter values
//         const newDatablocks = await getAllDataBlocks(tile.template.id, filterPayload)

//         // Return updated tile with new datablocks
//         return {
//           ...tile,
//           template: {
//             ...tile.template,
//             datablocks: newDatablocks
//           }
//         }
//       })
//     )

//     setTiles(updatedTiles)
//   } catch (error) {
//     console.error('Error applying filters:', error)
//     toast.error('Failed to apply filters')
//   } finally {
//     setLoading(false)
//   }
// }

// // apply filter- end

//   // filter api

//   // useEffect(() => {
//   //   const fetchTilesAndDataBlocks = async () => {
//   //     if (!dashboardId) return
//   //     setLoading(true)
//   //     try {
//   //       const fetchedTiles = await getAllTiles(dashboardId)
//   //       const savedLayout = loadTilePositions(dashboardId)

//   //       const tilesWithDataBlocks = await Promise.all(
//   //         fetchedTiles.map(async (tile, index) => {
//   //           const datablocks = await getAllDataBlocks(tile.ID)
//   //           console.log('this is all datablocks----', datablocks)

//   //           return {
//   //             i: `tile-${index + 1}`,
//   //             x: parseInt(savedLayout?.[index]?.x || tile.Layout.x),
//   //             y: parseInt(savedLayout?.[index]?.y || tile.Layout.y),
//   //             w: parseInt(savedLayout?.[index]?.w || tile.Layout.w),
//   //             h: parseInt(savedLayout?.[index]?.h || tile.Layout.h),
//   //             minW: tile.Layout.minW,
//   //             minH: tile.Layout.minH,
//   //             maxW: tile.Layout.maxW,
//   //             maxH: tile.Layout.maxH,
//   //             template: {
//   //               id: tile.ID,
//   //               url: tile.Url,
//   //               styles: tile.Styles,
//   //               datablocks: datablocks
//   //             }
//   //           }
//   //         })
//   //       )

//   //       setTiles(tilesWithDataBlocks)
//   //       setLayouts({ lg: tilesWithDataBlocks })
//   //     } catch (error) {
//   //       console.error('Error fetching tiles, data blocks, or filters:', error)
//   //     } finally {
//   //       setLoading(false)
//   //     }
//   //   }

//   //   fetchTilesAndDataBlocks()
//   // }, [dashboardId])

//   // get all filters by dasboard id

//   useEffect(() => {
//     const fetchFilters = async () => {
//       if (!dashboardId) return
//       try {
//         const fetchedFilters = await getAllFiltersByDashboardID(dashboardId)
//         // console.log("This is the complete filters-----", fetchedFilters)
//         const formattedFilters = fetchedFilters.map(filter => ({
//           id: filter.ID,
//           columnId: filter.ColumnID,
//           name: filter.Name
//         }))
//         setFilters(formattedFilters)
//         // console.log("this is the formatted filters---",formattedFilters )
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [dashboardId])

//   // get all filters in dropdown option

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const data = await getAllFilters()
//         // console.log("this is the get all filters----",data)
//         setFilterOptions(data.Data.map(filter => ({ id: filter.ID, name: filter.Name, columnID: filter.ColumnID })))
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [])

//   // api binding for getting dropdown values

//   const handleDropdownFocus = async (filterName, columnId) => {
//     if (!dropdownOptions[filterName]) {
//       // Fetch only if not already fetched
//       const options = await getAllDropDownValues(columnId)
//       setDropdownOptions(prev => ({ ...prev, [filterName]: options }))
//     }
//   }

//   const openModal = async () => {
//     setModalOpen(true)
//     const fetchedCards = await getAllTemplateCards()
//     setCards(fetchedCards)
//   }

//   const closeModal = () => setModalOpen(false)

//   const openFilterModal = () => setFilterModalOpen(true)

//   const closeFilterModal = () => {
//     setFilterModalOpen(false)
//     setSelectedFilter('')
//   }

//   // const handleAddFilter = () => {
//   //   if (selectedFilter && !filters.includes(selectedFilter)) {
//   //     setFilters([...filters, selectedFilter])
//   //   }
//   //   closeFilterModal()
//   // }

//   // const handleAddFilter = () => {
//   //   if (selectedFilter && !dynamicFilters.some(f => f.name === selectedFilter)) {
//   //     const newFilter = { name: selectedFilter, id: null, columnId: null }
//   //     setDynamicFilters([...dynamicFilters, newFilter])
//   //   }
//   //   closeFilterModal()
//   // }

//   // const handleAddFilter = () => {
//   //   if (!selectedFilter) return;

//   //   const parsedFilter = JSON.parse(selectedFilter); // Parse the selected filter value
//   //   setDynamicFilters(prev => [
//   //     ...prev,
//   //     { id: parsedFilter.id, name: parsedFilter.name, columnID: parsedFilter.columnID }
//   //   ]);

//   //   setSelectedFilter('');
//   //   closeFilterModal();
//   // };

//   // final changes

//   const handleAddFilter = () => {
//     if (!selectedFilter) return

//     const parsedFilter = JSON.parse(selectedFilter)

//     // Check if the filter is already present in the filters or dynamicFilters
//     const filterExists = [...filters, ...dynamicFilters].some(
//       existingFilter => existingFilter.name === parsedFilter.name
//     )

//     if (filterExists) {
//       alert(`Filter "${parsedFilter.name}" already exists on the dashboard.`)
//       return
//     }

//     setDynamicFilters(prev => [
//       ...prev,
//       { id: parsedFilter.id, name: parsedFilter.name, columnID: parsedFilter.columnID }
//     ])

//     setSelectedFilter('')
//     closeFilterModal()
//   }

//   const handleAddTile = async card => {
//     try {
//       const tileData = await createTile(card.id, dashboardId, projectId)
//       const datablocks = await getAllDataBlocks(tileData.Data[0].id)
//       const newTile = {
//         i: `tile-${tiles.length + 1}`,
//         x: (tiles.length * 2) % 12,
//         y: Infinity,
//         w: tileData.Data[0].layout.w,
//         h: tileData.Data[0].layout.h,
//         minW: tileData.Data[0].layout.minW,
//         minH: tileData.Data[0].layout.minH,
//         maxW: tileData.Data[0].layout.maxW,
//         maxH: tileData.Data[0].layout.maxH,
//         template: {
//           ...tileData.Data[0],
//           datablocks: datablocks
//         }
//       }

//       setTiles([...tiles, newTile])
//       closeModal()
//     } catch (error) {
//       console.error('Failed to add tile:', error)
//       closeModal()
//     }
//   }

//   const handleLayoutChange = layout => {
//     clearTimeout(window.layoutChangeTimeout)
//     window.layoutChangeTimeout = setTimeout(() => {
//       const updatedTiles = tiles.map(tile => {
//         const updatedLayout = layout.find(l => l.i === tile.i)
//         return { ...tile, ...updatedLayout }
//       })

//       setLayouts({ lg: layout })
//       setTiles(updatedTiles)
//     }, 300)
//   }

//   const handleContextMenu = (event, tile) => {
//     event.preventDefault()
//     setSelectedTile(tile)
//     setContextMenu(
//       contextMenu === null
//         ? {
//             mouseX: event.clientX + 2,
//             mouseY: event.clientY - 6
//           }
//         : null
//     )
//   }

//   const handleCloseContextMenu = () => {
//     setContextMenu(null)
//   }

//   const handleDeleteTile = async () => {
//     try {
//       const response = await deleteTile(selectedTile.template.id)

//       if (response?.code === 200) {
//         console.log('Tile deleted successfully:', response.message)
//         setTiles(tiles.filter(tile => tile.i !== selectedTile.i))
//       }
//     } catch (error) {
//       console.error('Failed to delete tile:', error)
//     } finally {
//       handleCloseContextMenu()
//     }
//   }

//   const handleEditTile = () => {
//     router.push(`${router.asPath}editor?tileId=${selectedTile.template.id}`)
//     handleCloseContextMenu()
//   }

//   const handleFilterTile = () => {
//     console.log('Filter tile:', selectedTile)
//     handleCloseContextMenu()
//   }

//   const handleSaveDashboard = () => {
//     try {
//       saveTilePositions(dashboardId, layouts.lg)
//       console.log('Dashboard saved!')
//     } catch (error) {
//       console.error('Error saving dashboard:', error)
//     }
//   }

//   const getDataBlockValue = datablock => {
//     const value = datablock?.data?.value || datablock.data
//     // console.log("this is my datablock id---", datablock)
//     if (typeof value === 'object' && value !== null) {
//       return JSON.stringify(value)
//     }
//     return value || 'Null'
//   }

//   const renderDataBlock = datablock => {
//     if (loading) return <CircularProgress />

//     // adding the table- start

//     if (datablock.type === 'table') {

//       // Fixed container styles to enforce scrolling
//       const containerStyles = {
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '0',
//         position: 'relative'
//       }

//       // Scrollable wrapper styles
//       const scrollWrapperStyles = {
//         flex: 1,
//         overflow: 'auto',
//         // Calculate height to show approximately 6 rows
//         // Header (48px) + (6 rows × 40px per row) + some padding
//         maxHeight: '290px',
//         width: '100%',
//         position: 'relative'
//       }

//       // Fixed table styles
//       const tableStyles = {
//         width: '100%',
//         borderCollapse: 'collapse',
//         tableLayout: 'fixed',
//         ...datablock.options.styles.table
//       }

//       // Enhanced header styles
//       const headerStyles = {
//         padding: '12px 16px',
//         backgroundColor: '#f4f4f4',
//         fontWeight: 'bold',
//         fontSize: '14px',
//         textAlign: 'left',
//         position: 'sticky',
//         top: 0,
//         zIndex: 2,
//         borderBottom: '2px solid #ddd',
//         ...datablock.options.styles.header
//       }

//       // Enhanced row styles
//       const rowStyles = {
//         padding: '10px 16px',
//         borderBottom: '1px solid #ddd',
//         fontSize: '13px',
//         whiteSpace: 'nowrap',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         ...datablock.options.styles.row
//       }

//       // Cell styles
//       const cellStyles = {
//         padding: '10px 16px',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap'
//       }

//       return (
//         <Box sx={containerStyles}>
//           <Box sx={scrollWrapperStyles}>
//             <table style={tableStyles}>
//               <thead>
//                 <tr>
//                   {datablock.options.headers.map((header, index) => (
//                     <th key={index} style={headerStyles}>
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {datablock.options.rows.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {row.map((cell, cellIndex) => (
//                       <td key={cellIndex} style={{ ...rowStyles, ...cellStyles }}>
//                         {cell}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Box>
//         </Box>
//       )
//     }

//     // adding the table- end

//     if (datablock.type != 'text') {
//       return (
//         <DynamicChart
//           key={datablock.datablock_id}
//           options={datablock.options}
//           series={datablock.series}
//           type={datablock.type}
//           width={datablock.options.chart.width}
//         />
//       )
//     } else {
//       return (
//         <Typography key={datablock.datablock_id} sx={datablock.styles}>
//           {getDataBlockValue(datablock)}
//         </Typography>
//       )
//     }
//   }

//   // function to manage 3-dot in dropdown- start
//   const handleFilterMenuClick = (event, index) => {
//     setFilterMenuAnchor(event.currentTarget) // Set anchor to clicked button
//     setFilterMenuIndex(index) // Set the index of the filter
//   }

//   const handleCloseFilterMenu = () => {
//     setFilterMenuAnchor(null)
//     setFilterMenuIndex(null)
//   }

//   // const handleDeleteFilter = index => {
//   //   const updatedFilters = filters.filter((_, i) => i !== index)
//   //   setFilters(updatedFilters)
//   //   handleCloseFilterMenu()
//   // }

//   const handleDeleteFilter = async (index) => {
//     try {
//       // Determine if it's a static or dynamic filter
//       const isStaticFilter = index < filters.length
//       const filterToDelete = isStaticFilter
//         ? filters[index]
//         : dynamicFilters[index - filters.length]

//       const response = await deleteFilterByID(filterToDelete.id, dashboardId)

//       if (response.code === 201) {

//         toast.success('Filter deleted successfully')

//         // Remove the filter from the appropriate array
//         if (isStaticFilter) {
//           setFilters(filters.filter((_, i) => i !== index))
//         } else {
//           setDynamicFilters(dynamicFilters.filter((_, i) => i !== (index - filters.length)))
//         }
//       } else {

//         toast.error(response.message || 'Failed to delete filter')
//       }
//     } catch (error) {

//       console.error('Error deleting filter:', error)
//       toast.error('An error occurred while deleting the filter')
//     } finally {

//       handleCloseFilterMenu()
//     }
//   }

//   // function to manage 3-dot in dropdown - end

//   // select the card content- start

//   // const handleEditFilter = index => {
//   //   setEditMode(true) // Enable edit mode
//   //   setSelectedBlocks({}) // Clear previously selected blocks
//   //   handleCloseFilterMenu()
//   // }

//   // temp- start

//   const handleEditFilter = index => {
//     const selectedFilter = filters[index] // Get the filter based on the dropdown index
//     setCurrentFilterID(selectedFilter.id) // Store the current FilterID
//     setEditMode(true) // Enter edit mode
//     setSelectedBlocks({}) // Clear previously selected blocks
//     handleCloseFilterMenu()
//   }

//   const handleEditFilterDynamic = index => {
//     const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
//     setCurrentFilterID(selectedFilter.id) // Store the current FilterID
//     setEditMode(true) // Enter edit mode
//     setSelectedBlocks({}) // Clear previously selected blocks
//     handleCloseFilterMenu()
//   }

//   const handleCancelEdit = () => {
//     setEditMode(false)
//     setSelectedBlocks({})
//     setCurrentFilterID(null) // Clear the current FilterID
//     handleCloseFilterMenu()
//   }

//   // temp- end

//   const handleBlockClick = (tileId, blockId) => {
//     setSelectedBlocks(prev => {
//       const updatedBlocks = { ...prev }
//       if (!updatedBlocks[tileId]) {
//         updatedBlocks[tileId] = new Set()
//       }

//       if (updatedBlocks[tileId].has(blockId)) {
//         updatedBlocks[tileId].delete(blockId)
//       } else {
//         updatedBlocks[tileId].add(blockId)
//       }

//       console.log('this is updated block-----', updatedBlocks)

//       return updatedBlocks
//     })
//   }

//   // select the card content- end

//   // const debug= ()=>{
//   //   console.log("part -1 ", filters)
//   //   console.log("part-2", dynamicFilters)
//   // }

//   // apply mapping click - filter mapping

//   return (
//     <BlankLayout>

// {/* making header sticky */}

// <Box sx={{
//       height: '100vh',
//       display: 'flex',
//       flexDirection: 'column'
//     }}>
//       {/* Sticky Header */}
//       <Box
//         sx={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 1000,
//           // backgroundColor: 'white',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//         }}
//       >

//       <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant='h4'>Dashboard</Typography>
//         <Box>
//           {editMode ? (
//             // <Button
//             //   variant='contained'
//             //   color='success'
//             //   onClick={() => {
//             //     setEditMode(false)
//             //     setSelectedBlocks({})
//             //   }}
//             // >
//             //   Apply
//             // </Button>

//             <Button
//               variant='contained'
//               color='success'
//               onClick={async () => {
//                 try {
//                   const dataBlockIds = {}

//                   // Iterate over selectedBlocks to collect datablock IDs
//                   Object.entries(selectedBlocks).forEach(([tileId, blockSet]) => {
//                     const tile = tiles.find(t => t.i === tileId)
//                     if (tile && tile.template.datablocks) {
//                       Object.values(tile.template.datablocks).forEach(datablock => {
//                         dataBlockIds[datablock.id] = blockSet.has(datablock.id)
//                       })
//                     }
//                   })

//                   // const dashboardId = router.query.dashboardId; // Get the DashboardID from routing
//                   const dashboardId = parseInt(router.query.dashboardId, 10)

//                   // const filterId = filters[0]?.id || 0;
//                   const filterId = currentFilterID

//                   // Call the API using createMapping
//                   await createMapping(dashboardId, filterId, dataBlockIds)

//                   setEditMode(false)
//                   setSelectedBlocks({})
//                   setCurrentFilterID(null) // Clear current filter ID
//                   toast.success('Mapping Created Successfully')
//                 } catch (error) {
//                   console.error(error)
//                   toast.error(error.message || 'Failed to create mapping.')
//                 }
//               }}
//             >
//               Apply
//             </Button>
//           ) : (
//             <>

// <Button variant='contained'  sx={{ marginRight: 2 }}  onClick={handleApplyFilter} disabled={editMode}>
//                 Apply Filter
//               </Button>

//               <Button variant='contained' onClick={openModal} sx={{ marginRight: 2 }} disabled={editMode}>
//                 Add Tile
//               </Button>
//               <Button
//                 variant='contained'
//                 color='secondary'
//                 onClick={handleSaveDashboard}
//                 sx={{ marginRight: 2 }}
//                 disabled={editMode}
//               >
//                 Save
//               </Button>
//               <Button variant='contained' color='primary' onClick={openFilterModal} disabled={editMode}>
//                 Add Filters
//               </Button>

//               {/* <Button variant='contained' color='primary' onClick={debug} disabled={editMode}>
//                 Debug
//               </Button>  */}
//             </>
//           )}
//         </Box>
//       </Box>

//       {/* Dynamic Filters */}

//       <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//   {filters.map((filter, index) => (
//     <Box
//       key={filter.id || index}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1,
//         padding: 1,
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//       }}
//     >
//       <FormControl
//         sx={{
//           minWidth: Math.max(150, filter.name.length * 12)
//         }}
//       >
//         <InputLabel>{filter.name}</InputLabel>
//         <Select
//           value={filterSelections[filter.name] || ''}
//           onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//           // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//           // onFocus={() => handleDropdownFocus(filter.name, 217)}
//           onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//           sx={{ bgcolor: 'white', maxWidth: '100%' }}
//         >
//           {dropdownOptions[filter.name]?.map(option => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//         <Button
//           sx={{
//             minWidth: 0,
//             padding: '4px',
//             marginLeft: '4px',
//             backgroundColor: '#f5f5f5',
//             borderRadius: '50%',
//             '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//           }}
//           onClick={e => handleFilterMenuClick(e, index)}
//         >
//           &#x2026; {/* 3-dot symbol */}
//         </Button>
//         <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//           <MenuItem onClick={() => handleEditFilter(index)}>Edit</MenuItem>
//           <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//           <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   ))}

//   {dynamicFilters.map((filter, index) => (
//     <Box
//       key={index}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1,
//         padding: 1,
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//       }}
//     >
//       <FormControl
//         sx={{
//           minWidth: Math.max(150, filter.name.length * 12)
//         }}
//       >
//         <InputLabel>{filter.name}</InputLabel>
//         <Select
//           value={filterSelections[filter.name] || ''}
//           onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//           // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//           onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//           sx={{ bgcolor: 'white', maxWidth: '100%' }}
//         >
//           {dropdownOptions[filter.name]?.map(option => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//         <Button
//           sx={{
//             minWidth: 0,
//             padding: '4px',
//             marginLeft: '4px',
//             backgroundColor: '#f5f5f5',
//             borderRadius: '50%',
//             '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//           }}
//           onClick={e => handleFilterMenuClick(e, index)}
//         >
//           &#x2026; {/* 3-dot symbol */}
//         </Button>
//         <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//           <MenuItem onClick={() => handleEditFilterDynamic(index)}>Edit</MenuItem>
//           <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//           <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   ))}
// </Box>

//  </Box>

//       <Box sx={{
//         flexGrow: 1,
//         overflow: 'auto',
//         padding: 2
//       }}>
//         <ResponsiveGridLayout
//           className='layout'
//           layouts={layouts}
//           breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//           cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
//           rowHeight={30}
//           width={1200}
//           compactType={null}
//           isBounded={false}
//           isDraggable={!editMode}
//           isResizable={!editMode}
//           onLayoutChange={handleLayoutChange}
//         >
//           {tiles.map(tile => (
//             <div key={tile.i} data-grid={tile}>
//               <Box
//                 onContextMenu={event => handleContextMenu(event, tile)}
//                 sx={{
//                   ...tile.template.styles.container,
//                   position: 'relative',
//                   pointerEvents: 'auto'
//                 }}
//               >
//                 {Object.entries(tile.template.datablocks || {}).map(([blockKey, datablock]) => (
//                   <Box
//                     key={datablock.id} // Use datablock.id as the unique key
//                     onClick={() => editMode && handleBlockClick(tile.i, datablock.id)} // Pass datablock.id
//                     onContextMenu={event => event.stopPropagation()} // Prevent right-click conflicts
//                     sx={{
//                       cursor: editMode ? 'pointer' : 'default',
//                       border: editMode && selectedBlocks[tile.i]?.has(datablock.id) ? '2px solid blue' : 'none',
//                       ...datablock.styles
//                     }}
//                   >
//                     {renderDataBlock(datablock)}
//                   </Box>
//                 ))}
//               </Box>
//             </div>
//           ))}
//         </ResponsiveGridLayout>
//       </Box>

//       <Modal open={modalOpen} onClose={closeModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 600,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4,
//             maxHeight: '90vh',
//             overflowY: 'auto'
//           }}
//         >
//           <Typography variant='h6' component='h2' gutterBottom>
//             Select a Card
//           </Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//             {cards.map(card => (
//               <Box
//                 key={card.id}
//                 sx={{
//                   border: '1px solid #ddd',
//                   borderRadius: '8px',
//                   p: 2,
//                   cursor: 'pointer',
//                   flex: '1 1 200px',
//                   '&:hover': {
//                     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
//                   }
//                 }}
//                 onClick={() => handleAddTile(card)}
//               >
//                 <Box sx={{ mt: 2 }}>{Object.values(card.datablocks).map(datablock => renderDataBlock(datablock))}</Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Modal>

//       <Modal open={filterModalOpen} onClose={closeFilterModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4
//           }}
//         >
//           <Typography variant='h6' component='h2' gutterBottom>
//             Add Filters
//           </Typography>
//           <FormControl fullWidth sx={{ marginBottom: 3 }}>
//             <InputLabel>Select Filters</InputLabel>
//             <Select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
//               {filterOptions.map(option => (
//                 <MenuItem key={option.id} value={JSON.stringify(option)}>
//                   {option.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button variant='contained' color='primary' onClick={handleAddFilter}>
//               Import
//             </Button>
//             <Button variant='contained' color='secondary' onClick={closeFilterModal}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       <Menu
//         open={contextMenu !== null}
//         onClose={handleCloseContextMenu}
//         anchorReference='anchorPosition'
//         anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
//       >
//         <MenuItem onClick={handleEditTile}>Edit</MenuItem>
//         <MenuItem onClick={handleDeleteTile}>Delete</MenuItem>
//         <MenuItem onClick={handleFilterTile}>Filter</MenuItem>
//       </Menu>

//       </Box>

//     </BlankLayout>
//   )
// }

// export default DashboardPage





//  get mapping api binded for data blocks in tiles






// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Modal from '@mui/material/Modal'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import CircularProgress from '@mui/material/CircularProgress'
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import { Responsive, WidthProvider } from 'react-grid-layout'
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import getAllTiles from 'src/api/tiles/getAllTiles'
// import getAllTemplateCards from 'src/api/dashboards/getAllTemplateCards'
// import createTile from 'src/api/dashboards/createTile'
// import getAllDataBlocks from 'src/api/tiles/getAllDataBlocks'
// import { saveTilePositions, loadTilePositions } from 'src/utils/tilePosition'
// import dynamic from 'next/dynamic'
// import deleteTile from 'src/api/tiles/deleteTiles'
// import getAllFiltersByDashboardID from 'src/api/filters/getAllFiltersByDashboardID'
// import getAllFilters from 'src/api/filters/getAllFilters'
// import getAllDropDownValues from 'src/api/filters/getAllDropDownValues'
// import createMapping from 'src/api/filters/createMapping'
// import deleteFilterByID from 'src/api/filters/deleteFilterByID'
// import getMappingOfDatablocksInTiles from 'src/api/filters/getMappingOfDatablocksInTiles'

// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const ResponsiveGridLayout = WidthProvider(Responsive)

// const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// const DashboardPage = () => {
//   const [layouts, setLayouts] = useState({ lg: [] })
//   const [tiles, setTiles] = useState([])
//   const [modalOpen, setModalOpen] = useState(false)
//   const [filterModalOpen, setFilterModalOpen] = useState(false)
//   const [selectedFilter, setSelectedFilter] = useState('')
//   const [contextMenu, setContextMenu] = useState(null)
//   const [selectedTile, setSelectedTile] = useState(null)
//   const [cards, setCards] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState([])
//   const [filterMenuAnchor, setFilterMenuAnchor] = useState(null)
//   const [filterMenuIndex, setFilterMenuIndex] = useState(null)

//   //  select the card content

//   const [editMode, setEditMode] = useState(false) // To track edit mode
//   const [selectedBlocks, setSelectedBlocks] = useState({}) // To track selected blocks per tile
//   const [filterSelections, setFilterSelections] = useState({}) // To track selected values for each filter

//   const [dynamicFilters, setDynamicFilters] = useState([])

//   const [filterOptions, setFilterOptions] = useState([])

//   const [dropdownOptions, setDropdownOptions] = useState({})

//   const [currentFilterID, setCurrentFilterID] = useState(null) // New state to track the current FilterID

//   const router = useRouter()
//   const { dashboardId, projectId } = router.query

// // apply filter- start

// useEffect(() => {
//   const fetchTilesAndDataBlocks = async () => {
//     if (!dashboardId) return
//     setLoading(true)
//     try {
//       const fetchedTiles = await getAllTiles(dashboardId)
//       const savedLayout = loadTilePositions(dashboardId)

//       const tilesWithDataBlocks = await Promise.all(
//         fetchedTiles.map(async (tile, index) => {
//           // Pass empty filters object for initial load
//           const datablocks = await getAllDataBlocks(tile.ID, {})
//           console.log('this is all datablocks----', datablocks)

//           return {
//             i: `tile-${index + 1}`,
//             x: parseInt(savedLayout?.[index]?.x || tile.Layout.x),
//             y: parseInt(savedLayout?.[index]?.y || tile.Layout.y),
//             w: parseInt(savedLayout?.[index]?.w || tile.Layout.w),
//             h: parseInt(savedLayout?.[index]?.h || tile.Layout.h),
//             minW: tile.Layout.minW,
//             minH: tile.Layout.minH,
//             maxW: tile.Layout.maxW,
//             maxH: tile.Layout.maxH,
//             template: {
//               id: tile.ID,
//               url: tile.Url,
//               styles: tile.Styles,
//               datablocks: datablocks
//             }
//           }
//         })
//       )

//       setTiles(tilesWithDataBlocks)
//       setLayouts({ lg: tilesWithDataBlocks })
//     } catch (error) {
//       console.error('Error fetching tiles, data blocks, or filters:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   fetchTilesAndDataBlocks()
// }, [dashboardId])

// const handleApplyFilter = async () => {
//   try {
//     setLoading(true)
//     // Create a new array to store updated tiles
//     const updatedTiles = await Promise.all(
//       tiles.map(async (tile) => {
//         // Get the selected filter values
//         const filterPayload = {}
//         Object.entries(filterSelections).forEach(([filterName, selectedValue]) => {
//           // Find the filter ID based on the filter name
//           const filter = [...filters, ...dynamicFilters].find(f => f.name === filterName)
//           if (filter && selectedValue) {
//             filterPayload[filter.id] = [selectedValue.toString()]
//           }
//         })

//         // Fetch new datablocks with filter values
//         const newDatablocks = await getAllDataBlocks(tile.template.id, filterPayload)

//         // Return updated tile with new datablocks
//         return {
//           ...tile,
//           template: {
//             ...tile.template,
//             datablocks: newDatablocks
//           }
//         }
//       })
//     )

//     setTiles(updatedTiles)
//   } catch (error) {
//     console.error('Error applying filters:', error)
//     toast.error('Failed to apply filters')
//   } finally {
//     setLoading(false)
//   }
// }

// // apply filter- end

//   // filter api

//   // useEffect(() => {
//   //   const fetchTilesAndDataBlocks = async () => {
//   //     if (!dashboardId) return
//   //     setLoading(true)
//   //     try {
//   //       const fetchedTiles = await getAllTiles(dashboardId)
//   //       const savedLayout = loadTilePositions(dashboardId)

//   //       const tilesWithDataBlocks = await Promise.all(
//   //         fetchedTiles.map(async (tile, index) => {
//   //           const datablocks = await getAllDataBlocks(tile.ID)
//   //           console.log('this is all datablocks----', datablocks)

//   //           return {
//   //             i: `tile-${index + 1}`,
//   //             x: parseInt(savedLayout?.[index]?.x || tile.Layout.x),
//   //             y: parseInt(savedLayout?.[index]?.y || tile.Layout.y),
//   //             w: parseInt(savedLayout?.[index]?.w || tile.Layout.w),
//   //             h: parseInt(savedLayout?.[index]?.h || tile.Layout.h),
//   //             minW: tile.Layout.minW,
//   //             minH: tile.Layout.minH,
//   //             maxW: tile.Layout.maxW,
//   //             maxH: tile.Layout.maxH,
//   //             template: {
//   //               id: tile.ID,
//   //               url: tile.Url,
//   //               styles: tile.Styles,
//   //               datablocks: datablocks
//   //             }
//   //           }
//   //         })
//   //       )

//   //       setTiles(tilesWithDataBlocks)
//   //       setLayouts({ lg: tilesWithDataBlocks })
//   //     } catch (error) {
//   //       console.error('Error fetching tiles, data blocks, or filters:', error)
//   //     } finally {
//   //       setLoading(false)
//   //     }
//   //   }

//   //   fetchTilesAndDataBlocks()
//   // }, [dashboardId])

//   // get all filters by dasboard id

//   useEffect(() => {
//     const fetchFilters = async () => {
//       if (!dashboardId) return
//       try {
//         const fetchedFilters = await getAllFiltersByDashboardID(dashboardId)
//         // console.log("This is the complete filters-----", fetchedFilters)
//         const formattedFilters = fetchedFilters.map(filter => ({
//           id: filter.ID,
//           columnId: filter.ColumnID,
//           name: filter.Name
//         }))
//         setFilters(formattedFilters)
//         // console.log("this is the formatted filters---",formattedFilters )
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [dashboardId])

//   // get all filters in dropdown option

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const data = await getAllFilters()
//         // console.log("this is the get all filters----",data)
//         setFilterOptions(data.Data.map(filter => ({ id: filter.ID, name: filter.Name, columnID: filter.ColumnID })))
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [])

//   // api binding for getting dropdown values

//   const handleDropdownFocus = async (filterName, columnId) => {
//     if (!dropdownOptions[filterName]) {
//       // Fetch only if not already fetched
//       const options = await getAllDropDownValues(columnId)
//       setDropdownOptions(prev => ({ ...prev, [filterName]: options }))
//     }
//   }

//   const openModal = async () => {
//     setModalOpen(true)
//     const fetchedCards = await getAllTemplateCards()
//     setCards(fetchedCards)
//   }

//   const closeModal = () => setModalOpen(false)

//   const openFilterModal = () => setFilterModalOpen(true)

//   const closeFilterModal = () => {
//     setFilterModalOpen(false)
//     setSelectedFilter('')
//   }

//   // const handleAddFilter = () => {
//   //   if (selectedFilter && !filters.includes(selectedFilter)) {
//   //     setFilters([...filters, selectedFilter])
//   //   }
//   //   closeFilterModal()
//   // }

//   // const handleAddFilter = () => {
//   //   if (selectedFilter && !dynamicFilters.some(f => f.name === selectedFilter)) {
//   //     const newFilter = { name: selectedFilter, id: null, columnId: null }
//   //     setDynamicFilters([...dynamicFilters, newFilter])
//   //   }
//   //   closeFilterModal()
//   // }

//   // const handleAddFilter = () => {
//   //   if (!selectedFilter) return;

//   //   const parsedFilter = JSON.parse(selectedFilter); // Parse the selected filter value
//   //   setDynamicFilters(prev => [
//   //     ...prev,
//   //     { id: parsedFilter.id, name: parsedFilter.name, columnID: parsedFilter.columnID }
//   //   ]);

//   //   setSelectedFilter('');
//   //   closeFilterModal();
//   // };

//   // final changes

//   const handleAddFilter = () => {
//     if (!selectedFilter) return

//     const parsedFilter = JSON.parse(selectedFilter)

//     // Check if the filter is already present in the filters or dynamicFilters
//     const filterExists = [...filters, ...dynamicFilters].some(
//       existingFilter => existingFilter.name === parsedFilter.name
//     )

//     if (filterExists) {
//       alert(`Filter "${parsedFilter.name}" already exists on the dashboard.`)
//       return
//     }

//     setDynamicFilters(prev => [
//       ...prev,
//       { id: parsedFilter.id, name: parsedFilter.name, columnID: parsedFilter.columnID }
//     ])

//     setSelectedFilter('')
//     closeFilterModal()
//   }

//   const handleAddTile = async card => {
//     try {
//       const tileData = await createTile(card.id, dashboardId, projectId)
//       const datablocks = await getAllDataBlocks(tileData.Data[0].id)
//       const newTile = {
//         i: `tile-${tiles.length + 1}`,
//         x: (tiles.length * 2) % 12,
//         y: Infinity,
//         w: tileData.Data[0].layout.w,
//         h: tileData.Data[0].layout.h,
//         minW: tileData.Data[0].layout.minW,
//         minH: tileData.Data[0].layout.minH,
//         maxW: tileData.Data[0].layout.maxW,
//         maxH: tileData.Data[0].layout.maxH,
//         template: {
//           ...tileData.Data[0],
//           datablocks: datablocks
//         }
//       }

//       setTiles([...tiles, newTile])
//       closeModal()
//     } catch (error) {
//       console.error('Failed to add tile:', error)
//       closeModal()
//     }
//   }

//   const handleLayoutChange = layout => {
//     clearTimeout(window.layoutChangeTimeout)
//     window.layoutChangeTimeout = setTimeout(() => {
//       const updatedTiles = tiles.map(tile => {
//         const updatedLayout = layout.find(l => l.i === tile.i)
//         return { ...tile, ...updatedLayout }
//       })

//       setLayouts({ lg: layout })
//       setTiles(updatedTiles)
//     }, 300)
//   }

//   const handleContextMenu = (event, tile) => {
//     event.preventDefault()
//     setSelectedTile(tile)
//     setContextMenu(
//       contextMenu === null
//         ? {
//             mouseX: event.clientX + 2,
//             mouseY: event.clientY - 6
//           }
//         : null
//     )
//   }

//   const handleCloseContextMenu = () => {
//     setContextMenu(null)
//   }

//   const handleDeleteTile = async () => {
//     try {
//       const response = await deleteTile(selectedTile.template.id)

//       if (response?.code === 200) {
//         console.log('Tile deleted successfully:', response.message)
//         setTiles(tiles.filter(tile => tile.i !== selectedTile.i))
//       }
//     } catch (error) {
//       console.error('Failed to delete tile:', error)
//     } finally {
//       handleCloseContextMenu()
//     }
//   }

//   const handleEditTile = () => {
//     router.push(`${router.asPath}editor?tileId=${selectedTile.template.id}`)
//     handleCloseContextMenu()
//   }

//   const handleFilterTile = () => {
//     console.log('Filter tile:', selectedTile)
//     handleCloseContextMenu()
//   }

//   const handleSaveDashboard = () => {
//     try {
//       saveTilePositions(dashboardId, layouts.lg)
//       console.log('Dashboard saved!')
//     } catch (error) {
//       console.error('Error saving dashboard:', error)
//     }
//   }

//   const getDataBlockValue = datablock => {
//     const value = datablock?.data?.value || datablock.data
//     // console.log("this is my datablock id---", datablock)
//     if (typeof value === 'object' && value !== null) {
//       return JSON.stringify(value)
//     }
//     return value || 'Null'
//   }

//   const renderDataBlock = (datablock, tileId) => {
//     if (loading) return <CircularProgress />

//     // Highlight the datablock if it's selected in edit mode
//   const isSelected = editMode && selectedBlocks[tileId]?.has(datablock.id)

//     // adding the table- start

//     if (datablock.type === 'table') {

//       // Fixed container styles to enforce scrolling
//       const containerStyles = {
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '0',
//         position: 'relative'
//       }

//       // Scrollable wrapper styles
//       const scrollWrapperStyles = {
//         flex: 1,
//         overflow: 'auto',
//         // Calculate height to show approximately 6 rows
//         // Header (48px) + (6 rows × 40px per row) + some padding
//         maxHeight: '290px',
//         width: '100%',
//         position: 'relative'
//       }

//       // Fixed table styles
//       const tableStyles = {
//         width: '100%',
//         borderCollapse: 'collapse',
//         tableLayout: 'fixed',
//         ...datablock.options.styles.table
//       }

//       // Enhanced header styles
//       const headerStyles = {
//         padding: '12px 16px',
//         backgroundColor: '#f4f4f4',
//         fontWeight: 'bold',
//         fontSize: '14px',
//         textAlign: 'left',
//         position: 'sticky',
//         top: 0,
//         zIndex: 2,
//         borderBottom: '2px solid #ddd',
//         ...datablock.options.styles.header
//       }

//       // Enhanced row styles
//       const rowStyles = {
//         padding: '10px 16px',
//         borderBottom: '1px solid #ddd',
//         fontSize: '13px',
//         whiteSpace: 'nowrap',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         ...datablock.options.styles.row
//       }

//       // Cell styles
//       const cellStyles = {
//         padding: '10px 16px',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap'
//       }

//       return (
//         <Box sx={containerStyles}>
//           <Box sx={scrollWrapperStyles}>
//             <table style={tableStyles}>
//               <thead>
//                 <tr>
//                   {datablock.options.headers.map((header, index) => (
//                     <th key={index} style={headerStyles}>
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {datablock.options.rows.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {row.map((cell, cellIndex) => (
//                       <td key={cellIndex} style={{ ...rowStyles, ...cellStyles }}>
//                         {cell}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Box>
//         </Box>
//       )
//     }

//     // adding the table- end

//     if (datablock.type != 'text') {
//       return (
//         <DynamicChart
//           key={datablock.datablock_id}
//           options={datablock.options}
//           series={datablock.series}
//           type={datablock.type}
//           width={datablock.options.chart.width}
//         />
//       )
//     } else {
//         return (
//             <Typography
//               key={datablock.datablock_id}
//               sx={{
//                 ...datablock.styles,
//                 border: isSelected ? '1px solid blue' : 'none', // Highlight selected datablocks
//                 cursor: editMode ? 'pointer' : 'default'
//               }}
//             >
//               {getDataBlockValue(datablock)}
//             </Typography>
//           )
//     }
//   }

//   // function to manage 3-dot in dropdown- start
//   const handleFilterMenuClick = (event, index) => {
//     setFilterMenuAnchor(event.currentTarget) // Set anchor to clicked button
//     setFilterMenuIndex(index) // Set the index of the filter
//   }

//   const handleCloseFilterMenu = () => {
//     setFilterMenuAnchor(null)
//     setFilterMenuIndex(null)
//   }

//   // const handleDeleteFilter = index => {
//   //   const updatedFilters = filters.filter((_, i) => i !== index)
//   //   setFilters(updatedFilters)
//   //   handleCloseFilterMenu()
//   // }

//   const handleDeleteFilter = async (index) => {
//     try {
//       // Determine if it's a static or dynamic filter
//       const isStaticFilter = index < filters.length
//       const filterToDelete = isStaticFilter
//         ? filters[index]
//         : dynamicFilters[index - filters.length]

//       const response = await deleteFilterByID(filterToDelete.id, dashboardId)

//       if (response.code === 201) {

//         toast.success('Filter deleted successfully')

//         // Remove the filter from the appropriate array
//         if (isStaticFilter) {
//           setFilters(filters.filter((_, i) => i !== index))
//         } else {
//           setDynamicFilters(dynamicFilters.filter((_, i) => i !== (index - filters.length)))
//         }
//       } else {

//         toast.error(response.message || 'Failed to delete filter')
//       }
//     } catch (error) {

//       console.error('Error deleting filter:', error)
//       toast.error('An error occurred while deleting the filter')
//     } finally {

//       handleCloseFilterMenu()
//     }
//   }

//   // function to manage 3-dot in dropdown - end

//   // select the card content- start

//   // const handleEditFilter = index => {
//   //   setEditMode(true) // Enable edit mode
//   //   setSelectedBlocks({}) // Clear previously selected blocks
//   //   handleCloseFilterMenu()
//   // }

//   // temp- start

// //   const handleEditFilter = index => {
// //     const selectedFilter = filters[index] // Get the filter based on the dropdown index
// //     setCurrentFilterID(selectedFilter.id) // Store the current FilterID
// //     setEditMode(true) // Enter edit mode
// //     setSelectedBlocks({}) // Clear previously selected blocks
// //     handleCloseFilterMenu()
// //   }

// //   const handleEditFilterDynamic = index => {
// //     const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
// //     setCurrentFilterID(selectedFilter.id) // Store the current FilterID
// //     setEditMode(true) // Enter edit mode
// //     setSelectedBlocks({}) // Clear previously selected blocks
// //     handleCloseFilterMenu()
// //   }

// // // Modify handleEditFilter
// // const handleEditFilter = async (index) => {
// //     const selectedFilter = filters[index] // Get the filter based on the dropdown index
// //     setCurrentFilterID(selectedFilter.id) // Store the current FilterID

// //     try {
// //       // Fetch the mapped datablock IDs for the selected filter
// //       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

// //       // Pre-select the mapped datablocks
// //       const updatedSelectedBlocks = {}
// //       tiles.forEach(tile => {
// //         if (tile.template.datablocks) {
// //           Object.values(tile.template.datablocks).forEach(datablock => {
// //             if (mappedDatablockIds.includes(datablock.id)) {
// //               if (!updatedSelectedBlocks[tile.i]) {
// //                 updatedSelectedBlocks[tile.i] = new Set()
// //               }
// //               updatedSelectedBlocks[tile.i].add(datablock.id)
// //             }
// //           })
// //         }
// //       })

// //       setSelectedBlocks(updatedSelectedBlocks)
// //       setEditMode(true) // Enter edit mode
// //     } catch (error) {
// //       console.error('Error fetching mapped datablocks:', error)
// //       toast.error('Failed to fetch mapped datablocks')
// //     } finally {
// //       handleCloseFilterMenu()
// //     }
// //   }

// //   // Modify handleEditFilterDynamic
// //   const handleEditFilterDynamic = async (index) => {
// //     const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
// //     setCurrentFilterID(selectedFilter.id) // Store the current FilterID

// //     try {
// //       // Fetch the mapped datablock IDs for the selected filter
// //       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

// //       // Pre-select the mapped datablocks
// //       const updatedSelectedBlocks = {}
// //       tiles.forEach(tile => {
// //         if (tile.template.datablocks) {
// //           Object.values(tile.template.datablocks).forEach(datablock => {
// //             if (mappedDatablockIds.includes(datablock.id)) {
// //               if (!updatedSelectedBlocks[tile.i]) {
// //                 updatedSelectedBlocks[tile.i] = new Set()
// //               }
// //               updatedSelectedBlocks[tile.i].add(datablock.id)
// //             }
// //           })
// //         }
// //       })

// //       setSelectedBlocks(updatedSelectedBlocks)
// //       setEditMode(true) // Enter edit mode
// //     } catch (error) {
// //       console.error('Error fetching mapped datablocks:', error)
// //       toast.error('Failed to fetch mapped datablocks')
// //     } finally {
// //       handleCloseFilterMenu()
// //     }
// //   }

// // handling null issue in Edit functionality in filters

// const handleEditFilter = async (index) => {
//     const selectedFilter = filters[index]
//     setCurrentFilterID(selectedFilter.id)

//     try {

//       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

//       // If mappedDatablockIds is null, initialize an empty array
//       const datablockIds = mappedDatablockIds || []

//       // Pre-select the mapped datablocks (if any)
//       const updatedSelectedBlocks = {}
//       tiles.forEach(tile => {
//         if (tile.template.datablocks) {
//           Object.values(tile.template.datablocks).forEach(datablock => {
//             if (datablockIds.includes(datablock.id)) {
//               if (!updatedSelectedBlocks[tile.i]) {
//                 updatedSelectedBlocks[tile.i] = new Set()
//               }
//               updatedSelectedBlocks[tile.i].add(datablock.id)
//             }
//           })
//         }
//       })

//       setSelectedBlocks(updatedSelectedBlocks)
//       setEditMode(true) // Enter edit mode
//     } catch (error) {
//       console.error('Error fetching mapped datablocks:', error)
//       toast.error('Failed to fetch mapped datablocks')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   const handleEditFilterDynamic = async (index) => {
//     const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
//     setCurrentFilterID(selectedFilter.id) // Store the current FilterID

//     try {
//       // Fetch the mapped datablock IDs for the selected filter
//       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

//       // If mappedDatablockIds is null, initialize an empty array
//       const datablockIds = mappedDatablockIds || []

//       // Pre-select the mapped datablocks (if any)
//       const updatedSelectedBlocks = {}
//       tiles.forEach(tile => {
//         if (tile.template.datablocks) {
//           Object.values(tile.template.datablocks).forEach(datablock => {
//             if (datablockIds.includes(datablock.id)) {
//               if (!updatedSelectedBlocks[tile.i]) {
//                 updatedSelectedBlocks[tile.i] = new Set()
//               }
//               updatedSelectedBlocks[tile.i].add(datablock.id)
//             }
//           })
//         }
//       })

//       setSelectedBlocks(updatedSelectedBlocks)
//       setEditMode(true) // Enter edit mode
//     } catch (error) {
//       console.error('Error fetching mapped datablocks:', error)
//       toast.error('Failed to fetch mapped datablocks')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditMode(false)
//     setSelectedBlocks({})
//     setCurrentFilterID(null) // Clear the current FilterID
//     handleCloseFilterMenu()
//   }

//   // temp- end

//   const handleBlockClick = (tileId, blockId) => {
//     setSelectedBlocks(prev => {
//       const updatedBlocks = { ...prev }
//       if (!updatedBlocks[tileId]) {
//         updatedBlocks[tileId] = new Set()
//       }

//       if (updatedBlocks[tileId].has(blockId)) {
//         updatedBlocks[tileId].delete(blockId)
//       } else {
//         updatedBlocks[tileId].add(blockId)
//       }

//       console.log('this is updated block-----', updatedBlocks)

//       return updatedBlocks
//     })
//   }

//   // select the card content- end

//   // const debug= ()=>{
//   //   console.log("part -1 ", filters)
//   //   console.log("part-2", dynamicFilters)
//   // }

//   // apply mapping click - filter mapping

//   return (
//     <BlankLayout>

// {/* making header sticky */}

// <Box sx={{
//       height: '100vh',
//       display: 'flex',
//       flexDirection: 'column'
//     }}>
//       {/* Sticky Header */}
//       <Box
//         sx={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 1000,
//           // backgroundColor: 'white',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//         }}
//       >

//       <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant='h4'>Dashboard</Typography>
//         <Box>
//           {editMode ? (
//             // <Button
//             //   variant='contained'
//             //   color='success'
//             //   onClick={() => {
//             //     setEditMode(false)
//             //     setSelectedBlocks({})
//             //   }}
//             // >
//             //   Apply
//             // </Button>

//             <Button
//               variant='contained'
//               color='success'
//               onClick={async () => {
//                 try {
//                   const dataBlockIds = {}

//                   // Iterate over selectedBlocks to collect datablock IDs
//                   Object.entries(selectedBlocks).forEach(([tileId, blockSet]) => {
//                     const tile = tiles.find(t => t.i === tileId)
//                     if (tile && tile.template.datablocks) {
//                       Object.values(tile.template.datablocks).forEach(datablock => {
//                         dataBlockIds[datablock.id] = blockSet.has(datablock.id)
//                       })
//                     }
//                   })

//                   // const dashboardId = router.query.dashboardId; // Get the DashboardID from routing
//                   const dashboardId = parseInt(router.query.dashboardId, 10)

//                   // const filterId = filters[0]?.id || 0;
//                   const filterId = currentFilterID

//                   // Call the API using createMapping
//                   await createMapping(dashboardId, filterId, dataBlockIds)

//                   setEditMode(false)
//                   setSelectedBlocks({})
//                   setCurrentFilterID(null) // Clear current filter ID
//                   toast.success('Mapping Created Successfully')
//                 } catch (error) {
//                   console.error(error)
//                   toast.error(error.message || 'Failed to create mapping.')
//                 }
//               }}
//             >
//               Apply
//             </Button>
//           ) : (
//             <>

// <Button variant='contained'  sx={{ marginRight: 2 }}  onClick={handleApplyFilter} disabled={editMode}>
//                 Apply Filter
//               </Button>

//               <Button variant='contained' onClick={openModal} sx={{ marginRight: 2 }} disabled={editMode}>
//                 Add Tile
//               </Button>
//               <Button
//                 variant='contained'
//                 color='secondary'
//                 onClick={handleSaveDashboard}
//                 sx={{ marginRight: 2 }}
//                 disabled={editMode}
//               >
//                 Save
//               </Button>
//               <Button variant='contained' color='primary' onClick={openFilterModal} disabled={editMode}>
//                 Add Filters
//               </Button>

//               {/* <Button variant='contained' color='primary' onClick={debug} disabled={editMode}>
//                 Debug
//               </Button>  */}
//             </>
//           )}
//         </Box>
//       </Box>

//       {/* Dynamic Filters */}

//       <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//   {filters.map((filter, index) => (
//     <Box
//       key={filter.id || index}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1,
//         padding: 1,
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//       }}
//     >
//       <FormControl
//         sx={{
//           minWidth: Math.max(150, filter.name.length * 12)
//         }}
//       >
//         <InputLabel>{filter.name}</InputLabel>
//         <Select
//           value={filterSelections[filter.name] || ''}
//           onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//           // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//           // onFocus={() => handleDropdownFocus(filter.name, 217)}
//           onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//           sx={{ bgcolor: 'white', maxWidth: '100%' }}
//         >
//           {dropdownOptions[filter.name]?.map(option => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//         <Button
//           sx={{
//             minWidth: 0,
//             padding: '4px',
//             marginLeft: '4px',
//             backgroundColor: '#f5f5f5',
//             borderRadius: '50%',
//             '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//           }}
//           onClick={e => handleFilterMenuClick(e, index)}
//         >
//           &#x2026; {/* 3-dot symbol */}
//         </Button>
//         <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//           <MenuItem onClick={() => handleEditFilter(index)}>Edit</MenuItem>
//           <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//           <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   ))}

//   {dynamicFilters.map((filter, index) => (
//     <Box
//       key={index}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1,
//         padding: 1,
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//       }}
//     >
//       <FormControl
//         sx={{
//           minWidth: Math.max(150, filter.name.length * 12)
//         }}
//       >
//         <InputLabel>{filter.name}</InputLabel>
//         <Select
//           value={filterSelections[filter.name] || ''}
//           onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//           // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//           onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//           sx={{ bgcolor: 'white', maxWidth: '100%' }}
//         >
//           {dropdownOptions[filter.name]?.map(option => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//         <Button
//           sx={{
//             minWidth: 0,
//             padding: '4px',
//             marginLeft: '4px',
//             backgroundColor: '#f5f5f5',
//             borderRadius: '50%',
//             '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//           }}
//           onClick={e => handleFilterMenuClick(e, index)}
//         >
//           &#x2026; {/* 3-dot symbol */}
//         </Button>
//         <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//           <MenuItem onClick={() => handleEditFilterDynamic(index)}>Edit</MenuItem>
//           <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//           <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   ))}
// </Box>

//  </Box>

//       <Box sx={{
//         flexGrow: 1,
//         overflow: 'auto',
//         padding: 2
//       }}>
//         <ResponsiveGridLayout
//           className='layout'
//           layouts={layouts}
//           breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//           cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
//           rowHeight={30}
//           width={1200}
//           compactType={null}
//           isBounded={false}
//           isDraggable={!editMode}
//           isResizable={!editMode}
//           onLayoutChange={handleLayoutChange}
//         >
//           {tiles.map(tile => (
//             <div key={tile.i} data-grid={tile}>
//               <Box
//                 onContextMenu={event => handleContextMenu(event, tile)}
//                 sx={{
//                   ...tile.template.styles.container,
//                   position: 'relative',
//                   pointerEvents: 'auto'
//                 }}
//               >
//                 {Object.entries(tile.template.datablocks || {}).map(([blockKey, datablock]) => (
//                   <Box
//                     key={datablock.id} // Use datablock.id as the unique key
//                     onClick={() => editMode && handleBlockClick(tile.i, datablock.id)} // Pass datablock.id
//                     onContextMenu={event => event.stopPropagation()} // Prevent right-click conflicts
//                     sx={{
//                       cursor: editMode ? 'pointer' : 'default',
//                       border: editMode && selectedBlocks[tile.i]?.has(datablock.id) ? '2px solid blue' : 'none',
//                       ...datablock.styles
//                     }}
//                   >
//                     {renderDataBlock(datablock, tile.i)}
//                   </Box>
//                 ))}
//               </Box>
//             </div>
//           ))}
//         </ResponsiveGridLayout>
//       </Box>

//       <Modal open={modalOpen} onClose={closeModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 600,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4,
//             maxHeight: '90vh',
//             overflowY: 'auto'
//           }}
//         >
//           <Typography variant='h6' component='h2' gutterBottom>
//             Select a Card
//           </Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//             {cards.map(card => (
//               <Box
//                 key={card.id}
//                 sx={{
//                   border: '1px solid #ddd',
//                   borderRadius: '8px',
//                   p: 2,
//                   cursor: 'pointer',
//                   flex: '1 1 200px',
//                   '&:hover': {
//                     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
//                   }
//                 }}
//                 onClick={() => handleAddTile(card)}
//               >
//                 <Box sx={{ mt: 2 }}>{Object.values(card.datablocks).map(datablock => renderDataBlock(datablock))}</Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Modal>

//       <Modal open={filterModalOpen} onClose={closeFilterModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4
//           }}
//         >
//           <Typography variant='h6' component='h2' gutterBottom>
//             Add Filters
//           </Typography>
//           <FormControl fullWidth sx={{ marginBottom: 3 }}>
//             <InputLabel>Select Filters</InputLabel>
//             <Select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
//               {filterOptions.map(option => (
//                 <MenuItem key={option.id} value={JSON.stringify(option)}>
//                   {option.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button variant='contained' color='primary' onClick={handleAddFilter}>
//               Import
//             </Button>
//             <Button variant='contained' color='secondary' onClick={closeFilterModal}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       <Menu
//         open={contextMenu !== null}
//         onClose={handleCloseContextMenu}
//         anchorReference='anchorPosition'
//         anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
//       >
//         <MenuItem onClick={handleEditTile}>Edit</MenuItem>
//         <MenuItem onClick={handleDeleteTile}>Delete</MenuItem>
//         <MenuItem onClick={handleFilterTile}>Filter</MenuItem>
//       </Menu>

//       </Box>

//     </BlankLayout>
//   )
// }

// export default DashboardPage








//  Integrating the combo chart








// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Modal from '@mui/material/Modal'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import CircularProgress from '@mui/material/CircularProgress'
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import { Responsive, WidthProvider } from 'react-grid-layout'
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import getAllTiles from 'src/api/tiles/getAllTiles'
// import getAllTemplateCards from 'src/api/dashboards/getAllTemplateCards'
// import createTile from 'src/api/dashboards/createTile'
// import getAllDataBlocks from 'src/api/tiles/getAllDataBlocks'
// import { saveTilePositions, loadTilePositions } from 'src/utils/tilePosition'
// import dynamic from 'next/dynamic'
// import deleteTile from 'src/api/tiles/deleteTiles'
// import getAllFiltersByDashboardID from 'src/api/filters/getAllFiltersByDashboardID'
// import getAllFilters from 'src/api/filters/getAllFilters'
// import getAllDropDownValues from 'src/api/filters/getAllDropDownValues'
// import createMapping from 'src/api/filters/createMapping'
// import deleteFilterByID from 'src/api/filters/deleteFilterByID'
// import getMappingOfDatablocksInTiles from 'src/api/filters/getMappingOfDatablocksInTiles'

// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const ResponsiveGridLayout = WidthProvider(Responsive)

// const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// const DashboardPage = () => {
//   const [layouts, setLayouts] = useState({ lg: [] })
//   const [tiles, setTiles] = useState([])
//   const [modalOpen, setModalOpen] = useState(false)
//   const [filterModalOpen, setFilterModalOpen] = useState(false)
//   const [selectedFilter, setSelectedFilter] = useState('')
//   const [contextMenu, setContextMenu] = useState(null)
//   const [selectedTile, setSelectedTile] = useState(null)
//   const [cards, setCards] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState([])
//   const [filterMenuAnchor, setFilterMenuAnchor] = useState(null)
//   const [filterMenuIndex, setFilterMenuIndex] = useState(null)

//   //  select the card content

//   const [editMode, setEditMode] = useState(false) // To track edit mode
//   const [selectedBlocks, setSelectedBlocks] = useState({}) // To track selected blocks per tile
//   const [filterSelections, setFilterSelections] = useState({}) // To track selected values for each filter

//   const [dynamicFilters, setDynamicFilters] = useState([])

//   const [filterOptions, setFilterOptions] = useState([])

//   const [dropdownOptions, setDropdownOptions] = useState({})

//   const [currentFilterID, setCurrentFilterID] = useState(null) // New state to track the current FilterID

//   const router = useRouter()
//   const { dashboardId, projectId } = router.query

// // apply filter- start

// useEffect(() => {
//   const fetchTilesAndDataBlocks = async () => {
//     if (!dashboardId) return
//     setLoading(true)
//     try {
//       const fetchedTiles = await getAllTiles(dashboardId)
//       const savedLayout = loadTilePositions(dashboardId)

//       const tilesWithDataBlocks = await Promise.all(
//         fetchedTiles.map(async (tile, index) => {
//           // Pass empty filters object for initial load
//           const datablocks = await getAllDataBlocks(tile.ID, {})
//           console.log('this is all datablocks----', datablocks)

//           return {
//             i: `tile-${index + 1}`,
//             x: parseInt(savedLayout?.[index]?.x || tile.Layout.x),
//             y: parseInt(savedLayout?.[index]?.y || tile.Layout.y),
//             w: parseInt(savedLayout?.[index]?.w || tile.Layout.w),
//             h: parseInt(savedLayout?.[index]?.h || tile.Layout.h),
//             minW: tile.Layout.minW,
//             minH: tile.Layout.minH,
//             maxW: tile.Layout.maxW,
//             maxH: tile.Layout.maxH,
//             template: {
//               id: tile.ID,
//               url: tile.Url,
//               styles: tile.Styles,
//               datablocks: datablocks
//             }
//           }
//         })
//       )

//       setTiles(tilesWithDataBlocks)
//       setLayouts({ lg: tilesWithDataBlocks })
//     } catch (error) {
//       console.error('Error fetching tiles, data blocks, or filters:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   fetchTilesAndDataBlocks()
// }, [dashboardId])

// const handleApplyFilter = async () => {
//   try {
//     setLoading(true)
//     // Create a new array to store updated tiles
//     const updatedTiles = await Promise.all(
//       tiles.map(async (tile) => {
//         // Get the selected filter values
//         const filterPayload = {}
//         Object.entries(filterSelections).forEach(([filterName, selectedValue]) => {
//           // Find the filter ID based on the filter name
//           const filter = [...filters, ...dynamicFilters].find(f => f.name === filterName)
//           if (filter && selectedValue) {
//             filterPayload[filter.id] = [selectedValue.toString()]
//           }
//         })

//         // Fetch new datablocks with filter values
//         const newDatablocks = await getAllDataBlocks(tile.template.id, filterPayload)

//         // Return updated tile with new datablocks
//         return {
//           ...tile,
//           template: {
//             ...tile.template,
//             datablocks: newDatablocks
//           }
//         }
//       })
//     )

//     setTiles(updatedTiles)
//   } catch (error) {
//     console.error('Error applying filters:', error)
//     toast.error('Failed to apply filters')
//   } finally {
//     setLoading(false)
//   }
// }

// // apply filter- end

//   // filter api

//   // useEffect(() => {
//   //   const fetchTilesAndDataBlocks = async () => {
//   //     if (!dashboardId) return
//   //     setLoading(true)
//   //     try {
//   //       const fetchedTiles = await getAllTiles(dashboardId)
//   //       const savedLayout = loadTilePositions(dashboardId)

//   //       const tilesWithDataBlocks = await Promise.all(
//   //         fetchedTiles.map(async (tile, index) => {
//   //           const datablocks = await getAllDataBlocks(tile.ID)
//   //           console.log('this is all datablocks----', datablocks)

//   //           return {
//   //             i: `tile-${index + 1}`,
//   //             x: parseInt(savedLayout?.[index]?.x || tile.Layout.x),
//   //             y: parseInt(savedLayout?.[index]?.y || tile.Layout.y),
//   //             w: parseInt(savedLayout?.[index]?.w || tile.Layout.w),
//   //             h: parseInt(savedLayout?.[index]?.h || tile.Layout.h),
//   //             minW: tile.Layout.minW,
//   //             minH: tile.Layout.minH,
//   //             maxW: tile.Layout.maxW,
//   //             maxH: tile.Layout.maxH,
//   //             template: {
//   //               id: tile.ID,
//   //               url: tile.Url,
//   //               styles: tile.Styles,
//   //               datablocks: datablocks
//   //             }
//   //           }
//   //         })
//   //       )

//   //       setTiles(tilesWithDataBlocks)
//   //       setLayouts({ lg: tilesWithDataBlocks })
//   //     } catch (error) {
//   //       console.error('Error fetching tiles, data blocks, or filters:', error)
//   //     } finally {
//   //       setLoading(false)
//   //     }
//   //   }

//   //   fetchTilesAndDataBlocks()
//   // }, [dashboardId])

//   // get all filters by dasboard id

//   useEffect(() => {
//     const fetchFilters = async () => {
//       if (!dashboardId) return
//       try {
//         const fetchedFilters = await getAllFiltersByDashboardID(dashboardId)
//         // console.log("This is the complete filters-----", fetchedFilters)
//         const formattedFilters = fetchedFilters.map(filter => ({
//           id: filter.ID,
//           columnId: filter.ColumnID,
//           name: filter.Name
//         }))
//         setFilters(formattedFilters)
//         // console.log("this is the formatted filters---",formattedFilters )
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [dashboardId])

//   // get all filters in dropdown option

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const data = await getAllFilters()
//         // console.log("this is the get all filters----",data)
//         setFilterOptions(data.Data.map(filter => ({ id: filter.ID, name: filter.Name, columnID: filter.ColumnID })))
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [])

//   // api binding for getting dropdown values

//   const handleDropdownFocus = async (filterName, columnId) => {
//     if (!dropdownOptions[filterName]) {
//       // Fetch only if not already fetched
//       const options = await getAllDropDownValues(columnId)
//       setDropdownOptions(prev => ({ ...prev, [filterName]: options }))
//     }
//   }

//   const openModal = async () => {
//     setModalOpen(true)
//     const fetchedCards = await getAllTemplateCards()
//     setCards(fetchedCards)
//   }

//   const closeModal = () => setModalOpen(false)

//   const openFilterModal = () => setFilterModalOpen(true)

//   const closeFilterModal = () => {
//     setFilterModalOpen(false)
//     setSelectedFilter('')
//   }

//   // const handleAddFilter = () => {
//   //   if (selectedFilter && !filters.includes(selectedFilter)) {
//   //     setFilters([...filters, selectedFilter])
//   //   }
//   //   closeFilterModal()
//   // }

//   // const handleAddFilter = () => {
//   //   if (selectedFilter && !dynamicFilters.some(f => f.name === selectedFilter)) {
//   //     const newFilter = { name: selectedFilter, id: null, columnId: null }
//   //     setDynamicFilters([...dynamicFilters, newFilter])
//   //   }
//   //   closeFilterModal()
//   // }

//   // const handleAddFilter = () => {
//   //   if (!selectedFilter) return;

//   //   const parsedFilter = JSON.parse(selectedFilter); // Parse the selected filter value
//   //   setDynamicFilters(prev => [
//   //     ...prev,
//   //     { id: parsedFilter.id, name: parsedFilter.name, columnID: parsedFilter.columnID }
//   //   ]);

//   //   setSelectedFilter('');
//   //   closeFilterModal();
//   // };

//   // final changes

//   const handleAddFilter = () => {
//     if (!selectedFilter) return

//     const parsedFilter = JSON.parse(selectedFilter)

//     // Check if the filter is already present in the filters or dynamicFilters
//     const filterExists = [...filters, ...dynamicFilters].some(
//       existingFilter => existingFilter.name === parsedFilter.name
//     )

//     if (filterExists) {
//       alert(`Filter "${parsedFilter.name}" already exists on the dashboard.`)
//       return
//     }

//     setDynamicFilters(prev => [
//       ...prev,
//       { id: parsedFilter.id, name: parsedFilter.name, columnID: parsedFilter.columnID }
//     ])

//     setSelectedFilter('')
//     closeFilterModal()
//   }

// //   Adding the tile to dashboard - start

// //   const handleAddTile = async card => {
// //     try {
// //       const tileData = await createTile(card.id, dashboardId, projectId)
// //       const datablocks = await getAllDataBlocks(tileData.Data[0].id)
// //       const newTile = {
// //         i: `tile-${tiles.length + 1}`,
// //         x: (tiles.length * 2) % 12,
// //         y: Infinity,
// //         w: tileData.Data[0].layout.w,
// //         h: tileData.Data[0].layout.h,
// //         minW: tileData.Data[0].layout.minW,
// //         minH: tileData.Data[0].layout.minH,
// //         maxW: tileData.Data[0].layout.maxW,
// //         maxH: tileData.Data[0].layout.maxH,
// //         template: {
// //           ...tileData.Data[0],
// //           datablocks: datablocks
// //         }
// //       }

// //       setTiles([...tiles, newTile])
// //       closeModal()
// //     } catch (error) {
// //       console.error('Failed to add tile:', error)
// //       closeModal()
// //     }
// //   }

// const handleAddTile = async card => {
//     try {
//       const tileData = await createTile(card.id, dashboardId, projectId)
//       const datablocks = await getAllDataBlocks(tileData.Data[0].id)

//       // Find the highest y-coordinate among existing tiles
//       let maxY = 0
//       tiles.forEach(tile => {
//         const bottomY = tile.y + tile.h
//         if (bottomY > maxY) {
//           maxY = bottomY
//         }
//       })

//       // Place the new tile at the next row
//       const newTile = {
//         i: `tile-${tiles.length + 1}`,
//         x: 0, // Start from the left
//         y: maxY, // Place below all existing tiles
//         w: tileData.Data[0].layout.w,
//         h: tileData.Data[0].layout.h,
//         minW: tileData.Data[0].layout.minW,
//         minH: tileData.Data[0].layout.minH,
//         maxW: tileData.Data[0].layout.maxW,
//         maxH: tileData.Data[0].layout.maxH,
//         template: {
//           ...tileData.Data[0],
//           datablocks: datablocks
//         }
//       }

//       setTiles([...tiles, newTile])
//       closeModal()
//     } catch (error) {
//       console.error('Failed to add tile:', error)
//       closeModal()
//     }
//   }

// //   Adding the tile to dashboard - end

//   const handleLayoutChange = layout => {
//     clearTimeout(window.layoutChangeTimeout)
//     window.layoutChangeTimeout = setTimeout(() => {
//       const updatedTiles = tiles.map(tile => {
//         const updatedLayout = layout.find(l => l.i === tile.i)
//         return { ...tile, ...updatedLayout }
//       })

//       setLayouts({ lg: layout })
//       setTiles(updatedTiles)
//     }, 300)
//   }

//   const handleContextMenu = (event, tile) => {
//     event.preventDefault()
//     setSelectedTile(tile)
//     setContextMenu(
//       contextMenu === null
//         ? {
//             mouseX: event.clientX + 2,
//             mouseY: event.clientY - 6
//           }
//         : null
//     )
//   }

//   const handleCloseContextMenu = () => {
//     setContextMenu(null)
//   }

//   const handleDeleteTile = async () => {
//     try {
//       const response = await deleteTile(selectedTile.template.id)

//       if (response?.code === 200) {
//         console.log('Tile deleted successfully:', response.message)
//         setTiles(tiles.filter(tile => tile.i !== selectedTile.i))
//       }
//     } catch (error) {
//       console.error('Failed to delete tile:', error)
//     } finally {
//       handleCloseContextMenu()
//     }
//   }

//   const handleEditTile = () => {
//     router.push(`${router.asPath}editor?tileId=${selectedTile.template.id}`)
//     handleCloseContextMenu()
//   }

//   const handleFilterTile = () => {
//     console.log('Filter tile:', selectedTile)
//     handleCloseContextMenu()
//   }

//   const handleSaveDashboard = () => {
//     try {
//       saveTilePositions(dashboardId, layouts.lg)
//       console.log('Dashboard saved!')
//     } catch (error) {
//       console.error('Error saving dashboard:', error)
//     }
//   }

//   const getDataBlockValue = datablock => {
//     const value = datablock?.data?.value || datablock.data
//     // console.log("this is my datablock id---", datablock)
//     if (typeof value === 'object' && value !== null) {
//       return JSON.stringify(value)
//     }
//     return value || 'Null'
//   }

// //   const renderDataBlock = (datablock, tileId) => {

// //     if (loading) return <CircularProgress />

// //     // Highlight the datablock if it's selected in edit mode
// //   const isSelected = editMode && selectedBlocks[tileId]?.has(datablock.id)

// //     // adding the table- start

// //     if (datablock.type === 'table') {

// //       // Fixed container styles to enforce scrolling
// //       const containerStyles = {
// //         width: '100%',
// //         height: '100%',
// //         display: 'flex',
// //         flexDirection: 'column',
// //         padding: '0',
// //         position: 'relative'
// //       }

// //       // Scrollable wrapper styles
// //       const scrollWrapperStyles = {
// //         flex: 1,
// //         overflow: 'auto',
// //         // Calculate height to show approximately 6 rows
// //         // Header (48px) + (6 rows × 40px per row) + some padding
// //         maxHeight: '290px',
// //         width: '100%',
// //         position: 'relative'
// //       }

// //       // Fixed table styles
// //       const tableStyles = {
// //         width: '100%',
// //         borderCollapse: 'collapse',
// //         tableLayout: 'fixed',
// //         ...datablock.options.styles.table
// //       }

// //       // Enhanced header styles
// //       const headerStyles = {
// //         padding: '12px 16px',
// //         backgroundColor: '#f4f4f4',
// //         fontWeight: 'bold',
// //         fontSize: '14px',
// //         textAlign: 'left',
// //         position: 'sticky',
// //         top: 0,
// //         zIndex: 2,
// //         borderBottom: '2px solid #ddd',
// //         ...datablock.options.styles.header
// //       }

// //       // Enhanced row styles
// //       const rowStyles = {
// //         padding: '10px 16px',
// //         borderBottom: '1px solid #ddd',
// //         fontSize: '13px',
// //         whiteSpace: 'nowrap',
// //         overflow: 'hidden',
// //         textOverflow: 'ellipsis',
// //         ...datablock.options.styles.row
// //       }

// //       // Cell styles
// //       const cellStyles = {
// //         padding: '10px 16px',
// //         overflow: 'hidden',
// //         textOverflow: 'ellipsis',
// //         whiteSpace: 'nowrap'
// //       }

// //       return (
// //         <Box sx={containerStyles}>
// //           <Box sx={scrollWrapperStyles}>
// //             <table style={tableStyles}>
// //               <thead>
// //                 <tr>
// //                   {datablock.options.headers.map((header, index) => (
// //                     <th key={index} style={headerStyles}>
// //                       {header}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {datablock.options.rows.map((row, rowIndex) => (
// //                   <tr key={rowIndex}>
// //                     {row.map((cell, cellIndex) => (
// //                       <td key={cellIndex} style={{ ...rowStyles, ...cellStyles }}>
// //                         {cell}
// //                       </td>
// //                     ))}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </Box>
// //         </Box>
// //       )
// //     }

// //     // adding the table- end

// //     if (datablock.type != 'text') {
// //       return (
// //         <DynamicChart
// //           key={datablock.datablock_id}
// //           options={datablock.options}
// //           series={datablock.series}
// //           type={datablock.type}
// //           width={datablock.options.chart.width}
// //         />
// //       )
// //     } else {
// //         return (
// //             <Typography
// //               key={datablock.datablock_id}
// //               sx={{
// //                 ...datablock.styles,
// //                 border: isSelected ? '1px solid blue' : 'none', // Highlight selected datablocks
// //                 cursor: editMode ? 'pointer' : 'default'
// //               }}
// //             >
// //               {getDataBlockValue(datablock)}
// //             </Typography>
// //           )
// //     }
// //   }

// // added the combo chart

// const renderDataBlock = (datablock, tileId) => {
//     if (loading) return <CircularProgress />

//     // Highlight the datablock if it's selected in edit mode
//     const isSelected = editMode && selectedBlocks[tileId]?.has(datablock.id)

//     // Handling table rendering
//     if (datablock.type === 'table') {
//         const containerStyles = {
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             padding: '0',
//             position: 'relative'
//         }

//         const scrollWrapperStyles = {
//             flex: 1,
//             overflow: 'auto',
//             maxHeight: '290px',
//             width: '100%',
//             position: 'relative'
//         }

//         const tableStyles = {
//             width: '100%',
//             borderCollapse: 'collapse',
//             tableLayout: 'fixed',
//             ...datablock.options.styles.table
//         }

//         const headerStyles = {
//             padding: '12px 16px',
//             backgroundColor: '#f4f4f4',
//             fontWeight: 'bold',
//             fontSize: '14px',
//             textAlign: 'left',
//             position: 'sticky',
//             top: 0,
//             zIndex: 2,
//             borderBottom: '2px solid #ddd',
//             ...datablock.options.styles.header
//         }

//         const rowStyles = {
//             padding: '10px 16px',
//             borderBottom: '1px solid #ddd',
//             fontSize: '13px',
//             whiteSpace: 'nowrap',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             ...datablock.options.styles.row
//         }

//         const cellStyles = {
//             padding: '10px 16px',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap'
//         }

//         return (
//             <Box sx={containerStyles}>
//                 <Box sx={scrollWrapperStyles}>
//                     <table style={tableStyles}>
//                         <thead>
//                             <tr>
//                                 {datablock.options.headers.map((header, index) => (
//                                     <th key={index} style={headerStyles}>
//                                         {header}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {datablock.options.rows.map((row, rowIndex) => (
//                                 <tr key={rowIndex}>
//                                     {row.map((cell, cellIndex) => (
//                                         <td key={cellIndex} style={{ ...rowStyles, ...cellStyles }}>
//                                             {cell}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </Box>
//             </Box>
//         )
//     }

//     // Handle combo chart separately - start

//     if (datablock.type === "combo") {
//         if (!datablock.options || !datablock.series) {
//           return <Typography>Error: Combo chart data is missing</Typography>;
//         }

//         const chartOptions = {
//           ...datablock.options,
//           yaxis: datablock.options.yaxis || [{ title: { text: "Y Axis" } }], // Ensure yaxis exists
//           chart: {
//             ...datablock.options.chart,
//             type: "line", // Default to line if type is missing
//           },
//         };

//         return (
//           <DynamicChart
//             key={datablock.datablock_id}
//             options={chartOptions}
//             series={datablock.series || []}
//             type="line" // Ensure valid chart type
//             width={datablock.options.chart?.width || "100%"}
//           />
//         );

//       }

//     // Handle combo chart separately - end

//     // Handling all other chart types

//     if (datablock.type !== 'text') {
//         return (
//             <DynamicChart
//                 key={datablock.datablock_id}
//                 options={datablock.options}
//                 series={datablock.series}
//                 type={datablock.type}
//                 width={datablock.options.chart.width}
//             />
//         )
//     }

//     // Handling text type datablocks

//     return (
//         <Typography
//             key={datablock.datablock_id}
//             sx={{
//                 ...datablock.styles,
//                 border: isSelected ? '0px solid blue' : 'none',
//                 cursor: editMode ? 'pointer' : 'default'
//             }}
//         >
//             {getDataBlockValue(datablock)}
//         </Typography>
//     )
// }

//   // function to manage 3-dot in dropdown- start

//   const handleFilterMenuClick = (event, index) => {
//     setFilterMenuAnchor(event.currentTarget) // Set anchor to clicked button
//     setFilterMenuIndex(index) // Set the index of the filter
//   }

//   const handleCloseFilterMenu = () => {
//     setFilterMenuAnchor(null)
//     setFilterMenuIndex(null)
//   }

//   // const handleDeleteFilter = index => {
//   //   const updatedFilters = filters.filter((_, i) => i !== index)
//   //   setFilters(updatedFilters)
//   //   handleCloseFilterMenu()
//   // }

//   const handleDeleteFilter = async (index) => {
//     try {
//       // Determine if it's a static or dynamic filter
//       const isStaticFilter = index < filters.length
//       const filterToDelete = isStaticFilter
//         ? filters[index]
//         : dynamicFilters[index - filters.length]

//       const response = await deleteFilterByID(filterToDelete.id, dashboardId)

//       if (response.code === 201) {

//         toast.success('Filter deleted successfully')

//         // Remove the filter from the appropriate array
//         if (isStaticFilter) {
//           setFilters(filters.filter((_, i) => i !== index))
//         } else {
//           setDynamicFilters(dynamicFilters.filter((_, i) => i !== (index - filters.length)))
//         }
//       } else {

//         toast.error(response.message || 'Failed to delete filter')
//       }
//     } catch (error) {

//       console.error('Error deleting filter:', error)
//       toast.error('An error occurred while deleting the filter')
//     } finally {

//       handleCloseFilterMenu()
//     }
//   }

//   // function to manage 3-dot in dropdown - end

//   // select the card content- start

//   // const handleEditFilter = index => {
//   //   setEditMode(true) // Enable edit mode
//   //   setSelectedBlocks({}) // Clear previously selected blocks
//   //   handleCloseFilterMenu()
//   // }

//   // temp- start

// //   const handleEditFilter = index => {
// //     const selectedFilter = filters[index] // Get the filter based on the dropdown index
// //     setCurrentFilterID(selectedFilter.id) // Store the current FilterID
// //     setEditMode(true) // Enter edit mode
// //     setSelectedBlocks({}) // Clear previously selected blocks
// //     handleCloseFilterMenu()
// //   }

// //   const handleEditFilterDynamic = index => {
// //     const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
// //     setCurrentFilterID(selectedFilter.id) // Store the current FilterID
// //     setEditMode(true) // Enter edit mode
// //     setSelectedBlocks({}) // Clear previously selected blocks
// //     handleCloseFilterMenu()
// //   }

// // // Modify handleEditFilter
// // const handleEditFilter = async (index) => {
// //     const selectedFilter = filters[index] // Get the filter based on the dropdown index
// //     setCurrentFilterID(selectedFilter.id) // Store the current FilterID

// //     try {
// //       // Fetch the mapped datablock IDs for the selected filter
// //       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

// //       // Pre-select the mapped datablocks
// //       const updatedSelectedBlocks = {}
// //       tiles.forEach(tile => {
// //         if (tile.template.datablocks) {
// //           Object.values(tile.template.datablocks).forEach(datablock => {
// //             if (mappedDatablockIds.includes(datablock.id)) {
// //               if (!updatedSelectedBlocks[tile.i]) {
// //                 updatedSelectedBlocks[tile.i] = new Set()
// //               }
// //               updatedSelectedBlocks[tile.i].add(datablock.id)
// //             }
// //           })
// //         }
// //       })

// //       setSelectedBlocks(updatedSelectedBlocks)
// //       setEditMode(true) // Enter edit mode
// //     } catch (error) {
// //       console.error('Error fetching mapped datablocks:', error)
// //       toast.error('Failed to fetch mapped datablocks')
// //     } finally {
// //       handleCloseFilterMenu()
// //     }
// //   }

// //   // Modify handleEditFilterDynamic
// //   const handleEditFilterDynamic = async (index) => {
// //     const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
// //     setCurrentFilterID(selectedFilter.id) // Store the current FilterID

// //     try {
// //       // Fetch the mapped datablock IDs for the selected filter
// //       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

// //       // Pre-select the mapped datablocks
// //       const updatedSelectedBlocks = {}
// //       tiles.forEach(tile => {
// //         if (tile.template.datablocks) {
// //           Object.values(tile.template.datablocks).forEach(datablock => {
// //             if (mappedDatablockIds.includes(datablock.id)) {
// //               if (!updatedSelectedBlocks[tile.i]) {
// //                 updatedSelectedBlocks[tile.i] = new Set()
// //               }
// //               updatedSelectedBlocks[tile.i].add(datablock.id)
// //             }
// //           })
// //         }
// //       })

// //       setSelectedBlocks(updatedSelectedBlocks)
// //       setEditMode(true) // Enter edit mode
// //     } catch (error) {
// //       console.error('Error fetching mapped datablocks:', error)
// //       toast.error('Failed to fetch mapped datablocks')
// //     } finally {
// //       handleCloseFilterMenu()
// //     }
// //   }

// // handling null issue in Edit functionality in filters

// const handleEditFilter = async (index) => {
//     const selectedFilter = filters[index]
//     setCurrentFilterID(selectedFilter.id)

//     try {

//       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

//       // If mappedDatablockIds is null, initialize an empty array
//       const datablockIds = mappedDatablockIds || []

//       // Pre-select the mapped datablocks (if any)
//       const updatedSelectedBlocks = {}
//       tiles.forEach(tile => {
//         if (tile.template.datablocks) {
//           Object.values(tile.template.datablocks).forEach(datablock => {
//             if (datablockIds.includes(datablock.id)) {
//               if (!updatedSelectedBlocks[tile.i]) {
//                 updatedSelectedBlocks[tile.i] = new Set()
//               }
//               updatedSelectedBlocks[tile.i].add(datablock.id)
//             }
//           })
//         }
//       })

//       setSelectedBlocks(updatedSelectedBlocks)
//       setEditMode(true) // Enter edit mode
//     } catch (error) {
//       console.error('Error fetching mapped datablocks:', error)
//       toast.error('Failed to fetch mapped datablocks')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   const handleEditFilterDynamic = async (index) => {
//     const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
//     setCurrentFilterID(selectedFilter.id) // Store the current FilterID

//     try {
//       // Fetch the mapped datablock IDs for the selected filter
//       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

//       // If mappedDatablockIds is null, initialize an empty array
//       const datablockIds = mappedDatablockIds || []

//       // Pre-select the mapped datablocks (if any)
//       const updatedSelectedBlocks = {}
//       tiles.forEach(tile => {
//         if (tile.template.datablocks) {
//           Object.values(tile.template.datablocks).forEach(datablock => {
//             if (datablockIds.includes(datablock.id)) {
//               if (!updatedSelectedBlocks[tile.i]) {
//                 updatedSelectedBlocks[tile.i] = new Set()
//               }
//               updatedSelectedBlocks[tile.i].add(datablock.id)
//             }
//           })
//         }
//       })

//       setSelectedBlocks(updatedSelectedBlocks)
//       setEditMode(true) // Enter edit mode
//     } catch (error) {
//       console.error('Error fetching mapped datablocks:', error)
//       toast.error('Failed to fetch mapped datablocks')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditMode(false)
//     setSelectedBlocks({})
//     setCurrentFilterID(null) // Clear the current FilterID
//     handleCloseFilterMenu()
//   }

//   // temp- end

//   const handleBlockClick = (tileId, blockId) => {
//     setSelectedBlocks(prev => {
//       const updatedBlocks = { ...prev }
//       if (!updatedBlocks[tileId]) {
//         updatedBlocks[tileId] = new Set()
//       }

//       if (updatedBlocks[tileId].has(blockId)) {
//         updatedBlocks[tileId].delete(blockId)
//       } else {
//         updatedBlocks[tileId].add(blockId)
//       }

//       console.log('this is updated block-----', updatedBlocks)

//       return updatedBlocks
//     })
//   }

//   // select the card content- end

//   // const debug= ()=>{
//   //   console.log("part -1 ", filters)
//   //   console.log("part-2", dynamicFilters)
//   // }

//   // apply mapping click - filter mapping

//   return (
//     <BlankLayout>

// {/* making header sticky */}

// <Box sx={{
//       height: '100vh',
//       display: 'flex',
//       flexDirection: 'column'
//     }}>
//       {/* Sticky Header */}
//       <Box
//         sx={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 1000,
//           // backgroundColor: 'white',
//           boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//         }}
//       >

//       <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant='h4'>Dashboard</Typography>
//         <Box>
//           {editMode ? (
//             // <Button
//             //   variant='contained'
//             //   color='success'
//             //   onClick={() => {
//             //     setEditMode(false)
//             //     setSelectedBlocks({})
//             //   }}
//             // >
//             //   Apply
//             // </Button>

//             <Button
//               variant='contained'
//               color='success'
//               onClick={async () => {
//                 try {
//                   const dataBlockIds = {}

//                   // Iterate over selectedBlocks to collect datablock IDs
//                   Object.entries(selectedBlocks).forEach(([tileId, blockSet]) => {
//                     const tile = tiles.find(t => t.i === tileId)
//                     if (tile && tile.template.datablocks) {
//                       Object.values(tile.template.datablocks).forEach(datablock => {
//                         dataBlockIds[datablock.id] = blockSet.has(datablock.id)
//                       })
//                     }
//                   })

//                   // const dashboardId = router.query.dashboardId; // Get the DashboardID from routing
//                   const dashboardId = parseInt(router.query.dashboardId, 10)

//                   // const filterId = filters[0]?.id || 0;
//                   const filterId = currentFilterID

//                   // Call the API using createMapping
//                   await createMapping(dashboardId, filterId, dataBlockIds)

//                   setEditMode(false)
//                   setSelectedBlocks({})
//                   setCurrentFilterID(null) // Clear current filter ID
//                   toast.success('Mapping Created Successfully')
//                 } catch (error) {
//                   console.error(error)
//                   toast.error(error.message || 'Failed to create mapping.')
//                 }
//               }}
//             >
//               Apply
//             </Button>
//           ) : (
//             <>

// <Button variant='contained'  sx={{ marginRight: 2 }}  onClick={handleApplyFilter} disabled={editMode}>
//                 Apply Filter
//               </Button>

//               <Button variant='contained' onClick={openModal} sx={{ marginRight: 2 }} disabled={editMode}>
//                 Add Tile
//               </Button>
//               <Button
//                 variant='contained'
//                 color='secondary'
//                 onClick={handleSaveDashboard}
//                 sx={{ marginRight: 2 }}
//                 disabled={editMode}
//               >
//                 Save
//               </Button>
//               <Button variant='contained' color='primary' onClick={openFilterModal} disabled={editMode}>
//                 Add Filters
//               </Button>

//               {/* <Button variant='contained' color='primary' onClick={debug} disabled={editMode}>
//                 Debug
//               </Button>  */}
//             </>
//           )}
//         </Box>
//       </Box>

//       {/* Dynamic Filters */}

//       <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//   {filters.map((filter, index) => (
//     <Box
//       key={filter.id || index}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1,
//         padding: 1,
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//       }}
//     >
//       <FormControl
//         sx={{
//           minWidth: Math.max(150, filter.name.length * 12)
//         }}
//       >
//         <InputLabel>{filter.name}</InputLabel>
//         <Select
//           value={filterSelections[filter.name] || ''}
//           onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//           // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//           // onFocus={() => handleDropdownFocus(filter.name, 217)}
//           onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//           sx={{ bgcolor: 'white', maxWidth: '100%' }}
//         >
//           {dropdownOptions[filter.name]?.map(option => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//         <Button
//           sx={{
//             minWidth: 0,
//             padding: '4px',
//             marginLeft: '4px',
//             backgroundColor: '#f5f5f5',
//             borderRadius: '50%',
//             '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//           }}
//           onClick={e => handleFilterMenuClick(e, index)}
//         >
//           &#x2026; {/* 3-dot symbol */}
//         </Button>
//         <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//           <MenuItem onClick={() => handleEditFilter(index)}>Edit</MenuItem>
//           <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//           <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   ))}

//   {dynamicFilters.map((filter, index) => (
//     <Box
//       key={index}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1,
//         padding: 1,
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//       }}
//     >
//       <FormControl
//         sx={{
//           minWidth: Math.max(150, filter.name.length * 12)
//         }}
//       >
//         <InputLabel>{filter.name}</InputLabel>
//         <Select
//           value={filterSelections[filter.name] || ''}
//           onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//           // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//           onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//           sx={{ bgcolor: 'white', maxWidth: '100%' }}
//         >
//           {dropdownOptions[filter.name]?.map(option => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//         <Button
//           sx={{
//             minWidth: 0,
//             padding: '4px',
//             marginLeft: '4px',
//             backgroundColor: '#f5f5f5',
//             borderRadius: '50%',
//             '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//           }}
//           onClick={e => handleFilterMenuClick(e, index)}
//         >
//           &#x2026; {/* 3-dot symbol */}
//         </Button>
//         <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//           <MenuItem onClick={() => handleEditFilterDynamic(index)}>Edit</MenuItem>
//           <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//           <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   ))}
// </Box>

//  </Box>

//       <Box sx={{
//         flexGrow: 1,
//         overflow: 'auto',
//         padding: 2
//       }}>
//         <ResponsiveGridLayout
//           className='layout'
//           layouts={layouts}
//           breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//           cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
//           rowHeight={30}
//           width={1200}
//           compactType={null}
//           isBounded={false}
//           isDraggable={!editMode}
//           isResizable={!editMode}
//           onLayoutChange={handleLayoutChange}
//         >
//           {tiles.map(tile => (
//             <div key={tile.i} data-grid={tile}>
//               <Box
//                 onContextMenu={event => handleContextMenu(event, tile)}
//                 sx={{
//                   ...tile.template.styles.container,
//                   position: 'relative',
//                   pointerEvents: 'auto'
//                 }}
//               >
//                 {Object.entries(tile.template.datablocks || {}).map(([blockKey, datablock]) => (
//                   <Box
//                     key={datablock.id} // Use datablock.id as the unique key
//                     onClick={() => editMode && handleBlockClick(tile.i, datablock.id)} // Pass datablock.id
//                     onContextMenu={event => event.stopPropagation()} // Prevent right-click conflicts
//                     sx={{
//                       cursor: editMode ? 'pointer' : 'default',
//                       border: editMode && selectedBlocks[tile.i]?.has(datablock.id) ? '3px solid blue' : 'none',
//                       ...datablock.styles
//                     }}
//                   >
//                     {renderDataBlock(datablock, tile.i)}
//                   </Box>
//                 ))}
//               </Box>
//             </div>
//           ))}
//         </ResponsiveGridLayout>
//       </Box>

//       <Modal open={modalOpen} onClose={closeModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 600,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4,
//             maxHeight: '90vh',
//             overflowY: 'auto'
//           }}
//         >
//           <Typography variant='h6' component='h2' gutterBottom>
//             Select a Card
//           </Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//             {cards.map(card => (
//               <Box
//                 key={card.id}
//                 sx={{
//                   border: '3px solid #ddd',
//                   borderRadius: '8px',
//                   p: 2,
//                   cursor: 'pointer',
//                   flex: '1 1 200px',
//                   '&:hover': {
//                     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
//                   }
//                 }}
//                 onClick={() => handleAddTile(card)}
//               >
//                 <Box sx={{ mt: 2 }}>{Object.values(card.datablocks).map(datablock => renderDataBlock(datablock))}</Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Modal>

//       <Modal open={filterModalOpen} onClose={closeFilterModal}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4
//           }}
//         >
//           <Typography variant='h6' component='h2' gutterBottom>
//             Add Filters
//           </Typography>
//           <FormControl fullWidth sx={{ marginBottom: 3 }}>
//             <InputLabel>Select Filters</InputLabel>
//             <Select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
//               {filterOptions.map(option => (
//                 <MenuItem key={option.id} value={JSON.stringify(option)}>
//                   {option.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button variant='contained' color='primary' onClick={handleAddFilter}>
//               Import
//             </Button>
//             <Button variant='contained' color='secondary' onClick={closeFilterModal}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       <Menu
//         open={contextMenu !== null}
//         onClose={handleCloseContextMenu}
//         anchorReference='anchorPosition'
//         anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
//       >
//         <MenuItem onClick={handleEditTile}>Edit</MenuItem>
//         <MenuItem onClick={handleDeleteTile}>Delete</MenuItem>
//         <MenuItem onClick={handleFilterTile}>Filter</MenuItem>
//       </Menu>

//       </Box>

//     </BlankLayout>
//   )
// }

// export default DashboardPage











//  binding api for tile position











// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Modal from '@mui/material/Modal'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import CircularProgress from '@mui/material/CircularProgress'
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import { Responsive, WidthProvider } from 'react-grid-layout'
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import getAllTiles from 'src/api/tiles/getAllTiles'
// import getAllTemplateCards from 'src/api/dashboards/getAllTemplateCards'
// import createTile from 'src/api/dashboards/createTile'
// import getAllDataBlocks from 'src/api/tiles/getAllDataBlocks'
// import { saveTilePositions, loadTilePositions } from 'src/utils/tilePosition'
// import dynamic from 'next/dynamic'
// import deleteTile from 'src/api/tiles/deleteTiles'
// import getAllFiltersByDashboardID from 'src/api/filters/getAllFiltersByDashboardID'
// import getAllFilters from 'src/api/filters/getAllFilters'
// import getAllDropDownValues from 'src/api/filters/getAllDropDownValues'
// import createMapping from 'src/api/filters/createMapping'
// import deleteFilterByID from 'src/api/filters/deleteFilterByID'
// import getMappingOfDatablocksInTiles from 'src/api/filters/getMappingOfDatablocksInTiles'
// import { saveTilePositionsToAPI } from 'src/api/tiles/tilePositionsLoad'

// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const ResponsiveGridLayout = WidthProvider(Responsive)

// const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// const DashboardPage = () => {
//   const [layouts, setLayouts] = useState({ lg: [] })
//   const [tiles, setTiles] = useState([])
//   const [modalOpen, setModalOpen] = useState(false)
//   const [filterModalOpen, setFilterModalOpen] = useState(false)
//   const [selectedFilter, setSelectedFilter] = useState('')
//   const [contextMenu, setContextMenu] = useState(null)
//   const [selectedTile, setSelectedTile] = useState(null)
//   const [cards, setCards] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState([])
//   const [filterMenuAnchor, setFilterMenuAnchor] = useState(null)
//   const [filterMenuIndex, setFilterMenuIndex] = useState(null)

//   //  select the card content

//   const [editMode, setEditMode] = useState(false) // To track edit mode
//   const [selectedBlocks, setSelectedBlocks] = useState({}) // To track selected blocks per tile
//   const [filterSelections, setFilterSelections] = useState({}) // To track selected values for each filter

//   const [dynamicFilters, setDynamicFilters] = useState([])

//   const [filterOptions, setFilterOptions] = useState([])

//   const [dropdownOptions, setDropdownOptions] = useState({})

//   const [currentFilterID, setCurrentFilterID] = useState(null) // New state to track the current FilterID

//   const router = useRouter()
//   const { dashboardId, projectId } = router.query

//   //   dashboard name

//   const [dashboardName, setDashboardName] = useState('')





//   // apply filter- start





//   // useEffect(() => {
//   //   const fetchTilesAndDataBlocks = async () => {
//   //     if (!dashboardId) return
//   //     setLoading(true)
//   //     try {
//   //       const fetchedTiles = await getAllTiles(dashboardId)
//   //       const savedLayout = loadTilePositions(dashboardId)

//   //       const tilesWithDataBlocks = await Promise.all(
//   //         fetchedTiles.map(async (tile, index) => {
//   //           // Pass empty filters object for initial load
//   //           const datablocks = await getAllDataBlocks(tile.ID, {})
//   //           console.log('this is all datablocks----', datablocks)

//   //           return {
//   //             i: `tile-${index + 1}`,
//   //             x: parseInt(savedLayout?.[index]?.x || tile.Layout.x),
//   //             y: parseInt(savedLayout?.[index]?.y || tile.Layout.y),
//   //             w: parseInt(savedLayout?.[index]?.w || tile.Layout.w),
//   //             h: parseInt(savedLayout?.[index]?.h || tile.Layout.h),
//   //             minW: tile.Layout.minW,
//   //             minH: tile.Layout.minH,
//   //             maxW: tile.Layout.maxW,
//   //             maxH: tile.Layout.maxH,
//   //             template: {
//   //               id: tile.ID,
//   //               url: tile.Url,
//   //               styles: tile.Styles,
//   //               datablocks: datablocks
//   //             }
//   //           }
//   //         })
//   //       )

//   //       setTiles(tilesWithDataBlocks)
//   //       setLayouts({ lg: tilesWithDataBlocks })
//   //     } catch (error) {
//   //       console.error('Error fetching tiles, data blocks, or filters:', error)
//   //     } finally {
//   //       setLoading(false)
//   //     }
//   //   }

//   //   fetchTilesAndDataBlocks()
//   // }, [dashboardId])




//   // temp- start





// //   useEffect(() => {
// //       const fetchTilesAndDataBlocks = async () => {
// //         if (!dashboardId) return
// //         setLoading(true)
// //         try {
// //           // const fetchedTiles = await getAllTiles(dashboardId)
// //           const response = await getAllTiles(dashboardId)
// //           setDashboardName(response.dashboard.Name);     // setting dashboard name
// //           // console.log("Task-1--", response)

// //           const fetchedTiles = response.tiles

// //           // console.log("Task-2---", fetchedTiles)

// //           const savedLayout = loadTilePositions(dashboardId)

// //           const tilesWithDataBlocks = await Promise.all(
// //             fetchedTiles.map(async (tile, index) => {
// //               // Pass empty filters object for initial load
// //               const datablocks = await getAllDataBlocks(tile.ID, {})

// //               // Use saved layout if available, otherwise fall back to tile.Layout
// //               const savedTileLayout = savedLayout?.[index];

// //               return {
// //                 i: `tile-${index + 1}`,
// //                 x: parseInt(savedTileLayout?.x || tile.Layout.x),
// //                 y: parseInt(savedTileLayout?.y || tile.Layout.y),
// //                 w: parseInt(savedTileLayout?.w || tile.Layout.w),
// //                 h: parseInt(savedTileLayout?.h || tile.Layout.h),
// //                 minW: parseInt(tile.Layout.minW),
// //                 minH: parseInt(tile.Layout.minH),
// //                 maxW: parseInt(tile.Layout.maxW),
// //                 maxH: parseInt(tile.Layout.maxH),
// //                 template: {
// //                   id: tile.ID,
// //                   url: tile.Url,
// //                   styles: tile.Styles,
// //                   datablocks: datablocks
// //                 }
// //               }
// //             })
// //           )

// //           // console.log("Task-3---", tilesWithDataBlocks)

// //           setTiles(tilesWithDataBlocks)
// //           setLayouts({ lg: tilesWithDataBlocks })
// //         } catch (error) {
// //           console.error('Error fetching tiles, data blocks, or filters:', error)
// //         } finally {
// //           setLoading(false)
// //         }
// //       }

// //       fetchTilesAndDataBlocks()
// //     }, [dashboardId])





//   // final code to laod the tile position by api






// //   useEffect(() => {
// //     const fetchTilesAndDataBlocks = async () => {
// //       if (!dashboardId) return
// //       setLoading(true)
// //       try {
// //         const response = await getAllTiles(dashboardId)
// //         console.log("This is my get all tiles response -----", response)
// //         setDashboardName(response.dashboard.Name)

// //         // Get the saved configurations from the response
// //         const savedConfigs = response.dashboard.Configs || []

// //         // Map of saved configurations by tile index
// //         const configMap = {}
// //         savedConfigs.forEach(config => {
// //           // Extract tile index from the i property (e.g., "tile-1" -> 1)
// //           const tileIndex = parseInt(config.i.split('-')[1])
// //           if (!isNaN(tileIndex)) {
// //             configMap[tileIndex] = config
// //           }
// //         })

// //         const fetchedTiles = response.tiles

// //         const tilesWithDataBlocks = await Promise.all(
// //           fetchedTiles.map(async (tile, index) => {
// //             // Pass empty filters object for initial load
// //             const datablocks = await getAllDataBlocks(tile.ID, {})

// //             // Use the saved configuration from the dashboard if available
// //             // Otherwise fall back to the tile's default layout
// //             const tileConfig = configMap[index + 1] // +1 because configs are 1-indexed

// //             return {
// //               i: `tile-${index + 1}`,
// //               x: tileConfig ? parseInt(tileConfig.x) : parseInt(tile.Layout.x),
// //               y: tileConfig ? parseInt(tileConfig.y) : parseInt(tile.Layout.y),
// //               w: tileConfig ? parseInt(tileConfig.w) : parseInt(tile.Layout.w),
// //               h: tileConfig ? parseInt(tileConfig.h) : parseInt(tile.Layout.h),
// //               minW: parseInt(tile.Layout.minW),
// //               minH: parseInt(tile.Layout.minH),
// //               maxW: parseInt(tile.Layout.maxW),
// //               maxH: parseInt(tile.Layout.maxH),
// //               static: tileConfig ? tileConfig.static : false,
// //               template: {
// //                 id: tile.ID,
// //                 url: tile.Url,
// //                 styles: tile.Styles,
// //                 datablocks: datablocks
// //               }
// //             }
// //           })
// //         )

// //         setTiles(tilesWithDataBlocks)
// //         setLayouts({ lg: tilesWithDataBlocks })
// //       } catch (error) {
// //         console.error('Error fetching tiles, data blocks, or filters:', error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchTilesAndDataBlocks()
// //   }, [dashboardId])






// useEffect(() => {
//     const fetchTilesAndDataBlocks = async () => {
//       if (!dashboardId) return
//       setLoading(true)
//       try {
//         // Get all tiles and dashboard data from API
//         const response = await getAllTiles(dashboardId)
//         setDashboardName(response.dashboard.Name)
  
//         const fetchedTiles = response.tiles
//         // Get saved configurations from the response
//         const savedConfigs = response.dashboard.Configs || []
        
//         // Create a mapping of tile configurations by their 'i' identifier
//         const configMap = {}
//         savedConfigs.forEach(config => {
//           configMap[config.i] = config
//         })
  
//         const tilesWithDataBlocks = await Promise.all(
//           fetchedTiles.map(async (tile, index) => {
//             // Create the tile identifier that matches the saved config format
//             const tileId = `tile-${index + 1}`
//             // Get this tile's saved configuration or use default if not found
//             const tileConfig = configMap[tileId]
            
//             // Pass empty filters object for initial load
//             const datablocks = await getAllDataBlocks(tile.ID, {})
  
//             return {
//               i: tileId,
//               // Use the saved config values if available, otherwise fall back to defaults
//               x: tileConfig ? parseInt(tileConfig.x) : parseInt(tile.Layout.x),
//               y: tileConfig ? parseInt(tileConfig.y) : parseInt(tile.Layout.y),
//               w: tileConfig ? parseInt(tileConfig.w) : parseInt(tile.Layout.w),
//               h: tileConfig ? parseInt(tileConfig.h) : parseInt(tile.Layout.h),
//               // Also preserve these constraints from either source
//               minW: tileConfig ? parseInt(tileConfig.minW) : parseInt(tile.Layout.minW),
//               minH: tileConfig ? parseInt(tileConfig.minH) : parseInt(tile.Layout.minH),
//               maxW: tileConfig ? parseInt(tileConfig.maxW) : parseInt(tile.Layout.maxW),
//               maxH: tileConfig ? parseInt(tileConfig.maxH) : parseInt(tile.Layout.maxH),
//               // Preserve static state if set
//               static: tileConfig ? tileConfig.static : false,
//               template: {
//                 id: tile.ID,
//                 url: tile.Url,
//                 styles: tile.Styles,
//                 datablocks: datablocks
//               }
//             }
//           })
//         )
  
//         setTiles(tilesWithDataBlocks)
//         setLayouts({ lg: tilesWithDataBlocks })
//       } catch (error) {
//         console.error('Error fetching tiles, data blocks, or filters:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
  
//     fetchTilesAndDataBlocks()
//   }, [dashboardId])






//   // temp- end





//   const handleApplyFilter = async () => {
//     try {
//       setLoading(true)
//       // Create a new array to store updated tiles
//       const updatedTiles = await Promise.all(
//         tiles.map(async tile => {
//           // Get the selected filter values
//           const filterPayload = {}
//           Object.entries(filterSelections).forEach(([filterName, selectedValue]) => {
//             // Find the filter ID based on the filter name
//             const filter = [...filters, ...dynamicFilters].find(f => f.name === filterName)
//             if (filter && selectedValue) {
//               filterPayload[filter.id] = [selectedValue.toString()]
//             }
//           })

//           // Fetch new datablocks with filter values
//           const newDatablocks = await getAllDataBlocks(tile.template.id, filterPayload)

//           // Return updated tile with new datablocks
//           return {
//             ...tile,
//             template: {
//               ...tile.template,
//               datablocks: newDatablocks
//             }
//           }
//         })
//       )

//       setTiles(updatedTiles)
//     } catch (error) {
//       console.error('Error applying filters:', error)
//       toast.error('Failed to apply filters')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // apply filter- end




//   // get all filters by dasboard id




//   useEffect(() => {
//     const fetchFilters = async () => {
//       if (!dashboardId) return
//       try {
//         const fetchedFilters = await getAllFiltersByDashboardID(dashboardId)
//         // console.log("This is the complete filters-----", fetchedFilters)
//         const formattedFilters = fetchedFilters.map(filter => ({
//           id: filter.ID,
//           columnId: filter.ColumnID,
//           name: filter.Name
//         }))
//         setFilters(formattedFilters)
//         // console.log("this is the formatted filters---",formattedFilters )
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [dashboardId])




//   // get all filters in dropdown option




//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const data = await getAllFilters()
//         // console.log("this is the get all filters----",data)
//         setFilterOptions(data.Data.map(filter => ({ id: filter.ID, name: filter.Name, columnID: filter.ColumnID })))
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [])

//   // api binding for getting dropdown values

//   const handleDropdownFocus = async (filterName, columnId) => {
//     if (!dropdownOptions[filterName]) {
//       // Fetch only if not already fetched
//       const options = await getAllDropDownValues(columnId)
//       setDropdownOptions(prev => ({ ...prev, [filterName]: options }))
//     }
//   }

//   const openModal = async () => {
//     setModalOpen(true)
//     const fetchedCards = await getAllTemplateCards()
//     setCards(fetchedCards)
//   }

//   const closeModal = () => setModalOpen(false)

//   const openFilterModal = () => setFilterModalOpen(true)

//   const closeFilterModal = () => {
//     setFilterModalOpen(false)
//     setSelectedFilter('')
//   }

//   // final changes

//   const handleAddFilter = () => {
//     if (!selectedFilter) return

//     const parsedFilter = JSON.parse(selectedFilter)

//     // Check if the filter is already present in the filters or dynamicFilters
//     const filterExists = [...filters, ...dynamicFilters].some(
//       existingFilter => existingFilter.name === parsedFilter.name
//     )

//     if (filterExists) {
//       alert(`Filter "${parsedFilter.name}" already exists on the dashboard.`)
//       return
//     }

//     setDynamicFilters(prev => [
//       ...prev,
//       { id: parsedFilter.id, name: parsedFilter.name, columnID: parsedFilter.columnID }
//     ])

//     setSelectedFilter('')
//     closeFilterModal()
//   }

//   //   Adding the tile to dashboard - start

//   const handleAddTile = async card => {
//     try {
//       const tileData = await createTile(card.id, dashboardId, projectId)
//       const datablocks = await getAllDataBlocks(tileData.Data[0].id)

//       // Find the highest y-coordinate among existing tiles
//       let maxY = 0
//       tiles.forEach(tile => {
//         const bottomY = tile.y + tile.h
//         if (bottomY > maxY) {
//           maxY = bottomY
//         }
//       })

//       // Place the new tile at the next row
//       const newTile = {
//         i: `tile-${tiles.length + 1}`,
//         x: 0, // Start from the left
//         y: maxY, // Place below all existing tiles
//         w: tileData.Data[0].layout.w,
//         h: tileData.Data[0].layout.h,
//         minW: tileData.Data[0].layout.minW,
//         minH: tileData.Data[0].layout.minH,
//         maxW: tileData.Data[0].layout.maxW,
//         maxH: tileData.Data[0].layout.maxH,
//         template: {
//           ...tileData.Data[0],
//           datablocks: datablocks
//         }
//       }

//       setTiles([...tiles, newTile])
//       closeModal()
//     } catch (error) {
//       console.error('Failed to add tile:', error)
//       closeModal()
//     }
//   }

//   //   Adding the tile to dashboard - end

//   const handleLayoutChange = layout => {
//     clearTimeout(window.layoutChangeTimeout)
//     window.layoutChangeTimeout = setTimeout(() => {
//       const updatedTiles = tiles.map(tile => {
//         const updatedLayout = layout.find(l => l.i === tile.i)
//         return { ...tile, ...updatedLayout }
//       })

//       setLayouts({ lg: layout })
//       setTiles(updatedTiles)
//     }, 300)
//   }

//   const handleContextMenu = (event, tile) => {
//     event.preventDefault()
//     setSelectedTile(tile)
//     setContextMenu(
//       contextMenu === null
//         ? {
//             mouseX: event.clientX + 2,
//             mouseY: event.clientY - 6
//           }
//         : null
//     )
//   }

//   const handleCloseContextMenu = () => {
//     setContextMenu(null)
//   }

//   const handleDeleteTile = async () => {
//     try {
//       const response = await deleteTile(selectedTile.template.id)

//       if (response?.code === 200) {
//         console.log('Tile deleted successfully:', response.message)
//         setTiles(tiles.filter(tile => tile.i !== selectedTile.i))
//       }
//     } catch (error) {
//       console.error('Failed to delete tile:', error)
//     } finally {
//       handleCloseContextMenu()
//     }
//   }

//   const handleEditTile = () => {
//     router.push(`${router.asPath}editor?tileId=${selectedTile.template.id}`)
//     handleCloseContextMenu()
//   }

//   const handleFilterTile = () => {
//     console.log('Filter tile:', selectedTile)
//     handleCloseContextMenu()
//   }

//   //   const handleSaveDashboard = () => {
//   //     try {
//   //       saveTilePositions(dashboardId, layouts.lg)
//   //       console.log('Dashboard saved!')
//   //     } catch (error) {
//   //       console.error('Error saving dashboard:', error)
//   //     }
//   //   }

//   // temp- start

//   const handleSaveDashboard = async () => {
//     try {
//       // First, save to localStorage as a fallback
//       saveTilePositions(dashboardId, layouts.lg)

//       // Format the positions correctly to ensure all properties are captured
//       const positionsToSave = layouts.lg.map(tile => {
//         // Ensure we capture all necessary properties for each tile
//         return {
//           i: tile.i,
//           x: parseInt(tile.x, 10),
//           y: parseInt(tile.y, 10),
//           w: parseInt(tile.w, 10),
//           h: parseInt(tile.h, 10),
//           minW: tile.minW,
//           minH: tile.minH,
//           maxW: tile.maxW,
//           maxH: tile.maxH,
//           // Include any additional properties needed for proper rendering
//           static: tile.static || false
//         }
//       })

//       // Call the API to save positions
//       await saveTilePositionsToAPI(dashboardId, positionsToSave)

//       toast.success('Dashboard layout saved successfully!')
//       console.log('Dashboard saved to API!')
//     } catch (error) {
//       console.error('Error saving dashboard:', error)
//       toast.error('Failed to save dashboard layout. Please try again.')
//     }
//   }

//   // temp- end

//   const getDataBlockValue = datablock => {
//     const value = datablock?.data?.value || datablock.data
//     // console.log("this is my datablock id---", datablock)
//     if (typeof value === 'object' && value !== null) {
//       return JSON.stringify(value)
//     }
//     return value || 'Null'
//   }

//   // added the combo chart

//   const renderDataBlock = (datablock, tileId) => {
//     if (loading) return <CircularProgress />

//     // Highlight the datablock if it's selected in edit mode
//     const isSelected = editMode && selectedBlocks[tileId]?.has(datablock.id)

//     // Handling table rendering
//     if (datablock.type === 'table') {
//       const containerStyles = {
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '0',
//         position: 'relative'
//       }

//       const scrollWrapperStyles = {
//         flex: 1,
//         overflow: 'auto',
//         maxHeight: '290px',
//         width: '100%',
//         position: 'relative'
//       }

//       const tableStyles = {
//         width: '100%',
//         borderCollapse: 'collapse',
//         tableLayout: 'fixed',
//         ...datablock.options.styles.table
//       }

//       const headerStyles = {
//         padding: '12px 16px',
//         backgroundColor: '#f4f4f4',
//         fontWeight: 'bold',
//         fontSize: '14px',
//         textAlign: 'left',
//         position: 'sticky',
//         top: 0,
//         zIndex: 2,
//         borderBottom: '2px solid #ddd',
//         ...datablock.options.styles.header
//       }

//       const rowStyles = {
//         padding: '10px 16px',
//         borderBottom: '1px solid #ddd',
//         fontSize: '13px',
//         whiteSpace: 'nowrap',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         ...datablock.options.styles.row
//       }

//       const cellStyles = {
//         padding: '10px 16px',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap'
//       }

//       return (
//         <Box sx={containerStyles}>
//           <Box sx={scrollWrapperStyles}>
//             <table style={tableStyles}>
//               <thead>
//                 <tr>
//                   {datablock.options.headers.map((header, index) => (
//                     <th key={index} style={headerStyles}>
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {datablock.options.rows.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {row.map((cell, cellIndex) => (
//                       <td key={cellIndex} style={{ ...rowStyles, ...cellStyles }}>
//                         {cell}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Box>
//         </Box>
//       )
//     }

//     // Handle combo chart separately - start

//     if (datablock.type === 'combo') {
//       if (!datablock.options || !datablock.series) {
//         return <Typography>Error: Combo chart data is missing</Typography>
//       }

//       const chartOptions = {
//         ...datablock.options,
//         yaxis: datablock.options.yaxis || [{ title: { text: 'Y Axis' } }], // Ensure yaxis exists
//         chart: {
//           ...datablock.options.chart,
//           type: 'line' // Default to line if type is missing
//         }
//       }

//       return (
//         <DynamicChart
//           key={datablock.datablock_id}
//           options={chartOptions}
//           series={datablock.series || []}
//           type='line' // Ensure valid chart type
//           width={datablock.options.chart?.width || '100%'}
//         />
//       )
//     }

//     // Handle combo chart separately - end

//     // Handling all other chart types

//     if (datablock.type !== 'text') {
//       return (
//         <DynamicChart
//           key={datablock.datablock_id}
//           options={datablock.options}
//           series={datablock.series}
//           type={datablock.type}
//           width={datablock.options.chart.width}
//         />
//       )
//     }

//     // Handling text type datablocks

//     return (
//       <Typography
//         key={datablock.datablock_id}
//         sx={{
//           ...datablock.styles,
//           border: isSelected ? '0px solid blue' : 'none',
//           cursor: editMode ? 'pointer' : 'default'
//         }}
//       >
//         {getDataBlockValue(datablock)}
//       </Typography>
//     )
//   }

//   // function to manage 3-dot in dropdown- start

//   const handleFilterMenuClick = (event, index) => {
//     setFilterMenuAnchor(event.currentTarget) // Set anchor to clicked button
//     setFilterMenuIndex(index) // Set the index of the filter
//   }

//   const handleCloseFilterMenu = () => {
//     setFilterMenuAnchor(null)
//     setFilterMenuIndex(null)
//   }

//   const handleDeleteFilter = async index => {
//     try {
//       // Determine if it's a static or dynamic filter
//       const isStaticFilter = index < filters.length
//       const filterToDelete = isStaticFilter ? filters[index] : dynamicFilters[index - filters.length]

//       const response = await deleteFilterByID(filterToDelete.id, dashboardId)

//       if (response.code === 201) {
//         toast.success('Filter deleted successfully')

//         // Remove the filter from the appropriate array
//         if (isStaticFilter) {
//           setFilters(filters.filter((_, i) => i !== index))
//         } else {
//           setDynamicFilters(dynamicFilters.filter((_, i) => i !== index - filters.length))
//         }
//       } else {
//         toast.error(response.message || 'Failed to delete filter')
//       }
//     } catch (error) {
//       console.error('Error deleting filter:', error)
//       toast.error('An error occurred while deleting the filter')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   // function to manage 3-dot in dropdown - end

//   // handling null issue in Edit functionality in filters

//   const handleEditFilter = async index => {
//     const selectedFilter = filters[index]
//     setCurrentFilterID(selectedFilter.id)

//     try {
//       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

//       // If mappedDatablockIds is null, initialize an empty array
//       const datablockIds = mappedDatablockIds || []

//       // Pre-select the mapped datablocks (if any)
//       const updatedSelectedBlocks = {}
//       tiles.forEach(tile => {
//         if (tile.template.datablocks) {
//           Object.values(tile.template.datablocks).forEach(datablock => {
//             if (datablockIds.includes(datablock.id)) {
//               if (!updatedSelectedBlocks[tile.i]) {
//                 updatedSelectedBlocks[tile.i] = new Set()
//               }
//               updatedSelectedBlocks[tile.i].add(datablock.id)
//             }
//           })
//         }
//       })

//       setSelectedBlocks(updatedSelectedBlocks)
//       setEditMode(true) // Enter edit mode
//     } catch (error) {
//       console.error('Error fetching mapped datablocks:', error)
//       toast.error('Failed to fetch mapped datablocks')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   const handleEditFilterDynamic = async index => {
//     const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
//     setCurrentFilterID(selectedFilter.id) // Store the current FilterID

//     try {
//       // Fetch the mapped datablock IDs for the selected filter
//       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

//       // If mappedDatablockIds is null, initialize an empty array
//       const datablockIds = mappedDatablockIds || []

//       // Pre-select the mapped datablocks (if any)
//       const updatedSelectedBlocks = {}
//       tiles.forEach(tile => {
//         if (tile.template.datablocks) {
//           Object.values(tile.template.datablocks).forEach(datablock => {
//             if (datablockIds.includes(datablock.id)) {
//               if (!updatedSelectedBlocks[tile.i]) {
//                 updatedSelectedBlocks[tile.i] = new Set()
//               }
//               updatedSelectedBlocks[tile.i].add(datablock.id)
//             }
//           })
//         }
//       })

//       setSelectedBlocks(updatedSelectedBlocks)
//       setEditMode(true) // Enter edit mode
//     } catch (error) {
//       console.error('Error fetching mapped datablocks:', error)
//       toast.error('Failed to fetch mapped datablocks')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditMode(false)
//     setSelectedBlocks({})
//     setCurrentFilterID(null) // Clear the current FilterID
//     handleCloseFilterMenu()
//   }

//   // temp- end

//   const handleBlockClick = (tileId, blockId) => {
//     setSelectedBlocks(prev => {
//       const updatedBlocks = { ...prev }
//       if (!updatedBlocks[tileId]) {
//         updatedBlocks[tileId] = new Set()
//       }

//       if (updatedBlocks[tileId].has(blockId)) {
//         updatedBlocks[tileId].delete(blockId)
//       } else {
//         updatedBlocks[tileId].add(blockId)
//       }

//       console.log('this is updated block-----', updatedBlocks)

//       return updatedBlocks
//     })
//   }

//   // select the card content- end

//   return (
//     <BlankLayout>
//       {/* making header sticky */}

//       <Box
//         sx={{
//           height: '100vh',
//           display: 'flex',
//           flexDirection: 'column'
//         }}
//       >
//         {/* Sticky Header */}
//         <Box
//           sx={{
//             position: 'sticky',
//             top: 0,
//             zIndex: 1000,
//             // backgroundColor: 'white',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//           }}
//         >
//           <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant='h4'> {dashboardName || 'Dashboard'}</Typography>
//             <Box>
//               {editMode ? (
//                 <Button
//                   variant='contained'
//                   color='success'
//                   onClick={async () => {
//                     try {
//                       const dataBlockIds = {}

//                       // Iterate over selectedBlocks to collect datablock IDs
//                       Object.entries(selectedBlocks).forEach(([tileId, blockSet]) => {
//                         const tile = tiles.find(t => t.i === tileId)
//                         if (tile && tile.template.datablocks) {
//                           Object.values(tile.template.datablocks).forEach(datablock => {
//                             dataBlockIds[datablock.id] = blockSet.has(datablock.id)
//                           })
//                         }
//                       })

//                       // const dashboardId = router.query.dashboardId; // Get the DashboardID from routing
//                       const dashboardId = parseInt(router.query.dashboardId, 10)

//                       // const filterId = filters[0]?.id || 0;
//                       const filterId = currentFilterID

//                       // Call the API using createMapping
//                       await createMapping(dashboardId, filterId, dataBlockIds)

//                       setEditMode(false)
//                       setSelectedBlocks({})
//                       setCurrentFilterID(null) // Clear current filter ID
//                       toast.success('Mapping Created Successfully')
//                     } catch (error) {
//                       console.error(error)
//                       toast.error(error.message || 'Failed to create mapping.')
//                     }
//                   }}
//                 >
//                   Apply
//                 </Button>
//               ) : (
//                 <>
//                   <Button variant='contained' sx={{ marginRight: 2 }} onClick={handleApplyFilter} disabled={editMode}>
//                     Apply Filter
//                   </Button>

//                   <Button variant='contained' onClick={openModal} sx={{ marginRight: 2 }} disabled={editMode}>
//                     Add Tile
//                   </Button>
//                   <Button
//                     variant='contained'
//                     color='secondary'
//                     onClick={handleSaveDashboard}
//                     sx={{ marginRight: 2 }}
//                     disabled={editMode}
//                   >
//                     Save
//                   </Button>
//                   <Button variant='contained' color='primary' onClick={openFilterModal} disabled={editMode}>
//                     Add Filters
//                   </Button>

//                   {/* <Button variant='contained' color='primary' onClick={debug} disabled={editMode}>
//                 Debug
//               </Button>  */}
//                 </>
//               )}
//             </Box>
//           </Box>

//           {/* Dynamic Filters */}

//           <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//             {filters.map((filter, index) => (
//               <Box
//                 key={filter.id || index}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   padding: 1,
//                   border: '1px solid #ddd',
//                   borderRadius: '8px',
//                   '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//                 }}
//               >
//                 <FormControl
//                   sx={{
//                     minWidth: Math.max(150, filter.name.length * 12)
//                   }}
//                 >
//                   <InputLabel>{filter.name}</InputLabel>
//                   <Select
//                     value={filterSelections[filter.name] || ''}
//                     onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//                     // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//                     // onFocus={() => handleDropdownFocus(filter.name, 217)}
//                     onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//                     sx={{ bgcolor: 'white', maxWidth: '100%' }}
//                   >
//                     {dropdownOptions[filter.name]?.map(option => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//                   <Button
//                     sx={{
//                       minWidth: 0,
//                       padding: '4px',
//                       marginLeft: '4px',
//                       backgroundColor: '#f5f5f5',
//                       borderRadius: '50%',
//                       '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//                     }}
//                     onClick={e => handleFilterMenuClick(e, index)}
//                   >
//                     &#x2026; {/* 3-dot symbol */}
//                   </Button>
//                   <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//                     <MenuItem onClick={() => handleEditFilter(index)}>Edit</MenuItem>
//                     <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//                     <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//                   </Menu>
//                 </Box>
//               </Box>
//             ))}

//             {dynamicFilters.map((filter, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   padding: 1,
//                   border: '1px solid #ddd',
//                   borderRadius: '8px',
//                   '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//                 }}
//               >
//                 <FormControl
//                   sx={{
//                     minWidth: Math.max(150, filter.name.length * 12)
//                   }}
//                 >
//                   <InputLabel>{filter.name}</InputLabel>
//                   <Select
//                     value={filterSelections[filter.name] || ''}
//                     onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//                     // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//                     onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//                     sx={{ bgcolor: 'white', maxWidth: '100%' }}
//                   >
//                     {dropdownOptions[filter.name]?.map(option => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//                   <Button
//                     sx={{
//                       minWidth: 0,
//                       padding: '4px',
//                       marginLeft: '4px',
//                       backgroundColor: '#f5f5f5',
//                       borderRadius: '50%',
//                       '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//                     }}
//                     onClick={e => handleFilterMenuClick(e, index)}
//                   >
//                     &#x2026; {/* 3-dot symbol */}
//                   </Button>
//                   <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//                     <MenuItem onClick={() => handleEditFilterDynamic(index)}>Edit</MenuItem>
//                     <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//                     <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//                   </Menu>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             flexGrow: 1,
//             overflow: 'auto',
//             padding: 2
//           }}
//         >
//           <ResponsiveGridLayout
//             className='layout'
//             layouts={layouts}
//             breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//             cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
//             rowHeight={30}
//             width={1200}
//             compactType={null}
//             isBounded={false}
//             isDraggable={!editMode}
//             isResizable={!editMode}
//             onLayoutChange={handleLayoutChange}
//           >
//             {tiles.map(tile => (
//               <div key={tile.i} data-grid={tile}>
//                 <Box
//                   onContextMenu={event => handleContextMenu(event, tile)}
//                   sx={{
//                     ...tile.template.styles.container,
//                     position: 'relative',
//                     pointerEvents: 'auto'
//                   }}
//                 >
//                   {Object.entries(tile.template.datablocks || {}).map(([blockKey, datablock]) => (
//                     <Box
//                       key={datablock.id} // Use datablock.id as the unique key
//                       onClick={() => editMode && handleBlockClick(tile.i, datablock.id)} // Pass datablock.id
//                       onContextMenu={event => event.stopPropagation()} // Prevent right-click conflicts
//                       sx={{
//                         cursor: editMode ? 'pointer' : 'default',
//                         border: editMode && selectedBlocks[tile.i]?.has(datablock.id) ? '3px solid blue' : 'none',
//                         ...datablock.styles
//                       }}
//                     >
//                       {renderDataBlock(datablock, tile.i)}
//                     </Box>
//                   ))}
//                 </Box>
//               </div>
//             ))}
//           </ResponsiveGridLayout>
//         </Box>

//         <Modal open={modalOpen} onClose={closeModal}>
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: 600,
//               bgcolor: 'background.paper',
//               borderRadius: 2,
//               boxShadow: 24,
//               p: 4,
//               maxHeight: '90vh',
//               overflowY: 'auto'
//             }}
//           >
//             <Typography variant='h6' component='h2' gutterBottom>
//               Select a Card
//             </Typography>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//               {cards.map(card => (
//                 <Box
//                   key={card.id}
//                   sx={{
//                     border: '3px solid #ddd',
//                     borderRadius: '8px',
//                     p: 2,
//                     cursor: 'pointer',
//                     flex: '1 1 200px',
//                     '&:hover': {
//                       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
//                     }
//                   }}
//                   onClick={() => handleAddTile(card)}
//                 >
//                   <Box sx={{ mt: 2 }}>
//                     {Object.values(card.datablocks).map(datablock => renderDataBlock(datablock))}
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         </Modal>

//         <Modal open={filterModalOpen} onClose={closeFilterModal}>
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: 400,
//               bgcolor: 'background.paper',
//               borderRadius: 2,
//               boxShadow: 24,
//               p: 4
//             }}
//           >
//             <Typography variant='h6' component='h2' gutterBottom>
//               Add Filters
//             </Typography>
//             <FormControl fullWidth sx={{ marginBottom: 3 }}>
//               <InputLabel>Select Filters</InputLabel>
//               <Select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
//                 {filterOptions.map(option => (
//                   <MenuItem key={option.id} value={JSON.stringify(option)}>
//                     {option.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Button variant='contained' color='primary' onClick={handleAddFilter}>
//                 Import
//               </Button>
//               <Button variant='contained' color='secondary' onClick={closeFilterModal}>
//                 Cancel
//               </Button>
//             </Box>
//           </Box>
//         </Modal>

//         <Menu
//           open={contextMenu !== null}
//           onClose={handleCloseContextMenu}
//           anchorReference='anchorPosition'
//           anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
//         >
//           <MenuItem onClick={handleEditTile}>Edit</MenuItem>
//           <MenuItem onClick={handleDeleteTile}>Delete</MenuItem>
//           <MenuItem onClick={handleFilterTile}>Filter</MenuItem>
//         </Menu>
//       </Box>
//     </BlankLayout>
//   )
// }

// export default DashboardPage















//  final tile position api binding














// import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import { styled } from '@mui/material/styles'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Modal from '@mui/material/Modal'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import CircularProgress from '@mui/material/CircularProgress'
// import Select from '@mui/material/Select'
// import FormControl from '@mui/material/FormControl'
// import InputLabel from '@mui/material/InputLabel'
// import { Responsive, WidthProvider } from 'react-grid-layout'
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
// import BlankLayout from 'src/@core/layouts/BlankLayout'
// import getAllTiles from 'src/api/tiles/getAllTiles'
// import getAllTemplateCards from 'src/api/dashboards/getAllTemplateCards'
// import createTile from 'src/api/dashboards/createTile'
// import getAllDataBlocks from 'src/api/tiles/getAllDataBlocks'
// import { saveTilePositions, loadTilePositions } from 'src/utils/tilePosition'
// import dynamic from 'next/dynamic'
// import deleteTile from 'src/api/tiles/deleteTiles'
// import getAllFiltersByDashboardID from 'src/api/filters/getAllFiltersByDashboardID'
// import getAllFilters from 'src/api/filters/getAllFilters'
// import getAllDropDownValues from 'src/api/filters/getAllDropDownValues'
// import createMapping from 'src/api/filters/createMapping'
// import deleteFilterByID from 'src/api/filters/deleteFilterByID'
// import getMappingOfDatablocksInTiles from 'src/api/filters/getMappingOfDatablocksInTiles'
// import { saveTilePositionsToAPI } from 'src/api/tiles/tilePositionsLoad'

// import { toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// const ResponsiveGridLayout = WidthProvider(Responsive)

// const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// const DashboardPage = () => {
//   const [layouts, setLayouts] = useState({ lg: [] })
//   const [tiles, setTiles] = useState([])
//   const [modalOpen, setModalOpen] = useState(false)
//   const [filterModalOpen, setFilterModalOpen] = useState(false)
//   const [selectedFilter, setSelectedFilter] = useState('')
//   const [contextMenu, setContextMenu] = useState(null)
//   const [selectedTile, setSelectedTile] = useState(null)
//   const [cards, setCards] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filters, setFilters] = useState([])
//   const [filterMenuAnchor, setFilterMenuAnchor] = useState(null)
//   const [filterMenuIndex, setFilterMenuIndex] = useState(null)

//   //  select the card content

//   const [editMode, setEditMode] = useState(false) // To track edit mode
//   const [selectedBlocks, setSelectedBlocks] = useState({}) // To track selected blocks per tile
//   const [filterSelections, setFilterSelections] = useState({}) // To track selected values for each filter

//   const [dynamicFilters, setDynamicFilters] = useState([])

//   const [filterOptions, setFilterOptions] = useState([])

//   const [dropdownOptions, setDropdownOptions] = useState({})

//   const [currentFilterID, setCurrentFilterID] = useState(null) // New state to track the current FilterID

//   const router = useRouter()
//   const { dashboardId, projectId } = router.query

//   //   dashboard name

//   const [dashboardName, setDashboardName] = useState('')


// // Render tiles- start

// // useEffect(() => {
// //     const fetchTilesAndDataBlocks = async () => {
// //       if (!dashboardId) return
// //       setLoading(true)
// //       try {
// //         // Get all tiles and dashboard data from API
// //         const response = await getAllTiles(dashboardId)
// //         setDashboardName(response.dashboard.Name)
  
// //         const fetchedTiles = response.tiles
// //         // Get saved configurations from the response
// //         const savedConfigs = response.dashboard.Configs || []
        
// //         // Create a mapping of tile configurations by their 'i' identifier
// //         const configMap = {}
// //         savedConfigs.forEach(config => {
// //           configMap[config.i] = config
// //         })
  
// //         const tilesWithDataBlocks = await Promise.all(
// //           fetchedTiles.map(async (tile, index) => {
// //             // Create the tile identifier that matches the saved config format
// //             const tileId = `tile-${index + 1}`
// //             // Get this tile's saved configuration or use default if not found
// //             const tileConfig = configMap[tileId]
            
// //             // Pass empty filters object for initial load
// //             const datablocks = await getAllDataBlocks(tile.ID, {})
  
// //             return {
// //               i: tileId,
// //               // Use the saved config values if available, otherwise fall back to defaults
// //               x: tileConfig ? parseInt(tileConfig.x) : parseInt(tile.Layout.x),
// //               y: tileConfig ? parseInt(tileConfig.y) : parseInt(tile.Layout.y),
// //               w: tileConfig ? parseInt(tileConfig.w) : parseInt(tile.Layout.w),
// //               h: tileConfig ? parseInt(tileConfig.h) : parseInt(tile.Layout.h),
// //               // Also preserve these constraints from either source
// //               minW: tileConfig ? parseInt(tileConfig.minW) : parseInt(tile.Layout.minW),
// //               minH: tileConfig ? parseInt(tileConfig.minH) : parseInt(tile.Layout.minH),
// //               maxW: tileConfig ? parseInt(tileConfig.maxW) : parseInt(tile.Layout.maxW),
// //               maxH: tileConfig ? parseInt(tileConfig.maxH) : parseInt(tile.Layout.maxH),
// //               // Preserve static state if set
// //               static: tileConfig ? tileConfig.static : false,
// //               template: {
// //                 id: tile.ID,
// //                 url: tile.Url,
// //                 styles: tile.Styles,
// //                 datablocks: datablocks
// //               }
// //             }
// //           })
// //         )
  
// //         setTiles(tilesWithDataBlocks)
// //         setLayouts({ lg: tilesWithDataBlocks })
// //       } catch (error) {
// //         console.error('Error fetching tiles, data blocks, or filters:', error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }
  
// //     fetchTilesAndDataBlocks()
// //   }, [dashboardId])





// useEffect(() => {
//     const fetchTilesAndDataBlocks = async () => {
//       if (!dashboardId) return;
//       setLoading(true);
//       try {
//         // Get all tiles and dashboard data from API
//         const response = await getAllTiles(dashboardId);
//         setDashboardName(response.dashboard.Name);
  
//         const fetchedTiles = response.tiles;
//         // Get saved configurations from the response
//         const savedConfigs = response.dashboard.Configs || [];
        
//         // Create a mapping of tile configurations by their actual tile ID
//         const configMap = {};
//         savedConfigs.forEach(config => {
//           // If we have the tileId property (new format)
//           if (config.tileId) {
//             configMap[config.tileId] = config;
//           } 
//           // Fallback for legacy format that uses 'i' property
//           else {
//             configMap[config.i] = config;
//           }
//         });
  
//         const tilesWithDataBlocks = await Promise.all(
//           fetchedTiles.map(async (tile, index) => {
//             // Create the tile identifier for UI
//             const tileId = `tile-${index + 1}`;
            
//             // Get this tile's saved configuration using its actual ID or fall back to the index-based ID
//             const tileConfig = configMap[tile.ID] || configMap[tileId];
            
//             // Pass empty filters object for initial load
//             const datablocks = await getAllDataBlocks(tile.ID, {});
  
//             return {
//               i: tileId,
//               // Use the saved config values if available, otherwise fall back to defaults
//               x: tileConfig ? parseInt(tileConfig.x) : parseInt(tile.Layout.x),
//               y: tileConfig ? parseInt(tileConfig.y) : parseInt(tile.Layout.y),
//               w: tileConfig ? parseInt(tileConfig.w) : parseInt(tile.Layout.w),
//               h: tileConfig ? parseInt(tileConfig.h) : parseInt(tile.Layout.h),
//               // Also preserve these constraints from either source
//               minW: tileConfig ? parseInt(tileConfig.minW) : parseInt(tile.Layout.minW),
//               minH: tileConfig ? parseInt(tileConfig.minH) : parseInt(tile.Layout.minH),
//               maxW: tileConfig ? parseInt(tileConfig.maxW) : parseInt(tile.Layout.maxW),
//               maxH: tileConfig ? parseInt(tileConfig.maxH) : parseInt(tile.Layout.maxH),
//               // Preserve static state if set
//               static: tileConfig ? tileConfig.static : false,
//               template: {
//                 id: tile.ID,
//                 url: tile.Url,
//                 styles: tile.Styles,
//                 datablocks: datablocks
//               }
//             };
//           })
//         );
  
//         setTiles(tilesWithDataBlocks);
//         setLayouts({ lg: tilesWithDataBlocks });
//       } catch (error) {
//         console.error('Error fetching tiles, data blocks, or filters:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchTilesAndDataBlocks();
//   }, [dashboardId]);



//   // Render tiles - end





//   const handleApplyFilter = async () => {
//     try {
//       setLoading(true)
//       // Create a new array to store updated tiles
//       const updatedTiles = await Promise.all(
//         tiles.map(async tile => {
//           // Get the selected filter values
//           const filterPayload = {}
//           Object.entries(filterSelections).forEach(([filterName, selectedValue]) => {
//             // Find the filter ID based on the filter name
//             const filter = [...filters, ...dynamicFilters].find(f => f.name === filterName)
//             if (filter && selectedValue) {
//               filterPayload[filter.id] = [selectedValue.toString()]
//             }
//           })

//           // Fetch new datablocks with filter values
//           const newDatablocks = await getAllDataBlocks(tile.template.id, filterPayload)

//           // Return updated tile with new datablocks
//           return {
//             ...tile,
//             template: {
//               ...tile.template,
//               datablocks: newDatablocks
//             }
//           }
//         })
//       )

//       setTiles(updatedTiles)
//     } catch (error) {
//       console.error('Error applying filters:', error)
//       toast.error('Failed to apply filters')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // apply filter- end




//   // get all filters by dasboard id




//   useEffect(() => {
//     const fetchFilters = async () => {
//       if (!dashboardId) return
//       try {
//         const fetchedFilters = await getAllFiltersByDashboardID(dashboardId)
//         // console.log("This is the complete filters-----", fetchedFilters)
//         const formattedFilters = fetchedFilters.map(filter => ({
//           id: filter.ID,
//           columnId: filter.ColumnID,
//           name: filter.Name
//         }))
//         setFilters(formattedFilters)
//         // console.log("this is the formatted filters---",formattedFilters )
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [dashboardId])




//   // get all filters in dropdown option




//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const data = await getAllFilters()
//         // console.log("this is the get all filters----",data)
//         setFilterOptions(data.Data.map(filter => ({ id: filter.ID, name: filter.Name, columnID: filter.ColumnID })))
//       } catch (error) {
//         console.error('Error fetching filters:', error)
//       }
//     }

//     fetchFilters()
//   }, [])

//   // api binding for getting dropdown values

//   const handleDropdownFocus = async (filterName, columnId) => {
//     if (!dropdownOptions[filterName]) {
//       // Fetch only if not already fetched
//       const options = await getAllDropDownValues(columnId)
//       setDropdownOptions(prev => ({ ...prev, [filterName]: options }))
//     }
//   }

//   const openModal = async () => {
//     setModalOpen(true)
//     const fetchedCards = await getAllTemplateCards()
//     setCards(fetchedCards)
//   }

//   const closeModal = () => setModalOpen(false)

//   const openFilterModal = () => setFilterModalOpen(true)

//   const closeFilterModal = () => {
//     setFilterModalOpen(false)
//     setSelectedFilter('')
//   }

//   // final changes

//   const handleAddFilter = () => {
//     if (!selectedFilter) return

//     const parsedFilter = JSON.parse(selectedFilter)

//     // Check if the filter is already present in the filters or dynamicFilters
//     const filterExists = [...filters, ...dynamicFilters].some(
//       existingFilter => existingFilter.name === parsedFilter.name
//     )

//     if (filterExists) {
//       alert(`Filter "${parsedFilter.name}" already exists on the dashboard.`)
//       return
//     }

//     setDynamicFilters(prev => [
//       ...prev,
//       { id: parsedFilter.id, name: parsedFilter.name, columnID: parsedFilter.columnID }
//     ])

//     setSelectedFilter('')
//     closeFilterModal()
//   }

//   //   Adding the tile to dashboard - start

//   const handleAddTile = async card => {
//     try {
//       const tileData = await createTile(card.id, dashboardId, projectId)
//       const datablocks = await getAllDataBlocks(tileData.Data[0].id)

//       // Find the highest y-coordinate among existing tiles
//       let maxY = 0
//       tiles.forEach(tile => {
//         const bottomY = tile.y + tile.h
//         if (bottomY > maxY) {
//           maxY = bottomY
//         }
//       })

//       // Place the new tile at the next row
//       const newTile = {
//         i: `tile-${tiles.length + 1}`,
//         x: 0, // Start from the left
//         y: maxY, // Place below all existing tiles
//         w: tileData.Data[0].layout.w,
//         h: tileData.Data[0].layout.h,
//         minW: tileData.Data[0].layout.minW,
//         minH: tileData.Data[0].layout.minH,
//         maxW: tileData.Data[0].layout.maxW,
//         maxH: tileData.Data[0].layout.maxH,
//         template: {
//           ...tileData.Data[0],
//           datablocks: datablocks
//         }
//       }

//       setTiles([...tiles, newTile])
//       closeModal()
//     } catch (error) {
//       console.error('Failed to add tile:', error)
//       closeModal()
//     }
//   }

//   //   Adding the tile to dashboard - end

//   const handleLayoutChange = layout => {
//     clearTimeout(window.layoutChangeTimeout)
//     window.layoutChangeTimeout = setTimeout(() => {
//       const updatedTiles = tiles.map(tile => {
//         const updatedLayout = layout.find(l => l.i === tile.i)
//         return { ...tile, ...updatedLayout }
//       })

//       setLayouts({ lg: layout })
//       setTiles(updatedTiles)
//     }, 300)
//   }

//   const handleContextMenu = (event, tile) => {
//     event.preventDefault()
//     setSelectedTile(tile)
//     setContextMenu(
//       contextMenu === null
//         ? {
//             mouseX: event.clientX + 2,
//             mouseY: event.clientY - 6
//           }
//         : null
//     )
//   }

//   const handleCloseContextMenu = () => {
//     setContextMenu(null)
//   }

//   const handleDeleteTile = async () => {
//     try {
//       const response = await deleteTile(selectedTile.template.id)

//       if (response?.code === 200) {
//         console.log('Tile deleted successfully:', response.message)
//         setTiles(tiles.filter(tile => tile.i !== selectedTile.i))
//       }
//     } catch (error) {
//       console.error('Failed to delete tile:', error)
//     } finally {
//       handleCloseContextMenu()
//     }
//   }

//   const handleEditTile = () => {
//     router.push(`${router.asPath}editor?tileId=${selectedTile.template.id}`)
//     handleCloseContextMenu()
//   }

//   const handleFilterTile = () => {
//     console.log('Filter tile:', selectedTile)
//     handleCloseContextMenu()
//   }


//   // temp- start

// //   const handleSaveDashboard = async () => {
// //     try {
// //       // First, save to localStorage as a fallback
// //       saveTilePositions(dashboardId, layouts.lg)

// //       // Format the positions correctly to ensure all properties are captured
// //       const positionsToSave = layouts.lg.map(tile => {
// //         // Ensure we capture all necessary properties for each tile
// //         return {
// //           i: tile.i,
// //           x: parseInt(tile.x, 10),
// //           y: parseInt(tile.y, 10),
// //           w: parseInt(tile.w, 10),
// //           h: parseInt(tile.h, 10),
// //           minW: tile.minW,
// //           minH: tile.minH,
// //           maxW: tile.maxW,
// //           maxH: tile.maxH,
// //           // Include any additional properties needed for proper rendering
// //           static: tile.static || false
// //         }
// //       })

// //       // Call the API to save positions
// //       await saveTilePositionsToAPI(dashboardId, positionsToSave)

// //       toast.success('Dashboard layout saved successfully!')
// //       console.log('Dashboard saved to API!')
// //     } catch (error) {
// //       console.error('Error saving dashboard:', error)
// //       toast.error('Failed to save dashboard layout. Please try again.')
// //     }
// //   }




// const handleSaveDashboard = async () => {
//     try {
//       // Format the positions correctly to ensure all properties are captured and associated with the correct tile
//       const positionsToSave = layouts.lg.map(tile => {
//         // Get the actual tile object to include its template ID
//         const actualTile = tiles.find(t => t.i === tile.i);
        
//         return {
//           i: tile.i,
//           tileId: actualTile.template.id, // Add the actual tile ID for proper mapping
//           x: parseInt(tile.x, 10),
//           y: parseInt(tile.y, 10),
//           w: parseInt(tile.w, 10),
//           h: parseInt(tile.h, 10),
//         //   minW: tile.minW ,
//         //   minH: tile.minH ,
//         //   maxW: tile.maxW ,
//         //   maxH: tile.maxH ,


//         minW: 4 ,
//         minH: 4 ,
//         maxW: 12 ,
//         maxH: 12 ,

//           static: tile.static || false
//         };
//       });



  
//       // Call the API to save positions

//       await saveTilePositionsToAPI(dashboardId, positionsToSave);
      
//       // Also save to localStorage as fallback

//       saveTilePositions(dashboardId, positionsToSave);
  
//       toast.success('Dashboard layout saved successfully!');
//     } catch (error) {
//       console.error('Error saving dashboard:', error);
//       toast.error('Failed to save dashboard layout. Please try again.');
//     }
//   };

//   // temp- end

//   const getDataBlockValue = datablock => {
//     const value = datablock?.data?.value || datablock.data
//     // console.log("this is my datablock id---", datablock)
//     if (typeof value === 'object' && value !== null) {
//       return JSON.stringify(value)
//     }
//     return value || 'Null'
//   }

//   // added the combo chart

//   const renderDataBlock = (datablock, tileId) => {
//     if (loading) return <CircularProgress />

//     // Highlight the datablock if it's selected in edit mode
//     const isSelected = editMode && selectedBlocks[tileId]?.has(datablock.id)

//     // Handling table rendering
//     if (datablock.type === 'table') {
//       const containerStyles = {
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '0',
//         position: 'relative'
//       }

//       const scrollWrapperStyles = {
//         flex: 1,
//         overflow: 'auto',
//         maxHeight: '290px',
//         width: '100%',
//         position: 'relative'
//       }

//       const tableStyles = {
//         width: '100%',
//         borderCollapse: 'collapse',
//         tableLayout: 'fixed',
//         ...datablock.options.styles.table
//       }

//       const headerStyles = {
//         padding: '12px 16px',
//         backgroundColor: '#f4f4f4',
//         fontWeight: 'bold',
//         fontSize: '14px',
//         textAlign: 'left',
//         position: 'sticky',
//         top: 0,
//         zIndex: 2,
//         borderBottom: '2px solid #ddd',
//         ...datablock.options.styles.header
//       }

//       const rowStyles = {
//         padding: '10px 16px',
//         borderBottom: '1px solid #ddd',
//         fontSize: '13px',
//         whiteSpace: 'nowrap',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         ...datablock.options.styles.row
//       }

//       const cellStyles = {
//         padding: '10px 16px',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//         whiteSpace: 'nowrap'
//       }

//       return (
//         <Box sx={containerStyles}>
//           <Box sx={scrollWrapperStyles}>
//             <table style={tableStyles}>
//               <thead>
//                 <tr>
//                   {datablock.options.headers.map((header, index) => (
//                     <th key={index} style={headerStyles}>
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {datablock.options.rows.map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {row.map((cell, cellIndex) => (
//                       <td key={cellIndex} style={{ ...rowStyles, ...cellStyles }}>
//                         {cell}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Box>
//         </Box>
//       )
//     }

//     // Handle combo chart separately - start

//     if (datablock.type === 'combo') {
//       if (!datablock.options || !datablock.series) {
//         return <Typography>Error: Combo chart data is missing</Typography>
//       }

//       const chartOptions = {
//         ...datablock.options,
//         yaxis: datablock.options.yaxis || [{ title: { text: 'Y Axis' } }], // Ensure yaxis exists
//         chart: {
//           ...datablock.options.chart,
//           type: 'line' // Default to line if type is missing
//         }
//       }

//       return (
//         <DynamicChart
//           key={datablock.datablock_id}
//           options={chartOptions}
//           series={datablock.series || []}
//           type='line' // Ensure valid chart type
//           width={datablock.options.chart?.width || '100%'}
//         />
//       )
//     }

//     // Handle combo chart separately - end

//     // Handling all other chart types

//     if (datablock.type !== 'text') {
//       return (
//         <DynamicChart
//           key={datablock.datablock_id}
//           options={datablock.options}
//           series={datablock.series}
//           type={datablock.type}
//           width={datablock.options.chart.width}
//         />
//       )
//     }

//     // Handling text type datablocks

//     return (
//       <Typography
//         key={datablock.datablock_id}
//         sx={{
//           ...datablock.styles,
//           border: isSelected ? '0px solid blue' : 'none',
//           cursor: editMode ? 'pointer' : 'default'
//         }}
//       >
//         {getDataBlockValue(datablock)}
//       </Typography>
//     )
//   }

//   // function to manage 3-dot in dropdown- start

//   const handleFilterMenuClick = (event, index) => {
//     setFilterMenuAnchor(event.currentTarget) // Set anchor to clicked button
//     setFilterMenuIndex(index) // Set the index of the filter
//   }

//   const handleCloseFilterMenu = () => {
//     setFilterMenuAnchor(null)
//     setFilterMenuIndex(null)
//   }

//   const handleDeleteFilter = async index => {
//     try {
//       // Determine if it's a static or dynamic filter
//       const isStaticFilter = index < filters.length
//       const filterToDelete = isStaticFilter ? filters[index] : dynamicFilters[index - filters.length]

//       const response = await deleteFilterByID(filterToDelete.id, dashboardId)

//       if (response.code === 201) {
//         toast.success('Filter deleted successfully')

//         // Remove the filter from the appropriate array
//         if (isStaticFilter) {
//           setFilters(filters.filter((_, i) => i !== index))
//         } else {
//           setDynamicFilters(dynamicFilters.filter((_, i) => i !== index - filters.length))
//         }
//       } else {
//         toast.error(response.message || 'Failed to delete filter')
//       }
//     } catch (error) {
//       console.error('Error deleting filter:', error)
//       toast.error('An error occurred while deleting the filter')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   // function to manage 3-dot in dropdown - end

//   // handling null issue in Edit functionality in filters

//   const handleEditFilter = async index => {
//     const selectedFilter = filters[index]
//     setCurrentFilterID(selectedFilter.id)

//     try {
//       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

//       // If mappedDatablockIds is null, initialize an empty array
//       const datablockIds = mappedDatablockIds || []

//       // Pre-select the mapped datablocks (if any)
//       const updatedSelectedBlocks = {}
//       tiles.forEach(tile => {
//         if (tile.template.datablocks) {
//           Object.values(tile.template.datablocks).forEach(datablock => {
//             if (datablockIds.includes(datablock.id)) {
//               if (!updatedSelectedBlocks[tile.i]) {
//                 updatedSelectedBlocks[tile.i] = new Set()
//               }
//               updatedSelectedBlocks[tile.i].add(datablock.id)
//             }
//           })
//         }
//       })

//       setSelectedBlocks(updatedSelectedBlocks)
//       setEditMode(true) // Enter edit mode
//     } catch (error) {
//       console.error('Error fetching mapped datablocks:', error)
//       toast.error('Failed to fetch mapped datablocks')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   const handleEditFilterDynamic = async index => {
//     const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
//     setCurrentFilterID(selectedFilter.id) // Store the current FilterID

//     try {
//       // Fetch the mapped datablock IDs for the selected filter
//       const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

//       // If mappedDatablockIds is null, initialize an empty array
//       const datablockIds = mappedDatablockIds || []

//       // Pre-select the mapped datablocks (if any)
//       const updatedSelectedBlocks = {}
//       tiles.forEach(tile => {
//         if (tile.template.datablocks) {
//           Object.values(tile.template.datablocks).forEach(datablock => {
//             if (datablockIds.includes(datablock.id)) {
//               if (!updatedSelectedBlocks[tile.i]) {
//                 updatedSelectedBlocks[tile.i] = new Set()
//               }
//               updatedSelectedBlocks[tile.i].add(datablock.id)
//             }
//           })
//         }
//       })

//       setSelectedBlocks(updatedSelectedBlocks)
//       setEditMode(true) // Enter edit mode
//     } catch (error) {
//       console.error('Error fetching mapped datablocks:', error)
//       toast.error('Failed to fetch mapped datablocks')
//     } finally {
//       handleCloseFilterMenu()
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditMode(false)
//     setSelectedBlocks({})
//     setCurrentFilterID(null) // Clear the current FilterID
//     handleCloseFilterMenu()
//   }

//   // temp- end

//   const handleBlockClick = (tileId, blockId) => {
//     setSelectedBlocks(prev => {
//       const updatedBlocks = { ...prev }
//       if (!updatedBlocks[tileId]) {
//         updatedBlocks[tileId] = new Set()
//       }

//       if (updatedBlocks[tileId].has(blockId)) {
//         updatedBlocks[tileId].delete(blockId)
//       } else {
//         updatedBlocks[tileId].add(blockId)
//       }

//       console.log('this is updated block-----', updatedBlocks)

//       return updatedBlocks
//     })
//   }

//   // select the card content- end

//   return (
//     <BlankLayout>
//       {/* making header sticky */}

//       <Box
//         sx={{
//           height: '100vh',
//           display: 'flex',
//           flexDirection: 'column'
//         }}
//       >
//         {/* Sticky Header */}
//         <Box
//           sx={{
//             position: 'sticky',
//             top: 0,
//             zIndex: 1000,
//             // backgroundColor: 'white',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//           }}
//         >
//           <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant='h4'> {dashboardName || 'Dashboard'}</Typography>
//             <Box>
//               {editMode ? (
//                 <Button
//                   variant='contained'
//                   color='success'
//                   onClick={async () => {
//                     try {
//                       const dataBlockIds = {}

//                       // Iterate over selectedBlocks to collect datablock IDs
//                       Object.entries(selectedBlocks).forEach(([tileId, blockSet]) => {
//                         const tile = tiles.find(t => t.i === tileId)
//                         if (tile && tile.template.datablocks) {
//                           Object.values(tile.template.datablocks).forEach(datablock => {
//                             dataBlockIds[datablock.id] = blockSet.has(datablock.id)
//                           })
//                         }
//                       })

//                       // const dashboardId = router.query.dashboardId; // Get the DashboardID from routing
//                       const dashboardId = parseInt(router.query.dashboardId, 10)

//                       // const filterId = filters[0]?.id || 0;
//                       const filterId = currentFilterID

//                       // Call the API using createMapping
//                       await createMapping(dashboardId, filterId, dataBlockIds)

//                       setEditMode(false)
//                       setSelectedBlocks({})
//                       setCurrentFilterID(null) // Clear current filter ID
//                       toast.success('Mapping Created Successfully')
//                     } catch (error) {
//                       console.error(error)
//                       toast.error(error.message || 'Failed to create mapping.')
//                     }
//                   }}
//                 >
//                   Apply
//                 </Button>
//               ) : (
//                 <>
//                   <Button variant='contained' sx={{ marginRight: 2 }} onClick={handleApplyFilter} disabled={editMode}>
//                     Apply Filter
//                   </Button>

//                   <Button variant='contained' onClick={openModal} sx={{ marginRight: 2 }} disabled={editMode}>
//                     Add Tile
//                   </Button>
//                   <Button
//                     variant='contained'
//                     color='secondary'
//                     onClick={handleSaveDashboard}
//                     sx={{ marginRight: 2 }}
//                     disabled={editMode}
//                   >
//                     Save
//                   </Button>
//                   <Button variant='contained' color='primary' onClick={openFilterModal} disabled={editMode}>
//                     Add Filters
//                   </Button>

            
//                 </>
//               )}
//             </Box>
//           </Box>

//           {/* Dynamic Filters */}

//           <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
//             {filters.map((filter, index) => (
//               <Box
//                 key={filter.id || index}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   padding: 1,
//                   border: '1px solid #ddd',
//                   borderRadius: '8px',
//                   '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//                 }}
//               >
//                 <FormControl
//                   sx={{
//                     minWidth: Math.max(150, filter.name.length * 12)
//                   }}
//                 >
//                   <InputLabel>{filter.name}</InputLabel>
//                   <Select
//                     value={filterSelections[filter.name] || ''}
//                     onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//                     // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//                     // onFocus={() => handleDropdownFocus(filter.name, 217)}
//                     onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//                     sx={{ bgcolor: 'white', maxWidth: '100%' }}
//                   >
//                     {dropdownOptions[filter.name]?.map(option => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//                   <Button
//                     sx={{
//                       minWidth: 0,
//                       padding: '4px',
//                       marginLeft: '4px',
//                       backgroundColor: '#f5f5f5',
//                       borderRadius: '50%',
//                       '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//                     }}
//                     onClick={e => handleFilterMenuClick(e, index)}
//                   >
//                     &#x2026; {/* 3-dot symbol */}
//                   </Button>
//                   <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//                     <MenuItem onClick={() => handleEditFilter(index)}>Edit</MenuItem>
//                     <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//                     <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//                   </Menu>
//                 </Box>
//               </Box>
//             ))}

//             {dynamicFilters.map((filter, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   padding: 1,
//                   border: '1px solid #ddd',
//                   borderRadius: '8px',
//                   '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
//                 }}
//               >
//                 <FormControl
//                   sx={{
//                     minWidth: Math.max(150, filter.name.length * 12)
//                   }}
//                 >
//                   <InputLabel>{filter.name}</InputLabel>
//                   <Select
//                     value={filterSelections[filter.name] || ''}
//                     onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
//                     // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
//                     onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
//                     sx={{ bgcolor: 'white', maxWidth: '100%' }}
//                   >
//                     {dropdownOptions[filter.name]?.map(option => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//                 <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//                   <Button
//                     sx={{
//                       minWidth: 0,
//                       padding: '4px',
//                       marginLeft: '4px',
//                       backgroundColor: '#f5f5f5',
//                       borderRadius: '50%',
//                       '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
//                     }}
//                     onClick={e => handleFilterMenuClick(e, index)}
//                   >
//                     &#x2026; {/* 3-dot symbol */}
//                   </Button>
//                   <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
//                     <MenuItem onClick={() => handleEditFilterDynamic(index)}>Edit</MenuItem>
//                     <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
//                     <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
//                   </Menu>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             flexGrow: 1,
//             overflow: 'auto',
//             padding: 2
//           }}
//         >
//           <ResponsiveGridLayout
//             className='layout'
//             layouts={layouts}
//             breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//             cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
//             rowHeight={30}
//             width={1200}
//             compactType={null}
//             isBounded={false}
//             isDraggable={!editMode}
//             isResizable={!editMode}
//             onLayoutChange={handleLayoutChange}
//           >
//             {tiles.map(tile => (
//               <div key={tile.i} data-grid={tile}>
//                 <Box
//                   onContextMenu={event => handleContextMenu(event, tile)}
//                   sx={{
//                     ...tile.template.styles.container,
//                     position: 'relative',
//                     pointerEvents: 'auto'
//                   }}
//                 >
//                   {Object.entries(tile.template.datablocks || {}).map(([blockKey, datablock]) => (
//                     <Box
//                       key={datablock.id} // Use datablock.id as the unique key
//                       onClick={() => editMode && handleBlockClick(tile.i, datablock.id)} // Pass datablock.id
//                       onContextMenu={event => event.stopPropagation()} // Prevent right-click conflicts
//                       sx={{
//                         cursor: editMode ? 'pointer' : 'default',
//                         border: editMode && selectedBlocks[tile.i]?.has(datablock.id) ? '3px solid blue' : 'none',
//                         ...datablock.styles
//                       }}
//                     >
//                       {renderDataBlock(datablock, tile.i)}
//                     </Box>
//                   ))}
//                 </Box>
//               </div>
//             ))}
//           </ResponsiveGridLayout>
//         </Box>

//         <Modal open={modalOpen} onClose={closeModal}>
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: 600,
//               bgcolor: 'background.paper',
//               borderRadius: 2,
//               boxShadow: 24,
//               p: 4,
//               maxHeight: '90vh',
//               overflowY: 'auto'
//             }}
//           >
//             <Typography variant='h6' component='h2' gutterBottom>
//               Select a Card
//             </Typography>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//               {cards.map(card => (
//                 <Box
//                   key={card.id}
//                   sx={{
//                     border: '3px solid #ddd',
//                     borderRadius: '8px',
//                     p: 2,
//                     cursor: 'pointer',
//                     flex: '1 1 200px',
//                     '&:hover': {
//                       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
//                     }
//                   }}
//                   onClick={() => handleAddTile(card)}
//                 >
//                   <Box sx={{ mt: 2 }}>
//                     {Object.values(card.datablocks).map(datablock => renderDataBlock(datablock))}
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         </Modal>

//         <Modal open={filterModalOpen} onClose={closeFilterModal}>
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               width: 400,
//               bgcolor: 'background.paper',
//               borderRadius: 2,
//               boxShadow: 24,
//               p: 4
//             }}
//           >
//             <Typography variant='h6' component='h2' gutterBottom>
//               Add Filters
//             </Typography>
//             <FormControl fullWidth sx={{ marginBottom: 3 }}>
//               <InputLabel>Select Filters</InputLabel>
//               <Select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
//                 {filterOptions.map(option => (
//                   <MenuItem key={option.id} value={JSON.stringify(option)}>
//                     {option.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Button variant='contained' color='primary' onClick={handleAddFilter}>
//                 Import
//               </Button>
//               <Button variant='contained' color='secondary' onClick={closeFilterModal}>
//                 Cancel
//               </Button>
//             </Box>
//           </Box>
//         </Modal>

//         <Menu
//           open={contextMenu !== null}
//           onClose={handleCloseContextMenu}
//           anchorReference='anchorPosition'
//           anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
//         >
//           <MenuItem onClick={handleEditTile}>Edit</MenuItem>
//           <MenuItem onClick={handleDeleteTile}>Delete</MenuItem>
//           <MenuItem onClick={handleFilterTile}>Filter</MenuItem>
//         </Menu>
//       </Box>
//     </BlankLayout>
//   )
// }

// export default DashboardPage












// fixing the screen layout in all environment














import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import getAllTiles from 'src/api/tiles/getAllTiles'
import getAllTemplateCards from 'src/api/dashboards/getAllTemplateCards'
import createTile from 'src/api/dashboards/createTile'
import getAllDataBlocks from 'src/api/tiles/getAllDataBlocks'
import { saveTilePositions, loadTilePositions } from 'src/utils/tilePosition'
import dynamic from 'next/dynamic'
import deleteTile from 'src/api/tiles/deleteTiles'
import getAllFiltersByDashboardID from 'src/api/filters/getAllFiltersByDashboardID'
import getAllFilters from 'src/api/filters/getAllFilters'
import getAllDropDownValues from 'src/api/filters/getAllDropDownValues'
import createMapping from 'src/api/filters/createMapping'
import deleteFilterByID from 'src/api/filters/deleteFilterByID'
import getMappingOfDatablocksInTiles from 'src/api/filters/getMappingOfDatablocksInTiles'
import { saveTilePositionsToAPI } from 'src/api/tiles/tilePositionsLoad'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false })

const DashboardPage = () => {
  const [layouts, setLayouts] = useState({ lg: [] })
  const [tiles, setTiles] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('')
  const [contextMenu, setContextMenu] = useState(null)
  const [selectedTile, setSelectedTile] = useState(null)
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState([])
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null)
  const [filterMenuIndex, setFilterMenuIndex] = useState(null)

  //  select the card content

  const [editMode, setEditMode] = useState(false) 
  const [selectedBlocks, setSelectedBlocks] = useState({}) 
  const [filterSelections, setFilterSelections] = useState({}) 

  const [dynamicFilters, setDynamicFilters] = useState([])

  const [filterOptions, setFilterOptions] = useState([])

  const [dropdownOptions, setDropdownOptions] = useState({})

  const [currentFilterID, setCurrentFilterID] = useState(null) 

  const router = useRouter()
  const { dashboardId, projectId } = router.query

  //   dashboard name

  const [dashboardName, setDashboardName] = useState('')
  const [clientWidth, setClientWidth] = useState(1200);


// Render tiles- start




// normalizing the tiles

   // Normalize layout function to ensure consistent positioning across screen sizes
   const normalizeLayout = useCallback((originalLayout, screenWidth) => {
    // Base grid configuration
    const BASE_COLS = 12;
    const BASE_WIDTH = 1200;
    const BASE_ROW_HEIGHT = 30;

    // Calculate scaling factor based on current screen width
    const scaleFactor = screenWidth / BASE_WIDTH;

    return originalLayout.map(item => {
      // Calculate proportional positioning
      const normalizedX = Math.round((item.x / BASE_COLS) * BASE_COLS);
      const normalizedW = Math.round((item.w / BASE_COLS) * BASE_COLS);
      
      return {
        ...item,
        x: normalizedX,
        y: item.y,
        w: normalizedW,
        h: item.h,
        minW: 4,
        maxW: 12,
        minH: 4,
        maxH: 12
      };
    });
  }, []);


// useEffect(() => {
//     const fetchTilesAndDataBlocks = async () => {
//       if (!dashboardId) return;
//       setLoading(true);
//       try {
//         // Get all tiles and dashboard data from API
//         const response = await getAllTiles(dashboardId);
//         setDashboardName(response.dashboard.Name);
  
//         const fetchedTiles = response.tiles;
//         // Get saved configurations from the response
//         const savedConfigs = response.dashboard.Configs || [];
        
//         // Create a mapping of tile configurations by their actual tile ID
//         const configMap = {};
//         savedConfigs.forEach(config => {
//           // If we have the tileId property (new format)
//           if (config.tileId) {
//             configMap[config.tileId] = config;
//           } 
//           // Fallback for legacy format that uses 'i' property
//           else {
//             configMap[config.i] = config;
//           }
//         });
  
//         const tilesWithDataBlocks = await Promise.all(
//           fetchedTiles.map(async (tile, index) => {
//             // Create the tile identifier for UI
//             const tileId = `tile-${index + 1}`;
            
//             // Get this tile's saved configuration using its actual ID or fall back to the index-based ID
//             const tileConfig = configMap[tile.ID] || configMap[tileId];
            
//             // Pass empty filters object for initial load
//             const datablocks = await getAllDataBlocks(tile.ID, {});
  
//             return {
//               i: tileId,
//               // Use the saved config values if available, otherwise fall back to defaults
//               x: tileConfig ? parseInt(tileConfig.x) : parseInt(tile.Layout.x),
//               y: tileConfig ? parseInt(tileConfig.y) : parseInt(tile.Layout.y),
//               w: tileConfig ? parseInt(tileConfig.w) : parseInt(tile.Layout.w),
//               h: tileConfig ? parseInt(tileConfig.h) : parseInt(tile.Layout.h),
//               // Also preserve these constraints from either source
//               minW: tileConfig ? parseInt(tileConfig.minW) : parseInt(tile.Layout.minW),
//               minH: tileConfig ? parseInt(tileConfig.minH) : parseInt(tile.Layout.minH),
//               maxW: tileConfig ? parseInt(tileConfig.maxW) : parseInt(tile.Layout.maxW),
//               maxH: tileConfig ? parseInt(tileConfig.maxH) : parseInt(tile.Layout.maxH),
//               // Preserve static state if set
//               static: tileConfig ? tileConfig.static : false,
//               template: {
//                 id: tile.ID,
//                 url: tile.Url,
//                 styles: tile.Styles,
//                 datablocks: datablocks
//               }
//             };
//           })
//         );
  
//         setTiles(tilesWithDataBlocks);
//         setLayouts({ lg: tilesWithDataBlocks });
//       } catch (error) {
//         console.error('Error fetching tiles, data blocks, or filters:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchTilesAndDataBlocks();
//   }, [dashboardId]);



//  temp

   // Add effect to set client width after initial render
   useEffect(() => {
    // Check if window is defined (client-side)
    const updateWidth = () => {
      if (typeof window !== 'undefined') {
        setClientWidth(window.innerWidth || 1200);
      }
    };

    // Initial width setting
    updateWidth();

    // Add resize listener
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, []);

  // Enhanced fetchTilesAndDataBlocks with normalization
  useEffect(() => {
    const fetchTilesAndDataBlocks = async () => {
      if (!dashboardId) return;
      setLoading(true);
      try {
        // Get all tiles and dashboard data from API
        const response = await getAllTiles(dashboardId);
        setDashboardName(response.dashboard.Name);
  
        const fetchedTiles = response.tiles;
        // Get saved configurations from the response
        const savedConfigs = response.dashboard.Configs || [];
        
        // Create a mapping of tile configurations by their actual tile ID
        const configMap = {};
        savedConfigs.forEach(config => {
          if (config.tileId) {
            configMap[config.tileId] = config;
          } else {
            configMap[config.i] = config;
          }
        });
  
        const tilesWithDataBlocks = await Promise.all(
          fetchedTiles.map(async (tile, index) => {
            const tileId = `tile-${index + 1}`;
            
            // Get this tile's saved configuration
            const tileConfig = configMap[tile.ID] || configMap[tileId];
            
            // Fetch data blocks
            const datablocks = await getAllDataBlocks(tile.ID, {});
  
            return {
              i: tileId,
              // Use saved config or default layout with normalization
              x: tileConfig ? parseInt(tileConfig.x) : parseInt(tile.Layout.x),
              y: tileConfig ? parseInt(tileConfig.y) : parseInt(tile.Layout.y),
              w: tileConfig ? parseInt(tileConfig.w) : parseInt(tile.Layout.w),
              h: tileConfig ? parseInt(tileConfig.h) : parseInt(tile.Layout.h),
              minW: 4,
              minH: 4,
              maxW: 12,
              maxH: 12,
              static: tileConfig ? tileConfig.static : false,
              template: {
                id: tile.ID,
                url: tile.Url,
                styles: tile.Styles,
                datablocks: datablocks
              }
            };
          })
        );
  
        // Normalize layout based on current screen width
        const normalizedLayout = normalizeLayout(
          tilesWithDataBlocks, 
          clientWidth
        );

        setTiles(normalizedLayout);
        setLayouts({ lg: normalizedLayout });
      } catch (error) {
        console.error('Error fetching tiles, data blocks, or filters:', error);
        // toast.error('Failed to load dashboard layout');
      } finally {
        setLoading(false);
      }
    };
  
    fetchTilesAndDataBlocks();
  }, [dashboardId, normalizeLayout, clientWidth]);


  // Render tiles - end





  const handleApplyFilter = async () => {
    try {
      setLoading(true)
      // Create a new array to store updated tiles
      const updatedTiles = await Promise.all(
        tiles.map(async tile => {
          // Get the selected filter values
          const filterPayload = {}
          Object.entries(filterSelections).forEach(([filterName, selectedValue]) => {
            // Find the filter ID based on the filter name
            const filter = [...filters, ...dynamicFilters].find(f => f.name === filterName)
            if (filter && selectedValue) {
              filterPayload[filter.id] = [selectedValue.toString()]
            }
          })

          // Fetch new datablocks with filter values
          const newDatablocks = await getAllDataBlocks(tile.template.id, filterPayload)

          // Return updated tile with new datablocks
          return {
            ...tile,
            template: {
              ...tile.template,
              datablocks: newDatablocks
            }
          }
        })
      )

      setTiles(updatedTiles)
    } catch (error) {
      console.error('Error applying filters:', error)
      toast.error('Failed to apply filters')
    } finally {
      setLoading(false)
    }
  }

  // apply filter- end




  // get all filters by dasboard id




  useEffect(() => {
    const fetchFilters = async () => {
      if (!dashboardId) return
      try {
        const fetchedFilters = await getAllFiltersByDashboardID(dashboardId)
        // console.log("This is the complete filters-----", fetchedFilters)
        const formattedFilters = fetchedFilters.map(filter => ({
          id: filter.ID,
          columnId: filter.ColumnID,
          name: filter.Name
        }))
        setFilters(formattedFilters)
        // console.log("this is the formatted filters---",formattedFilters )
      } catch (error) {
        console.error('Error fetching filters:', error)
      }
    }

    fetchFilters()
  }, [dashboardId])




  // get all filters in dropdown option




  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getAllFilters()
        // console.log("this is the get all filters----",data)
        setFilterOptions(data.Data.map(filter => ({ id: filter.ID, name: filter.Name, columnID: filter.ColumnID })))
      } catch (error) {
        console.error('Error fetching filters:', error)
      }
    }

    fetchFilters()
  }, [])

  // api binding for getting dropdown values

  const handleDropdownFocus = async (filterName, columnId) => {
    if (!dropdownOptions[filterName]) {
      // Fetch only if not already fetched
      const options = await getAllDropDownValues(columnId)
      setDropdownOptions(prev => ({ ...prev, [filterName]: options }))
    }
  }

  const openModal = async () => {
    setModalOpen(true)
    const fetchedCards = await getAllTemplateCards()
    setCards(fetchedCards)
  }

  const closeModal = () => setModalOpen(false)

  const openFilterModal = () => setFilterModalOpen(true)

  const closeFilterModal = () => {
    setFilterModalOpen(false)
    setSelectedFilter('')
  }

  // final changes

  const handleAddFilter = () => {
    if (!selectedFilter) return

    const parsedFilter = JSON.parse(selectedFilter)

    // Check if the filter is already present in the filters or dynamicFilters
    const filterExists = [...filters, ...dynamicFilters].some(
      existingFilter => existingFilter.name === parsedFilter.name
    )

    if (filterExists) {
      alert(`Filter "${parsedFilter.name}" already exists on the dashboard.`)
      return
    }

    setDynamicFilters(prev => [
      ...prev,
      { id: parsedFilter.id, name: parsedFilter.name, columnID: parsedFilter.columnID }
    ])

    setSelectedFilter('')
    closeFilterModal()
  }

  //   Adding the tile to dashboard - start

  const handleAddTile = async card => {
    try {
      const tileData = await createTile(card.id, dashboardId, projectId)
      const datablocks = await getAllDataBlocks(tileData.Data[0].id)

      // Find the highest y-coordinate among existing tiles
      let maxY = 0
      tiles.forEach(tile => {
        const bottomY = tile.y + tile.h
        if (bottomY > maxY) {
          maxY = bottomY
        }
      })

      // Place the new tile at the next row
      const newTile = {
        i: `tile-${tiles.length + 1}`,
        x: 0, // Start from the left
        y: maxY, // Place below all existing tiles
        w: tileData.Data[0].layout.w,
        h: tileData.Data[0].layout.h,
        minW: tileData.Data[0].layout.minW,
        minH: tileData.Data[0].layout.minH,
        maxW: tileData.Data[0].layout.maxW,
        maxH: tileData.Data[0].layout.maxH,
        template: {
          ...tileData.Data[0],
          datablocks: datablocks
        }
      }

      setTiles([...tiles, newTile])
      closeModal()
    } catch (error) {
      console.error('Failed to add tile:', error)
      closeModal()
    }
  }

  //   Adding the tile to dashboard - end

//   const handleLayoutChange = layout => {
//     clearTimeout(window.layoutChangeTimeout)
//     window.layoutChangeTimeout = setTimeout(() => {
//       const updatedTiles = tiles.map(tile => {
//         const updatedLayout = layout.find(l => l.i === tile.i)
//         return { ...tile, ...updatedLayout }
//       })

//       setLayouts({ lg: layout })
//       setTiles(updatedTiles)
//     }, 300)
//   }


//  temp changes

 // Enhanced handleLayoutChange with normalization
 const handleLayoutChange = useCallback((layout) => {
    clearTimeout(window.layoutChangeTimeout);
    window.layoutChangeTimeout = setTimeout(() => {
      // Normalize the layout before updating
      const normalizedLayout = normalizeLayout(
        layout, 
        clientWidth
      );

      const updatedTiles = tiles.map(tile => {
        const updatedLayout = normalizedLayout.find(l => l.i === tile.i);
        return { ...tile, ...updatedLayout };
      });

      setLayouts({ lg: normalizedLayout });
      setTiles(updatedTiles);
    }, 300);
  }, [tiles, normalizeLayout, clientWidth]);






  const handleContextMenu = (event, tile) => {
    event.preventDefault()
    setSelectedTile(tile)
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6
          }
        : null
    )
  }

  const handleCloseContextMenu = () => {
    setContextMenu(null)
  }

  const handleDeleteTile = async () => {
    try {
      const response = await deleteTile(selectedTile.template.id)

      if (response?.code === 200) {
        console.log('Tile deleted successfully:', response.message)
        setTiles(tiles.filter(tile => tile.i !== selectedTile.i))
      }
    } catch (error) {
      console.error('Failed to delete tile:', error)
    } finally {
      handleCloseContextMenu()
    }
  }

  const handleEditTile = () => {
    router.push(`${router.asPath}editor?tileId=${selectedTile.template.id}`)
    handleCloseContextMenu()
  }

  const handleFilterTile = () => {
    console.log('Filter tile:', selectedTile)
    handleCloseContextMenu()
  }


  // temp- start



// const handleSaveDashboard = async () => {
//     try {
//       // Format the positions correctly to ensure all properties are captured and associated with the correct tile
//       const positionsToSave = layouts.lg.map(tile => {
//         // Get the actual tile object to include its template ID
//         const actualTile = tiles.find(t => t.i === tile.i);
        
//         return {
//           i: tile.i,
//           tileId: actualTile.template.id, // Add the actual tile ID for proper mapping
//           x: parseInt(tile.x, 10),
//           y: parseInt(tile.y, 10),
//           w: parseInt(tile.w, 10),
//           h: parseInt(tile.h, 10),
//         //   minW: tile.minW ,
//         //   minH: tile.minH ,
//         //   maxW: tile.maxW ,
//         //   maxH: tile.maxH ,


//         minW: 4 ,
//         minH: 4 ,
//         maxW: 12 ,
//         maxH: 12 ,

//           static: tile.static || false
//         };
//       });



  
//       // Call the API to save positions

//       await saveTilePositionsToAPI(dashboardId, positionsToSave);
      
//       // Also save to localStorage as fallback

//       saveTilePositions(dashboardId, positionsToSave);
  
//       toast.success('Dashboard layout saved successfully!');
//     } catch (error) {
//       console.error('Error saving dashboard:', error);
//       toast.error('Failed to save dashboard layout. Please try again.');
//     }
//   };


//  temp changes


  // Enhanced handleSaveDashboard with normalized positions
  const handleSaveDashboard = async () => {
    try {
      // Normalize positions before saving
      const positionsToSave = layouts.lg.map(tile => {
        const actualTile = tiles.find(t => t.i === tile.i);
        
        return {
          i: tile.i,
          tileId: actualTile.template.id,
          x: parseInt(tile.x, 10),
          y: parseInt(tile.y, 10),
          w: parseInt(tile.w, 10),
          h: parseInt(tile.h, 10),
          minW: 4,
          minH: 4,
          maxW: 12,
          maxH: 12,
          static: tile.static || false
        };
      });

      // Save normalized positions to API and localStorage
      await saveTilePositionsToAPI(dashboardId, positionsToSave);
      saveTilePositions(dashboardId, positionsToSave);
  
      toast.success('Dashboard layout saved successfully!');
    } catch (error) {
      console.error('Error saving dashboard:', error);
      toast.error('Failed to save dashboard layout. Please try again.');
    }
  };



  // temp- end

  const getDataBlockValue = datablock => {
    const value = datablock?.data?.value || datablock.data
    // console.log("this is my datablock id---", datablock)
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value)
    }
    return value || 'Null'
  }

  // added the combo chart

  const renderDataBlock = (datablock, tileId) => {
    if (loading) return <CircularProgress />

    // Highlight the datablock if it's selected in edit mode
    const isSelected = editMode && selectedBlocks[tileId]?.has(datablock.id)

    // Handling table rendering
    if (datablock.type === 'table') {
      const containerStyles = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        position: 'relative'
      }

      const scrollWrapperStyles = {
        flex: 1,
        overflow: 'auto',
        maxHeight: '290px',
        width: '100%',
        position: 'relative'
      }

      const tableStyles = {
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
        ...datablock.options.styles.table
      }

      const headerStyles = {
        padding: '12px 16px',
        backgroundColor: '#f4f4f4',
        fontWeight: 'bold',
        fontSize: '14px',
        textAlign: 'left',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        borderBottom: '2px solid #ddd',
        ...datablock.options.styles.header
      }

      const rowStyles = {
        padding: '10px 16px',
        borderBottom: '1px solid #ddd',
        fontSize: '13px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...datablock.options.styles.row
      }

      const cellStyles = {
        padding: '10px 16px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }

      return (
        <Box sx={containerStyles}>
          <Box sx={scrollWrapperStyles}>
            <table style={tableStyles}>
              <thead>
                <tr>
                  {datablock.options.headers.map((header, index) => (
                    <th key={index} style={headerStyles}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datablock.options.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ ...rowStyles, ...cellStyles }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )
    }

    // Handle combo chart separately - start

    if (datablock.type === 'combo') {
      if (!datablock.options || !datablock.series) {
        return <Typography>Error: Combo chart data is missing</Typography>
      }

      const chartOptions = {
        ...datablock.options,
        yaxis: datablock.options.yaxis || [{ title: { text: 'Y Axis' } }], // Ensure yaxis exists
        chart: {
          ...datablock.options.chart,
          type: 'line' // Default to line if type is missing
        }
      }

      return (
        <DynamicChart
          key={datablock.datablock_id}
          options={chartOptions}
          series={datablock.series || []}
          type='line' // Ensure valid chart type
          width={datablock.options.chart?.width || '100%'}
        />
      )
    }

    // Handle combo chart separately - end

    // Handling all other chart types

    if (datablock.type !== 'text') {
      return (
        <DynamicChart
          key={datablock.datablock_id}
          options={datablock.options}
          series={datablock.series}
          type={datablock.type}
          width={datablock.options.chart.width}
        />
      )
    }

    // Handling text type datablocks

    return (
      <Typography
        key={datablock.datablock_id}
        sx={{
          ...datablock.styles,
          border: isSelected ? '0px solid blue' : 'none',
          cursor: editMode ? 'pointer' : 'default'
        }}
      >
        {getDataBlockValue(datablock)}
      </Typography>
    )
  }

  // function to manage 3-dot in dropdown- start

  const handleFilterMenuClick = (event, index) => {
    setFilterMenuAnchor(event.currentTarget) // Set anchor to clicked button
    setFilterMenuIndex(index) // Set the index of the filter
  }

  const handleCloseFilterMenu = () => {
    setFilterMenuAnchor(null)
    setFilterMenuIndex(null)
  }

  const handleDeleteFilter = async index => {
    try {
      // Determine if it's a static or dynamic filter
      const isStaticFilter = index < filters.length
      const filterToDelete = isStaticFilter ? filters[index] : dynamicFilters[index - filters.length]

      const response = await deleteFilterByID(filterToDelete.id, dashboardId)

      if (response.code === 201) {
        toast.success('Filter deleted successfully')

        // Remove the filter from the appropriate array
        if (isStaticFilter) {
          setFilters(filters.filter((_, i) => i !== index))
        } else {
          setDynamicFilters(dynamicFilters.filter((_, i) => i !== index - filters.length))
        }
      } else {
        toast.error(response.message || 'Failed to delete filter')
      }
    } catch (error) {
      console.error('Error deleting filter:', error)
      toast.error('An error occurred while deleting the filter')
    } finally {
      handleCloseFilterMenu()
    }
  }

  // function to manage 3-dot in dropdown - end

  // handling null issue in Edit functionality in filters

  const handleEditFilter = async index => {
    const selectedFilter = filters[index]
    setCurrentFilterID(selectedFilter.id)

    try {
      const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

      // If mappedDatablockIds is null, initialize an empty array
      const datablockIds = mappedDatablockIds || []

      // Pre-select the mapped datablocks (if any)
      const updatedSelectedBlocks = {}
      tiles.forEach(tile => {
        if (tile.template.datablocks) {
          Object.values(tile.template.datablocks).forEach(datablock => {
            if (datablockIds.includes(datablock.id)) {
              if (!updatedSelectedBlocks[tile.i]) {
                updatedSelectedBlocks[tile.i] = new Set()
              }
              updatedSelectedBlocks[tile.i].add(datablock.id)
            }
          })
        }
      })

      setSelectedBlocks(updatedSelectedBlocks)
      setEditMode(true) // Enter edit mode
    } catch (error) {
      console.error('Error fetching mapped datablocks:', error)
      toast.error('Failed to fetch mapped datablocks')
    } finally {
      handleCloseFilterMenu()
    }
  }

  const handleEditFilterDynamic = async index => {
    const selectedFilter = dynamicFilters[index] // Get the filter based on the dropdown index
    setCurrentFilterID(selectedFilter.id) // Store the current FilterID

    try {
      // Fetch the mapped datablock IDs for the selected filter
      const mappedDatablockIds = await getMappingOfDatablocksInTiles(selectedFilter.id, dashboardId)

      // If mappedDatablockIds is null, initialize an empty array
      const datablockIds = mappedDatablockIds || []

      // Pre-select the mapped datablocks (if any)
      const updatedSelectedBlocks = {}
      tiles.forEach(tile => {
        if (tile.template.datablocks) {
          Object.values(tile.template.datablocks).forEach(datablock => {
            if (datablockIds.includes(datablock.id)) {
              if (!updatedSelectedBlocks[tile.i]) {
                updatedSelectedBlocks[tile.i] = new Set()
              }
              updatedSelectedBlocks[tile.i].add(datablock.id)
            }
          })
        }
      })

      setSelectedBlocks(updatedSelectedBlocks)
      setEditMode(true) // Enter edit mode
    } catch (error) {
      console.error('Error fetching mapped datablocks:', error)
      toast.error('Failed to fetch mapped datablocks')
    } finally {
      handleCloseFilterMenu()
    }
  }

  const handleCancelEdit = () => {
    setEditMode(false)
    setSelectedBlocks({})
    setCurrentFilterID(null) // Clear the current FilterID
    handleCloseFilterMenu()
  }

  // temp- end

  const handleBlockClick = (tileId, blockId) => {
    setSelectedBlocks(prev => {
      const updatedBlocks = { ...prev }
      if (!updatedBlocks[tileId]) {
        updatedBlocks[tileId] = new Set()
      }

      if (updatedBlocks[tileId].has(blockId)) {
        updatedBlocks[tileId].delete(blockId)
      } else {
        updatedBlocks[tileId].add(blockId)
      }

      console.log('this is updated block-----', updatedBlocks)

      return updatedBlocks
    })
  }

  // select the card content- end

  return (
    <BlankLayout>
      {/* making header sticky */}

      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Sticky Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            // backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h4'> {dashboardName || 'Dashboard'}</Typography>
            <Box>
              {editMode ? (
                <Button
                  variant='contained'
                  color='success'
                  onClick={async () => {
                    try {
                      const dataBlockIds = {}

                      // Iterate over selectedBlocks to collect datablock IDs
                      Object.entries(selectedBlocks).forEach(([tileId, blockSet]) => {
                        const tile = tiles.find(t => t.i === tileId)
                        if (tile && tile.template.datablocks) {
                          Object.values(tile.template.datablocks).forEach(datablock => {
                            dataBlockIds[datablock.id] = blockSet.has(datablock.id)
                          })
                        }
                      })

                      // const dashboardId = router.query.dashboardId; // Get the DashboardID from routing
                      const dashboardId = parseInt(router.query.dashboardId, 10)

                      // const filterId = filters[0]?.id || 0;
                      const filterId = currentFilterID

                      // Call the API using createMapping
                      await createMapping(dashboardId, filterId, dataBlockIds)

                      setEditMode(false)
                      setSelectedBlocks({})
                      setCurrentFilterID(null) // Clear current filter ID
                      toast.success('Mapping Created Successfully')
                    } catch (error) {
                      console.error(error)
                      toast.error(error.message || 'Failed to create mapping.')
                    }
                  }}
                >
                  Apply
                </Button>
              ) : (
                <>
                  <Button variant='contained' sx={{ marginRight: 2 }} onClick={handleApplyFilter} disabled={editMode}>
                    Apply Filter
                  </Button>

                  <Button variant='contained' onClick={openModal} sx={{ marginRight: 2 }} disabled={editMode}>
                    Add Tile
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleSaveDashboard}
                    sx={{ marginRight: 2 }}
                    disabled={editMode}
                  >
                    Save
                  </Button>
                  <Button variant='contained' color='primary' onClick={openFilterModal} disabled={editMode}>
                    Add Filters
                  </Button>

            
                </>
              )}
            </Box>
          </Box>

          {/* Dynamic Filters */}

          <Box sx={{ padding: 2, display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {filters.map((filter, index) => (
              <Box
                key={filter.id || index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: 1,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
                }}
              >
                <FormControl
                  sx={{
                    minWidth: Math.max(150, filter.name.length * 12)
                  }}
                >
                  <InputLabel>{filter.name}</InputLabel>
                  <Select
                    value={filterSelections[filter.name] || ''}
                    onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
                    // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
                    // onFocus={() => handleDropdownFocus(filter.name, 217)}
                    onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
                    sx={{ bgcolor: 'white', maxWidth: '100%' }}
                  >
                    {dropdownOptions[filter.name]?.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Button
                    sx={{
                      minWidth: 0,
                      padding: '4px',
                      marginLeft: '4px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '50%',
                      '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
                    }}
                    onClick={e => handleFilterMenuClick(e, index)}
                  >
                    &#x2026; {/* 3-dot symbol */}
                  </Button>
                  <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
                    <MenuItem onClick={() => handleEditFilter(index)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
                    <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
                  </Menu>
                </Box>
              </Box>
            ))}

            {dynamicFilters.map((filter, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: 1,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  '&:hover': { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }
                }}
              >
                <FormControl
                  sx={{
                    minWidth: Math.max(150, filter.name.length * 12)
                  }}
                >
                  <InputLabel>{filter.name}</InputLabel>
                  <Select
                    value={filterSelections[filter.name] || ''}
                    onChange={e => setFilterSelections(prev => ({ ...prev, [filter.name]: e.target.value }))}
                    // onFocus={() => handleDropdownFocus(filter.name, filter.id)}
                    onFocus={() => handleDropdownFocus(filter.name, filter.columnId || filter.columnID)}
                    sx={{ bgcolor: 'white', maxWidth: '100%' }}
                  >
                    {dropdownOptions[filter.name]?.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Button
                    sx={{
                      minWidth: 0,
                      padding: '4px',
                      marginLeft: '4px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '50%',
                      '&:hover': { backgroundColor: '#e0e0e0', boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)' } // Hover effect for 3-dot
                    }}
                    onClick={e => handleFilterMenuClick(e, index)}
                  >
                    &#x2026; {/* 3-dot symbol */}
                  </Button>
                  <Menu open={filterMenuIndex === index} onClose={handleCloseFilterMenu} anchorEl={filterMenuAnchor}>
                    <MenuItem onClick={() => handleEditFilterDynamic(index)}>Edit</MenuItem>
                    <MenuItem onClick={() => handleDeleteFilter(index)}>Delete</MenuItem>
                    <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
                  </Menu>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            padding: 2
          }}
        >
          <ResponsiveGridLayout
            className='layout'
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
            rowHeight={30}
            width={1200}
            compactType={null}
            isBounded={false}
            isDraggable={!editMode}
            isResizable={!editMode}
            onLayoutChange={handleLayoutChange}
          >
            {tiles.map(tile => (
              <div key={tile.i} data-grid={tile}>
                <Box
                  onContextMenu={event => handleContextMenu(event, tile)}
                  sx={{
                    ...tile.template.styles.container,
                    position: 'relative',
                    pointerEvents: 'auto'
                  }}
                >
                  {Object.entries(tile.template.datablocks || {}).map(([blockKey, datablock]) => (
                    <Box
                      key={datablock.id} // Use datablock.id as the unique key
                      onClick={() => editMode && handleBlockClick(tile.i, datablock.id)} // Pass datablock.id
                      onContextMenu={event => event.stopPropagation()} // Prevent right-click conflicts
                      sx={{
                        cursor: editMode ? 'pointer' : 'default',
                        border: editMode && selectedBlocks[tile.i]?.has(datablock.id) ? '3px solid blue' : 'none',
                        ...datablock.styles
                      }}
                    >
                      {renderDataBlock(datablock, tile.i)}
                    </Box>
                  ))}
                </Box>
              </div>
            ))}
          </ResponsiveGridLayout>
        </Box> */}



        {/*  temp chnages - start */}

       <Box 
      sx={{
        flexGrow: 1,
        overflow: 'auto',
        padding: 2
      }}
    >
      <ResponsiveGridLayout
        className='layout'
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
        rowHeight={30}
        width={clientWidth}
        compactType={null}
        isBounded={false}
        isDraggable={!editMode}
        isResizable={!editMode}
        onLayoutChange={handleLayoutChange}
      >
        {tiles.map(tile => (
          <div key={tile.i} data-grid={tile}>
            <Box
              onContextMenu={event => handleContextMenu(event, tile)}
              sx={{
                ...tile.template.styles.container,
                position: 'relative',
                pointerEvents: 'auto'
              }}
            >
              {Object.entries(tile.template.datablocks || {}).map(([blockKey, datablock]) => (
                <Box
                  key={datablock.id}
                  onClick={() => editMode && handleBlockClick(tile.i, datablock.id)}
                  onContextMenu={event => event.stopPropagation()}
                  sx={{
                    cursor: editMode ? 'pointer' : 'default',
                    border: editMode && selectedBlocks[tile.i]?.has(datablock.id) ? '3px solid blue' : 'none',
                    ...datablock.styles
                  }}
                >
                  {renderDataBlock(datablock, tile.i)}
                </Box>
              ))}
            </Box>
          </div>
        ))}
      </ResponsiveGridLayout>
    </Box>


        {/* temp changes - end */}



        <Modal open={modalOpen} onClose={closeModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <Typography variant='h6' component='h2' gutterBottom>
              Select a Card
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {cards.map(card => (
                <Box
                  key={card.id}
                  sx={{
                    border: '3px solid #ddd',
                    borderRadius: '8px',
                    p: 2,
                    cursor: 'pointer',
                    flex: '1 1 200px',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                    }
                  }}
                  onClick={() => handleAddTile(card)}
                >
                  <Box sx={{ mt: 2 }}>
                    {Object.values(card.datablocks).map(datablock => renderDataBlock(datablock))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Modal>

        <Modal open={filterModalOpen} onClose={closeFilterModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4
            }}
          >
            <Typography variant='h6' component='h2' gutterBottom>
              Add Filters
            </Typography>
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
              <InputLabel>Select Filters</InputLabel>
              <Select value={selectedFilter} onChange={e => setSelectedFilter(e.target.value)}>
                {filterOptions.map(option => (
                  <MenuItem key={option.id} value={JSON.stringify(option)}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' color='primary' onClick={handleAddFilter}>
                Import
              </Button>
              <Button variant='contained' color='secondary' onClick={closeFilterModal}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <Menu
          open={contextMenu !== null}
          onClose={handleCloseContextMenu}
          anchorReference='anchorPosition'
          anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
        >
          <MenuItem onClick={handleEditTile}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteTile}>Delete</MenuItem>
          <MenuItem onClick={handleFilterTile}>Filter</MenuItem>
        </Menu>
      </Box>
    </BlankLayout>
  )
}

export default DashboardPage


