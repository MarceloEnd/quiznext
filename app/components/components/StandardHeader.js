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
import logo from '../images/logo.jpeg';
import oldlogo from '../images/logo_old.jpeg';

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
    color: '#FFFFFF',
    borderRadius: '50px',
    backgroundColor: isActive(path) ? '#f7bd4a' : 'transparent',
    textTransform: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: isActive(path) ? '#f7bd4a' : 'rgba(255, 255, 255, 0.1)',
    }
  });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: '#4ba5f7',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          py: 0.5
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', flex: isMobile ? 1 : '0 1 auto' }}>
              {isMobile ? (
                <Box onClick={handleDrawerToggle} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <IconButton sx={{ color: 'white', p: 0 }}>
                    <MenuIcon />
                  </IconButton>
                  <Typography sx={{ color: 'white', fontWeight: 700, ml: 0.5, fontSize: '0.9rem' }}>
                    Menu
                  </Typography>
                </Box>
              ) : (
                <Box
                  component={Link}
                  href="/" // 4. Changed 'to' to 'href'
                  sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
                >
                  <Box
                    component="img"
                    src={logo.src || logo} // Added .src for static imports in Next.js
                    alt="Logo"
                    sx={{ width: 50, height: 50, borderRadius: '12px', mr: 1.5, border: '2px solid #FFF' }}
                  />
                  <Box
                    component="img"
                    src={oldlogo.src || oldlogo}
                    alt="OldLogo"
                    sx={{ width: 50, height: 50, borderRadius: '12px', mr: 1.5, border: '2px solid #FFF' }}
                  />
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#ffffffff' }}>
                    Quiz for Kids
                  </Typography>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {isMobile ? (
                <Box
                  component={Link}
                  href="/" // 5. Changed 'to' to 'href'
                  sx={{ display: 'flex' }}
                >
                  <Box
                    component="img"
                    src={logo.src || logo}
                    alt="Logo"
                    sx={{ width: 45, height: 45, borderRadius: '10px', border: '2px solid #FFF' }}
                  />
                </Box>
              ) : (
                navLinks.map((link) => (
                  <Button
                    key={link.title}
                    component={Link}
                    href={link.path} // 6. Changed 'to' to 'href'
                    sx={getLinkStyle(link.path)}
                  >
                    {link.title}
                  </Button>
                ))
              )}
            </Box>

            <Box sx={{ flex: isMobile ? 1 : '0 1 auto', display: 'flex', justifyContent: 'flex-end', minWidth: isMobile ? 0 : 50 }}>
               {!isMobile && <Box sx={{ width: 50 }} />}
               {isMobile && <Box sx={{ width: 60 }} />}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { width: 240 } }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>Quiz for Kids</Typography>
          <List>
            {navLinks.map((item) => (
              <ListItem
                key={item.title}
                component={Link}
                href={item.path} // 7. Changed 'to' to 'href'
                sx={{ textDecoration: 'none' }}
              >
                <ListItemText
                  primary={item.title}
                  slotProps={{
                    primary: {
                      sx: {
                        textAlign: 'center',
                        color: pathname === item.path ? '#FF9800' : '#2D3436', // 8. Use pathname here
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
