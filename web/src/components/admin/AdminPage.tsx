import type { Page } from "../../types";
import { AdminHeader } from "./AdminHeader";
import { BlockList } from "./BlockList";

interface Props {
    page: Page;
}

export function AdminPage({ page }: Props) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: "220px",
          borderRight: "1px solid #ddd",
          padding: "1rem",
        }}
      >
        <h3>Pages</h3>
        <ul>
          <li>
            <strong>Home</strong>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>
        <AdminHeader page={page} />
        <BlockList blocks={page.blocks} />
      </main>
    </div>
  );
}