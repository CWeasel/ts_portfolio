import type { Page } from "../../types";
import { AdminHeader } from "./AdminHeader";
import { BlockList } from "./BlockList";
import { SkillsAdmin } from "./SkillsSection";
import { CompanyAdmin } from "./CompaniesSection";
import { ProjectsAdmin } from "./ProjectsSection";
import { ProfileAdmin } from "./ProfileSection";

interface Props {
  page: Page;
}

function loadSubPage({ page }: Props) {
  switch (window.location.pathname) {
    case "/admin/skills":
      return SkillsAdmin();
    case "/admin/companies":
      return CompanyAdmin();
    case "/admin/projects":
      return ProjectsAdmin();
    case "/admin/profile":
      return ProfileAdmin();
    default:
      return <BlockList blocks={page.blocks} />;
  }
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
            <a href="/admin">Home</a>
          </li>
          <li>
            <a href="/admin/profile">Profile</a>
          </li>
          <li>
            <a href="/admin/companies">Companies</a>
          </li>
          <li>
            <a href="/admin/projects">Projects</a>
          </li>
          <li>
            <a href="/admin/skills">Skills</a>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>
        <AdminHeader page={page} />
        {loadSubPage({ page })}
      </main>
    </div>
  );
}
