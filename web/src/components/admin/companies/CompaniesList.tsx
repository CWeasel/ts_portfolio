import type { Company } from "../../../api/companiesApi";
import { CompanyRow } from "./CompanyRow";

export function CompaniesList({
  companies,
  onEdit,
  onDelete,
}: {
  companies: Company[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Website</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((c) => (
          <CompanyRow
            key={c.id}
            company={c}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
