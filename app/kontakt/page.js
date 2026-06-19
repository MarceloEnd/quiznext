"use client";
import { StandardHeader } from "../components/components/StandardHeader";
import { Container, Typography, Box, Divider } from "@mui/material";
import { Link as MuiLink } from '@mui/material';

export default function KontakteSite() {
  return (
    <>
      <StandardHeader />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 900, color: '#4ba5f7', mb: 4, textAlign: 'center' }}>
          Kontakt
        </Typography>

        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>
          Kontakt 1:
          Kontakt 1 Mail:
          ...
        </Typography>

      </Container>
    </>
  );
}
