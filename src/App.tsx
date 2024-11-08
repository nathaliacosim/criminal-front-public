import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CasosCriminais from "./pages/CasosCriminais";
import NovoCasoCriminal from "./pages/CadastroCasoCriminal";
import Suspeitos from "./pages/Suspeitos";
import Testemunhas from "./pages/Testemunhas";
import Detetives from "./pages/Detetives";
import Entrevistas from "./pages/Entrevistas";
import Evidencias from "./pages/Evidencias";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CasosCriminais />} />
          <Route path="/casos-criminais" element={<CasosCriminais />} />
          <Route path="/casos-criminais/cadastrar" element={<NovoCasoCriminal />} />
          <Route path="/suspeitos" element={<Suspeitos />} />
          <Route path="/testemunhas" element={<Testemunhas />} />
          <Route path="/detetives" element={<Detetives />} />
          <Route path="/evidencias" element={<Evidencias />} />
          <Route path="/entrevistas" element={<Entrevistas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
