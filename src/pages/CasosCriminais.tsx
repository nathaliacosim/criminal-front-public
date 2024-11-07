// src/pages/CasosCriminais.tsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axios"; // Importando a instância do axios
import { Link } from "react-router-dom";
import NavigatorLateral from "../components/NavigatorLateral";

interface Suspeito {
  _id: string;
  nome: string;
  descricao: string;
}

interface Testemunha {
  _id: string;
  nome: string;
}

interface Detetive {
  _id: string;
  nome: string;
  especialidade: string;
}

interface CasoCriminal {
  _id: string;
  nomeVitima: string;
  descricaoCrime: string;
  tipoCrime: string | null;
  dataAbertura: string;
  dataFechamento: string;
  statusCaso: string;
  suspeitos: Suspeito[];
  testemunhas: Testemunha[];
  detetives: Detetive[];
}

function CasosCriminais() {
  const [casos, setCasos] = useState<CasoCriminal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCasos = async () => {
      try {
        setLoading(true);
        const response = await axios.get<CasoCriminal[]>("/caso-criminal");
        setCasos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os casos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCasos();
  }, []);

  const handleCadastrarCaso = () => {
    window.location.href = "/casos-criminais/cadastrar"; // Redireciona para a página de cadastro
  };

  return (
    <div className="fullscreen b-light-blue">
      <NavigatorLateral />
      <div>
        <h1>Casos Criminais</h1>
        <button onClick={handleCadastrarCaso}>Cadastrar Novo Caso</button>
        {loading ? (
          <p>Carregando casos...</p>
        ) : (
          <div>
            <h2>Últimos Casos Cadastrados</h2>
            <ul>
              {casos.map((caso) => (
                <li key={caso._id}>
                  <Link to={`/casos-criminais/${caso._id}`}>
                    {caso.descricaoCrime} - {caso.nomeVitima}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default CasosCriminais;
