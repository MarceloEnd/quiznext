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
  Box,
  Container
} from '@mui/material';
import {
  ArrowForwardIos as ArrowIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { StandardHeader } from '../../components/components/StandardHeader';
import themes from './pictures.json'; // Directly importing the data

export default function WimmelbilderOverviewSite() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <StandardHeader />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 900, color: '#4ba5f7', mb: 4, textAlign: 'center' }}>
          Wimmelbilder
        </Typography>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {themes.map((item) => (
              <Paper
                key={item.id}
                elevation={3}
                sx={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(33, 149, 56, 0.15)'
                  }
                }}
              >
                <ListItem
                  sx={{
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <SearchIcon sx={{ fontSize: 45 }} />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: '#2D3436',
                          fontFamily: '"Outfit", sans-serif',
                          textAlign: { xs: 'center', sm: 'left' }
                        }}
                      >
                        {item.kategorie}
                      </Typography>
                    }
                  />

                  <Link href={`/spiele/wimmelbild/${item.id}`} passHref legacyBehavior>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: '16px',
                        backgroundColor: '#f7bd4b',
                        px: 4,
                        py: 1.5,
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        width: { xs: '100%', sm: 'auto' },
                        textTransform: 'none', // Keeps it friendly
                        '&:hover': { backgroundColor: '#f7bd4b' }
                      }}
                      endIcon={<ArrowIcon />}
                    >
                      Suchen!
                    </Button>
                  </Link>
                </ListItem>
              </Paper>
            ))}
          </List>

      </Container>
    </Box>
  );
}
