import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "../../utils/axios";
import Paper from "../../components/Paper";
import NavigatorLateral from "../../components/NavigatorLateral";
import ModalEvidencias from "../../components/ModalEvidencia";

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

function Evidencias() {
    const [loading, setLoading] = useState<boolean>(false);
    const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
    const [selectedEvidencia, setSelectedEvidencia] = useState<Evidencia | null>(null);
    const [selectedCaso, setSelectedCaso] = useState<CasoCriminal | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvidencias = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Evidencia[]>("/evidencias");
                setEvidencias(response.data);
            } catch (error) {
                setErrorMessage("Erro ao carregar evidencias. Tente novamente.");
                console.error("Erro ao buscar os evidencias:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvidencias();
    }, []);

    useEffect(() => {
        if (selectedEvidencia && selectedEvidencia.casoCriminal && !selectedCaso) {
            const fetchCasoCriminal = async () => {
                try {
                    const response = await axios.get<CasoCriminal>(`/caso-criminal/${selectedEvidencia.casoCriminal}`);
                    setSelectedCaso(response.data);
                } catch (error) {
                    setErrorMessage("Erro ao buscar o caso criminal. Tente novamente.");
                    console.error("Erro ao buscar o caso criminal:", error);
                }
            };
            fetchCasoCriminal();
        }
    }, [selectedEvidencia, selectedCaso]);

    const handleCadastrarEvidencia = useCallback(() => {
        navigate("/evidencias/cadastrar");
    }, [navigate]);

    const handleCardClick = useCallback((evidencia: Evidencia) => {
        setSelectedEvidencia(evidencia);
        setModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setModalOpen(false);
        setSelectedCaso(null);
    }, []);

    const handleEdit = useCallback((id: string) => {
        navigate(`/evidencias/editar/${id}`);
    }, [navigate]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await axios.delete(`/evidencias/${id}`);
            setEvidencias(prevEvidencias => prevEvidencias.filter(ev => ev._id !== id));
            handleModalClose();
        } catch (error) {
            setErrorMessage("Erro ao excluir o evidencias. Tente novamente.");
            console.error("Erro ao excluir o evidencias:", error);
        }
    }, [handleModalClose]);

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <div className="left-content">
                    <h2>Evidências</h2>
                    <br />
                    <button
                        className="btn-1 b-dark-orange f-white"
                        onClick={handleCadastrarEvidencia}
                    >
                        + Evidencia
                    </button>

                    {loading ? (
                        <p>Carregando evidencias...</p>
                    ) : (
                        <div className="container-cards">
                            {evidencias.map((evidencia) => (
                                <div
                                    className="quiz-card"
                                    key={evidencia._id}
                                    onClick={() => handleCardClick(evidencia)}
                                >
                                    <div className="quiz-card-header">
                                        <span className="quiz-card-category">
                                            {evidencia.tipoEvidencia || "Tipo não encontrado."}
                                        </span>
                                    </div>
                                    <div className="quiz-card-body">
                                        <p className="quiz-card-question subtitle">
                                            <b>Descrição:</b> {evidencia.descricao}
                                            <br />
                                            <b>Localizada:</b> {evidencia.localizacao}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </Paper>

            {selectedEvidencia && (
                <ModalEvidencias
                    isOpen={modalOpen}
                    evidencia={selectedEvidencia}
                    casoCriminal={selectedCaso}
                    onClose={handleModalClose}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default Evidencias;
