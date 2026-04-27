"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Paper, Typography, Container, Button, Stack, LinearProgress
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import TimerIcon from '@mui/icons-material/Timer';
import { StandardHeader } from '../../components/components/StandardHeader';
import { EndMenuNextGame } from '../../components/components/EndMenuNextGame';

const generateQuestions = (amount = 10) => {
  const pool = [];
  for (let a1 = 1; a1 <= 10; a1++) {
    for (let a2 = 1; a2 <= 10; a2++) {
      const ergebnis = a1 * a2;
      const divisor = a1;
      const quotient = a2;
      pool.push({ num1: ergebnis, num2: divisor, answer: quotient });
    }
  }

  const shuffledPool = pool.sort(() => Math.random() - 0.5);

  return shuffledPool.slice(0, amount).map((task) => {
    const { num1, num2, answer } = task;
    const options = new Set([answer]);
    while (options.size < 4) {
      const offset = Math.floor(Math.random() * 5) + 1;
      const fake = Math.random() > 0.5 ? answer + offset : Math.max(1, answer - offset);
      options.add(fake);
    }
    return {
      num1,
      num2,
      answer,
      options: Array.from(options).sort(() => Math.random() - 0.5)
    };
  });
};

export default function GeteiltSite() {
  // Initialize as null to prevent server/client mismatch
  const [questions, setQuestions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isLocking, setIsLocking] = useState(false);
  const timerRef = useRef(null);

  // Generate questions on client mount
  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  useEffect(() => {
    if (isActive && !gameWon && questions) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, gameWon, questions]);

  const handleAnswer = (val) => {
    if (!isActive || isLocking || !questions) return;

    const currentQuestion = questions[currentIndex];
    setSelectedAnswer(val);
    setIsLocking(true);

    const isCorrect = val === currentQuestion.answer;

    setTimeout(() => {
      if (isCorrect) {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setGameWon(true);
        }
      } else {
        setTime(prev => prev + 5);
      }
      setSelectedAnswer(null);
      setIsLocking(false);
    }, 600);
  };

  const startNewGame = () => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setTime(0);
    setIsActive(true);
    setGameWon(false);
    setSelectedAnswer(null);
  };

  if (!questions) return null;

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fdfdfd' }}>
      <StandardHeader previousPath="/spiele" />
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center', pb: 10 }}>
        <Typography
          variant="h3"
          fontWeight="900"
          color="primary"
          sx={{ mb: 2, letterSpacing: -1 }}
        >
          1x1 GETEILT
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
          <Paper elevation={2} sx={{ px: 2, py: 0.5, display: 'flex', alignItems: 'center', bgcolor: '#f8f9fa' }}>
            <TimerIcon sx={{ fontSize: 20, mr: 1, color: '#666' }} />
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
            </Typography>
          </Paper>
          <Button onClick={() => setIsActive(!isActive)} variant="outlined">
            {isActive ? <PauseIcon /> : <PlayArrowIcon />}
          </Button>
        </Stack>

        <Box sx={{ width: '100%', mb: 4 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 12, borderRadius: 6, bgcolor: '#eee' }} />
            <Typography variant="subtitle2" sx={{ mt: 1, fontWeight: 'bold', color: 'text.secondary' }}>
                Aufgabe {currentIndex + 1} von {questions.length}
            </Typography>
        </Box>

        <Paper elevation={12} sx={{ p: { xs: 4, sm: 6 }, mb: 4, bgcolor: '#000', color: 'white', position: 'relative', borderRadius: 4 }}>
          {!isActive && (
            <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', borderRadius: 4 }}>
              <Button variant="contained" size="large" onClick={() => setIsActive(true)} startIcon={<PlayArrowIcon />}>Weiter</Button>
            </Box>
          )}
          <Typography variant="h1" sx={{ fontWeight: 900, letterSpacing: -2, fontSize: { xs: '4rem', sm: '6rem' } }}>
            {currentQuestion.num1} ÷ {currentQuestion.num2}
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
                    fontSize: { xs: '1.5rem', sm: '2.2rem' },
                    fontWeight: 900,
                    borderRadius: 3,
                    transition: 'all 0.15s ease-in-out',
                    transform: isSelected ? 'scale(0.95)' : 'scale(1)',
                    bgcolor: isSelected ? (isCorrect ? '#2e7d32' : '#d32f2f') : '#1976d2',
                    '&:hover': {
                      bgcolor: isSelected ? (isCorrect ? '#1b5e20' : '#c62828') : '#1565c0',
                    },
                    '&.Mui-disabled': isSelected ? {
                        bgcolor: isCorrect ? '#2e7d32' : '#d32f2f',
                        color: 'white',
                        opacity: 1
                    } : {}
                }}
              >
                {option}
              </Button>
            );
          })}
        </Box>

        <EndMenuNextGame
          gameWon={gameWon}
          winText={"GEWONNEN!"}
          winAnswer={`Du warst ${time} Sekunden schnell!`}
          nextGameLink="/spiele"
          backLink="/spiele"
        />
      </Container>
    </Box>
  );
}
