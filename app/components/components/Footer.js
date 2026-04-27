"use client";

import React from 'react';
import { Box, Container, Typography, Link as MuiLink, Stack, Divider } from '@mui/material';
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(90deg, #4ba5f7 0%, #c5efff 100%)',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        py: 4,
        mt: 'auto',
        width: '100%',
        display: 'block'
      }}
    >
      <Container maxWidth="lg">
        <Stack
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
            gap: 2
          }}
        >
          {/* LEFT SIDE: Copyright */}
          <Typography
            variant="body2"
            sx={{
              color: '#ffffff',
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 500,
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © {currentYear} Quiz for Kids. Alle Rechte vorbehalten.
          </Typography>

          {/* RIGHT SIDE: Legal Links */}
          <Stack
            direction="row"
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: 14, my: 'auto', borderColor: 'rgba(255,255,255,0.3)' }}
              />
            }
            sx={{
              justifyContent: { xs: 'center', sm: 'flex-end' },
              alignItems: 'center',
              display: 'flex',
              gap: 3
            }}
          >
            {/* CLEAN MODERN LINK: No legacyBehavior needed */}
            <MuiLink
              component={Link}
              href="/agb"
              sx={{
                color: '#2D3436',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: '"Outfit", sans-serif',
                transition: 'all 0.2s',
                '&:hover': { color: '#4ba5f7', transform: 'translateY(-1px)' }
              }}
            >
              AGB
            </MuiLink>

            <MuiLink
              component={Link}
              href="/impressum"
              sx={{
                color: '#2D3436',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: '"Outfit", sans-serif',
                transition: 'all 0.2s',
                '&:hover': { color: '#4ba5f7', transform: 'translateY(-1px)' }
              }}
            >
              Impressum
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
