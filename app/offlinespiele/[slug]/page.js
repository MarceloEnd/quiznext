"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { StandardHeader } from '../../components/components/StandardHeader';
import { getGame } from '../functions/helper';
import { Box, Typography, Paper, Grid, Chip, useMediaQuery, useTheme } from '@mui/material';

export default function OfflineGamesSite() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const params = useParams();
    const data = getGame(params?.slug);

    if (!data) return <Typography sx={{ p: 5, textAlign: 'center' }}>Spiel nicht gefunden.</Typography>;

    return (
        <Box sx={{ minHeight: '100vh', pb: 8 }}>
            <StandardHeader previousPath="/offlinegames" />

            <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 'md', mx: 'auto' }}>
                {/* Title Section */}
                <Typography variant={isMobile ? "h4" : "h2"} sx={{ fontWeight: 800, color: "#4ba5f7", mb: 1, textAlign: 'center' }}>
                    {data.name}
                </Typography>

                {/* Info Cards Row */}
                <Grid container spacing={2} sx={{ my: 3 }}>
                    {[
                        { label: "Spieler", value: `${data.minSpieler}-${data.maxSpieler}` },
                        { label: "Alter", value: `${data.minAge}+` },
                        { label: "Dauer", value: data.duration }
                    ].map((item, idx) => (
                        <Grid item xs={4} key={idx}>
                            <Paper elevation={0} sx={{ p: 1, textAlign: 'center', bgcolor: '#f0f7ff', borderRadius: 2 }}>
                                <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>{item.label}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.value}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Categories */}
                <Box sx={{ mb: 3 }}>
                    {data.categories.split(', ').map((cat) => (
                        <Chip key={cat} label={cat} sx={{ mr: 1, mb: 1, bgcolor: 'rgba(247, 189, 74, 1.0)', color: 'white' }} />
                    ))}
                </Box>

                {/* Main Text Content */}
                <Paper elevation={2} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            whiteSpace: 'pre-line', // This renders the \n from your JSON as actual line breaks
                            lineHeight: 1.7,
                            fontSize: '1.1rem'
                        }}
                    >
                        {data.text}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
}
