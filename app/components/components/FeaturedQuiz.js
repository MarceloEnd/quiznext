"use client";

import React from 'react';
import Link from 'next/link';
import {
  Typography,
  Box,
  Grid, // Back to standard Grid
  Container,
  CardActionArea,
  Card,
  CardContent
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ExtensionIcon from '@mui/icons-material/Extension';
import CalculateIcon from '@mui/icons-material/Calculate';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';

export const FeaturedQuiz = () => {
  const featured = [
    {
      title: "Ponys und Pferde",
      desc: "Alles über Feen und Füchse",
      icon: <ExtensionIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/quiz/1",
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      shadow: '0 8px 20px rgba(76, 175, 80, 0.3)'
    },
    {
      title: "Farben",
      desc: "Der Farbkreis",
      icon: <CalculateIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/quiz/2",
      gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
      shadow: '0 8px 20px rgba(33, 150, 243, 0.3)'
    },

  ];

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 2 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: '900',
          color: '#4ba5f7',
          mb: 3,
          textAlign: { xs: 'center', md: 'left' },
          textTransform: 'uppercase',
          letterSpacing: 2
        }}
      >
        Beliebteste Quizze
      </Typography>

      {/* Grid container stays the same */}
      <Grid container spacing={2}>
        {featured.map((game, index) => (
          <Grid
            key={index}
            // 1. REMOVED the 'item' prop to stop the console error
            // 2. Breakpoints xs, sm, md work fine as long as 'item' is gone
            xs={6}
            sm={6}
            md={3}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 1 // Optional: manual padding if 'spacing' acts up
            }}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: '24px',
                background: game.gradient,
                boxShadow: game.shadow,
                width: {xs: '140px', sm: '140px'},
                maxWidth: {xs: '140px', sm: '140px'},
                height: { xs: '140px', sm: '140px' },
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              <CardActionArea
                component={Link}
                href={game.path}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CardContent sx={{
                    textAlign: 'center',
                    p: 1.5,
                    width: '100%',
                    boxSizing: 'border-box'
                }}>
                  <Box sx={{ mb: 1, display: 'flex', justifyContent: 'center' }}>
                    {game.icon}
                  </Box>

                  <Typography
                    sx={{
                        fontWeight: '900',
                        color: '#fff',
                        lineHeight: 1.1,
                        fontSize: { xs: '0.85rem', sm: '1rem' },
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                  >
                    {game.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.9)',
                      fontWeight: '500',
                      mt: 0.5,
                      fontSize: { xs: '0.65rem', sm: '0.8rem' },
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      lineHeight: 1.4,
                    }}
                  >
                    {game.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
