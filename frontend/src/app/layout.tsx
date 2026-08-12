import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lumina-notes-sepia.vercel.app';
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-T259J6NF4V';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Lumina | The Sovereign Workspace for Deep Thinkers",
    template: "%s | Lumina"
  },
  description: "Lumina is a premium full-stack note-taking sanctuary and AI study platform. Generate publication-grade notes, interactive diagrams, and publication-ready PDFs.",
  keywords: ["AI Notes", "Study Workspace", "Markdown Editor", "PDF Generation", "Lumina Notes", "Deep Thinking", "Document Studio"],
  authors: [{ name: "Anshul-A7" }],
  creator: "Lumina",
  publisher: "Lumina",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? [process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION] : [],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Lumina Notes",
    title: "Lumina | The Workspace for Deep Thinkers",
    description: "A distraction-free sanctuary for deep thinkers, researchers, and students to build and export publication-grade notes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina | The Workspace for Deep Thinkers",
    description: "A distraction-free sanctuary for deep thinkers, researchers, and students.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon" }
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDFBF7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />

          {/* Google Identity Services — loaded globally for OAuth on all auth pages */}
          <Script
            src="https://accounts.google.com/gsi/client"
            strategy="afterInteractive"
          />

          {/* Google Analytics (GA4) */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}

