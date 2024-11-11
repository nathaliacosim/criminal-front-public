import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";

function NovoDetetive() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [patente, setPatente] = useState("");
    const [especialidade, setEspecialidade] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/detetives", {
                nome,
                tipo,
                patente,
                especialidade,
            });
            navigate("/detetives");
        } catch (error) {
            console.error("Erro ao cadastrar o detetive:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className="text-left">Novo Detetive</h3>

                    <label>
                        Nome: <br />
                        <input value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </label>

                    <label>
                        Tipo: <br />
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                            <option value="">Selecione o Tipo</option>
                            <option value="Policial">Policial</option>
                            <option value="Particular">Particular</option>
                        </select>
                    </label>

                    <label>
                        Patente: <br />
                        <input value={patente} onChange={(e) => setPatente(e.target.value)} required />
                    </label>

                    <label>
                        Patente: <br />
                        <select value={patente} onChange={(e) => setPatente(e.target.value)} required>
                            <option value="">Selecione o Tipo</option>
                            <option value="Detetive">Detetive</option>
                            <option value="Detetive de 1ª Classe">Detetive de 1ª Classe</option>
                            <option value="Investigador Chefe">Investigador Chefe</option>
                        </select>
                    </label>

                    <label>
                        Especialidade: <br />
                        <select value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} required>
                            <option value="">Selecione o Tipo</option>
                            <option value="Homicídios">Homicídios</option>
                            <option value="Fraudes">Fraudes</option>
                            <option value="Tráfico de Drogas">Tráfico de Drogas</option>
                            <option value="Roubos">Roubos</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </label>
                    <br /><br />

                    <button type="submit" disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar Detetive"}
                    </button>
                </form>
            </Paper>
        </div>
    );
}

export default NovoDetetive;
