import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://thechronicle.finance'),
  title: "Chronicle Finance — A Living Financial Publication",
  description: "Where models become research articles and simulations become interactive analytical experiences. Quantitative research, probabilistic intelligence, and editorial insight.",
  keywords: "financial models, quantitative research, Monte Carlo, portfolio optimization, value at risk, simulation, editorial finance",
};

import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full font-body text-ink bg-paper" suppressHydrationWarning>
        <AuthProvider>
          <div className="bg-texture" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
