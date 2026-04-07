"use client"
import { AdminSkillsSection } from "@/components/admin/skills-section";
import { useAuth } from "@/hooks/use-admin";
import { redirect } from "next/navigation";

export default function AdminSkillsPage() {
  const isAuth = useAuth();
    if (isAuth === null) {
      return <div>Loading...</div>;
    }
    if (!isAuth) {
      redirect("/admin/login");
    }
  return <AdminSkillsSection />;
}
