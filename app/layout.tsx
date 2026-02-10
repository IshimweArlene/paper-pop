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
        <div className="w-full overflow-x-hidden flex flex-col">
          <div className="w-full">
            {children}
          </div>
          <p className="text-[10px] text-black mt-12 mb-8 text-center">Created by Imena Dev Team</p>
        </div>
      </body>


    </html>
  );
}
