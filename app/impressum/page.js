"use client";
import { StandardHeader } from "../components/components/StandardHeader";
import { Container, Typography, Box, Divider } from "@mui/material";
import { Link as MuiLink } from '@mui/material';

export default function ImpressumSite() {
  return (
    <>
      <StandardHeader />

      <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1, color: '#2D3436' }}>
          Impressum
        </Typography>

        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 4 }}>
          Angaben gemäß § 5 TMG
        </Typography>


        {/* Kontakt */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
          Andrea Schleusener<br />
          Prinzregentenstraße 88<br />
          10717 Berlin
          </Typography>
        </Box>

        {/* Kontaktmöglichkeiten */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Kontakt
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            Telefon: n/a<br />
            E-Mail: info@quizforkids.de
          </Typography>
        </Box>

        {/* Redaktionell Verantwortlicher */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Redaktionell verantwortlich
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            Andrea Schleusener<br />
            Prinzregentenstraße 88<br />
            10717 Berlin
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Haftungsausschlüsse */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
            EU-Streitschlichtung:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <br/>
            <MuiLink
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#4ba5f7', fontWeight: 600, textDecoration: 'underline' }}
            >
              https://ec.europa.eu/consumers/odr/
            </MuiLink>
            <br />
            Unsere E-Mail-Adresse findest du oben im Impressum.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Verbraucherstreitbeilegung / Universalschlichtungsstelle:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Wir sind bereit, aber nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Urheberrechtshinweis
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Sämtliche Inhalte dieser Website sind urheberrechtlich geschützt. Die Nutzung oder Verbreitung der bereitgestellten Texte und Medien bedarf der vorherigen Zustimmung. <br/>
            Wir sind bemüht, stets die Urheberrechte anderer zu wahren. Sollten Sie trotz unserer Sorgfalt eine Unstimmigkeit feststellen, danken wir Ihnen für einen entsprechenden Hinweis, damit wir den Sachverhalt prüfen und die Inhalte gegebenenfalls sofort entfernen können.
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Hinweis zu KI-generierten Inhalten
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Zur Gestaltung unserer Webseite – einschließlich Grafiken, Illustrationen, Rätseln sowie Audio-Elementen – können neben klassischen Bearbeitungsprogrammen auch moderne Technologien auf Basis künstlicher Intelligenz (KI) zum Einsatz kommen. Diese dienen der Unterstützung unseres kreativen Prozesses und der Optimierung unserer digitalen Inhalte.
          </Typography>
        </Box>

      </Container>
    </>
  );
}
