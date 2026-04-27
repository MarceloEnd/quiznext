"use client";

import Link from 'next/link';
import { Box, Typography, Button, Container } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { StandardHeader } from './components/components/StandardHeader';
import { Footer } from './components/components/Footer';

export default function NotFound() {
  return (
    <>
      <StandardHeader />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          bgcolor: '#f5f7fa',
          p: 3,
        }}
      >
        <Container maxWidth="sm">
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: '5rem', color: '#1976d2', mb: 2 }}
          />

          <Typography variant="h2" fontWeight="900" gutterBottom>
            404
          </Typography>

          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Hoppla! Diese Seite konnten wir leider nicht finden.
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            Vielleicht hast du dich vertippt oder die Seite wurde verschoben.
          </Typography>

          <Link href="/" passHref>
            <Button
              variant="contained"
              size="large"
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              Zurück zur Startseite
            </Button>
          </Link>
        </Container>
      </Box>
    </>
  );
}
