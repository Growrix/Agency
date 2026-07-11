import './globals.css';

export const metadata = {
  metadataBase: new URL('https://rayisselectrical.com.au'),
  title: {
    default: 'Rayiss Electrical & Solar — Sydney solar and electrical specialists',
    template: '%s · Rayiss Electrical & Solar',
  },
  description:
    "Western Sydney's family-owned solar and electrical specialists. 10+ years, 110+ five-star reviews, fully licensed Level 2 ASP. Solar, batteries, EV chargers, heat pumps, CCTV, and general electrical.",
  keywords: ['solar installation sydney', 'electrician wetherill park', 'level 2 electrician', 'tesla powerwall installer', 'ev charger sydney', 'heat pump nsw rebate'],
  openGraph: {
    title: 'Rayiss Electrical & Solar',
    description: "Sydney's sharpest solar and electrical specialists. Family-owned, fully licensed, NSW-wide.",
    url: 'https://rayisselectrical.com.au',
    siteName: 'Rayiss Electrical & Solar',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Rayiss Electrical & Solar', description: "Sydney's sharpest solar and electrical specialists." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body>
        {children}
      </body>
    </html>
  );
}
