import { useEffect, useState, useCallback } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";
import ModalDetetive from "../../components/ModalDetetive";

interface Detetive {
    _id: string;
    nome: string;
    tipo: string;
    patente: string;
    especialidade: string;
}

function Detetives() {
    const [detetives, setDetetives] = useState<Detetive[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedDetetive, setSelectedDetetive] = useState<Detetive | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetetives = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Detetive[]>("/detetives");
                setDetetives(response.data);
            } catch (error) {
                console.error("Erro ao buscar os detetives:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetetives();
    }, []);

    const handleCadastrarDetetive = useCallback(() => {
        navigate("/detetives/cadastrar");
    }, [navigate]);

    const handleCardClick = useCallback((detetive: Detetive) => {
        setSelectedDetetive(detetive);
        setModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setModalOpen(false);
        setSelectedDetetive(null);
    }, []);

    const handleEdit = useCallback((id: string) => {
        navigate(`/detetives/editar/${id}`);
    }, [navigate]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await axios.delete(`/detetives/${id}`);
            setDetetives(prevDetetives => prevDetetives.filter(detetive => detetive._id !== id));
            handleModalClose();
        } catch (error) {
            console.error("Erro ao excluir o detetive:", error);
            alert("Erro ao excluir o detetive. Tente novamente.");
        }
    }, [handleModalClose]);

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <div className="left-content">
                    <h2>Detetives</h2>
                    <br />
                    <button
                        className="btn-1 b-dark-orange f-white"
                        onClick={handleCadastrarDetetive}
                    >
                        + Detetive
                    </button>

                    {loading ? (
                        <p>Carregando detetives...</p>
                    ) : (
                        <div className="container-cards">
                            {detetives.map((detetive) => (
                                <div
                                    className="quiz-card"
                                    key={detetive._id}
                                    onClick={() => handleCardClick(detetive)}
                                >
                                    <div className="quiz-card-header">
                                        <span className="quiz-card-category">
                                            {detetive.tipo ? detetive.tipo : "Tipo desconhecido"}
                                        </span>
                                    </div>
                                    <div className="quiz-card-body">
                                        <p className="quiz-card-question subtitle">
                                            <b>Nome:</b> {detetive.nome}
                                            <br />
                                            <b>Especialidade:</b> {detetive.especialidade}
                                            <br />
                                            <b>Patente:</b> {detetive.patente}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Paper>

            {selectedDetetive && (
                <ModalDetetive
                    isOpen={modalOpen}
                    detetive={selectedDetetive}
                    onClose={handleModalClose}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

export default Detetives;
