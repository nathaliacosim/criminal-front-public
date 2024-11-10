import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CasosCriminais from "./pages/CasosCriminais";
import NovoCasoCriminal from "./pages/CadastroCasoCriminal";
import Suspeitos from "./pages/Suspeitos";
import Testemunhas from "./pages/Testemunhas";
import Detetives from "./pages/Detetives";
import Entrevistas from "./pages/Entrevistas";
import Evidencias from "./pages/Evidencias";
import EditarCaso from "./pages/EditarCaso";
import NovoSuspeito from "./pages/CadastroSuspeitos";
import EditarSuspeito from "./pages/EditarSuspeito";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CasosCriminais />} />
          <Route path="/casos-criminais" element={<CasosCriminais />} />
          <Route path="/casos-criminais/cadastrar" element={<NovoCasoCriminal />} />
          <Route path="/casos-criminais/editar/:id" element={<EditarCaso />} />
          <Route path="/suspeitos" element={<Suspeitos />} />
          <Route path="/suspeitos/cadastrar" element={<NovoSuspeito />} />
          <Route path="/suspeitos/editar/:id" element={<EditarSuspeito />} />
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
