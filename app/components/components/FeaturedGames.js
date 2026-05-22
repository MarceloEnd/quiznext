"use client";

import React from 'react';
import Link from 'next/link';
import {
  Typography,
  Box,
  Grid,
  Container,
  CardActionArea,
  Card,
  CardContent
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ExtensionIcon from '@mui/icons-material/Extension';
import CalculateIcon from '@mui/icons-material/Calculate';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';

export const FeaturedGames = () => {
  const featured = [
    {
      title: "Wortschlange",
      desc: "Folge der Spur!",
      icon: <ExtensionIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/spiele/wortschlange",
      gradient: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
      shadow: '0 8px 20px rgba(76, 175, 80, 0.3)'
    },
    {
      title: "Mathe-Quadrat",
      desc: "Stärke deine Kopfrechne Fähigkeiten",
      icon: <CalculateIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/spiele/rechnequadrat",
      gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
      shadow: '0 8px 20px rgba(33, 150, 243, 0.3)'
    },
    {
      title: "Sudoku",
      desc: "Bist du schlau genug?",
      icon: <SportsEsportsIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/spiele/sudoku6x6",
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
      shadow: '0 8px 20px rgba(255, 152, 0, 0.3)'
    },
    {
      title: "Wortsuche",
      desc: "Finde alle Wörter!",
      icon: <SpellcheckIcon sx={{ fontSize: { xs: 35, sm: 50 }, color: '#fff' }} />,
      path: "/spiele/wortsuche",
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
          textAlign: { xs: 'center', md: 'center' },
          textTransform: 'uppercase',
          letterSpacing: 2
        }}
      >
        Beliebteste Spiele
      </Typography>

      {/* FIXED: Added justifyContent="center" here to center the entire group of cards */}
      <Grid container spacing={2} sx={{justifyContent: 'center',}}>
        {featured.map((game, index) => (
          <Grid
            key={index}
            xs={6}
            sm={6}
            md={3}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: '24px',
                background: game.gradient,
                boxShadow: game.shadow,
                width: {xs: '150px', sm: '200px',md: '200px'},
                maxWidth: {xs: '150px', sm: '200px',md: '200px'},
                height: { xs: '150px', sm: '150px' },
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
