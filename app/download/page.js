"use client";

import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { Download as DownloadIcon, Visibility as ViewIcon } from "@mui/icons-material";
import { StandardHeader } from "../components/components/StandardHeader";

export default function Download() {
  // Define the path to your file here.
  // Since the file is in 'public/pdfs/', the URL is just '/pdfs/...'
  const pdfUrl = "/pdfs/Mermaid_friends.pdf";

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F8F9FA' }}>
      <StandardHeader />

      <Container sx={{ mt: 6, mb: 8, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="900" sx={{ mb: 1, color: '#2D3436' }}>
          Materialien 📚
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
          Kostenlos herunterladen
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>

          {/* 1. THE PREVIEW BOX */}
          <Paper
            elevation={4}
            sx={{
              width: '200px',
              height: '200px',

              borderRadius: '16px',
              border: '1px solid #E0E0E0',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              title="PDF Vorschau"
              style={{
                border: 'none',
                width: '800px',   // Set a large "virtual" width
                height: '400px',  // Set a large "virtual" height
                transform: 'scale(0.50)', // Shrink it down (200 / 800 = 0.25)
                transformOrigin: 'center center',
                pointerEvents: 'none' // Makes the whole box clickable if you wrap it in an <a>
              }}
            />
          </Paper>

          {/* 2. THE DOWNLOAD ACTION */}
          <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Direct Download */}
            <Button
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              href={pdfUrl} // Reference the string path
              download="Mermaid_friends_quizforkids.de.pdf"
              sx={{
                borderRadius: '12px',
                fontWeight: 'bold',
                px: 4,
                backgroundColor: '#219538',
                '&:hover': { backgroundColor: '#1a7a2e' }
              }}
            >
              Jetzt Downloaden
            </Button>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
