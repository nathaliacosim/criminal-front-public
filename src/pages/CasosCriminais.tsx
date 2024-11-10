import React, { useEffect, useState, useCallback } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./Ajustes.css";
import NavigatorLateral from "../components/NavigatorLateral";
import Paper from "../components/Paper";
import Modal from "../components/ModalCaso";

interface Detetive {
  _id: string;
  nome: string;
  tipo: string;
  patente: string;
  especialidade: string;
}

interface Suspeito {
  _id: string;
  nome: string;
  alibi: string;
  relacaoComVitima: string;
  casoCriminal: string;
  grauSuspeito: string;
  descricaoFisica: string;
}

interface Testemunha {
  _id: string;
  nome: string;
  relacaoComVitima: string;
  confiabilidade: string;
  tipoTestemunha: string;
}

interface Evidencia {
  _id: string;
  descricao: string;
  localizacao: string;
  tipoEvidencia: string;
  statusEvidencia: string;
}

interface Entrevista {
  _id: string;
  motivoEntrevista: string;
  entrevistado: string;
  dataHoraInicio: string;
  nomeResponsavel: string;
}

interface CasoCriminal {
  _id: string;
  nomeVitima: string;
  descricaoCrime: string;
  tipoCrime: string;
  dataAbertura: string;
  dataFechamento: string;
  statusCaso: string;
  suspeitos: Suspeito[];
  testemunhas: Testemunha[];
  detetives: Detetive[];
  evidencias: Evidencia[];
  entrevistas: Entrevista[];
}

function CasosCriminais() {
  const [casos, setCasos] = useState<CasoCriminal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCaso, setSelectedCaso] = useState<CasoCriminal | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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

  const handleCadastrarCaso = useCallback(() => {
    navigate("/casos-criminais/cadastrar");
  }, [navigate]);

  const handleCardClick = useCallback((caso: CasoCriminal) => {
    setSelectedCaso(caso);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleEdit = useCallback((id: string) => {
    navigate(`/casos-criminais/editar/${id}`);
  }, [navigate]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await axios.delete(`/caso-criminal/${id}`);
      setCasos(prevCasos => prevCasos.filter(caso => caso._id !== id));
      handleModalClose();
    } catch (error) {
      console.error("Erro ao excluir o caso:", error);
      alert("Erro ao excluir o caso. Tente novamente.");
    }
  }, [handleModalClose]);

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
                <div
                  className="quiz-card"
                  key={caso._id}
                  onClick={() => handleCardClick(caso)}
                >
                  <div className="quiz-card-header">
                    <span className="quiz-card-category">
                      {caso.tipoCrime ? caso.tipoCrime : "Tipo de crime desconhecido"}
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
                      <b>Início:</b> {caso.dataAbertura ? format(new Date(caso.dataAbertura), 'dd/MM/yyyy') : "Data não disponível"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Paper>

      {selectedCaso && (
        <Modal
          isOpen={modalOpen}
          caso={selectedCaso}
          onClose={handleModalClose}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default CasosCriminais;
