import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";
import Select from "react-select";

interface Detetive {
    _id: string;
    nome: string;
    especialidade: string;
}

function NovoCasoCriminal() {
    const navigate = useNavigate();
    const [nomeVitima, setNomeVitima] = useState("");
    const [descricaoCrime, setDescricaoCrime] = useState("");
    const [tipoCrime, setTipoCrime] = useState("");
    const [dataAbertura, setDataAbertura] = useState("");
    const [dataFechamento, setDataFechamento] = useState("");
    const [statusCaso, setStatusCaso] = useState("");
    const [detetives, setDetetives] = useState<Detetive[]>([]);
    const [selectedDetetives, setSelectedDetetives] = useState<{ value: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDetetives = async () => {
            try {
                const detetivesResponse = await axios.get("/detetives");
                setDetetives(detetivesResponse.data);
            } catch (error) {
                console.error("Erro ao buscar os detetives:", error);
            }
        };
        fetchDetetives();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/caso-criminal", {
                nomeVitima,
                descricaoCrime,
                tipoCrime,
                dataAbertura,
                dataFechamento: dataFechamento || null,
                statusCaso,
                detetives: selectedDetetives.map((detetive) => detetive.value),
            });
            navigate("/");
        } catch (error) {
            console.error("Erro ao cadastrar o caso:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectChange = (selectedOptions: any) => {
        setSelectedDetetives(selectedOptions || []);
    };

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className="text-left">Novo Caso Criminal</h3>

                    <label>
                        Nome da Vítima: <br />
                        <input value={nomeVitima} onChange={(e) => setNomeVitima(e.target.value)} required />
                    </label>

                    <label>
                        Descrição do Crime: <br />
                        <textarea value={descricaoCrime} onChange={(e) => setDescricaoCrime(e.target.value)} required />
                    </label>

                    <label>
                        Tipo de Crime: <br />
                        <select value={tipoCrime} onChange={(e) => setTipoCrime(e.target.value)} required>
                            <option value="">Selecione o Tipo de Crime</option>
                            <option value="Roubo">Roubo</option>
                            <option value="Furto">Furto</option>
                            <option value="Homicidio">Homicídio</option>
                            <option value="Estupro">Estupro</option>
                            <option value="Tráfico de Drogas">Tráfico de Drogas</option>
                            <option value="Fraude">Fraude</option>
                            <option value="Sequestro">Sequestro</option>
                            <option value="Vandalismo">Vandalismo</option>
                            <option value="Crimes Cibernéticos">Crimes Cibernéticos</option>
                            <option value="Perseguição (Stalking)">Perseguição (Stalking)</option>
                            <option value="Assédio Sexual">Assédio Sexual</option>
                            <option value="Agressão Física">Agressão Física</option>
                            <option value="Extorsão">Extorsão</option>
                            <option value="Crimes Ambientais">Crimes Ambientais</option>
                            <option value="Perjúrio">Perjúrio</option>
                            <option value="Difamação">Difamação</option>
                            <option value="Violência Doméstica">Violência Doméstica</option>
                            <option value="Abandono de Incapaz">Abandono de Incapaz</option>
                            <option value="Tráfico Humano">Tráfico Humano</option>
                        </select>
                    </label>

                    <label>
                        Data de Abertura: <br />
                        <input type="date" value={dataAbertura} onChange={(e) => setDataAbertura(e.target.value)} required />
                    </label>

                    <label>
                        Data de Fechamento: <br />
                        <input type="date" value={dataFechamento} onChange={(e) => setDataFechamento(e.target.value)} />
                    </label>

                    <label>
                        Status do Caso: <br />
                        <select value={statusCaso} onChange={(e) => setStatusCaso(e.target.value)} required>
                            <option value="">Selecione o Status do Caso</option>
                            <option value="Aberto">Aberto</option>
                            <option value="Fechado">Fechado</option>
                            <option value="Em Investigação">Em Investigação</option>
                            <option value="Arquivado">Arquivado</option>
                            <option value="Suspenso">Suspenso</option>
                        </select>
                    </label>

                    <label>Detetives:</label>
                    <Select
                        options={detetives.map((det) => ({
                            value: det._id,
                            label: `${det.nome} - ${det.especialidade}`
                        }))}
                        value={selectedDetetives}
                        onChange={handleSelectChange}
                        isMulti
                        required
                    />
                    <br /><br />

                    <button type="submit" disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar Caso"}
                    </button>
                </form>
            </Paper>
        </div>
    );
}

export default NovoCasoCriminal;
