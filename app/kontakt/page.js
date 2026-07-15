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

        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4,mx: 'auto', lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
          Entstanden aus Freude an Quizfragen und Spielen sind wir nun immer auf der Suche nach neuen Themenbereichen, die wir hinzufügen können.
          <br/><br/>
          Deshalb sind ständig auf der Jagd nach neuen, spannenden Themen, um unsere Sammlung für dich zu erweitern.
          <br/><br/>
          Meldet euch gerne bei uns und schreibt eine E-Mail an:
          info [at] quizforkids.de
        </Typography>
        <Container sx={{marginTop:'35vh'}} />
      </Container>
    </>
  );
}
