import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chronicle Finance - Financial Model Simulator",
  description: "Simulate Compound Interest, DCF, and Monte Carlo financial models with AI-powered insights. Premium financial simulation platform.",
  keywords: "financial model, compound interest, DCF, monte carlo, simulation, investment",
  openGraph: {
    images: [{ url: '/LOGO.jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/LOGO.jpeg'],
  },
};

import { AuthProvider } from "./context/AuthContext";
import { SimulationProvider } from "./context/SimulationContext";
import Sidebar from "./components/Sidebar";
import AnalyticsPanel from "./components/AnalyticsPanel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <div className="bg-texture"></div>
          <SimulationProvider>
            <div className="h-screen w-full flex bg-transparent overflow-hidden relative z-10">
              {/* Left Sidebar */}
              <Sidebar />

              {/* Main Workspace */}
              <main className="flex-1 flex flex-col h-full overflow-y-auto relative bg-transparent scroll-smooth no-scrollbar">
                {children}
              </main>

              {/* Right Analytics Panel */}
              <AnalyticsPanel />
            </div>
          </SimulationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
