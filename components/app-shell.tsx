import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function AppShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="h-screen bg-white flex overflow-hidden">
      <Sidebar />

      <div className="flex-1 min-w-0 flex flex-col h-screen">
        <Topbar title={title} />

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}