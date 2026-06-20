import { SimulationProvider } from "../context/SimulationContext";
import Sidebar from "../components/Sidebar";
import AnalyticsPanel from "../components/AnalyticsPanel";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SimulationProvider>
      <div className="h-screen w-full flex bg-paper overflow-hidden relative z-10">
        {/* Left Sidebar — Table of Contents */}
        <Sidebar />

        {/* Main Workspace */}
        <main className="flex-1 flex flex-col h-full overflow-y-auto relative scroll-smooth no-scrollbar">
          {children}
        </main>

        {/* Right Sidebar — Research Journal */}
        <AnalyticsPanel />
      </div>
    </SimulationProvider>
  );
}
