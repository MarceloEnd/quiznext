import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, IconButton,
  Button, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme
} from '@mui/material';
// 1. Correct Next.js Import
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image'; // Optional: Use Next.js Image component for optimization

// Note: Ensure these paths are relative to this file in your new structure
import logo from '../images/logo.png';

export const StandardHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // 2. Swap useLocation for usePathname
  const pathname = usePathname();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navLinks = [
    { title: 'Quiz', path: '/quiz' },
    { title: 'Witze', path: '/witz' },
    { title: 'Spiele', path: '/spiele' },
    { title: 'Downloads', path: '/download' },
    { title: 'Offline Spiele', path: '/offlinespiele' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // 3. Update active logic
  const isActive = (path) => pathname === path;

  const getLinkStyle = (path) => ({
    fontWeight: 700,
    textDecoration: 'none',
    mx: 2,
    color: 'white',
    borderRadius: '12px',
    backgroundColor: isActive(path) ? '#f7bd4a' : '#4ba5f7',
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: isActive(path) ? 'rgba(247, 189, 74, 0.4)' : 'rgba(75, 165, 247, 0.2)',
    }
  });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: '#c5efff',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          py: 0.5
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            {/* Left Side: Mobile Menu Button OR Desktop Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isMobile ? (
                <Box onClick={handleDrawerToggle} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <IconButton sx={{ color: '#4ba5f7', p: 0 }}>
                    <MenuIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box
                  component={Link}
                  href="/"
                  sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                >
                  <Box
                    component="img"
                    src={logo.src || logo}
                    alt="Logo"
                    sx={{ width: 250, height: 62.5 }}
                  />
                </Box>
              )}
            </Box>

            {/* Right Side / Center Content: Desktop Nav Links OR Mobile Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                // On desktop, push the links to the far right.
                // On mobile, perfectly center the absolute logo.
                ml: isMobile ? 0 : 'auto',
                ...(isMobile && {
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                })
              }}
            >
              {isMobile ? (
                <Box
                  component={Link}
                  href="/"
                  sx={{ display: 'flex' }}
                >
                  <Box
                    component="img"
                    src={logo.src || logo}
                    alt="Logo"
                    sx={{ width: 250, height: 62.5 }}
                  />
                </Box>
              ) : (
                navLinks.map((link) => (
                  <Button
                    key={link.title}
                    component={Link}
                    href={link.path}
                    sx={getLinkStyle(link.path)}
                  >
                    {link.title}
                  </Button>
                ))
              )}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer Menu */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { width: 240, backgroundColor: '#c5efff' } }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 3 }}>
          <Box
            component="img"
            src={logo.src || logo}
            alt="Logo"
            sx={{ width: 200, height: 50 }}
          />
          <List>
            {navLinks.map((item) => (
              <ListItem
                key={item.title}
                component={Link}
                href={item.path}
                sx={{ textDecoration: 'none' }}
              >
                <ListItemText
                  primary={item.title}
                  slotProps={{
                    primary: {
                      sx: {
                        textAlign: 'center',
                        color: pathname === item.path ? '#FF9800' : '#4ba5f7',
                        fontWeight: 700
                      }
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
