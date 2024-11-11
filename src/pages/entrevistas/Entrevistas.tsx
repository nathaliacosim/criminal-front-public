import { useEffect, useState, useCallback } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";
import ModalEntrevista from "../../components/ModalEntrevista";

interface Entrevista {
    _id: string;
    entrevistado: string;
    tipoEntrevistado: string;
    tipoEntrevista: string;
    localEntrevista: string;
    casoCriminal: string;
    motivoEntrevista: string;
    nomeResponsavel: string;
    ataEntrevista: string;
    dataHoraInicio: string;
    dataHoraFim: string;
}

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
    dataNascimento: string;
    endereco: string;
    tipoTestemunha: string;
    alibi: string;
    relacaoComVitima: string;
    depoimento: string;
    confiabilidade: string;
    casoCriminal: string;
}


interface Evidencia {
    _id: string;
    descricao: string;
    localizacao: string;
    tipoEvidencia: string;
    statusEvidencia: string;
    casoCriminal: string;
    dataEncontro: string;
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

function Entrevistas() {
    const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedEntrevista, setSelectedEntrevista] = useState<Entrevista | null>(null);
    const [selectedCaso, setSelectedCaso] = useState<CasoCriminal | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEntrevistas = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Entrevista[]>("/entrevistas");
                setEntrevistas(response.data);
            } catch (error) {
                console.error("Erro ao buscar as entrevistas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEntrevistas();
    }, []);

    useEffect(() => {
        if (selectedEntrevista && selectedEntrevista.casoCriminal && !selectedCaso) {
            const fetchCasoCriminal = async () => {
                try {
                    const response = await axios.get<CasoCriminal>(`/caso-criminal/${selectedEntrevista.casoCriminal}`);
                    setSelectedCaso(response.data);
                } catch (error) {
                    console.error("Erro ao buscar o caso criminal:", error);
                }
            };
            fetchCasoCriminal();
        }
    }, [selectedEntrevista, selectedCaso]);

    const handleCadastrarEntrevista = useCallback(() => {
        navigate("/entrevistas/cadastrar");
    }, [navigate]);

    const handleCardClick = useCallback((entrevista: Entrevista) => {
        setSelectedEntrevista(entrevista);
        setModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setModalOpen(false);
    }, []);

    const handleEdit = useCallback((id: string) => {
        navigate(`/entrevistas/editar/${id}`);
    }, [navigate]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await axios.delete(`/entrevistas/${id}`);
            setEntrevistas(prevEntrevistas => prevEntrevistas.filter(entrevista => entrevista._id !== id));
            handleModalClose();
        } catch (error) {
            console.error("Erro ao excluir a entrevista:", error);
            alert("Erro ao excluir a entrevista. Tente novamente.");
        }
    }, [handleModalClose]);

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <div className="left-content">
                    <h2>Entrevistas</h2>
                    <br />
                    <button
                        className="btn-1 b-dark-orange f-white"
                        onClick={handleCadastrarEntrevista}
                    >
                        + Entrevista
                    </button>

                    {loading ? (
                        <p>Carregando entrevistas...</p>
                    ) : (
                        <div className="container-cards">
                            {entrevistas.map((entrevista) => (
                                <div
                                    className="quiz-card"
                                    key={entrevista._id}
                                    onClick={() => handleCardClick(entrevista)}
                                >
                                    <div className="quiz-card-header">
                                        <span className="quiz-card-category">
                                            {entrevista.tipoEntrevista || "Tipo de entrevista desconhecido"}
                                        </span>
                                    </div>
                                    <div className="quiz-card-body">
                                        <p className="quiz-card-question subtitle">
                                            <b>Entrevistado:</b> {entrevista.entrevistado}
                                            <br />
                                            <b>Responsável:</b> {entrevista.nomeResponsavel}
                                            <br />
                                            <b>Motivo:</b> {entrevista.motivoEntrevista}
                                            <br />
                                            <b>Início:</b> {entrevista.dataHoraInicio ? format(new Date(entrevista.dataHoraInicio), 'dd/MM/yyyy HH:mm') : "Data não disponível"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Paper>

            {selectedEntrevista && (
                <ModalEntrevista
                    isOpen={modalOpen}
                    entrevista={selectedEntrevista}
                    casoCriminal={selectedCaso}
                    onClose={handleModalClose}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default Entrevistas;
