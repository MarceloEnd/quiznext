"use client";

import React from 'react';
import Link from 'next/link'; // Changed from react-router-dom
import {
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Box
} from '@mui/material';
import {
  Psychology as QuizIcon,
  ArrowForwardIos as ArrowIcon,
} from '@mui/icons-material';
import { StandardHeader } from '../../components/components/StandardHeader';

export default function WordleOverviewSite() {

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fdfdfd' }}>
      <StandardHeader previousPath="/spiele"/>
    </Box>
  );
}
