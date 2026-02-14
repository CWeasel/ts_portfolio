import { GenericAdminManager } from "./GenericAdminManager";
import type { ModelSchema } from "../../types/admin";

interface Company {
  id: string;
  name: string;
  website?: string | null;
}

const CompanySchema: ModelSchema<Company> = {
  name: "Company",
  endpoint: "http://localhost:3000/api/admin/companies",
  fields: [
    { key: "name", label: "Company Name", type: "text", required: true },
    {
      key: "website",
      label: " Company Website",
      type: "text",
      required: false,
    },
  ],
};

export const CompanyAdmin = () => <GenericAdminManager schema={CompanySchema} />

// import { useState } from "react";
// import { useCompanies } from "../../../hooks/useCompanies";
// import { CompaniesList } from "./CompaniesList";
// import { CompanyForm } from "./CompanyForm";

// export function CompaniesPage() {
//   const { companies, loading, error, create, update, remove } = useCompanies();

//   const [editing, setEditing] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState<string | null>(null);

//   if (loading) return <p>Loading companies…</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   const companyToEdit = companies.find((s) => s.id === editing) || null;
//   const companyToDelete = companies.find((s) => s.id === deleting) || null;

//   return (
//     <div>
//       <h1>Manage Companies</h1>

//       <CompanyForm
//         key={editing || "new"}
//         company={companyToEdit}
//         onCancel={() => setEditing(null)}
//         onSubmit={async (data) => {
//           if (editing) {
//             await update(editing, data);
//           } else {
//             await create(data);
//           }
//           setEditing(null);
//         }}
//       />

//       <CompaniesList
//         companies={companies}
//         onEdit={(id) => setEditing(id)}
//         onDelete={(id) => setDeleting(id)}
//       />

//       {companyToDelete && (
//         <div style={{ border: "1px solid red", padding: "1rem" }}>
//           <p>
//             Are you sure you want to delete <strong>{companyToDelete.name}</strong>?
//           </p>
//           <button
//             onClick={async () => {
//               await remove(companyToDelete.id);
//               setDeleting(null);
//             }}
//           >
//             Yes, delete
//           </button>
//           <button onClick={() => setDeleting(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }
