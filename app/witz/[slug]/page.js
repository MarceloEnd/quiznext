"use client";

import React from 'react';
// 1. Use Next.js navigation instead of react-router-dom
import { useParams } from 'next/navigation';
import { StandardHeader } from '../../components/components/StandardHeader';
import { selectedJokes, selectedCategory } from '../functions/helper';
import { TextCarousel } from '../components/textCarousel';
import { Box, Typography,useMediaQuery,useTheme } from '@mui/material';

// 2. Default export for the page
export default function JokeSite() {
    // 3. Next.js useParams returns an object.
    // Ensure the key matches your folder name (e.g., app/witz/[id]/page.js)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const params = useParams();
    const id = params?.slug;
    const jokeId = parseInt(id);
    const data = selectedJokes(jokeId);
    const category = selectedCategory(jokeId);
    if (!data) return null;

    return (
        <Box className="Jokes" sx={{ minHeight: '100vh' }}>
            <StandardHeader previousPath="/witz" />
            <Box
              sx={{
                p: { xs: 3, sm: 6 },
                textAlign: 'center',
                bgcolor: 'transparent',
                maxWidth: 'lg',
                mx: 'auto'
              }}
            >
              <Typography
                variant={isMobile ? "h4" : "h2"}
                sx={{
                  fontWeight: 800,
                  color: "#4ba5f7",
                  textTransform: 'uppercase'
                }}
              >
                Witze über
              </Typography>
              <Typography
                variant={isMobile ? "h5" : "h3"}
                gutterBottom
                sx={{
                  fontWeight: 500,
                  color: "#4ba5f7",
                  textTransform: 'uppercase'
                }}
              >
                {category}
              </Typography>
            </Box>
            <TextCarousel messages={data} />
        </Box>
    );
}
