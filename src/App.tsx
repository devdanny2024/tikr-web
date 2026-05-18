import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from "./components/web/LandingPage";
import { AdminPage } from "./components/web/AdminPage";
import { VerifyEmailPage } from "./components/web/VerifyEmailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
