"use client";

import { Box, Typography, Container } from '@mui/material';

// Destrukturiere die Props hier mit geschweiften Klammern
export const TextfieldUnderHeader = ({ header, subtext }) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 1, textAlign: 'center' }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: '900',
            color: '#4ba5f7',
            mb: 3,
            textAlign: { xs: 'center', md: 'center' },
            textTransform: 'uppercase',
            letterSpacing: 2
          }}
        >
          {header}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', lineHeight: 1.8 }}
        >
          {subtext}
        </Typography>
      </Box>
    </Container>
  );
};
