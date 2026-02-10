import type { Page } from "../../types";

export function AdminHeader({ page }: { page: Page }) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <div>
        <h1>Editing: {page.title}</h1>
        <small>/{page.slug}</small>
      </div>

      <button disabled style={{ opacity: 0.5 }}>
        + Add block (coming soon)
      </button>
    </header>
  );
}
