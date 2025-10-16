// // cardTemplatePopUp.js

// export const cardTemplates = [
//     {
//       id: "card-1", // Unique ID for the card
//       layout: {
//         i: "card-1", // ID for react-grid-layout
//         x: 0, // Initial x position
//         y: 0, // Initial y position
//         w: 4, // Width in grid units
//         h: 3, // Height in grid units
//         minW: 2, // Minimum width
//         minH: 2, // Minimum height
//       },
//       styles: {
//         container: {
//           backgroundColor: "#fff",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           display: "flex",
//           flexDirection: "column",
//           height: "100%",
//         },
//         header: {
//           padding: "16px",
//           borderBottom: "1px solid #eee",
//           fontSize: "18px",
//           fontWeight: "bold",
//           color: "#333",
//         },
//         mainContent: {
//           padding: "16px",
//           flexGrow: 1,
//           overflowY: "auto",
//           color: "#555",
//           fontSize: "14px",
//         },
//       },
//       content: {
//         header: "Header",
//         mainContent: "Main Content",
//       },
//     },
//     {
//       id: "card-2", // Unique ID for the card
//       layout: {
//         i: "card-2", // ID for react-grid-layout
//         x: 4, // Initial x position
//         y: 0, // Initial y position
//         w: 4, // Width in grid units
//         h: 4, // Height in grid units
//         minW: 2, // Minimum width
//         minH: 3, // Minimum height
//       },
//       styles: {
//         container: {
//           backgroundColor: "#f8f9fa",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           display: "flex",
//           flexDirection: "column",
//           height: "100%",
//         },
//         header: {
//           padding: "16px",
//           borderBottom: "1px solid #eee",
//           fontSize: "18px",
//           fontWeight: "bold",
//           color: "#333",
//         },
//         mainContent: {
//           padding: "16px",
//           flexGrow: 1,
//           overflowY: "auto",
//           color: "#555",
//           fontSize: "14px",
//         },
//         footer: {
//           padding: "16px",
//           borderTop: "1px solid #eee",
//           fontSize: "14px",
//           color: "#777",
//           textAlign: "right",
//         },
//       },
//       content: {
//         header: "Header ",
//         mainContent: "Main Content",
//         footer: "Footer"
//       },
//     },
//   ];
  
//   export default cardTemplates;
  



//  level 1.1




// export const cardTemplates = [
//     {
//       id: "card-1", // Unique ID for the card
//       layout: {
//         i: "card-1", // ID for react-grid-layout
//         x: 0, // Initial x position
//         y: 0, // Initial y position
//         w: 4, // Width in grid units
//         h: 4, // Height in grid units
//         minW: 3, // Minimum width
//         minH: 4, // Minimum height
//         maxW: 6, // Maximum width
//         maxH: 8, // Maximum height
//       },
//       styles: {
//         container: {
//           backgroundColor: "#fff",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center", // Center the content horizontally
//           justifyContent: "center", // Center the content vertically
//           height: "100%",
//         },
//         label: {
//           fontSize: "16px",
//           color: "#333",
//           marginBottom: "8px",
//         },
//         mainContent: {
//           fontSize: "24px",
//           fontWeight: "bold",
//           color: "#555",
//         },
//       },
//       content: {
//         label: "Label Text",
//         mainContent: "Main Content",
//       },
//     },
//     {
//       id: "card-2", // Unique ID for the card
//       layout: {
//         i: "card-2", // ID for react-grid-layout
//         x: 4, // Initial x position
//         y: 0, // Initial y position
//         w: 4, // Width in grid units
//         h: 4, // Height in grid units
//         minW: 3, // Minimum width
//         minH: 4, // Minimum height
//         maxW: 6, // Maximum width
//         maxH: 8, // Maximum height
//       },
//       styles: {
//         container: {
//           backgroundColor: "#f8f9fa",
//           border: "1px solid #ddd",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center", // Center the content horizontally
//           justifyContent: "space-around", // Space the content evenly
//           height: "100%",
//           padding: "16px",
//         },
//         label: {
//           fontSize: "16px",
//           color: "#333",
//           marginBottom: "8px",
//         },
//         mainContent: {
//           fontSize: "24px",
//           fontWeight: "bold",
//           color: "#555",
//         },
//         footerLabel: {
//           fontSize: "14px",
//           color: "#777",
//           marginTop: "8px",
//         },
//       },
//       content: {
//         label: "Label Text",
//         mainContent: "Main Content",
//         footerLabel: "Footer Label",
//       },
//     },
//   ];
  
//   export default cardTemplates;
  









//  Dashboard task- 3




// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';


// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// export const cardTemplates = [
//   {
//     id: "card-1",
//     layout: {
//       i: "card-1",
//       x: 0,
//       y: 0,
//       w: 4,
//       h: 4,
//       minW: 3,
//       minH: 4,
//       maxW: 6,
//       maxH: 8,
//     },
//     styles: {
//       container: {
//         backgroundColor: "#fff",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100%",
//       },
//       label: {
//         fontSize: "16px",
//         color: "#333",
//         marginBottom: "8px",
//       },
//       mainContent: {
//         fontSize: "24px",
//         fontWeight: "bold",
//         color: "#555",
//       },
//     },
//     content: {
//       label: "Label Text",
//       mainContent: "Main Content",
//     },
//   },
//   {
//     id: "card-2",
//     layout: {
//       i: "card-2",
//       x: 4,
//       y: 0,
//       w: 4,
//       h: 4,
//       minW: 3,
//       minH: 4,
//       maxW: 6,
//       maxH: 8,
//     },
//     styles: {
//       container: {
//         backgroundColor: "#f8f9fa",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "space-around",
//         height: "100%",
//         padding: "16px",
//       },
//       label: {
//         fontSize: "16px",
//         color: "#333",
//         marginBottom: "8px",
//       },
//       mainContent: {
//         fontSize: "24px",
//         fontWeight: "bold",
//         color: "#555",
//       },
//       footerLabel: {
//         fontSize: "14px",
//         color: "#777",
//         marginTop: "8px",
//       },
//     },
//     content: {
//       label: "Label Text",
//       mainContent: "Main Content",
//       footerLabel: "Footer Label",
//     },
//   },
//   {
//     id: "card-pie-chart", 
//     layout: {
//       i: "card-pie-chart", 
//       x: 0, 
//       y: 4, 
//       w: 6, 
//       h: 6, 
//       minW: 4, 
//       minH: 4, 
//       maxW: 8, 
//       maxH: 10, 
//     },
//     styles: {
//       container: {
//         backgroundColor: "#fff",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100%",
//         padding: "16px",
//       },
//       label: {
//         fontSize: "16px",
//         color: "#333",
//         marginBottom: "8px",
//       },
//     },
//     content: {
//       label: "Pie Chart",
//       chartData: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [
//           {
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(255, 206, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)',
//               'rgba(153, 102, 255, 0.2)',
//               'rgba(255, 159, 64, 0.2)',
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//               'rgba(255, 159, 64, 1)',
//             ],
//             borderWidth: 1,
//           },
//         ],
//       },
//     },
//   },
// ];

// export default cardTemplates;




// Dashboard Task - 4



import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export const cardTemplates = [
  {
    id: 10001,
    layout: {
      i: "card-1",
      x: 0,
      y: 0,
      w: 4,
      h: 4,
      minW: 3,
      minH: 4,
      maxW: 6,
      maxH: 8,
    },
    styles: {
      container: {
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      },
      label: {
        fontSize: "16px",
        color: "#333",
        marginBottom: "8px",
      },
      mainContent: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#555",
      },
    },
    content: {
      label: "Patient Count",
      mainContent: "266",
    },
  },
  {
    id: 10002,
    layout: {
      i: "card-2",
      x: 4,
      y: 0,
      w: 4,
      h: 4,
      minW: 3,
      minH: 4,
      maxW: 6,
      maxH: 8,
    },
    styles: {
      container: {
        backgroundColor: "#f8f9fa",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%",
        padding: "16px",
      },
      label: {
        fontSize: "16px",
        color: "#333",
        marginBottom: "8px",
      },
      mainContent: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#555",
      },
      footerLabel: {
        fontSize: "14px",
        color: "#777",
        marginTop: "8px",
      },
    },

    content: {
      label: "Label Text",
      mainContent: "Main Content",
      footerLabel: "Footer Label",
    },
  },
  // {
  //   id: 'card-pie-chart',
  //   layout: {
  //     i: "card-pie-chart",
  //     x: 0,
  //     y: 4,
  //     w: 6,
  //     h: 6,
  //     minW: 4,
  //     minH: 7,
  //     maxW: 8,
  //     maxH: 10,
  //   },
  //   styles: {
  //     container: {
  //       backgroundColor: "#fff",
  //       border: "1px solid #ddd",
  //       borderRadius: "8px",
  //       boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  //       display: "flex",
  //       flexDirection: "column",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       height: "100%",
  //       padding: "16px",
  //     },
  //     label: {
  //       fontSize: "16px",
  //       color: "#333",
  //       marginBottom: "8px",
  //     },
  //   },
  //   content: {
  //     label: "Pie Chart",
  //     chartData: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [
  //         {
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3],
  //           data: [12, 19, 3, 5, 2, 3],
  //           backgroundColor: [
  //             'rgba(255, 99, 132, 0.8)',  
  //             'rgba(54, 162, 235, 0.8)',  
  //             'rgba(255, 206, 86, 0.8)',  
  //             'rgba(75, 192, 192, 0.8)',  
  //             'rgba(153, 102, 255, 0.8)', 
  //             'rgba(255, 159, 64, 0.8)',  
  //           ],
  //           borderColor: [
  //             'rgba(255, 99, 132, 1)',
  //             'rgba(54, 162, 235, 1)',
  //             'rgba(255, 206, 86, 1)',
  //             'rgba(75, 192, 192, 1)',
  //             'rgba(153, 102, 255, 1)',
  //             'rgba(255, 159, 64, 1)',
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //   },
  // },
];

export default cardTemplates;





// Dashboard task -5





// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ChartJS.register(Title, Tooltip, Legend, ArcElement);

// export const cardTemplates = [
//   {
//     id: 10001,
//     layout: {
//       i: "card-1",
//       x: 0,
//       y: 0,
//       w: 4,
//       h: 4,
//       minW: 3,
//       minH: 4,
//       maxW: 6,
//       maxH: 8,
//     },
//     styles: {
//       container: {
//         backgroundColor: "#fff",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100%",
//       },
//     },
//     datablocks: {
//       label: {
//         id: 10001,
//         styles: {
//           fontSize: "16px",
//           color: "#333",
//           marginBottom: "8px",
//         },
//         content: "Label Text"
//       },
//       mainContent: {
//         id: 10002,
//         styles: {
//           fontSize: "24px",
//           fontWeight: "bold",
//           color: "#555",
//         },
//         content: "Main Content"
//       }
//     }
//   },

//   {
//     id: 10002,
//     layout: {
//       i: "card-2",
//       x: 4,
//       y: 0,
//       w: 4,
//       h: 4,
//       minW: 3,
//       minH: 4,
//       maxW: 6,
//       maxH: 8,
//     },
//     styles: {
//       container: {
//         backgroundColor: "#f8f9fa",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "space-around",
//         height: "100%",
//         padding: "16px",
//       },
//     },

//     datablocks: {
//       label: {
//         id: 10001,
//         styles: {
//           fontSize: "16px",
//           color: "#333",
//           marginBottom: "8px",
//         },
//         content: "Label Text"
//       },
//       mainContent: {
//         id: 10002,
//         styles: {
//           fontSize: "24px",
//           fontWeight: "bold",
//           color: "#555",
//         },
//         content: "Main Content"
//       },
//       footerLabel : {
//         id: 10003, 
//         styles: {
//           fontSize: "14px",
//           color: "#777",
//           marginTop: "8px",
//         },
//         content: "Footer Label"
//       }
//     }
    

//   },

// ];

// export default cardTemplates;








//  Dashboard Task - 6



