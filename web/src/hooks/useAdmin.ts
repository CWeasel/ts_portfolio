import { useEffect, useState } from "react";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAuthenticated(data.authenticated));
  }, []);

  return authenticated;
}