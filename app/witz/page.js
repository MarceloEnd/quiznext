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

export default function JokeOverviewSite() {
  const themes = categories();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="Jokes Overview">
      <StandardHeader />
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 6 },
          textAlign: 'center',
          bgcolor: '#c5efff',
          borderRadius: '24px'
        }}
      >
        <Typography
          variant={isMobile ? "h4" : "h2"}
          gutterBottom
          sx={{ fontWeight: 800, mb: 6, color: "#4ba5f7" }}
        >
          Witze vom feinsten
        </Typography>

        {/* Grid anstelle von List */}
        <Grid container spacing={3} justifycontent="center" direction="row">
          {themes.map((item, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: '24px',
                  backgroundColor: '#4ba5f7',
                  color: 'white',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.03)' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  minWidth: { xs: '150px', sm: '200px' },
                  maxWidth: { xs: '150px', sm: '200px' },
                  height: { xs: '150px', sm: '200px' },
                  p: 0
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {item}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    component={Link}
                    href={`/witz/${index}`}
                    sx={{
                      borderRadius: '12px',
                      backgroundColor: '#412199',
                      px: 4,
                      '&:hover': { backgroundColor: '#2e176b' }
                    }}
                    endIcon={<ArrowIcon />}
                  >
                    Go!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
