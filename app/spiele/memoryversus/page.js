"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Box, Container, Typography, Card, CardActionArea, Grid, Paper } from '@mui/material';
import { StandardHeader } from '../../components/components/StandardHeader';
import { useSearchParams } from 'next/navigation';
import { EndMenuNextGame } from '../../components/components/EndMenuNextGame';

const SYMBOLS = [
  '🍎', '🍌', '🍇', '🍒', '🍓', '🥝', '🍍', '🥥',
  '🥑', '🥦', '🌽', '🥕', '🍑', '🍋', '🍉', '🍄'
];

/**
 * Logic Component
 */
function MemoryVersusGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });

  const searchParams = useSearchParams();
  const isHard = searchParams.has('schwer');
  const isEasy = searchParams.has('leicht');

  const initGame = useCallback(() => {
    let pairCount = 10;
    if (isEasy) pairCount = 8;
    else if (isHard) pairCount = 12;

    const activeSymbols = SYMBOLS.slice(0, pairCount);
    const gameSet = [...activeSymbols, ...activeSymbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));

    setCards(gameSet);
    setMatched([]);
    setFlipped([]);
    setGameWon(false);
    setDisabled(false);
    setCurrentPlayer(1);
    setScores({ 1: 0, 2: 0 });
  }, [isHard, isEasy]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (index) => {
    if (disabled || matched.includes(index) || flipped.includes(index)) return;
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setDisabled(true);
      checkMatch(newFlipped);
    }
  };

  const checkMatch = (currentFlipped) => {
    const [first, second] = currentFlipped;
    if (cards[first].symbol === cards[second].symbol) {
      setMatched(prev => {
        const nextMatched = [...prev, first, second];
        if (nextMatched.length === cards.length && cards.length > 0) {
          setGameWon(true);
        }
        return nextMatched;
      });
      setScores(prev => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }));
      setFlipped([]);
      setDisabled(false);
    } else {
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false);
        setCurrentPlayer(curr => (curr === 1 ? 2 : 1));
      }, 1000);
    }
  };

  const getWinnerText = () => {
    if (scores[1] > scores[2]) return "Spieler 1 gewinnt!";
    if (scores[2] > scores[1]) return "Spieler 2 gewinnt!";
    return "Unentschieden!";
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <StandardHeader previousPath="/spiele" />

      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4
        }}
      >
        <Typography
          variant="h3"
          fontWeight="900"
          color="primary"
          sx={{ mb: 4, letterSpacing: -1, textAlign: 'center', fontSize: { xs: '2rem', sm: '3.5rem' } }}
        >
          MEMORY VERSUS
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4, maxWidth: 600 }} justifyContent="center">
          <Grid item xs={5} sm={4}>
            <Paper elevation={currentPlayer === 1 ? 8 : 1} sx={{
              p: 2, textAlign: 'center',
              bgcolor: currentPlayer === 1 ? '#e3f2fd' : '#fff',
              border: currentPlayer === 1 ? '3px solid #1976d2' : '3px solid transparent',
              borderRadius: 3,
              transition: 'all 0.3s ease'
            }}>
              <Typography variant="subtitle1" fontWeight="bold">Spieler 1</Typography>
              <Typography variant="h4" fontWeight="900" color={currentPlayer === 1 ? 'primary' : 'inherit'}>{scores[1]}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="textSecondary" fontWeight="bold">VS</Typography>
          </Grid>
          <Grid item xs={5} sm={4}>
            <Paper elevation={currentPlayer === 2 ? 8 : 1} sx={{
              p: 2, textAlign: 'center',
              bgcolor: currentPlayer === 2 ? '#fce4ec' : '#fff',
              border: currentPlayer === 2 ? '3px solid #d81b60' : '3px solid transparent',
              borderRadius: 3,
              transition: 'all 0.3s ease'
            }}>
              <Typography variant="subtitle1" fontWeight="bold">Spieler 2</Typography>
              <Typography variant="h4" fontWeight="900" color={currentPlayer === 2 ? '#d81b60' : 'inherit'}>{scores[2]}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: { xs: 1, sm: 2 },
          width: '100%',
          maxWidth: { xs: 400, sm: 850 },
          margin: '0 auto',
        }}>
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            const isMatched = matched.includes(index);

            return (
              <Card
                key={index}
                sx={{
                  width: {
                    xs: 'calc(25% - 8px)',
                    sm: 'calc(16.66% - 16px)'
                  },
                  aspectRatio: '1/1',
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  bgcolor: isMatched ? '#c8e6c9' : (isFlipped ? 'white' : (currentPlayer === 1 ? '#1976d2' : '#d81b60')),
                  boxShadow: isFlipped ? 4 : 2,
                  borderRadius: { xs: 1, sm: 2 },
                }}
              >
                <CardActionArea onClick={() => handleCardClick(index)} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '2.5rem' },
                      visibility: isFlipped ? 'visible' : 'hidden',
                      transform: isFlipped ? 'none' : 'rotateY(180deg)',
                      textAlign: 'center'
                    }}
                  >
                    {card.symbol}
                  </Typography>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>

        <EndMenuNextGame
          gameWon={gameWon}
          winText={getWinnerText()}
          winAnswer={`Endstand: ${scores[1]} - ${scores[2]}`}
          nextGameLink="/spiele"
          backLink="/spiele"
        />
      </Container>
    </Box>
  );
}

/**
 * Main Page Export with Suspense Boundary
 */
export default function MemoryVersusSite() {
  return (
    <Suspense fallback={<Typography align="center" sx={{ mt: 10 }}>Laden...</Typography>}>
      <MemoryVersusGame />
    </Suspense>
  );
}
