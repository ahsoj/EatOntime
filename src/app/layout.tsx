import "./globals.css";
import EmotionStyleRegistary from "./EmotionStyleRegistary";

export const metadata = {
  title: "Eat onTime",
  description: "Meal and Glosary delivery service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@100;500;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <EmotionStyleRegistary>{children}</EmotionStyleRegistary>
      </body>
    </html>
  );
}
