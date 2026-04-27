import React, { useState, useEffect } from 'react';
// 2. Import Next.js Link
import Link from 'next/link';
import { Box, Container, Fade, IconButton } from '@mui/material';

import {
  ArrowForwardIos as ArrowIcon,
  ArrowBackIosNew as ArrowBackIcon,
} from '@mui/icons-material';

// 3. Static image imports work slightly differently in Next.js
import crossword from '../../images/banners/Crossword.png';
import wizard from '../../images/banners/Wizards.png';

export const Banner = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    // Static imports in Next.js are objects; use .src or let MUI handle it
    const banners = [
      {
        path: "/spiele",
        image: wizard.src || wizard
      },
      {
        path: "/quizliste",
        image: crossword.src || crossword
      },
    ];

    const nextBanner = (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stops the event from reaching the Link wrapper
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
        <Container maxWidth="md" sx={{ mt: 3, px: { xs: 1, md: 3 } }}>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

          <IconButton
            onClick={prevBanner}
            sx={{
                position: 'absolute', left: 10, zIndex: 10,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.3)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* 4. Use 'href' instead of 'to' */}
          <Link href={activeBanner.path} style={{ textDecoration: 'none', width: '100%' }}>
            <Fade in={true} key={currentBanner} timeout={800}>
              <Box
                sx={{
                  borderRadius: '24px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.01)' },

                  backgroundImage: `url(${activeBanner.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',

                  height: { xs: '180px', sm: '220px', md: '260px' },

                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  p: 2,
                  position: 'relative',

                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0, left: 0, width: '100%', height: '40px',
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
                position: 'absolute', right: 10, zIndex: 10,
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.3)',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
            }}
          >
            <ArrowIcon />
          </IconButton>
        </Box>
      </Container>
    );
}
