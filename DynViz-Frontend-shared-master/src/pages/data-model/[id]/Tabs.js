import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Variables from './Variables';
import Filters from './Filters';
import Loader from '../components/Loader';

const TabComponent = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setLoading(true); // Show loader on tab switch
    setTimeout(() => {
      setValue(newValue);
      setLoading(false); // Hide loader after 500ms
    }, 500);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Variables" />
        <Tab label="Filters" />
      </Tabs>
      <Box sx={{ p: 4 }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {value === 0 && <Variables />}
            {value === 1 && <Filters />}
          </>
        )}
      </Box>
    </Box>
  );
};

export default TabComponent;
