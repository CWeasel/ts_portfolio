import { Footer } from "@/components/footer";

export default function Page() {
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
