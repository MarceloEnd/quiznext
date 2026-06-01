import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import {
  ArrowForwardIos as ArrowIcon,
  ArrowBackIosNew as ArrowBackIcon,
} from '@mui/icons-material';

// Import images
import spiele from '../images/banners/banner1.png';
import quiz from '../images/banners/banner2.png';
import spiele2 from '../images/banners/banner3.png';

const banners = [
  { path: "/spiele", image: spiele },
  { path: "/quiz", image: quiz },
  { path: "/spiele", image: spiele2 },
];

export const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const nextBanner = (e) => {
    e.preventDefault();
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = (e) => {
    e.preventDefault();
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const activeBanner = banners[currentBanner];

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

        {/* Navigation Buttons */}
        <IconButton
          onClick={prevBanner}
          sx={{ position: 'absolute', left: 16, zIndex: 10, color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
        >
          <ArrowBackIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>

        {/* Banner Image Container */}
        <Link href={activeBanner.path} style={{ width: '100%' }}>
          <Box sx={{
            position: 'relative',
            width: '100%',
            // Fixed aspect ratio: 1920/300 is roughly 6.4.
            // On mobile, you might prefer a taller ratio like 3/1 or 2/1.
            aspectRatio: { xs: '3/1', sm: '1920/300' },
            cursor: 'pointer'
          }}>
            <Image
              src={activeBanner.image}
              alt="Banner"
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 1920px"
            />

            {/* Pagination Dots overlay */}
            <Box sx={{
              position: 'absolute', bottom: 16, left: 0, right: 0,
              display: 'flex', justifyContent: 'center', gap: 1, zIndex: 2
            }}>
              {banners.map((_, i) => (
                <Box key={i} sx={{
                  width: 9, height: 9, borderRadius: '50%', bgcolor: 'white',
                  opacity: i === currentBanner ? 1 : 0.45
                }} />
              ))}
            </Box>
          </Box>
        </Link>

        <IconButton
          onClick={nextBanner}
          sx={{ position: 'absolute', right: 16, zIndex: 10, color: 'white', bgcolor: 'rgba(0,0,0,0.3)', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
        >
          <ArrowIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>
      </Box>
    </Box>
  );
};
