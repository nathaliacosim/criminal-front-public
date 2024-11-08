import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import NavigatorLateral from "../components/NavigatorLateral";
import Paper from "../components/Paper";

interface Suspeito {
    _id: string;
    nome: string;
    descricao: string;
}

interface Testemunha {
    _id: string;
    nome: string;
    contato: string;
}

interface Detetive {
    _id: string;
    nome: string;
    especialidade: string;
}

interface TipoCrime {
    _id: string;
    nome: string;
    descricao: string;
}

function NovoCasoCriminal() {
    const [nomeVitima, setNomeVitima] = useState("");
    const [descricaoCrime, setDescricaoCrime] = useState("");
    const [tipoCrime, setTipoCrime] = useState<string | null>(null);
    const [dataAbertura, setDataAbertura] = useState("");
    const [statusCaso, setStatusCaso] = useState("");
    const [tiposCrime, setTiposCrime] = useState<TipoCrime[]>([]);
    const [suspeitos, setSuspeitos] = useState<Suspeito[]>([]);
    const [testemunhas, setTestemunhas] = useState<Testemunha[]>([]);
    const [detetives, setDetetives] = useState<Detetive[]>([]);
    const [selectedSuspeitos, setSelectedSuspeitos] = useState<string[]>([]);
    const [selectedTestemunhas, setSelectedTestemunhas] = useState<string[]>([]);
    const [selectedDetetives, setSelectedDetetives] = useState<string[]>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            const [tiposResponse, suspeitosResponse, testemunhasResponse, detetivesResponse] = await Promise.all([
                axios.get("/tipo-crime"),
                axios.get("/suspeito"),
                axios.get("/testemunha"),
                axios.get("/detetive"),
            ]);
            setTiposCrime(tiposResponse.data);
            setSuspeitos(suspeitosResponse.data);
            setTestemunhas(testemunhasResponse.data);
            setDetetives(detetivesResponse.data);
        };
        fetchOptions();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("/caso-criminal", {
                nomeVitima,
                descricaoCrime,
                tipoCrime,
                dataAbertura,
                statusCaso,
                suspeitos: selectedSuspeitos,
                testemunhas: selectedTestemunhas,
                detetives: selectedDetetives,
            });
            alert("Caso criminal cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar o caso:", error);
        }
    };

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>
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
                        <select value={tipoCrime || ""} onChange={(e) => setTipoCrime(e.target.value)} required>
                            <option value="">Selecione</option>
                            {tiposCrime.map((tipo) => (
                                <option key={tipo._id} value={tipo._id}>
                                    <b>{tipo.nome}</b>
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Data de Abertura: <br />
                        <input type="date" value={dataAbertura} onChange={(e) => setDataAbertura(e.target.value)} required />
                    </label>

                    <label>
                        Status do Caso: <br />
                        <input value={statusCaso} onChange={(e) => setStatusCaso(e.target.value)} required />
                    </label>

                    <label>Suspeitos:</label>
                    <select multiple onChange={(e) => setSelectedSuspeitos(Array.from(e.target.selectedOptions, option => option.value))}>
                        {suspeitos.map((suspeito) => (
                            <option key={suspeito._id} value={suspeito._id}>
                                {suspeito.nome}
                            </option>
                        ))}
                    </select>

                    <label>Testemunhas:</label>
                    <select multiple onChange={(e) => setSelectedTestemunhas(Array.from(e.target.selectedOptions, option => option.value))}>
                        {testemunhas.map((testemunha) => (
                            <option key={testemunha._id} value={testemunha._id}>
                                {testemunha.nome}
                            </option>
                        ))}
                    </select>

                    <label>Detetives:</label>
                    <select multiple onChange={(e) => setSelectedDetetives(Array.from(e.target.selectedOptions, option => option.value))}>
                        {detetives.map((detetive) => (
                            <option key={detetive._id} value={detetive._id}>
                                {detetive.nome}
                            </option>
                        ))}
                    </select>

                    <button type="submit">Cadastrar Caso</button>
                </form>
            </Paper>
        </div>
    );
}

export default NovoCasoCriminal;