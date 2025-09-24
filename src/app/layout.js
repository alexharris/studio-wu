import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Studio Wu",
  description: "Studio Wu is an interior design studio in the San Francisco Bay Area",
  appleWebApp: {
    title: "Studio Wu",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Studio Wu",
    description: "Studio Wu is an interior design studio in the San Francisco Bay Area",
    url: "https://studiowuinteriors.com",
    siteName: "Studio Wu",
    type: "website",
    images: [
      {
        url: "/StudioWu_Logo_Black_1000px.png",
        width: 1000,
        height: 1000,
        alt: "Studio Wu Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Wu",
    description: "Studio Wu is an interior design studio in the San Francisco Bay Area",
    images: ["/StudioWu_Logo_Black_1000px.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/icon0.svg", type: "image/svg+xml" },
      { url: "/favicon/icon1.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/favicon/apple-icon.png", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/icon0.svg",
        color: "#000000",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/zyk8izc.css"></link>
      </head>
      <body className="flex flex-col min-h-screen m-0">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}


