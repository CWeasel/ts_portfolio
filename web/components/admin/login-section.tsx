"use client";
import { loginAdmin } from "@/hooks/use-admin";
import { FadeIn } from "../fade-in";

export function LoginSection() {
    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await loginAdmin(email, password);
            window.location.href = "/admin";
        } catch (error: unknown) {
            alert(error as string || "Login failed. Please try again.");
        }
    };    

    return (
        <section id="admin-login" className="border-t border-border py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6 md:px-8">
                    <h2 className="font-mono text-sm uppercase tracking-widest text-primary">
                        Admin Login
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Please enter your credentials to access the admin panel.
                    </p>

                {/* Login form goes here */}
                    <form onSubmit={handleLogin} className="mt-8 max-w-sm space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="mt-1 block w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:ring focus:ring-primary/50"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                required
                                className="mt-1 block w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:ring focus:ring-primary/50"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Login
                        </button>
                    </form>
            </div>
        </section>
    );
};