import { Navbar as AdminNavbar } from "@/components/admin/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNavbar />
      <main>
        {children}
      </main>
    </>
  );
}

