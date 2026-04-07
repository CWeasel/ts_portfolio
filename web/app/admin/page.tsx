"use client";
import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/use-admin";
import { redirect } from "next/navigation";

export default function Page() {
  const isAuth = useAuth();
  if (isAuth === null) {
    return <div>Loading...</div>;
  }
  if (!isAuth) {
    redirect("/admin/login");
  }

  return (
    <>
      <main>
        <section className="border-t border-border py-24 md:py-32">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <h1>Admin Page</h1>
            <p>
              Welcome to the admin dashboard. Here you can manage your portfolio
              content.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
