import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";

interface Detetive {
    _id: string;
    nome: string;
    tipo: string;
    patente: string;
    dataNascimento: string;
    especialidade: string;
}

function EditarDetetive() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [detetive, setDetetive] = useState<Detetive | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDetetive = async () => {
            try {
                const response = await axios.get(`/detetives/${id}`);
                setDetetive(response.data);
            } catch (error) {
                console.error("Erro ao buscar o detetive:", error);
            }
        };

        fetchDetetive();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`/detetives/${id}`, {
                nome: detetive?.nome,
                tipo: detetive?.tipo,
                patente: detetive?.patente,
                especialidade: detetive?.especialidade,
            });
            navigate("/detetives");
        } catch (error) {
            console.error("Erro ao atualizar o Detetive:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!detetive) return <div>Carregando...</div>;

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className="text-left">Editar Detetive</h3>

                    <label>
                        Nome:
                        <input
                            type="text"
                            value={detetive.nome}
                            onChange={(e) => setDetetive({ ...detetive, nome: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Data de Nascimento: <br />
                        <input
                            type="date"
                            value={detetive.dataNascimento}
                            onChange={(e) => setDetetive({ ...detetive, dataNascimento: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Tipo:
                        <select
                            value={detetive.tipo}
                            onChange={(e) => setDetetive({ ...detetive, tipo: e.target.value })}
                            required
                        >
                            <option value="Policial">Policial</option>
                            <option value="Particular">Particular</option>
                        </select>
                    </label>

                    <label>
                        Patente:
                        <select
                            value={detetive.patente}
                            onChange={(e) => setDetetive({ ...detetive, patente: e.target.value })}
                            required
                        >
                            <option value="Detetive">Detetive</option>
                            <option value="Detetive de 1ª Classe">Detetive de 1ª Classe</option>
                            <option value="Investigador Chefe">Investigador Chefe</option>
                        </select>
                    </label>

                    <label>
                        Especialidade:
                        <select
                            value={detetive.especialidade}
                            onChange={(e) => setDetetive({ ...detetive, especialidade: e.target.value })}
                            required
                        >
                            <option value="Homicídios">Homicídios</option>
                            <option value="Fraudes">Fraudes</option>
                            <option value="Tráfico de Drogas">Tráfico de Drogas</option>
                            <option value="Roubos">Roubos</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </label>

                    <button type="submit" disabled={loading}>
                        {loading ? "Atualizando..." : "Atualizar Detetive"}
                    </button>
                </form>
            </Paper>
        </div>
    );
}

export default EditarDetetive;
