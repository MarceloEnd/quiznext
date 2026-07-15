"use client";

import React from 'react';
import Link from 'next/link';
import { StandardHeader } from "../components/components/StandardHeader";
import {
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  Container,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import {
  Psychology as QuizIcon,
  ArrowForwardIos as ArrowIcon,
} from '@mui/icons-material';
import { categories } from "./functions/helper";

export default function OfflineOverviewSite() {
  const themes = categories();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="Start">
      <StandardHeader />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 900, color: '#4ba5f7', mb: 4, textAlign: 'center' }}>
          Offline Spiele
        </Typography>

        <Grid container spacing={3} justifycontent="center">
          {themes.map((item, index) => (
            <Grid
              key={index}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <Paper
                elevation={3}
                sx={{
                  borderRadius: '24px',
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: '#ffffff',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 24px rgba(75, 165, 247, 0.2)'
                  }
                }}
              >

                <Box sx={{ flexGrow: 1, mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#2D3436', mb: 1 }}>
                    {item[1]}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Kurzbeschreibung noch hinzufügen
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  component={Link}
                  href={`/offlinespiele/${item[0]}`}
                  fullWidth
                  sx={{
                    borderRadius: '16px',
                    backgroundColor: '#FF9800',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    py: 1.2,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)',
                    '&:hover': {
                      backgroundColor: '#e68900',
                      boxShadow: '0 6px 16px rgba(255, 152, 0, 0.4)',
                    }
                  }}
                  endIcon={<ArrowIcon />}
                >
                  Los gehts!
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
