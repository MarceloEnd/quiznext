"use client"; // Required for useState, useRef, and onClick handlers

import React, { useState, useRef } from 'react';
import Image from 'next/image'; // Optimized Next.js Image component
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid
} from '@mui/material';

// Import your images from the public folder or relative path
// Note: In Next.js, it's often easiest to put images in /public/images/...
// and reference them as strings: "/images/Fehlersuche/1OhneFehler.png"
import OhneFehler1 from './Fehlersuche/1OhneFehler.png';
import MitFehler1 from './Fehlersuche/1MitFehler.png';

import { StandardHeader } from '../../components/components/StandardHeader';
import { EndMenuNextGame } from '../../components/components/EndMenuNextGame';

const DIFFERENCES = [
  { id: 1, x: 34.4, y: 70.0, r: 4, name: "Ei-Symbol" },
  { id: 2, x: 55.5, y: 14.4, r: 5, name: "Schmetterling" },
  { id: 3, x: 43.3, y: 29.3, r: 3, name: "Herz-Wange" },
  { id: 4, x: 8.7, y: 77.8, r: 5, name: "Blume links" },
  { id: 5, x: 73.8, y: 47.5, r: 4, name: "Blume rechts" },
  { id: 6, x: 89.2, y: 25.9, r: 4, name: "Gänseblümchen" }
];

export default function SpotTheDifferenceSite() {
  const [foundIds, setFoundIds] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const clickableImageRef = useRef(null);

  const handleImageClick = (e) => {
    if (gameWon || !clickableImageRef.current) return;

    const rect = clickableImageRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const clickedDiff = DIFFERENCES.find(diff => {
      const distance = Math.sqrt(
        Math.pow(clickX - diff.x, 2) + Math.pow(clickY - diff.y, 2)
      );
      return distance < diff.r && !foundIds.includes(diff.id);
    });

    if (clickedDiff) {
      const newFoundIds = [...foundIds, clickedDiff.id];
      setFoundIds(newFoundIds);

      if (newFoundIds.length === DIFFERENCES.length) {
        setGameWon(true);
      }
    }
  };

  return (
    <>
      <StandardHeader previousPath="/spiele"/>
      <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          fontWeight="900"
          gutterBottom
          color="primary"
          sx={{ textAlign: 'center' }} // Added centering for consistency
        >
          OSTERN: FINDE DIE FEHLER
        </Typography>

        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
          Gefunden: {foundIds.length} von {DIFFERENCES.length}
        </Typography>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* Linkes Bild: Original */}
          <Grid item xs={12} md={6}>
            <Paper elevation={5} sx={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
              <Image
                src={OhneFehler1}
                alt="Originalbild"
                layout="responsive"
                placeholder="blur" // Optional: adds a nice blur while loading
              />
            </Paper>
          </Grid>

          {/* Rechtes Bild: Fehlerbild (Klickbar + Kreise) */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={10}
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'crosshair',
                touchAction: 'none'
              }}
              ref={clickableImageRef}
              onClick={handleImageClick}
            >
              <Image
                src={MitFehler1}
                alt="Fehlerbild - Finde die Unterschiede!"
                layout="responsive"
                placeholder="blur"
              />

              {/* Success Circles */}
              {foundIds.map(id => {
                const diff = DIFFERENCES.find(d => d.id === id);
                if (!diff) return null;
                return (
                  <Box
                    key={id}
                    sx={{
                      position: 'absolute',
                      left: `${diff.x}%`,
                      top: `${diff.y}%`,
                      width: `${diff.r * 2}%`,
                      height: `${diff.r * 2}%`,
                      border: '4px solid #4CAF50',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                      pointerEvents: 'none',
                      zIndex: 2,
                    }}
                  />
                );
              })}
            </Paper>
          </Grid>
        </Grid>

        <EndMenuNextGame
          gameWon={gameWon}
          winText={"SUPER GEMACHT!"}
          winAnswer={`Du hast alle ${DIFFERENCES.length} Unterschiede gefunden!`}
          nextGameLink={`/spiele/fehler/`}
          backLink={`/spiele`}
        />
      </Container>
    </>
  );
}
