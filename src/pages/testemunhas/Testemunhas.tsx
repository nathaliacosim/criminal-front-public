import { useEffect, useState, useCallback } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";
import ModalTestemunhas from "../../components/ModalTestemunha";

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

function Testemunhas() {
    const [loading, setLoading] = useState<boolean>(false);
    const [testemunhas, setTestemunhas] = useState<Testemunha[]>([]);
    const [selectedTestemunha, setSelectedTestemunha] = useState<Testemunha | null>(null);
    const [selectedCaso, setSelectedCaso] = useState<CasoCriminal | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTestemunhas = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Testemunha[]>("/testemunhas");
                setTestemunhas(response.data);
            } catch (error) {
                setErrorMessage("Erro ao carregar testemunhas. Tente novamente.");
                console.error("Erro ao buscar as testemunhas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestemunhas();
    }, []);

    useEffect(() => {
        if (selectedTestemunha && selectedTestemunha.casoCriminal && !selectedCaso) {
            const fetchCasoCriminal = async () => {
                try {
                    const response = await axios.get<CasoCriminal>(`/caso-criminal/${selectedTestemunha.casoCriminal}`);
                    setSelectedCaso(response.data);
                } catch (error) {
                    setErrorMessage("Erro ao buscar o caso criminal. Tente novamente.");
                    console.error("Erro ao buscar o caso criminal:", error);
                }
            };
            fetchCasoCriminal();
        }
    }, [selectedTestemunha, selectedCaso]);

    const handleCadastrarTestemunha = useCallback(() => {
        navigate("/testemunhas/cadastrar");
    }, [navigate]);

    const handleCardClick = useCallback((testemunha: Testemunha) => {
        setSelectedTestemunha(testemunha);
        setModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setModalOpen(false);
        setSelectedCaso(null);
    }, []);

    const handleEdit = useCallback((id: string) => {
        navigate(`/testemunhas/editar/${id}`);
    }, [navigate]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await axios.delete(`/testemunhas/${id}`);
            setTestemunhas(prevTestemunhas => prevTestemunhas.filter(ts => ts._id !== id));
            handleModalClose();
        } catch (error) {
            setErrorMessage("Erro ao excluir a testemunha. Tente novamente.");
            console.error("Erro ao excluir a testemunha:", error);
        }
    }, [handleModalClose]);

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <div className="left-content">
                    <h2>Testemunhas</h2>
                    <br />
                    <button
                        className="btn-1 b-dark-orange f-white"
                        onClick={handleCadastrarTestemunha}
                    >
                        + Testemunha
                    </button>

                    {loading ? (
                        <p>Carregando testemunhas...</p>
                    ) : (
                        <div className="container-cards">
                            {testemunhas.map((testemunha) => (
                                <div
                                    className="quiz-card"
                                    key={testemunha._id}
                                    onClick={() => handleCardClick(testemunha)}
                                >
                                    <div className="quiz-card-header">
                                        <span className="quiz-card-category">
                                            {testemunha.tipoTestemunha || "Tipo não encontrado."}
                                        </span>
                                    </div>
                                    <div className="quiz-card-body">
                                        <p className="quiz-card-question subtitle">
                                            <b>Nome:</b> {testemunha.nome}
                                            <br />
                                            <b>Confiabilidade:</b> {testemunha.confiabilidade}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </Paper>

            {selectedTestemunha && (
                <ModalTestemunhas
                    isOpen={modalOpen}
                    testemunha={selectedTestemunha}
                    casoCriminal={selectedCaso}
                    onClose={handleModalClose}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default Testemunhas;
