import { useState } from "react";
import type { Project } from "../../../api/projectsApi";

export function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project: Project | null;
  onSubmit: (data: Omit<Project, "id">) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(project?.name ?? "");
  const [summary, setSummary] = useState(project?.summary ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [url, setUrl] = useState(project?.url ?? "");
  const [repo_url, setRepoUrl] = useState(project?.repo_url ?? "");
  const [start_date, setStartDate] = useState(project?.start_date ?? "");
  const [end_date, setEndDate] = useState(project?.end_date ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSubmit({
      name,
      summary,
      description,
      url,
      repo_url,
      start_date,
      end_date,
      featured,
    });
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>{project ? "Edit Project" : "New Project"}</h2>

      <input
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input type="url"
        placeholder="Project URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <input type="url"
        placeholder="Repository URL"
        value={repo_url}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <input type="date"
        placeholder="Start date"
        value={start_date}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input type="date"
        placeholder="End date"
        value={end_date}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        Featured
      </label>

      <div>
        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : project ? "Update" : "Create"}
        </button>
        {project && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
