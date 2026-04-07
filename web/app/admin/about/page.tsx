"use client"
import { AdminProfileSection } from "@/components/admin/profile-section";
import { useAuth } from "@/hooks/use-admin";
import { redirect } from "next/navigation";

export default function AdminProfilePage() {
  const isAuth = useAuth();
    if (isAuth === null) {
      return <div>Loading...</div>;
    }
    if (!isAuth) {
      redirect("/admin/login");
    }
  return <AdminProfileSection />;
}
