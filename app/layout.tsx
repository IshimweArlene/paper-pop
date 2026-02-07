import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Great_Vibes, Alex_Brush } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Imena Paper Pop",
  description: "Create polished invitations with Imena Paper Pop templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${greatVibes.variable} ${alexBrush.variable} antialiased`}
      >
        <div className="w-full overflow-x-hidden flex justify-center">
          <div className="flex-shrink-0">
            {children}
          </div>
        </div>
      </body>


    </html>
  );
}
