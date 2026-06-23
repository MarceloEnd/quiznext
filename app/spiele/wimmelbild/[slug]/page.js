"use client";

import React, { useState, useRef, useEffect, use } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Zoom
} from '@mui/material';
import { StandardHeader } from '../../../components/components/StandardHeader';
import { EndMenuNextGame } from '../../../components/components/EndMenuNextGame';
import Image from 'next/image';
import { PUZZLE_DATA } from './data';
import { useParams, useSearchParams} from 'next/navigation';

export default function WimmelbildSite() {
  // Unwrap params using React.use() for Next.js 15+
  const params1 = useParams();
  //const resolvedParams = use(params);
  //const id = resolvedParams.id || "1";
  const id = params1.slug
  const currentPuzzle = PUZZLE_DATA[id] || PUZZLE_DATA[1];
  const [foundIds, setFoundIds] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const clickableImageRef = useRef(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleImageClick = (e) => {
    if (gameWon || !clickableImageRef.current) return;

    const rect = clickableImageRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const clickedDiff = currentPuzzle.differences.find(diff => {
      const distance = Math.sqrt(
        Math.pow(clickX - diff.x, 2) + Math.pow(clickY - diff.y, 2)
      );
      return distance < diff.r && !foundIds.includes(diff.id);
    });

    if (clickedDiff) {
      const newFoundIds = [...foundIds, clickedDiff.id];
      setFoundIds(newFoundIds);

      if (newFoundIds.length === currentPuzzle.differences.length) {
        setTimeout(() => setGameWon(true), 500);
      }
    }
  };

  if (!isMounted) return null;

  return (
    <Box sx={{ minHeight: '100vh', pb: 8 }}>
      <StandardHeader previousPath="/spiele" />

      <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          fontWeight="900"
          gutterBottom
          sx={{
            color: '#1976d2',
            fontSize: { xs: '2rem', sm: '3.5rem' },
            fontFamily: '"Outfit", sans-serif'
          }}
        >
          FINDE DIE FEHLER
        </Typography>

        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', fontWeight: 600 }}>
          Gefunden: {foundIds.length} von {currentPuzzle.differences.length}
        </Typography>

        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Paper
              elevation={12}
              sx={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                cursor: 'crosshair',
                touchAction: 'none',
                border: '8px solid white',
                lineHeight: 0 // Removes tiny gap at bottom of image
              }}
              ref={clickableImageRef}
              onClick={handleImageClick}
            >
              {/* We use a standard img here because coord math is easier with
                intrinsic ratios. Ensure the image is in /public/images/...
              */}
              <Image
                src={currentPuzzle.image}
                alt={currentPuzzle.name}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  userSelect: 'none',
                  WebkitUserDrag: 'none'
                }}
              />

              {foundIds.map(id => {
                const diff = currentPuzzle.differences.find(d => d.id === id);
                return (
                  <Zoom in={true} key={id}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: `${diff.x}%`,
                        top: `${diff.y}%`,
                        width: `${diff.r * 2.2}%`, // Slightly larger than click radius
                        height: `${diff.r * 2.2}%`,
                        border: '4px solid #f7bd4a',
                        borderRadius: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: '0 0 15px rgba(0,0,0,0.3)',
                        pointerEvents: 'none',
                        zIndex: 2,
                        // Animation pulse
                        animation: 'pulse 1.5s infinite ease-in-out',
                        '@keyframes pulse': {
                          '0%': { transform: 'translate(-50%, -50%) scale(1)' },
                          '100%': { transform: 'translate(-50%, -50%) scale(1)' },
                        }
                      }}
                    />
                  </Zoom>
                );
              })}
            </Paper>
          </Grid>
        </Grid>

        <EndMenuNextGame
          gameWon={gameWon}
          winText={`SUPER GEMACHT!`}
          winAnswer={`Du hast alle ${currentPuzzle.differences.length} Unterschiede gefunden!`}
          nextGameLink={`/spiele/wimmelbild/${parseInt(id) % 2 + 1}`}
          backLink="/spiele/wimmelbild"
        />
      </Container>
    </Box>
  );
}
