// import React, { useState } from 'react'
// import Accordion from '@mui/material/Accordion'
// import AccordionSummary from '@mui/material/AccordionSummary'
// import AccordionDetails from '@mui/material/AccordionDetails'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
// import Icon from 'src/@core/components/icon'

// const AccordionPayment = () => {
//   const [expanded, setExpanded] = useState(false);
//   const handleChange = panel => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//       <AccordionSummary expandIcon={<Icon icon="bx:chevron-down" />} id="form-layouts-collapsible-header-3" aria-controls="form-layouts-collapsible-content-3">
//         <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Variable Name</Typography>
//       </AccordionSummary>
//       <Divider sx={{ m: '0 !important' }} />
//       <AccordionDetails>
//         {/* Content goes here */}
//         <Typography>Payment details form would be here.</Typography>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default AccordionPayment;



//  modified by arman khan



// import React, { useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Icon from 'src/@core/components/icon';

// const AccordionPayment = () => {
//   const [expanded, setExpanded] = useState(false);
//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   return (
//     <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//       <AccordionSummary
//         expandIcon={<Icon icon="bx:chevron-down" />}
//         id="form-layouts-collapsible-header-3"
//         aria-controls="form-layouts-collapsible-content-3"
//       >
//         <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//           Variable Name
//         </Typography>
//       </AccordionSummary>
//       <Divider sx={{ m: '0 !important' }} />
//       <AccordionDetails>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Variable"
//               disabled
//               variant="outlined"
//               value="Variable Value"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Query"
//               disabled
//               variant="outlined"
//               value="Query Value"
//             />
//           </Grid>
//           <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
//             <Button variant="contained" color="primary">
//               Update
//             </Button>
//             <Button variant="outlined" color="secondary">
//               Cancel
//             </Button>
//           </Grid>
//         </Grid>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default AccordionPayment;






//  added edit button by arman khan






// import React, { useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Icon from 'src/@core/components/icon';

// const AccordionPayment = () => {
//   const [expanded, setExpanded] = useState(false);
//   const [isEditable, setIsEditable] = useState(false);
//   const [variableValue, setVariableValue] = useState('Variable Value');
//   const [queryValue, setQueryValue] = useState('Query Value');

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const handleEdit = () => {
//     setIsEditable(!isEditable);
//   };

//   return (
//     <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
//       <AccordionSummary
//         expandIcon={<Icon icon="bx:chevron-down" />}
//         id="form-layouts-collapsible-header-3"
//         aria-controls="form-layouts-collapsible-content-3"
//       >
//         <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//           Variable Name
//         </Typography>
//       </AccordionSummary>
//       <Divider sx={{ m: '0 !important' }} />
//       <AccordionDetails>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Variable"
//               disabled={!isEditable}
//               variant="outlined"
//               value={variableValue}
//               onChange={(e) => setVariableValue(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Query"
//               disabled={!isEditable}
//               variant="outlined"
//               multiline
//               minRows={4} // Doubles the height of the text area
//               value={queryValue}
//               onChange={(e) => setQueryValue(e.target.value)}
//               InputProps={{
//                 style: { overflow: 'auto' }, // Makes the text area scrollable
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
//             <Button variant="outlined" color="secondary" onClick={handleEdit}>
//               {isEditable ? 'Save' : 'Edit'}
//             </Button>
//             <div style={{ display: 'flex', gap: '8px' }}>
//               <Button variant="contained" color="primary" disabled={!isEditable}>
//                 Update
//               </Button>
//               <Button variant="outlined" color="secondary">
//                 Cancel
//               </Button>
//             </div>
//           </Grid>
//         </Grid>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default AccordionPayment;





// binded api to get all variables- modified by arman khan







// import React, { useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Icon from 'src/@core/components/icon';

// const AccordionPayment = ({ variable, onSave }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [isEditable, setIsEditable] = useState(false);
//   const [variableValue, setVariableValue] = useState(variable?.Name || '');
//   const [queryValue, setQueryValue] = useState(variable?.Query || '');

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const handleEdit = () => {
//     setIsEditable(!isEditable);
//   };

//   const handleSave = () => {
//     setIsEditable(false);
//     onSave(variable.ID, variableValue, queryValue); 
//     console.log("this is accordian save for ID---", variable.ID)
//   };



//   return (
//     <Accordion expanded={expanded} onChange={handleChange(variable.ID)}>
//       <AccordionSummary
//         expandIcon={<Icon icon="bx:chevron-down" />}
//         id={`accordion-${variable.ID}`}
//         aria-controls={`accordion-content-${variable.ID}`}
//       >
//         <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
//           {variable.Name}
//         </Typography>
//       </AccordionSummary>
//       <Divider sx={{ m: '0 !important' }} />
//       <AccordionDetails>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Variable"
//               disabled={!isEditable}
//               variant="outlined"
//               value={variableValue}
//               onChange={(e) => setVariableValue(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Query"
//               disabled={!isEditable}
//               variant="outlined"
//               multiline
//               minRows={4}
//               value={queryValue}
//               onChange={(e) => setQueryValue(e.target.value)}
//               InputProps={{
//                 style: { overflow: 'auto' },
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
//             <Button variant="outlined" color="secondary" onClick={handleEdit}>
//               {isEditable ? 'Save' : 'Edit'}
//             </Button>
//             {isEditable && (
//               <Button variant="contained" color="primary" onClick={handleSave}>
//                 Update
//               </Button>

//             )}

//           </Grid>
//         </Grid>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default AccordionPayment;



//  fixing the issue for build




import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Icon from 'src/@core/components/icon';

const AccordionPayment = ({ variable = {}, onSave }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [variableValue, setVariableValue] = useState(variable?.Name || '');
  const [queryValue, setQueryValue] = useState(variable?.Query || '');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = () => {
    setIsEditable(false);
    if (onSave && variable?.ID) {
      onSave(variable.ID, variableValue, queryValue);
    }
  };

  return (
    <Accordion expanded={expanded === variable?.ID} onChange={handleChange(variable?.ID)}>
      <AccordionSummary
        expandIcon={<Icon icon="bx:chevron-down" />}
        id={`accordion-${variable?.ID}`}
        aria-controls={`accordion-content-${variable?.ID}`}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          {variable?.Name || 'Unnamed Variable'}
        </Typography>
      </AccordionSummary>
      <Divider sx={{ m: '0 !important' }} />
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Variable"
              disabled={!isEditable}
              variant="outlined"
              value={variableValue}
              onChange={(e) => setVariableValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Query"
              disabled={!isEditable}
              variant="outlined"
              multiline
              minRows={4}
              value={queryValue}
              onChange={(e) => setQueryValue(e.target.value)}
              InputProps={{
                style: { overflow: 'auto' },
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleEdit}>
              {isEditable ? 'Save' : 'Edit'}
            </Button>
            {isEditable && (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Update
              </Button>
            )}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionPayment;
