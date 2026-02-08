import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Profile } from "./components/Profile";
import { Sections } from "./components/Sections";
import type { Portfolio } from "./types";
import "./App.css";

export default function App() {
  const [data, setData] = useState<Portfolio|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/portfolio")
      .then((res) => {
        if (!res.ok){
          throw new Error(`HTTP ${res.status}`);
        };
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading){
    return(<p>Loading...</p>);
  };

  if (error){
    return(<p style={{color: "red"}}>Error: {error}.-</p>)
  }

  if(!data){
    return(<p>No data received.</p>)
  }

  return (
    <main className="app">
      <Header />
      <Profile profile={data.profile}/>
      <Sections sections={data.sections}/>
    </main>
  );
}
