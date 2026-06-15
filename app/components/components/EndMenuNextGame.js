"use client";

import {
  Box, Typography,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useRouter } from 'next/navigation';

export const EndMenuNextGame = ({ gameWon, winText, winAnswer, nextGameLink, backLink }) => {
  const router = useRouter();
  return (
    <Dialog
      open={gameWon}
      maxWidth="xs"
      fullWidth
      // PaperProps ensures the actual modal card centers its internal text
      PaperProps={{
        sx: {
          borderRadius: 4,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }
      }}
    >
      <DialogTitle sx={{ pt: 4, textAlign: 'center' }}>
        <EmojiEventsIcon sx={{ fontSize: 80, color: '#ffc107', mb: 1 }} />
        <Typography variant="h4" fontWeight="900" sx={{ textAlign: 'center' }}>
          {winText}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ width: '100%' }}>
        <Box
          sx={{
            my: 3,
            p: 2,
            bgcolor: '#f0f7ff',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            sx={{ textAlign: 'center' }}
          >
             {winAnswer}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          pb: 4,
          px: 4,
          width: '100%' // Ensure actions take full width to allow internal centering
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => {window.location.href = nextGameLink}}
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            m: '0 !important',
            textAlign: 'center'
          }}
        >
          Nächstes Spiel
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push(backLink)}
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontWeight: 'bold',
            m: '0 !important',
            textAlign: 'center'
          }}
        >
          Zurück zum Menü
        </Button>
      </DialogActions>
    </Dialog>
  );
};
