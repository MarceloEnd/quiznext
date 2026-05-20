"use client";

import React from 'react';
// 1. Swap Link from react-router-dom to next/link
import Link from 'next/link';
import { StandardHeader } from "../components/components/StandardHeader";
import {
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import {
  Psychology as QuizIcon,
  ArrowForwardIos as ArrowIcon,
} from '@mui/icons-material';
import { categories } from "./functions/helper";

// 2. Use default export for Next.js pages
export default function JokeOverviewSite() {
  const themes = categories();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="Jokes Overview">
      <StandardHeader/>
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
          variant={isMobile ? "h4" : "h2"}
          gutterBottom
          sx={{
            fontWeight: 800,
            mb: 4,
            color: "#4ba5f7" // Move color here
          }}
          >
            Witze vom feinsten
          </Typography>

          <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {themes.map((item, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#4ba5f7',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
              >
                <ListItem
                  sx={{
                    p: 3,
                    flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile
                    gap: { xs: 2, sm: 0 }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: { xs: 0, sm: '56px' } }}>
                    <QuizIcon sx={{ fontSize: 40, color: '#412199' }} />
                  </ListItemIcon>

                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {item}
                      </Typography>
                    }
                    sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                  />

                  <Button
                    variant="contained"
                    component={Link}
                    // 3. Use href instead of to
                    href={`/witz/${index}`}
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#412199',
                      px: 4,
                      '&:hover': {
                        backgroundColor: '#2e176b',
                        filter: 'brightness(1.1)'
                      }
                    }}
                    endIcon={<ArrowIcon />}
                  >
                    Go!
                  </Button>
                </ListItem>
              </Paper>
            ))}
          </List>
        </Paper>
    </div>
  );
}
