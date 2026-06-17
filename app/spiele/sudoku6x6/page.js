"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import {
  Box, Paper, Typography, Container, Button, Stack
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TimerIcon from '@mui/icons-material/Timer';
import { createNewGame } from './functions/functions';
import { StandardHeader } from '../../components/components/StandardHeader';
import { useSearchParams } from 'next/navigation';
import { EndMenuNextGame } from '../../components/components/EndMenuNextGame';

/**
 * 1. The Game Logic Component
 */
function Sudoku6x6Game() {
  const searchParams = useSearchParams();
  const isHard = searchParams.has('schwer');
  const isEasy = searchParams.has('leicht');

  // Initialize with empty state to prevent Hydration Mismatch
  const [game, setGame] = useState({ puzzle: Array(6).fill(Array(6).fill(0)), solution: [] });
  const [userBoard, setUserBoard] = useState(Array(6).fill(Array(6).fill(0)));
  const [selected, setSelected] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Create game on client mount
  useEffect(() => {
    const newGame = createNewGame(isEasy, isHard);
    setGame(newGame);
    setUserBoard(newGame.puzzle);
  }, [isEasy, isHard]);

  // Win Logic
  useEffect(() => {
    if (!game.solution || game.solution.length === 0) return;

    const isSolved = userBoard.every((row, r) =>
      row.every((cell, c) => cell !== 0 && cell === game.solution[r][c])
    );
    if (isSolved && !gameWon) {
      setGameWon(true);
      setIsActive(false);
    }
  }, [userBoard, game.solution, gameWon]);

  // Timer Logic
  useEffect(() => {
    if (isActive && !gameWon) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, gameWon]);

  const updateCell = useCallback((val) => {
    if (!selected || !isActive || gameWon) return;
    const { r, c } = selected;
    if (game.puzzle[r][c] !== 0) return;
    const next = userBoard.map((row, ri) => row.map((cell, ci) => (ri === r && ci === c ? val : cell)));
    setUserBoard(next);
  }, [selected, userBoard, game.puzzle, isActive, gameWon]);

  // Keyboard Support (1-6)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive || !selected || gameWon) return;
      if (/^[1-6]$/.test(e.key)) updateCell(parseInt(e.key));
      else if (e.key === 'Backspace' || e.key === 'Delete') updateCell(0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, selected, updateCell, gameWon]);

  const renderQuadrant = (startRow, startCol) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', bgcolor: '#ccc' }}>
      {userBoard.slice(startRow, startRow + 2).map((row, relativeR) => {
        const r = startRow + relativeR;
        return row.slice(startCol, startCol + 3).map((cell, relativeC) => {
          const c = startCol + relativeC;
          const isSelected = selected?.r === r && selected?.c === c;
          const isClue = game.puzzle[r][c] !== 0;
          const isWrong = cell !== 0 && !isClue && game.solution[r] && cell !== game.solution[r][c];

          return (
            <Box
              key={`${r}-${c}`}
              onClick={() => !gameWon && setSelected({ r, c })}
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                bgcolor: isSelected ? '#bbdefb' : (isWrong ? '#ffebee' : 'white'),
                color: isClue ? '#1976d2' : (isWrong ? '#d32f2f' : '#000'),
                cursor: isClue || gameWon ? 'default' : 'pointer',
                fontSize: { xs: '1.5rem', sm: '2.2rem' },
                fontWeight: isClue ? 900 : 500,
              }}
            >
              {cell !== 0 ? cell : ''}
            </Box>
          );
        });
      })}
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <StandardHeader previousPath="/spiele" />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center', pb: 10 }}>
        <Typography variant="h3" fontWeight="900" color="primary" sx={{ mb: 2 }}>
          6x6 SUDOKU
        </Typography>

        <Stack direction="row" spacing={2}  sx={{ mb: 3,justifyContent:"center", alignItems:"center" }}>
          <Paper elevation={2} sx={{ px: 2, py: 0.5, display: 'flex', alignItems: 'center', bgcolor: '#f8f9fa' }}>
            <TimerIcon sx={{ fontSize: 20, mr: 1, color: '#666' }} />
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              {formatTime(time)}
            </Typography>
          </Paper>
          {!gameWon && (
            <Button onClick={() => setIsActive(!isActive)} variant="outlined" size="small">
              {isActive ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
          )}
        </Stack>

        <Paper elevation={12} sx={{ p: '3px', display: 'inline-block', bgcolor: '#000', position: 'relative' }}>
          {!isActive && !gameWon && (
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
              <Button variant="contained" size="large" onClick={() => setIsActive(true)} startIcon={<PlayArrowIcon />}>Weiter</Button>
            </Box>
          )}

          <Box>
            {[0, 2, 4].map((rowStart, idx) => (
              <React.Fragment key={rowStart}>
                <Stack direction="row">
                  {renderQuadrant(rowStart, 0)}
                  <Box sx={{ width: '3px', bgcolor: '#000' }} />
                  {renderQuadrant(rowStart, 3)}
                </Stack>
                {idx < 2 && <Box sx={{ height: '3px', bgcolor: '#000' }} />}
              </React.Fragment>
            ))}
          </Box>
        </Paper>

        <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }} sx={{ mt: 5, justifyContent:"center" }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <Button
              key={n}
              variant="contained"
              disabled={!isActive || gameWon}
              onClick={() => updateCell(n)}
              sx={{ minWidth: { xs: 45, sm: 55 }, height: { xs: 45, sm: 55 }, fontSize: { xs: '1.2rem', sm: '1.5rem' }, fontWeight: 'bold' }}
            >
              {n}
            </Button>
          ))}
        </Stack>

        <EndMenuNextGame
          gameWon={gameWon}
          winText={"GEWONNEN!"}
          winAnswer={`In ${formatTime(time)} gelöst!`}
          nextGameLink="/spiele"
          backLink="/spiele"
        />
      </Container>
    </Box>
  );
}

/**
 * 2. Main Page Wrapper with Suspense
 */
export default function Sudoku6x6Site() {
  return (
    <Suspense fallback={<Typography align="center" sx={{ mt: 10 }}>Laden...</Typography>}>
      <Sudoku6x6Game />
    </Suspense>
  );
}
