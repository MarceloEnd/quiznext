"use client"; // Required for useTheme and useMediaQuery

import React from 'react';
// 1. Swap the Link import
import Link from 'next/link';
import { StandardHeader } from "../components/components/StandardHeader";
import {
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Psychology as QuizIcon,
  ArrowForwardIos as ArrowIcon
} from '@mui/icons-material';

export default function QuizOverviewSite(){
  const activities = [
    {
      title: "Ponys und Pferde",
      description: "Teste dein Pferde Wissen?",
      path: "/quiz/1"
    },
    {
      title: "Farben",
      description: "Kennst du den Farbkreis?",
      path: "/quiz/2"
    }
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="Start">
      <StandardHeader />
      <Paper
        elevation={0} // Elevation 4 can sometimes look heavy on bright backgrounds
        sx={{
          p: { xs: 2, sm: 6 },
          textAlign: 'center',
          bgcolor: 'transparent' // Changed to transparent if it's inside a layout
        }}
      >
      <Typography
        variant={isMobile ? "h4" : "h2"}
        gutterBottom
        sx={{
          fontWeight: 800,
          color: "#4ba5f7"
        }}
        >
          Teste dein Quiz Wissen
        </Typography>

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {activities.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#c5efff',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' }
              }}
            >
              <ListItem
                sx={{
                  p: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  gap: { xs: 2, sm: 0 }
                }}
              >
                <ListItemIcon sx={{ minWidth: { xs: 0, sm: '56px' } }}>
                  <QuizIcon sx={{ fontSize: 40, color: '#FF9800' }} />
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                  }
                  secondary={item.description}
                  sx={{ textAlign: { xs: 'center', sm: 'left' } }}
                />

                <Button
                  variant="contained"
                  component={Link} // 2. Use Next.js Link
                  href={item.path} // 3. Use 'href' instead of 'to'
                  sx={{
                    borderRadius: '12px',
                    backgroundColor: '#FF9800',
                    px: 4,
                    '&:hover': {
                        backgroundColor: '#e68900', // Better contrast than FFF3E0 for a button
                    }
                  }}
                  endIcon={<ArrowIcon />}
                >
                  Go!
                </Button>
              </ListItem>
            </Paper>
          ))}
        </List>
      </Paper>
    </div>
  );
};
