import { useEffect, useState, useCallback } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";
import ModalSuspeito from "../../components/ModalSuspeito";

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

function Suspeitos() {
    const [suspeitos, setSuspeitos] = useState<Suspeito[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedSuspeito, setSelectedSuspeito] = useState<Suspeito | null>(null);
    const [selectedCaso, setSelectedCaso] = useState<CasoCriminal | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuspeitos = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Suspeito[]>("/suspeitos");
                setSuspeitos(response.data);
            } catch (error) {
                setErrorMessage("Erro ao carregar suspeitos. Tente novamente.");
                console.error("Erro ao buscar os suspeitos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSuspeitos();
    }, []);

    useEffect(() => {
        if (selectedSuspeito && selectedSuspeito.casoCriminal && !selectedCaso) {
            const fetchCasoCriminal = async () => {
                try {
                    const response = await axios.get<CasoCriminal>(`/caso-criminal/${selectedSuspeito.casoCriminal}`);
                    setSelectedCaso(response.data);
                } catch (error) {
                    setErrorMessage("Erro ao buscar o caso criminal. Tente novamente.");
                    console.error("Erro ao buscar o caso criminal:", error);
                }
            };
            fetchCasoCriminal();
        }
    }, [selectedSuspeito, selectedCaso]);

    const handleCadastrarSuspeito = useCallback(() => {
        navigate("/suspeitos/cadastrar");
    }, [navigate]);

    const handleCardClick = useCallback((suspeito: Suspeito) => {
        setSelectedSuspeito(suspeito);
        setModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setModalOpen(false);
        setSelectedCaso(null); // Resetar o caso selecionado ao fechar o modal
    }, []);

    const handleEdit = useCallback((id: string) => {
        navigate(`/suspeitos/editar/${id}`);
    }, [navigate]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await axios.delete(`/suspeitos/${id}`);
            setSuspeitos(prevSuspeitos => prevSuspeitos.filter(suspeito => suspeito._id !== id));
            handleModalClose();
        } catch (error) {
            setErrorMessage("Erro ao excluir o suspeito. Tente novamente.");
            console.error("Erro ao excluir o suspeito:", error);
        }
    }, [handleModalClose]);

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <div className="left-content">
                    <h2>Suspeitos</h2>
                    <br />
                    <button
                        className="btn-1 b-dark-orange f-white"
                        onClick={handleCadastrarSuspeito}
                    >
                        + Suspeito
                    </button>

                    {loading ? (
                        <p>Carregando suspeitos...</p>
                    ) : (
                        <div className="container-cards">
                            {suspeitos.map((suspeito) => (
                                <div
                                    className="quiz-card"
                                    key={suspeito._id}
                                    onClick={() => handleCardClick(suspeito)}
                                >
                                    <div className="quiz-card-header">
                                        <span className="quiz-card-category">
                                            {suspeito.nome || "Nome desconhecido"}
                                        </span>
                                    </div>
                                    <div className="quiz-card-body">
                                        <p className="quiz-card-question subtitle">
                                            <b>Relação com a Vítima:</b> {suspeito.relacaoComVitima}
                                            <br />
                                            <b>Descrição Física:</b> {suspeito.descricaoFisica}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </Paper>

            {selectedSuspeito && (
                <ModalSuspeito
                    isOpen={modalOpen}
                    suspeito={selectedSuspeito}
                    casoCriminal={selectedCaso}
                    onClose={handleModalClose}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default Suspeitos;
