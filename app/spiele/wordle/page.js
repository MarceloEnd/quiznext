"use client";

import React from 'react';
import Link from 'next/link'; // Changed from react-router-dom
import {
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Box
} from '@mui/material';
import {
  Psychology as QuizIcon,
  ArrowForwardIos as ArrowIcon,
} from '@mui/icons-material';
import { StandardHeader } from '../../components/components/StandardHeader';

export default function WordleOverviewSite() {

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fdfdfd' }}>
      <StandardHeader previousPath="/spiele"/>

      <Container maxWidth="md" sx={{ mt: 4, pb: 10 }}>
        <Paper elevation={4} sx={{ p: { xs: 3, sm: 6 }, textAlign: 'center', borderRadius: 4 }}>
          <Typography
            variant="h2"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 900, mb: 4, fontSize: { xs: '2.5rem', sm: '3.75rem' } }}
          >
            Wort Suche
          </Typography>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        </Paper>
      </Container>
    </Box>
  );
}
