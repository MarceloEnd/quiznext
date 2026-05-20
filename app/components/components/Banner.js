import React, { useState, useEffect } from 'react';
// 2. Import Next.js Link
import Link from 'next/link';
// Added useTheme and useMediaQuery to fix the missing definition
import { Box, Fade, IconButton, useTheme, useMediaQuery } from '@mui/material';

import {
  ArrowForwardIos as ArrowIcon,
  ArrowBackIosNew as ArrowBackIcon,
} from '@mui/icons-material';

// 3. Static image imports work slightly differently in Next.js
import crossword from '../images/banners/Crossword.png';
import wizard from '../images/banners/Wizards.png';

export const Banner = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    // Responsive setup to fix the 'isMobile is not defined' error
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const banners = [
      {
        path: "/spiele",
        image: wizard.src || wizard
      },
      {
        path: "/quiz",
        image: crossword.src || crossword
      },
    ];

    const nextBanner = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    };

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }, 10000);
      return () => clearInterval(timer);
    }, [banners.length]);

    const activeBanner = banners[currentBanner];

    return(
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

          <IconButton
            onClick={prevBanner}
            sx={{
                position: 'absolute', left: 16, zIndex: 10,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.3)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
            }}
          >
            {/* Now correctly evaluates based on the media query hook above */}
            <ArrowBackIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>

          <Link href={activeBanner.path} style={{ textDecoration: 'none', width: '100%' }}>
            <Fade in={true} key={currentBanner} timeout={800}>
              <Box
                sx={{
                  borderRadius: 0,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.005)' },

                  backgroundImage: `url(${activeBanner.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: { xs: 'contain', sm: 'cover' },
                  backgroundPosition: 'center',

                  // Sets 16:9 proportional fluid layout for small screens
                  height: {
                    xs: '56.25vw',
                    sm: '260px',
                    md: '340px'
                  },

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  p: { xs: 1, sm: 3 },
                  position: 'relative',

                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0, left: 0, width: '100%', height: '50px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
                    zIndex: 1
                  }
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, zIndex: 2 }}>
                  {banners.map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 9, height: 9, borderRadius: '50%',
                        bgcolor: 'white',
                        opacity: i === currentBanner ? 1 : 0.45,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Fade>
          </Link>

          <IconButton
            onClick={nextBanner}
            sx={{
                position: 'absolute', right: 16, zIndex: 10,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.3)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
            }}
          >
            <ArrowIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        </Box>
      </Box>
    );
}
