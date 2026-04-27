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

export const NewestGames = () => {
  const featured = [
    {
      title: "Wordle",
      desc: "Finde das Wort",
      icon: <ExtensionIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/spiele/wordle",
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      shadow: '0 8px 20px rgba(76, 175, 80, 0.3)'
    },
    {
      title: "Wimmelbilder",
      desc: "Finde die Fehler",
      icon: <CalculateIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/spiele/wimmelbild",
      gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
      shadow: '0 8px 20px rgba(33, 150, 243, 0.3)'
    },
    {
      title: "Das kleine 1x1",
      desc: "Wie schnell bist du",
      icon: <SportsEsportsIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/spiele/1x1",
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
      shadow: '0 8px 20px rgba(255, 152, 0, 0.3)'
    },
    {
      title: "Lese Maus",
      desc: "Knacke den Code",
      icon: <SpellcheckIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/spiele/lesemaus",
      gradient: 'linear-gradient(135deg, #E91E63 0%, #F06292 100%)',
      shadow: '0 8px 20px rgba(233, 30, 99, 0.3)'
    }
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
        Neuste Spiele
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
                width: {xs: '140px', sm: '150px'},
                maxWidth: {xs: '140px', sm: '150px'},
                height: { xs: '150px', sm: '160px' },
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
