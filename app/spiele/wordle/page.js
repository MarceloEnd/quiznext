"use client";

import React from 'react';
import Link from 'next/link';
import {
  Typography,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Button,
  Container
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ArrowForwardIos as ArrowIcon
} from '@mui/icons-material';
import { StandardHeader } from '../../components/components/StandardHeader';
import { setIcon } from '../../components/components/functions';
import { categoriesWordle } from './functions/functions';

export default function WordleOverviewSite() {
  const themes = categoriesWordle();

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', pb: 4 }}>
      <StandardHeader />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 900, color: '#219538', mb: 4, textAlign: 'center' }}>
          Wordle
        </Typography>

        {themes.map((item) => (
          <Accordion
            key={item.id}
            elevation={2}
            sx={{ mb: 2, borderRadius: '16px', '&:before': { display: 'none' } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Box component="img" src={setIcon(item.iconSrc)} sx={{ width: 40, height: 30 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, flexGrow: 1 }}>
                  {item.kategorie}
                </Typography>
                <Button
                  component={Link}
                  href={`/spiele/wordle/${item.id}?level=1`}
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: '#219538', borderRadius: '8px' }}
                >
                  Los
                </Button>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ borderTop: '1px solid #eee', p: 2 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    md: 'repeat(5, 1fr)',
                  },
                  gap: 1.5,
                }}
              >
                {item.fragen.map((wortObj) => (
                  <Button
                    key={wortObj.id}
                    component={Link}
                    href={`/spiele/wordle/${item.id}?level=${wortObj.id}`}
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: '#219538',
                      borderRadius: '8px',
                      padding: '8px 4px',
                      fontWeight: 'bold',
                      width: '100%',
                      '&:hover': { backgroundColor: '#1a7a2e' }
                    }}
                  >
                    {`Level ${wortObj.id}`}
                  </Button>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}
