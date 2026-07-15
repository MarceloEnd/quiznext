"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getRandomQuestions } from '../functions/json_helpers';
import { getQuiz } from '../functions/get_quiz';
import { QuizArea } from '../components/QuizArea';
import { StandardHeader } from '../../components/components/StandardHeader';
import { EndMenuNewGame } from '../../components/components/EndMenuNewGame';
import { Box, Container } from '@mui/material';

export default function QuizSite() {
  const params = useParams();
  const quizId = parseInt(params?.slug || params?.id);

  // 1. Initialize quizData as null
  const [quizData, setQuizData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  // 2. Set the data ONLY after the component mounts on the client
  useEffect(() => {
    const data = getRandomQuestions(getQuiz(quizId));
    setQuizData(data);
  }, [quizId]);

  const handleNext = (wasCorrect) => {
    if (wasCorrect) setScore(score + 1);
    setCurrentIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    // Re-shuffle on restart
    setQuizData(getRandomQuestions(getQuiz(quizId)));
    setCurrentIndex(0);
    setScore(0);
  };

  // 3. Prevent rendering until we have data
  if (!quizData) {
    return null; // Or a loading spinner
  }

  return (
    <div className="Quiz">
      <StandardHeader />
      {currentIndex < 10 && quizData[currentIndex] && (
        <QuizArea
          data={quizData[currentIndex]}
          currentIndex={currentIndex}
          totalQuestions={10}
          onNext={handleNext}
        />
      )}

      {currentIndex >= 10 && (
        <Box
          sx={{
            maxHeight: '80vh',
            minHeight: { xs: '100%', sm: '80vh' }
          }}
        >
          {/* Add your inner content here, for example: */}
          <div/>
        </Box>
      )}

      {currentIndex >= 10 && (
        <EndMenuNewGame
          gameWon={true}
          winText={`${score} von 10 Punkten`}
          winAnswer={`Quizmeister`}
          restart={handleRestart}
          backLink="/quiz"
        />
      )}
      <Container sx={{marginTop:'5vh'}} />
    </div>
  )
}
