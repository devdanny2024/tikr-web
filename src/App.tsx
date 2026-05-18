import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from "./components/web/LandingPage";
import { AdminPage } from "./components/web/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
