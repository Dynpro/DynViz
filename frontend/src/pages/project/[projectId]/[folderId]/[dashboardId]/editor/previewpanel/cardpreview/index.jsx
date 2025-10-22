// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import LinearProgress from '@mui/material/LinearProgress'

// // ** Custom Component Import
// import CustomChip from 'src/@core/components/mui/chip'

// const CardPreview = () => {
//   return (
//     <Card sx={{ width: '20em' }}>
//       <CardContent sx={{ p: theme => `${theme.spacing(3.5, 4.5)} !important` }}>
//         <Typography sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>Sales</Typography>
//         <Typography variant='h5' sx={{ mb: 1.5 }}>
//           482k
//         </Typography>
//         <CustomChip rounded size='small' skin='light' color='info' label='+34%' sx={{ mb: 4, fontWeight: 500 }} />
//         <Typography variant='body2' sx={{ color: 'text.disabled' }}>
//           Sales Target
//         </Typography>
//         <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
//           <LinearProgress value={78} color='info' variant='determinate' sx={{ mr: 2, height: 8, width: '100%' }} />
//           <Typography variant='body2'>78%</Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   )
// }

// export default CardPreview

//  Dashboard Task - 12

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import CircularProgress from '@mui/material/CircularProgress'

// // ** React Imports
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

// // ** API Import
// import getTileByID from 'src/api/tiles/getTileByID'

// const CardPreview = () => {
//   const router = useRouter()
//   const { tileId } = router.query

//   const [tileData, setTileData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     if (tileId) {
//       getTileByID(tileId)
//         .then(data => {
//           setTileData(data)
//           setLoading(false)
//         })
//         .catch(err => {
//           setError(err.message)
//           setLoading(false)
//         })
//     }
//   }, [tileId])

//   if (loading) return <CircularProgress />
//   if (error) return <Typography color="error">{error}</Typography>

//   if (!tileData) return null

//   const { datablocks, styles } = tileData
//   const { container } = styles

//   return (

//     <Card sx={{ width: '100%', ...container }}>
//       <CardContent sx={{ p: theme => `${theme.spacing(3.5, 4.5)} !important` }}>
//         {Object.entries(datablocks).map(([key, datablock]) => (
//           <Typography
//             key={key}
//             sx={{
//               fontSize: datablock.styles.fontSize,
//               color: datablock.styles.color,
//               marginBottom: datablock.styles.marginBottom,
//               fontWeight: datablock.styles.fontWeight
//             }}
//             data-block-id={datablock.datablock_id}
//           >
//             {datablock.data.value}

//           </Typography>
//         ))}
//       </CardContent>
//     </Card>
//   )
// }

// export default CardPreview;

// temporary

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import CircularProgress from '@mui/material/CircularProgress'

// // ** React Imports
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

// // ** API Import
// import getTileByID from 'src/api/tiles/getTileByID'

// const CardPreview = () => {
//   const router = useRouter()
//   const { tileId } = router.query

//   const [tileData, setTileData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     if (tileId) {
//       getTileByID(tileId)
//         .then(data => {
//           setTileData(data)
//           setLoading(false)
//         })
//         .catch(err => {
//           setError(err.message)
//           setLoading(false)
//         })
//     }
//   }, [tileId])

//   if (loading) return <CircularProgress />
//   if (error) return <Typography color="error">{error}</Typography>

//   if (!tileData) return null

//   const { datablocks, styles } = tileData
//   const { container } = styles

//   return (

//     <Box sx={{ width: '100%', ...container }}>
//       <CardContent sx={{ p: theme => `${theme.spacing(3.5, 4.5)} !important` }}>
//         {Object.entries(datablocks).map(([key, datablock]) => (
//           <Typography
//             key={key}
//             sx={{
//               fontSize: datablock.styles.fontSize,
//               color: datablock.styles.color,
//               marginBottom: datablock.styles.marginBottom,
//               fontWeight: datablock.styles.fontWeight
//             }}
//             data-block-id={datablock.datablock_id}
//           >
//             {datablock.data.value}

//           </Typography>
//         ))}
//       </CardContent>
//     </Box>
//   )
// }

// export default CardPreview;

//  modified by arman khan

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import Card from '@mui/material/Card'
// import Typography from '@mui/material/Typography'
// import CardContent from '@mui/material/CardContent'
// import CircularProgress from '@mui/material/CircularProgress'

// // ** React Imports
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

// // ** API Import
// import getTileByID from 'src/api/tiles/getTileByID'

// const CardPreview = () => {
//   const router = useRouter()
//   const { tileId } = router.query

//   const [tileData, setTileData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     if (tileId) {
//       getTileByID(tileId)
//         .then(data => {
//           setTileData(data)
//           setLoading(false)
//         })
//         .catch(err => {
//           setError(err.message)
//           setLoading(false)
//         })
//     }
//   }, [tileId])

//   if (loading) return <CircularProgress />
//   if (error) return <Typography color="error">{error}</Typography>

//   if (!tileData) return null

//   const { datablocks, styles } = tileData
//   const { container } = styles

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         ...container
//       }}
//     >
//       <CardContent
//         sx={{
//           p: theme => `${theme.spacing(3.5, 4.5)} !important`,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//       >
//         {Object.entries(datablocks).map(([key, datablock]) => (
//           <Typography
//             key={key}
//             sx={{
//               fontSize: datablock.styles.fontSize,
//               color: datablock.styles.color,
//               marginBottom: datablock.styles.marginBottom,
//               fontWeight: datablock.styles.fontWeight,
//               textAlign: 'center'
//             }}
//             data-block-id={datablock.datablock_id}
//             cell-id={datablock.cell_id}
//           >
//             {datablock.data.value}
//           </Typography>
//         ))}
//       </CardContent>
//     </Box>
//   )
// }

// export default CardPreview;

//  api binding - 2 - update data block

// // ** MUI Imports
// import Box from '@mui/material/Box'
// import CardContent from '@mui/material/CardContent'
// import Typography from '@mui/material/Typography'
// import CircularProgress from '@mui/material/CircularProgress'

// // ** React Imports
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'

// // ** API Import
// import getTileByID from 'src/api/tiles/getTileByID'

// // ** Utils Import
// import eventEmitter from 'src/utils/eventEmitter'

// const CardPreview = () => {
//   const router = useRouter()
//   const { tileId } = router.query

//   const [tileData, setTileData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const fetchTileData = () => {
//     if (tileId) {
//       setLoading(true)
//       getTileByID(tileId)
//         .then(data => {
//           setTileData(data)
//           setLoading(false)
//         })
//         .catch(err => {
//           setError(err.message)
//           setLoading(false)
//         })
//     }
//   }

//   useEffect(() => {
//     fetchTileData()

//     const handleTileUpdate = () => {
//       fetchTileData()
//     }

//     eventEmitter.on('tileUpdated', handleTileUpdate)

//     return () => {
//       eventEmitter.off('tileUpdated', handleTileUpdate)
//     }
//   }, [tileId])

//   if (loading) return <CircularProgress />
//   if (error) return <Typography color="error">{error}</Typography>

//   if (!tileData) return null

//   const { datablocks, styles } = tileData
//   const { container } = styles

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         ...container
//       }}
//     >
//       <CardContent
//         sx={{
//           p: theme => `${theme.spacing(3.5, 4.5)} !important`,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//       >
//         {Object.entries(datablocks).map(([key, datablock]) => (
//           <Typography
//             key={key}
//             sx={{
//               fontSize: datablock.styles.fontSize,
//               color: datablock.styles.color,
//               marginBottom: datablock.styles.marginBottom,
//               fontWeight: datablock.styles.fontWeight,
//               textAlign: 'center'
//             }}
//             data-block-id={datablock.datablock_id}
//             cell-id={datablock.cell_id}
//           >
//             {/* {datablock.data.value} */}
//             {datablock.data?.value !== undefined ? datablock.data.value : datablock.data}
//           </Typography>
//         ))}
//       </CardContent>
//     </Box>
//   )
// }

// export default CardPreview





// Pie Chart Renderong








// // ** MUI Imports
// import Box from '@mui/material/Box'
// import CardContent from '@mui/material/CardContent'
// import Typography from '@mui/material/Typography'
// import CircularProgress from '@mui/material/CircularProgress'

// // ** React Imports
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import dynamic from 'next/dynamic'

// // ** API Import
// import getTileByID from 'src/api/tiles/getTileByID'

// // ** Utils Import
// import eventEmitter from 'src/utils/eventEmitter'

// // Dynamically import ApexCharts for Next.js
// const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

// const CardPreview = () => {
//   const router = useRouter()
//   const { tileId } = router.query

//   const [tileData, setTileData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const fetchTileData = () => {
//     if (tileId) {
//       setLoading(true)
//       getTileByID(tileId)
//         .then(data => {
//           setTileData(data)
//           setLoading(false)
//         })
//         .catch(err => {
//           setError(err.message)
//           setLoading(false)
//         })
//     }
//   }

//   useEffect(() => {
//     fetchTileData()

//     const handleTileUpdate = () => {
//       fetchTileData()
//     }

//     eventEmitter.on('tileUpdated', handleTileUpdate)

//     return () => {
//       eventEmitter.off('tileUpdated', handleTileUpdate)
//     }
//   }, [tileId])

//   if (loading) return <CircularProgress />
//   if (error) return <Typography color='error'>{error}</Typography>

//   if (!tileData) return null

//   const { datablocks, styles } = tileData
//   const { container } = styles

//   return (
//     <Box
//       sx={{
//         width: '100%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         ...container
//       }}
//     >
//       <CardContent
//         sx={{
//           p: theme => `${theme.spacing(3.5, 4.5)} !important`,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//       >
//         {Object.entries(datablocks).map(([key, datablock]) => {
//           if (datablock.type === 'text') {
//             return (
//               <Typography
//                 key={key}
//                 sx={{
//                   fontSize: datablock.styles.fontSize,
//                   color: datablock.styles.color,
//                   marginBottom: datablock.styles.marginBottom,
//                   fontWeight: datablock.styles.fontWeight,
//                   textAlign: 'center'
//                 }}
//                 data-block-id={datablock.datablock_id}
//                 cell-id={datablock.cell_id}
//               >
//                 {datablock.data?.value !== undefined ? datablock.data.value : datablock.data}
//               </Typography>
//             )
//           }

//           if (datablock.type != 'text') {
//             return (
//               <Box key={key} sx={{ marginBottom: datablock.styles.marginBottom }}>
//                 <ApexCharts
//                   options={datablock.options}
//                   series={datablock.series}
//                   type={datablock.type}
//                   width={datablock.options.chart.width}
//                 />
//               </Box>
//             )
//           }

//           return null
//         })}
//       </CardContent>
//     </Box>
//   )
// }

// export default CardPreview




// handling the table view- modified by arman khan



// ** MUI Imports
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

// ** API Import
import getTileByID from 'src/api/tiles/getTileByID'

// ** Utils Import
import eventEmitter from 'src/utils/eventEmitter'

// Dynamically import ApexCharts for Next.js
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

const CardPreview = () => {
  const router = useRouter()
  const { tileId } = router.query

  const [tileData, setTileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTileData = () => {
    if (tileId) {
      setLoading(true)
      getTileByID(tileId)
        .then(data => {
          setTileData(data)
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    fetchTileData()

    const handleTileUpdate = () => {
      fetchTileData()
    }

    eventEmitter.on('tileUpdated', handleTileUpdate)

    return () => {
      eventEmitter.off('tileUpdated', handleTileUpdate)
    }
  }, [tileId])

  const getDataBlockValue = (datablock) => {
    return datablock.data?.value !== undefined ? datablock.data.value : datablock.data
  }

  const renderTable = (datablock) => {
    // Fixed container styles to enforce scrolling
    const containerStyles = {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '0',
      position: 'relative'
    }

    // Scrollable wrapper styles
    const scrollWrapperStyles = {
      flex: 1,
      overflow: 'auto',
      maxHeight: '290px',
      width: '100%',
      position: 'relative'
    }

    // Fixed table styles
    const tableStyles = {
      width: '100%',
      borderCollapse: 'collapse',
      tableLayout: 'fixed',
      ...(datablock.options.styles?.table || {})
    }

    // Enhanced header styles
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
      ...(datablock.options.styles?.header || {})
    }

    // Enhanced row styles
    const rowStyles = {
      padding: '10px 16px',
      borderBottom: '1px solid #ddd',
      fontSize: '13px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...(datablock.options.styles?.row || {})
    }

    // Cell styles
    const cellStyles = {
      padding: '10px 16px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      ...(datablock.options.styles?.cell || {})
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

  const renderDataBlock = (datablock) => {
    if (loading) return <CircularProgress />

    if (datablock.type === 'table') {
      return renderTable(datablock)
    }

    if (datablock.type === 'text') {
      return (
        <Typography
          key={datablock.datablock_id}
          sx={{
            fontSize: datablock.styles.fontSize,
            color: datablock.styles.color,
            marginBottom: datablock.styles.marginBottom,
            fontWeight: datablock.styles.fontWeight,
            textAlign: 'center'
          }}
          data-block-id={datablock.datablock_id}
          cell-id={datablock.cell_id}
        >
          {getDataBlockValue(datablock)}
        </Typography>
      )
    }

    // Handle charts (ApexCharts)
    return (
      <Box key={datablock.datablock_id} sx={{ marginBottom: datablock.styles?.marginBottom || 0 }}>
        <ApexCharts
          options={datablock.options}
          series={datablock.series}
          type={datablock.type}
          width={datablock.options.chart.width}
        />
      </Box>
    )
  }

  if (loading) return <CircularProgress />
  if (error) return <Typography color='error'>{error}</Typography>
  if (!tileData) return null

  const { datablocks, styles } = tileData
  const { container } = styles

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...container
      }}
    >
      <CardContent
        sx={{
          p: theme => `${theme.spacing(3.5, 4.5)} !important`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {Object.entries(datablocks).map(([key, datablock]) => renderDataBlock(datablock))}
      </CardContent>
    </Box>
  )
}

export default CardPreview


