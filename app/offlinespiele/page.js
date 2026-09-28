"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { StandardHeader } from "../components/components/StandardHeader";
import {
  Typography,
  Button,
  Paper,
  Grid,
  Container,
  Box,
  TextField,
  MenuItem,
  Stack
} from '@mui/material';
import {
  ArrowForwardIos as ArrowIcon,
} from '@mui/icons-material';
import { categories } from "./functions/helper";

export default function OfflineOverviewSite() {
  const themes = categories();

  // Filter states
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedSpieler, setSelectedSpieler] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  // Filtering logic
  const filteredThemes = themes.filter(item => {
    // Filter by Age (e.g., game minAge must be less than or equal to selected age)
    const matchesAge = selectedAge ? item.minAge <= Number(selectedAge) : true;

    // Filter by Spieler (e.g., selected player count fits between min and max)
    const matchesSpieler = selectedSpieler
      ? Number(selectedSpieler) >= item.minSpieler && Number(selectedSpieler) <= item.maxSpieler
      : true;

    // Filter by Duration (exact match or simple string check)
    const matchesDuration = selectedDuration ? item.duration.includes(selectedDuration) : true;

    return matchesAge && matchesSpieler && matchesDuration;
  });

  return (
    <div className="Start">
      <StandardHeader />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 900, color: '#4ba5f7', mb: 4, textAlign: 'center' }}>
          Offline Spiele
        </Typography>

        {/* --- FILTER SECTION --- */}
        <Paper elevation={1} sx={{ p: 3, mb: 4, borderRadius: '16px', backgroundColor: '#f8fbff' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#4ba5f7' }}>
            Spiele filtern
          </Typography>
          <Grid container spacing={2}>
            {/* Filter by Alter */}
            <Grid item="true" xs={12} sm={4} sx={2}>
              <TextField
                select
                fullWidth
                label="Max. Alter"
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                size="small"
                sx={{ backgroundColor: '#fff', borderRadius: 1, minWidth: { sm: '150px', xs: '120px' } }}
              >
                <MenuItem value="">Alle</MenuItem>
                <MenuItem value="6">Ab 6 Jahren</MenuItem>
                <MenuItem value="8">Ab 8 Jahren</MenuItem>
                <MenuItem value="10">Ab 10 Jahren</MenuItem>
                <MenuItem value="12">Ab 12 Jahren</MenuItem>
                <MenuItem value="16">Ab 16 Jahren</MenuItem>
              </TextField>
            </Grid>

            {/* Filter by Spieler */}
            <Grid item="true" xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Anzahl Spieler"
                value={selectedSpieler}
                onChange={(e) => setSelectedSpieler(e.target.value)}
                size="small"
                sx={{ backgroundColor: '#fff', borderRadius: 1, minWidth: { sm: '150px', xs: '150px' } }}
              >
                <MenuItem value="">Alle</MenuItem>
                <MenuItem value="2">2 Spieler</MenuItem>
                <MenuItem value="3">3 Spieler</MenuItem>
                <MenuItem value="4">4 Spieler</MenuItem>
                <MenuItem value="5">5 Spieler</MenuItem>
                <MenuItem value="6">6+ Spieler</MenuItem>
              </TextField>
            </Grid>

            {/* Filter by Dauer */}
            <Grid item="true" xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Dauer"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                size="small"
                sx={{ backgroundColor: '#fff', borderRadius: 1, minWidth: { sm: '150px', xs: '100px' } }}
              >
                <MenuItem value="">Alle</MenuItem>
                <MenuItem value="10min">10 min</MenuItem>
                <MenuItem value="15min">15 min</MenuItem>
                <MenuItem value="30min">30 min</MenuItem>
                <MenuItem value="60min">60+ min</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Paper>

        {/* --- CARDS GRID --- */}
        <Grid container spacing={3} sx={{justifyContent: 'center'}}>
          {filteredThemes.length > 0 ? (
            filteredThemes.map((item, index) => (
              <Grid item="true" key={index} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: '24px',
                    p: 3,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: '#ffffff',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 24px rgba(75, 165, 247, 0.2)'
                    }
                  }}
                >
                  <Box sx={{ flexGrow: 1, mb: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#2D3436', mb: 1 }}>
                      {item.name}
                    </Typography>

                    <Box sx={{ my: 4 }}>
                      <Grid container spacing={2}>
                        {[
                          { label: "Spieler", value: `${item.minSpieler}-${item.maxSpieler}` },
                          { label: "Alter", value: `${item.minAge}+` },
                          { label: "Dauer", value: item.duration }
                        ].map((subItem, idx) => (
                          <Grid item="true" xs={4} key={idx}>
                            <Paper elevation={0} sx={{ p: 1, textAlign: 'center', bgcolor: '#c5efff', borderRadius: 2 }}>
                              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>{subItem.label}</Typography>
                              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{subItem.value}</Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        maxWidth: '400px',
                        minWidth: '400px'
                      }}
                    >
                      {item.shortText}
                    </Typography>
                  </Box>
                  <br/>
                  <Button
                    variant="contained"
                    component={Link}
                    href={`/offlinespiele/${item.id}`}
                    fullWidth
                    sx={{
                      borderRadius: '16px',
                      backgroundColor: '#FF9800',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      py: 1.2,
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)',
                      '&:hover': {
                        backgroundColor: '#e68900',
                        boxShadow: '0 6px 16px rgba(255, 152, 0, 0.4)',
                      }
                    }}
                    endIcon={<ArrowIcon />}
                  >
                    Los gehts!
                  </Button>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 4 }}>
                Keine Spiele gefunden, die diesen Filtern entsprechen.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}
