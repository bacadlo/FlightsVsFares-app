import "./globals.css";
import { Atmosphere } from '../components/atmosphere/Atmosphere';
import { SkyThemeProvider } from '../contexts/SkyThemeContext';
import { Nav } from '../components/nav/Nav';

const SITE_TITLE       = "FlightsVsFares — Find Your Cheapest Flight";
const SITE_DESCRIPTION = "AI-powered flight search launcher. Describe your trip, get strategic advice, open every major booking site simultaneously.";

export const metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="day">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SkyThemeProvider>
          <Atmosphere />
          <div className="page-wrapper">
            <Nav />
            {children}
          </div>
        </SkyThemeProvider>
      </body>
    </html>
  );
}
