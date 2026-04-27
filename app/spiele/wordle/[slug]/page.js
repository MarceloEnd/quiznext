"use client";

import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Grid, Container, Stack
} from '@mui/material';
import { StandardHeader } from '../../../components/components/StandardHeader';
import { getKategorieById } from '../functions/functions';
import { EndMenuNextGame } from '../../../components/components/EndMenuNextGame';
import { useParams } from 'next/navigation';

export default function WordleGameSite() {
  const params = useParams();
  const wordId = parseInt(params?.slug || params?.id);
  const categoryData = getKategorieById(wordId);

  const targetWord = categoryData ? categoryData.wort.toUpperCase() : "";
  const maxAttempts = 6;
  const wordLength = 5;

  const [guesses, setGuesses] = useState(Array(maxAttempts).fill(""));
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ".split("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onKeyPress = (key) => {
    if (gameState !== 'playing') return;

    const currentGuess = guesses[currentAttempt];

    if (key === 'ENTER') {
      if (currentGuess.length === wordLength) {
        if (currentGuess === targetWord) {
          setGameState('won');
        } else if (currentAttempt === maxAttempts - 1) {
          setGameState('lost');
        } else {
          setCurrentAttempt(prev => prev + 1);
        }
      }
      return;
    }

    if (key === 'BACKSPACE') {
      const nextGuesses = [...guesses];
      nextGuesses[currentAttempt] = currentGuess.slice(0, -1);
      setGuesses(nextGuesses);
      return;
    }

    if (currentGuess.length < wordLength && alphabet.includes(key)) {
      const nextGuesses = [...guesses];
      nextGuesses[currentAttempt] = currentGuess + key;
      setGuesses(nextGuesses);
    }
  };

  const getLetterStyle = (letter, index, attemptIdx) => {
    // Only color previous attempts
    if (attemptIdx >= currentAttempt && gameState === 'playing' || (attemptIdx > currentAttempt && gameState !== 'playing')) {
        return { bgcolor: 'white', color: 'black', border: '2px solid #D3D6DA' };
    }

    const char = targetWord[index];
    if (letter === char) return { bgcolor: '#6AAA64', color: 'white' }; // Green
    if (targetWord.includes(letter)) return { bgcolor: '#C9B458', color: 'white' }; // Yellow
    return { bgcolor: '#787C7E', color: 'white' }; // Grey
  };

  if (!isMounted || !categoryData) return null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FA', display: 'flex', flexDirection: 'column' }}>
      <StandardHeader previousPath="/spiele/lesemaus" />

      <Container maxWidth="sm" sx={{ py: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, fontFamily: '"Outfit", sans-serif' }}>
          Wort-Rätsel 🧩
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#219538', fontWeight: 700, mb: 3 }}>
          Kategorie: {categoryData.kategorie}
        </Typography>

        {/* Game Grid */}
        <Stack spacing={1} sx={{ mb: 4 }}>
          {guesses.map((guess, attemptIdx) => (
            <Stack direction="row" spacing={1} key={attemptIdx}>
              {Array.from({ length: wordLength }).map((_, i) => {
                const letter = guess[i] || "";
                const styles = getLetterStyle(letter, i, attemptIdx);
                return (
                  <Paper
                    key={i}
                    elevation={0}
                    sx={{
                      width: { xs: 45, sm: 60 },
                      height: { xs: 45, sm: 60 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      ...styles
                    }}
                  >
                    {letter}
                  </Paper>
                );
              })}
            </Stack>
          ))}
        </Stack>

        {/* On-screen Keyboard */}
        <Box sx={{ width: '100%', mt: 'auto' }}>
          <Grid container spacing={0.5} justifyContent="center">
            {alphabet.map((char) => (
              <Grid size="auto" key={char}>
                <Button
                  variant="contained"
                  onClick={() => onKeyPress(char)}
                  sx={{ minWidth: { xs: 32, sm: 40 }, p: 1, bgcolor: '#D3D6DA', color: 'black', '&:hover': { bgcolor: '#BBB' } }}
                >
                  {char}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12} /> {/* Row break */}
            <Grid item>
              <Button variant="contained" onClick={() => onKeyPress('ENTER')} sx={{ bgcolor: '#219538', fontWeight: 'bold' }}>Enter</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => onKeyPress('BACKSPACE')} sx={{ bgcolor: '#787C7E', fontWeight: 'bold' }}>⌫</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <EndMenuNextGame
        gameWon={gameState === 'won'}
        winText={gameState === 'won' ? "Super gemacht!" : "Schade!"}
        winAnswer={targetWord}
        nextGameLink={`/spiele/wordle/${(wordId % 100) + 1}`}
        backLink={`/spiele/wordle`}
      />
    </Box>
  );
}
