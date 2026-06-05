"use client"; // Required for MUI hooks and interactivity

import React from 'react';
import Link from 'next/link';
import { StandardHeader } from "../components/components/StandardHeader";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
// Grouped Game Data
const GAMES = [
  {
    title: "Fehlersuche",
    basePath: "/spiele/fehlersuche",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }],
    description: "Finde alle Fehler innerhalb des Bildes"
  },
  {
    title: "Memory (Symbole)",
    basePath: "/spiele/memorys",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ]
  },
  {
    title: "Memory (Farben)",
    basePath: "/spiele/memorycolor",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ],
    description: ""
  },
  {
    title: "Memory (Versus)",
    basePath: "/spiele/memoryversus",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ],
    description: ""
  },
  {
    title: "Sudoku 4x4",
    basePath: "/spiele/sudoku4x4",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }],
    description: ""
  },
  {
    title: "Sudoku 6x6",
    basePath: "/spiele/sudoku6x6",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ],
    description: ""
  },
  {
    title: "Rechne Quadrat",
    basePath: "/spiele/rechnequadrat",
    difficulties: [
      { label: "Leicht", query: "?leicht", color: "#4caf50" },
      { label: "Normal", query: "", color: "#2196f3" },
      { label: "Schwer", query: "?schwer", color: "#f44336" }
    ],
    description: ""
  },
  {
    title: "Wort Suche",
    basePath: "/spiele/wortsuche",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }],
    description: ""
  },
  {
    title: "Wort Schlange",
    basePath: "/spiele/wortschlange",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }],
    description: ""
  },
  {
    title: "Das kleine 1x1",
    basePath: "/spiele/1x1",
    difficulties: [
      { label: "Mal", query: "", color: "#4caf50" },
      { label: "Mal ⌛", query: "zeit", color: "#2196f3" },
      { label: "Geteilt", query: "geteilt", color: "#f44336" }
    ],
    description: ""
  },
  {
    title: "Wimmelbild",
    basePath: "/spiele/wimmelbild",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }],
    description: ""
  },
  {
    title: "Lese-Maus",
    basePath: "/spiele/lesemaus",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }],
    description: ""
  },
  {
    title: "Wordle",
    basePath: "/spiele/wordle",
    difficulties: [{ label: "Spielen", query: "", color: "#219538ff" }],
    description: ""
  },
];

export default function GameOverviewSite() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <StandardHeader previousPath="/" />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant={isMobile ? "h4" : "h2"}
          gutterBottom
          sx={{ fontWeight: 800, textAlign: 'center', color: "#4ba5f7", textTransform: 'uppercase', mb: 6 }}
        >
          Spiele
        </Typography>

        {/* Grid Container für die Karten */}
        <Grid container spacing={3} >
          {GAMES.map((game, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: '24px',
                  p: 2,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              >
                <CardContent sx={{ textAlign: 'center', pb: 0 }}>
                  <VideogameAssetIcon sx={{ fontSize: 50, color: '#4ba5f7', mb: 1 }} />
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#2D3436', mb: 1 }}>
                    {game.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {game.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ flexDirection: 'row', gap: 1, width: '100%' }}>
                  {game.difficulties.map((diff) => (
                    <Button
                      key={diff.label}
                      variant="contained"
                      component={Link}
                      href={`${game.basePath}${diff.query}`}
                      fullWidth
                      sx={{
                        borderRadius: '10px',
                        backgroundColor: diff.color,
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: diff.color, filter: 'brightness(0.9)' },
                      }}
                    >
                      {diff.label}
                    </Button>
                  ))}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
