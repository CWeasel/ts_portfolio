import { useState } from "react";
import type { Company } from "../../../api/companiesApi";

export function CompanyForm({
  company,
  onSubmit,
  onCancel,
}: {
  company: Company | null;
  onSubmit: (data: Omit<Company, "id">) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(company?.name ?? "");
  const [website, setWebsite] = useState(company?.website ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await onSubmit({ name, website: website || null });
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{company ? "Edit Company" : "New Company"}</h2>

      <input
        placeholder="Company name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />

      <div>
        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : company ? "Update" : "Create"}
        </button>
        {company && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
