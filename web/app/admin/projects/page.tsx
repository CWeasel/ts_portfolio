"use client"
import { AdminProjectsSection } from "@/components/admin/projects-section";
import { useAuth } from "@/hooks/use-admin";
import { redirect } from "next/navigation";

export default function AdminProjectsPage() {
  const isAuth = useAuth();
    if (isAuth === null) {
      return <div>Loading...</div>;
    }
    if (!isAuth) {
      redirect("/admin/login");
    }
  return <AdminProjectsSection />;
}
