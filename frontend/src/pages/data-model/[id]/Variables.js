// import { useRouter } from 'next/router';
// import AccordionPayment from '../components/AccordionPayment';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// const Variables = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" sx={{ mb: 4 }}>
//         Variables
//       </Typography>
//       <AccordionPayment />
//       <AccordionPayment />
//       <AccordionPayment />
//     </Box>
//   );
// };

// export default Variables;





// binded get all variables api- modified by arman khan






import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AccordionPayment from '../components/AccordionPayment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import getAllVariables from 'src/api/variables/getAllVariables';

const Variables = () => {
  const router = useRouter();
  const { id } = router.query;
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchVariables = async () => {
        try {
          const response = await getAllVariables(id);
          setVariables(response?.Data || []);
        } catch (err) {
          setError('Failed to fetch variables');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchVariables();
    }
  }, [id]);

  const handleSave = (id, updatedName, updatedQuery) => {
    // Logic to handle saving the updated variable
    console.log('Saved Variable:', { id, updatedName, updatedQuery });
  };

  if (loading) {
    return <Typography variant='h6' align='center'>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Variables
      </Typography>
      {variables.map((variable) => (
        <AccordionPayment key={variable.ID} variable={variable} onSave={handleSave} />
      ))}
    </Box>
  );
};

export default Variables;
