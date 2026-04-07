"use client"
import { RolesAdminSection } from "@/components/admin/role-section";
import { useAuth } from "@/hooks/use-admin";
import { redirect } from "next/navigation";

export default function AdminRolesPage() {
  const isAuth = useAuth();
    if (isAuth === null) {
      return <div>Loading...</div>;
    }
    if (!isAuth) {
      redirect("/admin/login");
    }
  return <RolesAdminSection />;
}
