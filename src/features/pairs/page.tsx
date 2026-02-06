"use client";
import React, { useState } from 'react';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import PairView from './components/PairView';
import SeePairsView from './components/SeePairsView';
export default function PairsPage() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (<>
    <Divider/>
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="pairs tabs" centered>
            <Tab label="Pair Users" />
            <Tab label="View Pairs" />
        </Tabs>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        {tabIndex === 0 && <PairView />}
        {tabIndex === 1 && <SeePairsView />}
      </Box>
    </Box>
    </>
  );
}
