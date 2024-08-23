import Sidebar from "./_components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <div className="absolute top-5 right-5">
        <Sidebar />
      </div>
    </div>
  );
}
