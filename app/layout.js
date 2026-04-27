import { Footer } from './components/components/Footer';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: 'Quiz for Kids',
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        <AppRouterCacheProvider>
            <CssBaseline />
            {children}
            <Footer />
        </AppRouterCacheProvider>
      </body>
      <GoogleAnalytics gaId="G-4BEMP9FEDP" />
    </html>
  );
}
