import { BrowserRouter, Routes, Route } from "react-router";
import { LandingPage } from "./components/web/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
