import Masthead from "../components/Masthead";

export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <Masthead />
      {children}
    </div>
  );
}
