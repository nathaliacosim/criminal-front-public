import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import NavigatorLateral from "../components/NavigatorLateral";
import Paper from "../components/Paper";
import Select from "react-select";

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
    relacaoComVitima: string;
    confiabilidade: string;
    tipoTestemunha: string;
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

function NovaEvidencia() {
    const navigate = useNavigate();
    const [tipoEvidencia, setTipoEvidencia] = useState("");
    const [descricao, setDescricao] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [dataEncontro, setDataEncontro] = useState("");
    const [statusEvidencia, setStatusEvidencia] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [casosCriminais, setCasosCriminais] = useState<CasoCriminal[]>([]);
    const [detetives, setDetetives] = useState<Detetive[]>([]);
    const [selectedCasoCriminal, setSelectedCasoCriminal] = useState<any | null>(null);
    const [selectedQuemLocalizou, setSelectedQuemLocalizou] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCasosCriminais = async () => {
            try {
                const response = await axios.get("/caso-criminal");
                setCasosCriminais(response.data);
            } catch (error) {
                console.error("Erro ao buscar os casos criminais:", error);
            }
        };

        const fetchDetetives = async () => {
            try {
                const response = await axios.get("/detetives");
                setDetetives(response.data);
            } catch (error) {
                console.error("Erro ao buscar os detetives:", error);
            }
        };

        fetchCasosCriminais();
        fetchDetetives();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/evidencias", {
                casoCriminal: selectedCasoCriminal ? selectedCasoCriminal.value : null,
                tipoEvidencia,
                descricao,
                localizacao,
                quemLocalizou: selectedQuemLocalizou ? selectedQuemLocalizou.value : null,
                dataEncontro,
                statusEvidencia,
                observacoes,
            });
            navigate("/evidencias");
        } catch (error) {
            console.error("Erro ao cadastrar a evidência:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>

                    <label>Caso Criminal:</label>
                    <Select
                        options={casosCriminais.map((ca) => ({
                            value: ca._id,
                            label: `${ca.nomeVitima} - ${ca.tipoCrime} [${ca.dataAbertura}]`
                        }))}
                        value={selectedCasoCriminal}
                        onChange={(option) => setSelectedCasoCriminal(option)}
                        required
                    />

                    <label>Quem Localizou:</label>
                    <Select
                        options={detetives.map((det) => ({
                            value: det._id,
                            label: `${det.nome} - ${det.especialidade}`,
                        }))}
                        value={selectedQuemLocalizou}
                        onChange={(option) => setSelectedQuemLocalizou(option)}
                        required
                    />

                    <label>
                        Tipo Evidência:
                        <select
                            value={tipoEvidencia}
                            onChange={(e) => setTipoEvidencia(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione o tipo</option>
                            <option value="Arma">Arma</option>
                            <option value="Documento">Documento</option>
                            <option value="Objeto">Objeto</option>
                            <option value="Áudio">Áudio</option>
                            <option value="Vídeo">Vídeo</option>
                            <option value="Material Biológico">Material Biológico</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </label>

                    <label>
                        Descrição:
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Localização:
                        <input
                            type="text"
                            value={localizacao}
                            onChange={(e) => setLocalizacao(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Data de Registro da Evidência:
                        <input
                            type="date"
                            value={dataEncontro}
                            onChange={(e) => setDataEncontro(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Status Evidência:
                        <select
                            value={statusEvidencia}
                            onChange={(e) => setStatusEvidencia(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione o status</option>
                            <option value="Boa">Boa</option>
                            <option value="Ruim">Ruim</option>
                            <option value="Inutilizável">Inutilizável</option>
                        </select>
                    </label>

                    <label>
                        Observação:
                        <input
                            type="text"
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                            required
                        />
                    </label>

                    <button type="submit" disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar Caso"}
                    </button>
                </form>
            </Paper>
        </div>
    );
}

export default NovaEvidencia;
