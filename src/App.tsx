import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CasosCriminais from "./pages/CasosCriminais";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/casos-criminais" element={<CasosCriminais />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
