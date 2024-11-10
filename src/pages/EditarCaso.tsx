import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from "../utils/axios";
import NavigatorLateral from "../components/NavigatorLateral";
import Paper from "../components/Paper";

interface CasoCriminal {
    _id: string;
    nomeVitima: string;
    descricaoCrime: string;
    tipoCrime: string;
    dataAbertura: string;
    dataFechamento: string;
    statusCaso: string;
    detetives: Detetive[];
}

interface Detetive {
    _id: string;
    nome: string;
    dataNascimento: string;
    tipo: string;
    patente: string;
    especialidade: string;
}

function EditarCaso() {
    const { id } = useParams<{ id: string }>();
    const [caso, setCaso] = useState<CasoCriminal | null>(null);
    const [detetivesList, setDetetivesList] = useState<Detetive[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCaso = async () => {
            try {
                const response = await axios.get<CasoCriminal>(`/caso-criminal/${id}`);
                setCaso(response.data);
            } catch (error) {
                console.error("Erro ao buscar o caso para edição:", error);
            }
        };

        const fetchDetetives = async () => {
            try {
                const response = await axios.get<Detetive[]>("/detetives");
                setDetetivesList(response.data);
            } catch (error) {
                console.error("Erro ao buscar a lista de detetives:", error);
            }
        };

        fetchCaso();
        fetchDetetives();
    }, [id]);

    const handleSave = async () => {
        if (!caso) {
            console.error("Caso não encontrado");
            return;
        }

        try {
            const casoParaSalvar = {
                nomeVitima: caso.nomeVitima,
                descricaoCrime: caso.descricaoCrime,
                tipoCrime: caso.tipoCrime,
                statusCaso: caso.statusCaso,
                detetives: caso.detetives.map(detetive => detetive._id),
            };

            await axios.put(`/caso-criminal/${id}`, casoParaSalvar);
            navigate("/casos-criminais");
        } catch (error) {
            console.error("Erro ao salvar o caso:", error);
        }
    };

    if (!caso || !detetivesList.length) return <p>Carregando dados do caso...</p>;

    const detetivesOptions = detetivesList.map((detetive) => ({
        value: detetive._id,
        label: `(${detetive.tipo}) ${detetive.nome} - ${detetive.especialidade} - ${detetive.patente}`
    }));

    const handleDetetiveChange = (selectedOptions: any) => {
        const selectedDetetives = selectedOptions.map((option: any) => detetivesList.find((detetive) => detetive._id === option.value)) as Detetive[];
        setCaso({ ...caso, detetives: selectedDetetives });
    };

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <div className="left-content">
                    <h2>Editar Caso Criminal</h2>
                    <br />
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>
                            Nome Completo da Vítima:
                            <input
                                type="text"
                                value={caso.nomeVitima}
                                onChange={(e) => setCaso({ ...caso, nomeVitima: e.target.value })}
                            />
                        </label>
                        <br /><br />

                        <label>
                            Descrição do Crime:
                            <input
                                type="text"
                                value={caso.descricaoCrime}
                                onChange={(e) => setCaso({ ...caso, descricaoCrime: e.target.value })}
                            />
                        </label>
                        <br /><br />


                        <label>
                            Tipo de Crime: <br />
                            <select
                                value={caso.tipoCrime}
                                onChange={(e) => setCaso({ ...caso, tipoCrime: e.target.value })}
                                required>
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
                        <br /><br />

                        <label>
                            Status do Caso:
                            <select
                                value={caso.statusCaso}
                                onChange={(e) => setCaso({ ...caso, statusCaso: e.target.value })}
                                required
                            >
                                <option value="">Selecione o Status do Caso</option>
                                <option value="Aberto">Aberto</option>
                                <option value="Fechado">Fechado</option>
                                <option value="Em Investigação">Em Investigação</option>
                                <option value="Arquivado">Arquivado</option>
                                <option value="Suspenso">Suspenso</option>
                            </select>
                        </label>
                        <br /><br />
                        {/* Detetives */}
                        <label>
                            Detetives:<br />
                            <Select
                                options={detetivesOptions}
                                value={caso.detetives.map((detetive) => ({
                                    value: detetive._id,
                                    label: `(${detetive.tipo}) ${detetive.nome} - ${detetive.especialidade} - ${detetive.patente}`
                                }))}
                                onChange={handleDetetiveChange}
                                isMulti
                                closeMenuOnSelect={false}
                            />
                        </label>
                        <br /><br />
                        <button onClick={handleSave}>Salvar</button>
                    </form>
                </div>
            </Paper>
        </div>
    );
}

export default EditarCaso;
