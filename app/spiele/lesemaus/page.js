"use client";

import React from 'react';
import Link from 'next/link';
import {
  Typography,
  Button,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import {
  Psychology as QuizIcon,
  ArrowForwardIos as ArrowIcon,
} from '@mui/icons-material';
import { StandardHeader } from '../../components/components/StandardHeader';
import { categoriesLeseMaus } from './functions/functions';

export default function LesemausOverviewSite() {
  const themes = categoriesLeseMaus();

  return (
    <Box sx={{minHeight: '100vh' }}>
      <StandardHeader/>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#4ba5f7', mb: 4, textAlign: 'center' }}>
            Lese Maus
          </Typography>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {themes.map((item, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(33, 149, 56, 0.1)',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <ListItem
                  sx={{
                    p: 3,
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: { xs: 2, sm: 0 }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: { xs: 'auto', sm: '56px' } }}>

                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          fontFamily: '"Outfit", sans-serif',
                          textAlign: { xs: 'center', sm: 'left' }
                        }}
                      >
                        {item.kategorie}
                      </Typography>
                    }
                  />

                  <Button
                    component={Link}
                    href={`/spiele/lesemaus/${item.id}`}
                    variant="contained"
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#f7bd4b',
                      px: 4,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        backgroundColor: '#f7bd4b',
                      }
                    }}
                    endIcon={<ArrowIcon />}
                  >
                    Los!
                  </Button>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Container>
    </Box>
  );
}
