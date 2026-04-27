"use client";

import React from 'react';
// 1. Use Next.js navigation instead of react-router-dom
import { useParams } from 'next/navigation';
import { StandardHeader } from '../../components/components/StandardHeader';
import { selectedJokes } from '../functions/helper';
import { TextCarousel } from '../components/textCarousel';
import { Box } from '@mui/material';

// 2. Default export for the page
export default function JokeSite() {
    // 3. Next.js useParams returns an object.
    // Ensure the key matches your folder name (e.g., app/witz/[id]/page.js)
    const params = useParams();
    const id = params?.slug;
    const jokeId = parseInt(id);
    const data = selectedJokes(jokeId);

    if (!data) return null;

    return (
        <Box className="Jokes" sx={{ minHeight: '100vh' }}>
            <StandardHeader previousPath="/witz" />

            {/* Using Box for spacing instead of <br/> for better Next.js layout control */}
            <Box sx={{ mt: { xs: 4, sm: 8 } }}>
                <TextCarousel messages={data} />
            </Box>
        </Box>
    );
}
