import { BrowserRouter, Route, Routes } from "react-router-dom";

import CasosCriminais from "./pages/casos-criminais/CasosCriminais";
import NovoCasoCriminal from "./pages/casos-criminais/NovoCasoCriminal";
import EditarCaso from "./pages/casos-criminais/EditarCaso";
import Suspeitos from "./pages/suspeitos/Suspeitos";
import NovoSuspeito from "./pages/suspeitos/NovoSuspeito";
import EditarSuspeito from "./pages/suspeitos/EditarSuspeito";
import Testemunhas from "./pages/testemunhas/Testemunhas";
import NovaTestemunha from "./pages/testemunhas/NovaTestemunha";
import EditarTestemunha from "./pages/testemunhas/EditarTestemunha";
import Detetives from "./pages/detetives/Detetives";
import NovoDetetive from "./pages/detetives/NovoDetetive";
import EditarDetetive from "./pages/detetives/EditarDetetive";
import Evidencias from "./pages/evidencias/Evidencias";
import NovaEvidencia from "./pages/evidencias/NovaEvidencia";
import EditarEvidencia from "./pages/evidencias/EditarEvidencia";
import Entrevistas from "./pages/entrevistas/Entrevistas";
import NovaEntrevista from "./pages/entrevistas/NovaEntrevista";
import EditarEntrevista from "./pages/entrevistas/EditalEntrevista";

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

          <Route path="/evidencias" element={<Evidencias />} />
          <Route path="/evidencias/cadastrar" element={<NovaEvidencia />} />
          <Route path="/evidencias/editar/:id" element={<EditarEvidencia />} />

          <Route path="/testemunhas" element={<Testemunhas />} />
          <Route path="/testemunhas/cadastrar" element={<NovaTestemunha />} />
          <Route path="/testemunhas/editar/:id" element={<EditarTestemunha />} />

          <Route path="/detetives" element={<Detetives />} />
          <Route path="/detetives/cadastrar" element={<NovoDetetive />} />
          <Route path="/detetives/editar/:id" element={<EditarDetetive />} />

          <Route path="/entrevistas" element={<Entrevistas />} />
          <Route path="/entrevistas/cadastrar" element={<NovaEntrevista />} />
          <Route path="/entrevistas/editar/:id" element={<EditarEntrevista />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
