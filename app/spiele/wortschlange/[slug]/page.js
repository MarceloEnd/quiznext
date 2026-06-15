"use client";

import React, { useState, useEffect, use } from 'react';
import { Box, Typography, Paper, Container, Button, Stack } from '@mui/material';
import StarsIcon from '@mui/icons-material/Stars';
import { StandardHeader } from '../../../components/components/StandardHeader';
import { EndMenuNextGame } from '../../../components/components/EndMenuNextGame';
import { getKategorieById } from '../functions/functions';
import { useParams, useSearchParams } from 'next/navigation';

export default function WortSchlangeSite() {
    // Next.js 15 pattern for unwrapping params
    const params = useParams();
    const puzzleId = parseInt(params?.slug || params?.id);
    const searchParams = useSearchParams();
    const level = searchParams.get('level');

    const [puzzleData, setPuzzleData] = useState(null);
    const [wordProgress, setWordProgress] = useState("");
    const [removedIndices, setRemovedIndices] = useState(new Set());
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Initialize game on mount and ID change
    useEffect(() => {
        setIsMounted(true);
        const data = getKategorieById(puzzleId,level);

        if (!data || data.fragen[level-1].wort.length !== 9) {
            console.error("Ungültige Spieldaten für ID:", puzzleId);
            return;
        }

        setPuzzleData(data);
        setWordProgress("");
        setRemovedIndices(new Set());
        setIsFinished(false);
        setError(false);
    }, [puzzleId]);

    const handleCellClick = (letter, row, col) => {
        if (isFinished || error || !puzzleData) return;

        const currentIndex = wordProgress.length;
        const expectedLetter = puzzleData.fragen[level-1].wort[currentIndex].toUpperCase();

        if (letter.toUpperCase() === expectedLetter) {
            setWordProgress(prev => prev + expectedLetter);
            setRemovedIndices(prev => new Set(prev).add(`${row}-${col}`));

            if (currentIndex + 1 === 9) {
                setTimeout(() => setIsFinished(true), 600);
            }
        } else {
            setError(true);
            setTimeout(() => setError(false), 400);
        }
    };

    // Hydration check: Prevent mismatch between server and client
    if (!isMounted || !puzzleData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Typography variant="h6">Lade Wortschlange...</Typography>
            </Box>
        );
    }

    const targetWord = puzzleData.fragen[level-1].wort.toUpperCase();

    return (
        <Box sx={{ bgcolor: '#e3f2fd', minHeight: '100vh', pb: 10 }}>
            <StandardHeader previousPath="/spiele/wortschlange" />

            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper
                    elevation={8}
                    sx={{
                        p: { xs: 2, sm: 5 },
                        borderRadius: 6,
                        textAlign: 'center',
                        bgcolor: 'white'
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight="900"
                        sx={{
                            mb: 1,
                            color: '#1976d2',
                            fontStyle: 'italic',
                            fontSize: { xs: '2.2rem', sm: '3rem' }
                        }}
                    >
                        Wortschlange
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#546e7a', mb: 4, px: 2 }}>
                        Kategorie: <strong>{puzzleData.kategorie.toUpperCase()}</strong>
                    </Typography>

                    {/* WORD PROGRESS DISPLAY */}
                    <Stack
                        direction="row"
                        spacing={1}

                        sx={{ mb: { xs: 4, sm: 6 }, flexWrap: 'nowrap', gap: 1, justifyContent:"center" }}
                    >
                        {targetWord.split('').map((char, index) => {
                            const isFilled = index < wordProgress.length;
                            return (
                                <Paper
                                    key={index}
                                    elevation={isFilled ? 2 : 0}
                                    sx={{
                                        width: { xs: 32, sm: 50 },
                                        height: { xs: 42, sm: 60 },
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: { xs: '1.4rem', sm: '2.2rem' },
                                        fontWeight: '900',
                                        bgcolor: isFilled ? '#c8e6c9' : '#fff',
                                        border: '3px solid',
                                        borderColor: error && index === wordProgress.length ? '#f44336' : (isFilled ? '#4caf50' : '#cfd8dc'),
                                        color: '#333',
                                        borderRadius: 2,
                                        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                >
                                    {isFilled ? char : ""}
                                </Paper>
                            );
                        })}
                    </Stack>

                    {/* 3x3 GAME GRID */}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper
                            elevation={1}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: { xs: 1, sm: 2 },
                                width: { xs: '100%', sm: '380px' },
                                maxWidth: '380px',
                                p: { xs: 1.5, sm: 2 },
                                bgcolor: '#f1f8e9',
                                borderRadius: 4,
                                border: '2px solid #a5d6a7'
                            }}
                        >
                            {puzzleData.grid.map((row, rowIndex) => (
                                row.map((cellLetter, colIndex) => {
                                    const cellId = `${rowIndex}-${colIndex}`;
                                    const isRemoved = removedIndices.has(cellId);

                                    return (
                                        <Box key={cellId} sx={{ width: '100%', height: { xs: 85, sm: 110 }, position: 'relative' }}>
                                            {!isRemoved && (
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    onClick={() => handleCellClick(cellLetter, rowIndex, colIndex)}
                                                    sx={{
                                                        height: '100%',
                                                        fontSize: { xs: '1.8rem', sm: '3rem' },
                                                        borderRadius: '16px',
                                                        bgcolor: '#fff',
                                                        color: '#1976d2',
                                                        fontWeight: '900',
                                                        boxShadow: '0px 7px 0px #1565c0',
                                                        border: '1px solid #1976d2',
                                                        transition: 'transform 0.1s, box-shadow 0.1s',
                                                        '&:hover': { bgcolor: '#f5faff' },
                                                        '&:active': { transform: 'translateY(4px)', boxShadow: '0px 3px 0px #1565c0' },
                                                    }}
                                                >
                                                    {cellLetter.toUpperCase()}
                                                </Button>
                                            )}
                                            {isRemoved && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4caf50' }}>
                                                    <StarsIcon sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem' } }} />
                                                </Box>
                                            )}
                                        </Box>
                                    );
                                })
                            ))}
                        </Paper>
                    </Box>
                </Paper>
            </Container>

            <EndMenuNextGame
                gameWon={isFinished}
                winText={`Super gemacht!`}
                winAnswer={`${targetWord}`}
                nextGameLink={`/spiele/wortschlange/${puzzleId}?level=${(parseInt(level) % 10 + 1)}`}
                backLink={`/spiele/wortschlange`}
            />
        </Box>
    );
}
