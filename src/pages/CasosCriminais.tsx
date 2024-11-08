import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import "./Ajustes.css";
import NavigatorLateral from "../components/NavigatorLateral";
import Paper from "../components/Paper";

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

interface TipoCrime {
  _id: string;
  nome: string;
  descricao: string;
}

interface CasoCriminal {
  _id: string;
  nomeVitima: string;
  descricaoCrime: string;
  tipoCrime: TipoCrime | null;
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
  const navigate = useNavigate();

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
    navigate("/casos-criminais/cadastrar"); // Usando navigate para redirecionamento
  };

  return (
    <div className="fullbody">
      <NavigatorLateral />
      <Paper>
        <div className="left-content">
          <h2>Casos Criminais</h2>
          <br />
          <button
            className="btn-1 b-dark-orange f-white"
            onClick={handleCadastrarCaso}
          >
            + Caso Criminal
          </button>

          {loading ? (
            <p>Carregando casos...</p>
          ) : (
            <div className="container-cards">

              {casos.map((caso) => (
                <div className="quiz-card" key={caso._id}>
                  <div className="quiz-card-header">
                    <span className="quiz-card-category">
                      {caso.tipoCrime ? caso.tipoCrime.nome : "Tipo de crime desconhecido"}
                    </span>
                  </div>
                  <div className="quiz-card-body">
                    <p className="quiz-card-question subtitle">
                      <b>Vítima:</b> {caso.nomeVitima}
                      <br />
                      <b>Responsável:</b>{" "}
                      {caso.detetives.map((detetive) => detetive.nome).join(", ")}
                      <br />
                      <b>Status:</b> {caso.statusCaso}
                      <br />
                      <b>Início:</b> {caso.dataAbertura}
                    </p>
                  </div>
                </div>
              ))}

            </div>

          )}
        </div>
      </Paper>
    </div>
  );
}

export default CasosCriminais;
