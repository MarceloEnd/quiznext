"use client";

import React from 'react';
import Link from 'next/link';
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
import { categoriesWortSchlange } from './functions/functions';

export default function WortschlangeOverviewSite() {
  const themes = categoriesWortSchlange();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fdfdfd' }}>
      <StandardHeader previousPath="/spiele" />

      <Container maxWidth="md" sx={{ mt: 4, pb: 10 }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, sm: 6 },
            textAlign: 'center',
            borderRadius: 4,
            bgcolor: 'white'
          }}
        >
          <Typography
            variant="h2"
            color="primary"
            gutterBottom
            sx={{
              fontWeight: 900,
              mb: 4,
              fontSize: { xs: '2.5rem', sm: '3.75rem' },
              letterSpacing: -1
            }}
          >
            Wort Schlange
          </Typography>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {themes.map((item, index) => (
              <Paper
                key={item.id || index}
                elevation={3}
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#e3fae8ff',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6
                  }
                }}
              >
                <ListItem
                  sx={{
                    p: { xs: 2, sm: 3 },
                    flexDirection: { xs: 'column', sm: 'row' },
                    textAlign: { xs: 'center', sm: 'left' },
                    gap: { xs: 2, sm: 0 }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: { xs: 0, sm: 56 } }}>
                    <QuizIcon sx={{ fontSize: 40, color: '#219538ff' }} />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {item.kategorie}
                      </Typography>
                    }
                    secondary="Finde die versteckten Wörter"
                  />

                  <Link href={`/spiele/wortschlange/${item.id}`} passHref legacyBehavior>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: '12px',
                        backgroundColor: '#219538ff',
                        px: 4,
                        py: 1.5,
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#219538ff',
                          filter: 'brightness(0.9)'
                        }
                      }}
                      endIcon={<ArrowIcon />}
                    >
                      Starten
                    </Button>
                  </Link>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
