"use client";

import React, { useState, useEffect, use } from 'react';
import {
  Box, Typography, Button, Paper, Grid, Divider, Container
} from '@mui/material';
import { StandardHeader } from '../../../components/components/StandardHeader';
import { getKategorieById } from '../functions/functions';
import { EndMenuNextGame } from '../../../components/components/EndMenuNextGame';
import { useParams } from 'next/navigation';

export default function LesemausSite() {
  const params = useParams();
  const wordId = parseInt(params?.slug || params?.id);
  const categoryData = getKategorieById(wordId);

  // 2. Prepare Data
  const originalWort = categoryData ? categoryData.wort.toUpperCase() : "";
  const woerterArray = originalWort.split(" ");
  const wortOhneLeerzeichen = originalWort.replace(/\s+/g, '');
  const validLetters = [...new Set(wortOhneLeerzeichen.split(""))].sort();

  // 3. State
  const [eingabe, setEingabe] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // 4. Reset & Hydration Logic
  useEffect(() => {
    setIsMounted(true);
    setEingabe(Array(wortOhneLeerzeichen.length).fill(""));
    setSelectedIdx(0);
  }, [wordId, wortOhneLeerzeichen.length]);

  const istRichtig = eingabe.join("") === wortOhneLeerzeichen && wortOhneLeerzeichen !== "";

  const handleAlphabetClick = (buchstabe) => {
    if (selectedIdx >= wortOhneLeerzeichen.length || istRichtig) return;

    // Strict Check: Only the correct letter is accepted
    if (buchstabe !== wortOhneLeerzeichen[selectedIdx]) return;

    const neueEingabe = [...eingabe];
    neueEingabe[selectedIdx] = buchstabe;
    setEingabe(neueEingabe);

    if (selectedIdx < wortOhneLeerzeichen.length - 1) {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  // Prevent hydration mismatch or handle missing data
  if (!isMounted || !categoryData) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FA' }}>
        <StandardHeader />
        <Typography sx={{ p: 4, textAlign: 'center' }}>
          Rätsel wird geladen...
        </Typography>
      </Box>
    );
  }

  // Helper to keep track of indices across multiple words
  let globalCharIndex = 0;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8F9FA' }}>
      <StandardHeader previousPath="/spiele/lesemaus" />

      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 6 }, flexGrow: 1 }}>
        <Paper elevation={0} sx={{ p: { xs: 1, sm: 4 }, textAlign: 'center', bgcolor: 'transparent' }}>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              color: '#2D3436',
              mb: 1,
              fontFamily: '"Outfit", sans-serif',
              fontSize: { xs: '2rem', sm: '3rem' }
            }}
          >
            Code-Knacker 🔍
          </Typography>

          <Typography variant="h6" sx={{ color: '#219538', fontWeight: 700, mb: 4 }}>
            Kategorie: {categoryData.kategorie}
          </Typography>

          {/* Wort-Zeilen */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, mb: 6 }}>
            {woerterArray.map((einzelWort, wortIndex) => (
              <Box key={wortIndex} sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0.5, sm: 1.5 }, flexWrap: 'wrap' }}>
                {einzelWort.split("").map((char, charInWordIndex) => {
                  const currentGlobalIndex = globalCharIndex++;
                  return (
                    <Box
                      key={`${wortIndex}-${charInWordIndex}`}
                      onClick={() => !istRichtig && setSelectedIdx(currentGlobalIndex)}
                      sx={{ cursor: istRichtig ? 'default' : 'pointer' }}
                    >
                      <Paper
                        elevation={selectedIdx === currentGlobalIndex ? 10 : 2}
                        sx={{
                          width: { xs: 40, sm: 55 },
                          height: { xs: 60, sm: 80 },
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '14px',
                          border: selectedIdx === currentGlobalIndex ? '3px solid #219538' : '2px solid transparent',
                          bgcolor: istRichtig ? '#e3fae8' : 'white',
                          transition: 'all 0.2s',
                          transform: selectedIdx === currentGlobalIndex ? 'scale(1.1)' : 'scale(1)',
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
                          {eingabe[currentGlobalIndex]}
                        </Typography>
                        <Divider sx={{ width: '70%', my: 0.5 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#636E72' }}>
                           {char.charCodeAt(0) - 64}
                        </Typography>
                      </Paper>
                    </Box>
                  );
                })}
              </Box>
            ))}
          </Box>

          {/* Tastatur */}
          <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 3 }, borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Grid container spacing={1.5} justifyContent="center">
              {validLetters.map((b) => (
                <Grid item key={b}>
                  <Button
                    variant="contained"
                    disabled={istRichtig}
                    onClick={() => handleAlphabetClick(b)}
                    sx={{
                      minWidth: { xs: 45, sm: 65 },
                      height: { xs: 45, sm: 65 },
                      fontSize: { xs: '1.1rem', sm: '1.4rem' },
                      fontWeight: 900,
                      borderRadius: '16px',
                      backgroundColor: '#219538',
                      boxShadow: '0 5px 0 #1a7a2e',
                      textTransform: 'none',
                      '&:active': { transform: 'translateY(4px)', boxShadow: 'none' },
                      '&:hover': { backgroundColor: '#1a7a2e' }
                    }}
                  >
                    {b}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>

      <EndMenuNextGame
        gameWon={istRichtig}
        winText={"Du hast das Rätsel gelöst:"}
        winAnswer={originalWort}
        nextGameLink={`/spiele/lesemaus/${wordId + 1}`}
        backLink={`/spiele/lesemaus`}
      />
    </Box>
  );
}
