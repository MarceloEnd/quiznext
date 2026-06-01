import { Footer } from './components/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import { Red_Hat_Text } from 'next/font/google';
import ThemeRegistry from './components/components/providers/ThemeRegistry';

// Initialize the font
const redHat = Red_Hat_Text({
  subsets: ['latin'],
  variable: '--font-red-hat',
});

export const metadata = {
  title: 'Quiz for Kids',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={redHat.variable}>
      <body>
        {/* Use the registry component instead */}
        <ThemeRegistry>
          {children}
          <Footer />
        </ThemeRegistry>
        <GoogleAnalytics gaId="G-4BEMP9FEDP" />
      </body>
    </html>
  );
}
