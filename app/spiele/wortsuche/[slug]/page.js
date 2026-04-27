"use client";

import React, { useState, useEffect, use } from 'react';
import {
    Button, Box, Typography, Paper, Grid, Container, Zoom, Divider
} from '@mui/material';
import { getKategorieById } from '../functions/functions';
import { StandardHeader } from '../../../components/components/StandardHeader';
import { EndMenuNextGame } from '../../../components/components/EndMenuNextGame';
import { useParams } from 'next/navigation';

export default function WordSearchSite() {
    // In Next.js 15, we unwrap params using React.use()
    const params = useParams();
    const wordId = parseInt(params?.slug || params?.id);
    const nextId = wordId + 1;
    const categoryData = getKategorieById(wordId);
    const [allShuffledLetters, setAllShuffledLetters] = useState([]);
    const [wordProgress, setWordProgress] = useState({ 1: "", 2: "", 3: "" });
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Initialize game data only on client side
    useEffect(() => {
        setIsMounted(true);
        if (categoryData) {
            const w1 = categoryData.wort1.toUpperCase();
            const w2 = categoryData.wort2.toUpperCase();
            const w3 = categoryData.wort3.toUpperCase();

            const combinedChars = [
                ...w1.split(''),
                ...w2.split(''),
                ...w3.split('')
            ];

            const letterObjects = combinedChars.map(char => ({
                char: char,
                id: Math.random() // Unique ID for key mapping
            }));

            setAllShuffledLetters(shuffleArray(letterObjects));
            setWordProgress({ 1: "", 2: "", 3: "" });
            setIsFinished(false);
        }
    }, [wordId, categoryData]);

    const handleLetterClick = (letterObj, index) => {
        let foundMatch = false;

        for (let i = 1; i <= 3; i++) {
            const targetWord = categoryData[`wort${i}`].toUpperCase();
            const currentProgress = wordProgress[i];

            // Check if the clicked letter is the next needed letter for this word
            if (
                currentProgress.length < targetWord.length &&
                targetWord[currentProgress.length] === letterObj.char
            ) {
                setWordProgress(prev => ({
                    ...prev,
                    [i]: prev[i] + letterObj.char
                }));

                const newShuffled = [...allShuffledLetters];
                newShuffled.splice(index, 1);
                setAllShuffledLetters(newShuffled);

                foundMatch = true;
                break;
            }
        }

        if (!foundMatch) {
            setError(true);
            setTimeout(() => setError(false), 400);
        }
    };

    useEffect(() => {
        if (categoryData && isMounted) {
            const allDone =
                wordProgress[1] === categoryData.wort1.toUpperCase() &&
                wordProgress[2] === categoryData.wort2.toUpperCase() &&
                wordProgress[3] === categoryData.wort3.toUpperCase();

            if (allDone && categoryData.wort1 !== "") {
                setTimeout(() => setIsFinished(true), 800);
            }
        }
    }, [wordProgress, categoryData, isMounted]);

    // Show loading state until client-side mounting is complete
    if (!isMounted || !categoryData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Typography variant="h6">Lade Wortsuche...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', pb: 8 }}>
            <StandardHeader />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper elevation={4} sx={{ p: { xs: 2, sm: 5 }, borderRadius: 8, border: '1px solid #e0e0e0' }}>

                    <Typography variant="h5" sx={{ textAlign: 'center', mb: 4, color: '#455a64', fontWeight: 'bold' }}>
                        KATEGORIE: {categoryData.kategorie.toUpperCase()}
                    </Typography>

                    {!isFinished ? (
                        <Box>
                            <Box sx={{ mb: 6 }}>
                                {[1, 2, 3].map((num) => (
                                    <Box key={num} sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap', justifyContent: 'center' }}>
                                            {categoryData[`wort${num}`].split('').map((_, i) => {
                                                const isFilled = i < wordProgress[num].length;
                                                const letter = wordProgress[num][i];
                                                const isWordComplete = wordProgress[num] === categoryData[`wort${num}`].toUpperCase();

                                                return (
                                                    <Paper
                                                        key={i}
                                                        elevation={isFilled ? 2 : 0}
                                                        sx={{
                                                            width: { xs: 30, sm: 45 },
                                                            height: { xs: 40, sm: 55 },
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: { xs: '1.2rem', sm: '1.8rem' },
                                                            fontWeight: '900',
                                                            bgcolor: isWordComplete ? '#c8e6c9' : (isFilled ? '#e3f2fd' : '#fff'),
                                                            border: '2px solid',
                                                            borderColor: isWordComplete ? '#4caf50' : (isFilled ? '#1976d2' : (error ? '#f44336' : '#cfd8dc')),
                                                            color: '#333',
                                                            borderRadius: 2,
                                                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                        }}
                                                    >
                                                        {isFilled ? letter : ""}
                                                    </Paper>
                                                );
                                            })}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>

                            <Divider sx={{ mb: 4 }} />

                            <Grid container spacing={2} justifyContent="center">
                                {allShuffledLetters.map((letter, index) => (
                                    <Grid item key={letter.id}>
                                        <Zoom in={true}>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleLetterClick(letter, index)}
                                                sx={{
                                                    fontSize: { xs: '1.2rem', sm: '1.8rem' },
                                                    minWidth: { xs: '50px', sm: '65px' },
                                                    height: { xs: '50px', sm: '65px' },
                                                    borderRadius: '16px',
                                                    bgcolor: '#fff',
                                                    color: '#1976d2',
                                                    fontWeight: '900',
                                                    boxShadow: '0px 5px 0px #1565c0',
                                                    border: '1px solid #1976d2',
                                                    '&:hover': { bgcolor: '#f5faff', transform: 'translateY(-2px)' },
                                                    '&:active': { transform: 'translateY(4px)', boxShadow: 'none' }
                                                }}
                                            >
                                                {letter.char}
                                            </Button>
                                        </Zoom>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ) : (
                        <EndMenuNextGame
                            gameWon={isFinished}
                            winText={"Super! Du hast alle Wörter gefunden."}
                            winAnswer={'Exzellent gemacht!'}
                            nextGameLink={`/spiele/wortsuche/${nextId}`}
                            backLink={`/spiele/wortsuche`}
                        />
                    )}
                </Paper>
            </Container>
        </Box>
    );
}
