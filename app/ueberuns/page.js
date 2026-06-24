"use client";
import { StandardHeader } from "../components/components/StandardHeader";
import { Container, Typography, Box, Divider } from "@mui/material";
import { Link as MuiLink } from '@mui/material';

export default function UeberunsSite() {
  return (
    <>
      <StandardHeader />

      <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1, color: '#2D3436' }}>
          Über uns
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ lineHeight: 1.7 }}>
            Was steckt hinter uns
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            Quizforkids ist ein Zwei-Personen-Team aus Berlin.
          </Typography>
          <br /><br />
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            Andrea hat die letzten Jahre damit verbracht, das eigene Gehirn in ein wandelndes Lexikon für Kinderfragen zu verwandeln. Egal ob Harry Potter, Ninjago oder die Einhornakademie – um den unerschöpflichen Wissensdurst der eigenen Tochter zu stillen, wurde jede Trend-Welle mitgemacht. Weil wir wissen, wie anstrengend (und schön!) das sein kann, wollten wir diese gesammelten Schatzkisten voller Quizfragen mit anderen Eltern teilen.
            Um das Ganze auf das nächste Level zu heben, kam Marcel ins Spiel: Als Spiele- und Rätsel-Enthusiast hat Marcel aus der Fragensammlung eine interaktive Plattform gemacht. Zusammen bieten wir euch clevere Unterhaltung und kreative Knobelaufgaben für jede Lebenslage!
            <br /><br />
            Wir hoffen, ihr habt Spaß bei uns!
            <br /><br />
            Und falls ihr Anregungen und Ideen habt, schickt sie uns gerne an
            <br />
            <a href="mailto:idee@quizforkids.de" style={{ color: 'inherit', textDecoration: 'underline' }}>
              idee@quizforkids.de
            </a>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
