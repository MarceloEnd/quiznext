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
import { setIcon } from './functions';

export const FeaturedOfflineGames = () => {
  const featured = [
    {
      title: "Uno",
      desc: "Uno Uno",
      path: "/offlinespiele/1",
      gradient: 'linear-gradient(135deg, #412199 0%, #412199 100%)',
      shadow: '0 8px 20px rgba(76, 175, 80, 0.3)',
      iconSrc: "spiele"
    },
    {
      title: "Monopoly",
      desc: "Gehe nicht ins Gefängnis",
      path: "/offlinespiele/2",
      gradient: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
      shadow: '0 8px 20px rgba(33, 150, 243, 0.3)',
      iconSrc: "spiele"
    },
    {
      title: "Jenga",
      desc: "Wie hoch kannst du den Turm bauen?",
      path: "/offlinespiele/3",
      gradient: 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)',
      shadow: '0 8px 20px rgba(255, 152, 0, 0.3)',
      iconSrc: "spiele"
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
          textAlign: { xs: 'center', md: 'center' },
          textTransform: 'uppercase',
          letterSpacing: 2
        }}
      >
        Offline Spiele
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
                    <Box
                      component="img"
                      src={setIcon(game.iconSrc)}
                      sx={{ width: 60, height: 45 , mb: 1, display: 'inline-block'}}
                    />
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
