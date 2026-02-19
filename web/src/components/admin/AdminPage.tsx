import { Route, Routes, Link } from "react-router-dom";
import type { Page } from "../../types";
import { AdminHeader } from "./AdminHeader";
import { BlockList } from "./BlockList";
import { SkillsAdmin } from "./SkillsSection";
import { CompanyAdmin } from "./CompaniesSection";
import { ProjectsAdmin } from "./ProjectsSection";
import { ProfileAdmin } from "./ProfileSection";
import { RolesAdmin } from "./RoleSection";

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
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/profile">Profile</Link>
          </li>
          <li>
            <Link to="/admin/companies">Companies</Link>
          </li>
          <li>
            <Link to="/admin/projects">Projects</Link>
          </li>
          <li>
            <Link to="/admin/skills">Skills</Link>
          </li>
          <li>
            <Link to="/admin/roles">Roles</Link>
          </li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: "1rem" }}>
        <AdminHeader page={page} />
        <Routes>
          <Route path="/admin/profile" element={<ProfileAdmin />} />
          <Route path="/admin/companies" element={<CompanyAdmin />} />
          <Route path="/admin/projects" element={<ProjectsAdmin />} />
          <Route path="/admin/skills" element={<SkillsAdmin />} />
          <Route path="/admin/roles" element={<RolesAdmin />} />
        </Routes>
      </main>
    </div>
  );
}
