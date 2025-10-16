

// // ** Util Import
// import { hexToRGBA } from 'src/@core/utils/hex-to-rgba';


// const cardConfigurations = {
//   expensesCard: {
//     id: 'card-expenses',
//     title: 'Expenses',
//     description: 'Displays expense statistics in a radial bar chart.',
//     series: [72], 
//     colors: theme => [hexToRGBA(theme.palette.primary.main, 1)], 
//     trackBackgroundColor: theme => hexToRGBA(theme.palette.customColors.trackBg, 1),
//     labelColor: theme => theme.palette.text.primary, 
//     cardContentStyles: theme => ({
//       padding: theme.spacing(3.5, 5, 3), 
//     }),
//     typographyStyles: {
//       title: { fontWeight: 600, color: 'text.secondary' }, 
//       subtitle: { mt: 4.25, textAlign: 'center', color: 'text.disabled' }, 
//     },
//     chartOptions: theme => ({
//       chart: {
//         sparkline: { enabled: true }
//       },
//       stroke: { lineCap: 'round' },
//       colors: [hexToRGBA(theme.palette.primary.main, 1)],
//       states: {
//         hover: {
//           filter: { type: 'none' }
//         },
//         active: {
//           filter: { type: 'none' }
//         }
//       },
//       plotOptions: {
//         radialBar: {
//           endAngle: 90,
//           startAngle: -90,
//           hollow: { size: '64%' },
//           track: {
//             background: hexToRGBA(theme.palette.customColors.trackBg, 1)
//           },
//           dataLabels: {
//             name: { show: false },
//             value: {
//               offsetY: 3,
//               fontWeight: 500,
//               fontSize: '22px',
//               color: theme.palette.text.primary
//             }
//           }
//         }
//       }
//     }),
//     chartHeight: 138, 
//     subtitleText: '$21k Expenses more than last month', 
//   }
// };

// export default cardConfigurations;




//  basic cards configuration



// const templateConfig = {
//     statsHorizontal: [
//       {
//         id: 'card-1',
//         stats: {
//           id: 'stats-1',
//           value: '58,352',
//         },
//         trendNumber: {
//           id: 'trendNumber-1',
//           value: 29,
//         },
//         title: {
//           id: 'title-1',
//           value: 'Session',
//         },
//         avatarIcon: {
//           id: 'avatarIcon-1',
//           value: 'bx:trending-up',
//         },
//         subtitle: {
//           id: 'subtitle-1',
//           value: 'Last week analytics',
//         },
//         avatarColor: {
//           id: 'avatarColor-1',
//           value: 'primary',
//         },
//         trend: {
//           id: 'trend-1',
//           value: 'positive',
//         },
//       },
//       {
//         id: 'card-2',
//         stats: {
//           id: 'stats-2',
//           value: '28m 14s',
//         },
//         trendNumber: {
//           id: 'trendNumber-2',
//           value: 18,
//         },
//         title: {
//           id: 'title-2',
//           value: 'Time On Site',
//         },
//         avatarIcon: {
//           id: 'avatarIcon-2',
//           value: 'bx:time-five',
//         },
//         subtitle: {
//           id: 'subtitle-2',
//           value: 'Last day analytics',
//         },
//         avatarColor: {
//           id: 'avatarColor-2',
//           value: 'info',
//         },
//         trend: {
//           id: 'trend-2',
//           value: 'positive',
//         },
//       },
//       {
//         id: 'card-3',
//         stats: {
//           id: 'stats-3',
//           value: '62%',
//         },
//         trendNumber: {
//           id: 'trendNumber-3',
//           value: 14,
//         },
//         title: {
//           id: 'title-3',
//           value: 'Bounce Rate',
//         },
//         avatarIcon: {
//           id: 'avatarIcon-3',
//           value: 'bx:pie-chart-alt',
//         },
//         subtitle: {
//           id: 'subtitle-3',
//           value: 'Last week analytics',
//         },
//         avatarColor: {
//           id: 'avatarColor-3',
//           value: 'error',
//         },
//         trend: {
//           id: 'trend-3',
//           value: 'negative',
//         },
//       },
//       {
//         id: 'card-4',
//         stats: {
//           id: 'stats-4',
//           value: '18,472',
//         },
//         trendNumber: {
//           id: 'trendNumber-4',
//           value: 42,
//         },
//         title: {
//           id: 'title-4',
//           value: 'Users',
//         },
//         avatarIcon: {
//           id: 'avatarIcon-4',
//           value: 'bx:user',
//         },
//         subtitle: {
//           id: 'subtitle-4',
//           value: 'Last year analytics',
//         },
//         avatarColor: {
//           id: 'avatarColor-4',
//           value: 'success',
//         },
//         trend: {
//           id: 'trend-4',
//           value: 'positive',
//         },
//       },
//     ],
//   };
  
//   export default templateConfig;
  






//  template rendering 


// const templateConfig = [
//   {
//     id: 1,
//     uniqueKeyTitle: 'title1',
//     title: 'Sales',
//     uniqueKeyStats: 'stats1',
//     stats: 'Value',
//     uniqueKeySubtitle: 'subtitle1',
//     subtitle: 'Total Sales',
//     uniqueKeyAvatarIcon: 'avatarIcon1',
//     avatarIcon: 'mdi:sale',
//     uniqueKeyTrendNumber: 'trendNumber1',
//     trendNumber: '24',
//     uniqueKeyAvatarColor: 'avatarColor1',
//     avatarColor: 'primary',
//     uniqueKeyTrend: 'trend1',
//     trend: 'positive'
//   },
//   {
//     id: 2,
//     uniqueKeyTitle: 'title2',
//     title: 'Revenue',
//     uniqueKeyStats: 'stats2',
//     stats: '$345k',
//     uniqueKeySubtitle: 'subtitle2',
//     subtitle: 'Total Revenue',
//     uniqueKeyAvatarIcon: 'avatarIcon2',
//     avatarIcon: 'mdi:currency-usd',
//     uniqueKeyTrendNumber: 'trendNumber2',
//     trendNumber: '12',
//     uniqueKeyAvatarColor: 'avatarColor2',
//     avatarColor: 'success',
//     uniqueKeyTrend: 'trend2',
//     trend: 'positive'
//   },
  
// ];

// export default templateConfig;




//  level - 1



// templateConfig.js

// const templateConfig = [
//   {
//     id: 1,
//     uniqueKeyTitle: 'title1',
//     title: 'Sales',
//     uniqueKeyStats: 'stats1',
//     stats: 'Value',
//     uniqueKeySubtitle: 'subtitle1',
//     subtitle: 'Total Sales',
//     uniqueKeyAvatarIcon: 'avatarIcon1',
//     avatarIcon: 'mdi:sale',
//     uniqueKeyTrendNumber: 'trendNumber1',
//     trendNumber: '24',
//     uniqueKeyAvatarColor: 'avatarColor1',
//     avatarColor: 'primary',
//     uniqueKeyTrend: 'trend1',
//     trend: 'positive',
//     w: 2, // width of the card in grid units
//     h: 2, // height of the card in grid units
//     minW: 2, // minimum width of the card
//     minH: 2, // minimum height of the card
//     maxW: 4, // maximum width of the card
//     maxH: 4 // maximum height of the card
//   },
//   {
//     id: 2,
//     uniqueKeyTitle: 'title2',
//     title: 'Revenue',
//     uniqueKeyStats: 'stats2',
//     stats: '$345k',
//     uniqueKeySubtitle: 'subtitle2',
//     subtitle: 'Total Revenue',
//     uniqueKeyAvatarIcon: 'avatarIcon2',
//     avatarIcon: 'mdi:currency-usd',
//     uniqueKeyTrendNumber: 'trendNumber2',
//     trendNumber: '12',
//     uniqueKeyAvatarColor: 'avatarColor2',
//     avatarColor: 'success',
//     uniqueKeyTrend: 'trend2',
//     trend: 'positive',
//     w: 2,
//     h: 2,
//     minW: 2,
//     minH: 2,
//     maxW: 4,
//     maxH: 4
//   }
// ];

// export default templateConfig;






//  level- 1.1


const templateConfig = [
  {
    id: 1,
    uniqueKeyTitle: 'title1',
    title: 'Sales',
    uniqueKeyStats: 'stats1',
    stats: 'Value',
    uniqueKeySubtitle: 'subtitle1',
    subtitle: 'Total Sales',
    uniqueKeyAvatarIcon: 'avatarIcon1',
    avatarIcon: 'mdi:sale',
    uniqueKeyTrendNumber: 'trendNumber1',
    trendNumber: '24',
    uniqueKeyAvatarColor: 'avatarColor1',
    avatarColor: 'primary',
    uniqueKeyTrend: 'trend1',
    trend: 'positive',
    w: 2,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 4,
    maxH: 4
  },
  {
    id: 2,
    uniqueKeyTitle: 'title2',
    title: 'Revenue',
    uniqueKeyStats: 'stats2',
    stats: '$345k',
    uniqueKeySubtitle: 'subtitle2',
    subtitle: 'Total Revenue',
    uniqueKeyAvatarIcon: 'avatarIcon2',
    avatarIcon: 'mdi:currency-usd',
    uniqueKeyTrendNumber: 'trendNumber2',
    trendNumber: '12',
    uniqueKeyAvatarColor: 'avatarColor2',
    avatarColor: 'success',
    uniqueKeyTrend: 'trend2',
    trend: 'positive',
    w: 2,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 4,
    maxH: 4
  },
  {
    id: 3,
    uniqueKeyTitle: 'title3',
    title: 'Session',
    uniqueKeyStats: 'stats3',
    stats: '58,352',
    uniqueKeySubtitle: 'subtitle3',
    subtitle: 'Last week analytics',
    uniqueKeyAvatarIcon: 'avatarIcon3',
    avatarIcon: 'bx:trending-up',
    uniqueKeyTrendNumber: 'trendNumber3',
    trendNumber: '29',
    uniqueKeyAvatarColor: 'avatarColor3',
    avatarColor: 'primary',
    uniqueKeyTrend: 'trend3',
    trend: 'positive',
    w: 2,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 4,
    maxH: 4
  },
  {
    id: 4,
    uniqueKeyTitle: 'title4',
    title: 'Time On Site',
    uniqueKeyStats: 'stats4',
    stats: '28m 14s',
    uniqueKeySubtitle: 'subtitle4',
    subtitle: 'Last day analytics',
    uniqueKeyAvatarIcon: 'avatarIcon4',
    avatarIcon: 'bx:time-five',
    uniqueKeyTrendNumber: 'trendNumber4',
    trendNumber: '18',
    uniqueKeyAvatarColor: 'avatarColor4',
    avatarColor: 'info',
    uniqueKeyTrend: 'trend4',
    trend: 'positive',
    w: 2,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 4,
    maxH: 4
  },
  {
    id: 5,
    uniqueKeyTitle: 'title5',
    title: 'Bounce Rate',
    uniqueKeyStats: 'stats5',
    stats: '62%',
    uniqueKeySubtitle: 'subtitle5',
    subtitle: 'Last week analytics',
    uniqueKeyAvatarIcon: 'avatarIcon5',
    avatarIcon: 'bx:pie-chart-alt',
    uniqueKeyTrendNumber: 'trendNumber5',
    trendNumber: '14',
    uniqueKeyAvatarColor: 'avatarColor5',
    avatarColor: 'error',
    uniqueKeyTrend: 'trend5',
    trend: 'negative',
    w: 2,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 4,
    maxH: 4
  },
  {
    id: 6,
    uniqueKeyTitle: 'title6',
    title: 'Users',
    uniqueKeyStats: 'stats6',
    stats: '18,472',
    uniqueKeySubtitle: 'subtitle6',
    subtitle: 'Last year analytics',
    uniqueKeyAvatarIcon: 'avatarIcon6',
    avatarIcon: 'bx:user',
    uniqueKeyTrendNumber: 'trendNumber6',
    trendNumber: '42',
    uniqueKeyAvatarColor: 'avatarColor6',
    avatarColor: 'success',
    uniqueKeyTrend: 'trend6',
    trend: 'positive',
    w: 2,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 4,
    maxH: 4
  },

];

export default templateConfig;




//  level 1.1- for testing


