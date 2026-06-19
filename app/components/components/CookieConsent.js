// G-4BEMP9FEDP
  // components/CookieConsent.js
  'use client';
  import { useState, useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
  import { Box, Paper, Typography, Button } from '@mui/material';

  export default function CookieConsent() {
    const [consent, setConsent] = useState(null);

    useEffect(() => {
      const savedConsent = localStorage.getItem('user-consent');
      if (savedConsent) {
        setConsent(savedConsent === 'true');
      }
    }, []);

    const handleConsent = (isAccepted) => {
      localStorage.setItem('user-consent', isAccepted.toString());
      setConsent(isAccepted);
    };

    if (consent !== null) {
      return consent ? <GoogleAnalytics gaId="G-4BEMP9FEDP" /> : null;
    }

    return (
      <Paper
        elevation={6}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          p: 3,
          maxWidth: 350,
          zIndex: 9999,
          borderRadius: 2,
        }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          We use tracking to improve our quiz. Do you allow us to use Google Analytics?
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => handleConsent(false)}
          >
            Reject
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleConsent(true)}
          >
            Accept
          </Button>
        </Box>
      </Paper>
    );
  }
