import type { Company } from "../../../api/companiesApi";

export function CompanyRow({
  company,
  onEdit,
  onDelete,
}: {
  company: Company;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <tr>
      <td>{company.name}</td>
      <td>{company.website ?? "—"}</td>
      <td>
        <button onClick={() => onEdit(company.id)}>Edit</button>
        <button onClick={() => onDelete(company.id)}>Delete</button>
      </td>
    </tr>
  );
}
