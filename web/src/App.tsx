import { useState, useEffect } from "react";
import { fetchPage } from "./api";
import type { Page, Block } from "./types";
import { Header } from "./components/Header";
import { BlockRenderer } from "./components/BlockRenderer";
import { AdminPage } from "./components/admin/AdminPage";
import "./App.css";

export default function App() {
  const isAdmin = window.location.pathname.startsWith("/admin");

  const [page, setPage] = useState<Page|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    fetchPage('home')
      .then((page) => {
        setPage(page);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading){
    return <main className="app">Loading portfolio…</main>;
  };

  if (error){
    return <main className="app">Error: {error}</main>;
  }

  if(!page){
    return <main className="app">No data</main>;
  }

  if (isAdmin) {
    return <AdminPage page={page} />;
  }

  return (
    <main className="app">
      <Header />
      {page.blocks
        .sort((a, b) => a.position - b.position)
        .map((block: Block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
    </main>
  );
}
