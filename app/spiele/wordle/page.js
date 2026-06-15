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
import { setIcon } from '../../components/components/functions';
import { categoriesWordle } from './functions/functions';


export default function WordleOverviewSite() {
  const themes = categoriesWordle();

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <StandardHeader/>

      <Box sx={{ p: { xs: 2, sm: 6 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 6 },
            textAlign: 'center',
            bgcolor: 'white',
            borderRadius: '24px'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: '#219538',
              mb: 4,
              fontSize: { xs: '2.5rem', sm: '3.75rem' },
              fontFamily: '"Outfit", sans-serif'
            }}
            gutterBottom
          >
            Wordle
          </Typography>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {themes.map((item, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#e3fae8',
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
                    <Box
                      component="img"
                      src={setIcon(item.iconSrc)}
                      sx={{ width: 60, height: 45 }}
                    />
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
                    href={`/spiele/wordle/${item.id}`}
                    variant="contained"
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#219538',
                      px: 4,
                      fontWeight: 'bold',
                      textTransform: 'none',
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        backgroundColor: '#1a7a2e',
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
        </Paper>
      </Box>
    </Box>
  );
  }
