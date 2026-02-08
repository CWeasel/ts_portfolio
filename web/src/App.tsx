import { Header } from "./components/Header";
import { Profile } from "./components/Profile";
import { Sections } from "./components/Sections";
import "./App.css";

export default function App() {
  return (
    <main className="app">
      <Header />
      <Profile />
      <Sections />
    </main>
  );
}
