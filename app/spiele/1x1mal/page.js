"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Paper, Typography, Container, Button, Stack, LinearProgress
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TimerIcon from '@mui/icons-material/Timer';
import StarIcon from '@mui/icons-material/Star';
import { StandardHeader } from '../../components/components/StandardHeader';
import { EndMenuNextGame } from '../../components/components/EndMenuNextGame';

// Generates questions logic
const generateQuestionPool = () => {
  const pool = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      pool.push({ num1: i, num2: j });
    }
  }
  return pool.sort(() => Math.random() - 0.5).map(pair => {
    const correctAnswer = pair.num1 * pair.num2;
    const options = new Set([correctAnswer]);
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 10) + 1;
      const fake = Math.random() > 0.5 ? correctAnswer + offset : Math.max(1, correctAnswer - offset);
      options.add(fake);
    }
    return {
      ...pair,
      answer: correctAnswer,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    };
  });
};

export default function EinmalEinsTimeAttackSite() {
  // Initialize as null to avoid hydration mismatch
  const [questionPool, setQuestionPool] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocking, setIsLocking] = useState(false);
  const timerRef = useRef(null);

  // Initial pool generation on client
  useEffect(() => {
    setQuestionPool(generateQuestionPool());
  }, []);

  // Timer Logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setGameEnded(true);
      setIsActive(false);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const handleAnswer = (val) => {
    if (!isActive || isLocking || gameEnded || !questionPool) return;

    const currentQuestion = questionPool[currentIndex];
    setSelectedAnswer(val);
    setIsLocking(true);

    const isCorrect = val === currentQuestion.answer;

    setTimeout(() => {
      if (isCorrect) {
        setScore(prev => prev + 1);
      } else {
        // Penalty for wrong answers
        setTimeLeft(prev => Math.max(0, prev - 3));
      }

      if (currentIndex < questionPool.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setQuestionPool(generateQuestionPool());
        setCurrentIndex(0);
      }

      setSelectedAnswer(null);
      setIsLocking(false);
    }, 400);
  };

  const startNewGame = () => {
    setQuestionPool(generateQuestionPool());
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(60);
    setIsActive(true);
    setGameEnded(false);
    setSelectedAnswer(null);
  };

  if (!questionPool) return null;

  const currentQuestion = questionPool[currentIndex];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <StandardHeader previousPath="/spiele" />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center', pb: 10 }}>
        <Typography variant="h3" fontWeight="900" color="primary" sx={{ mb: 2, letterSpacing: -1 }}>
          TIME ATTACK
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
          <Paper elevation={2} sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', bgcolor: timeLeft < 10 ? '#ffebee' : '#f8f9fa' }}>
            <TimerIcon sx={{ fontSize: 24, mr: 1, color: timeLeft < 10 ? 'red' : '#666' }} />
            <Typography variant="h5" sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: timeLeft < 10 ? 'red' : 'inherit' }}>
              {timeLeft}s
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', bgcolor: '#fffde7' }}>
            <StarIcon sx={{ fontSize: 24, mr: 1, color: '#fbc02d' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{score}</Typography>
          </Paper>

          <Button onClick={() => setIsActive(!isActive)} variant="outlined" disabled={gameEnded}>
            {isActive ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
        </Stack>

        <Box sx={{ width: '100%', mb: 4 }}>
            <LinearProgress
                variant="determinate"
                value={(timeLeft / 60) * 100}
                color={timeLeft < 10 ? "error" : "primary"}
                sx={{ height: 12, borderRadius: 6, bgcolor: '#eee' }}
            />
        </Box>

        <Paper elevation={12} sx={{ p: { xs: 4, sm: 6 }, mb: 4, bgcolor: '#000', color: 'white', position: 'relative', borderRadius: 4 }}>
          {(!isActive && !gameEnded) && (
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)', borderRadius: 4 }}>
              <Button variant="contained" size="large" onClick={() => setIsActive(true)} startIcon={<PlayArrowIcon />}>
                {timeLeft === 60 ? "START" : "WEITER"}
              </Button>
            </Box>
          )}
          <Typography variant="h1" sx={{ fontWeight: 900, letterSpacing: -2, fontSize: { xs: '4rem', sm: '6rem' } }}>
            {currentQuestion.num1} × {currentQuestion.num2}
          </Typography>
        </Paper>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.answer;
            return (
              <Button
                key={option}
                variant="contained"
                disabled={!isActive || isLocking}
                onClick={() => handleAnswer(option)}
                sx={{
                    py: { xs: 2, sm: 3 },
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    fontWeight: 900,
                    borderRadius: 3,
                    bgcolor: isSelected ? (isCorrect ? '#2e7d32' : '#d32f2f') : '#1976d2',
                    '&.Mui-disabled': isSelected ? { bgcolor: isCorrect ? '#2e7d32' : '#d32f2f', color: 'white', opacity: 1 } : {}
                }}
              >
                {option}
              </Button>
            );
          })}
        </Box>

        <EndMenuNextGame
          gameWon={gameEnded}
          winText={"ZEIT ABGELAUFEN!"}
          winAnswer={`Du hast ${score} Aufgaben gelöst!`}
          restart={startNewGame}
          backLink="/spiele"
          nextGameLink="/spiele"
        />
      </Container>
    </Box>
  );
}
