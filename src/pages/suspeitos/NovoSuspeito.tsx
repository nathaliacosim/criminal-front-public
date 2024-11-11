import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";
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

function NovoSuspeito() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [endereco, setEndereco] = useState("");
    const [descricaoFisica, setDescricaoFisica] = useState("");
    const [alibi, setAlibi] = useState("");
    const [relacaoComVitima, setRelacaoComVitima] = useState("");
    const [grauSuspeito, setGrauSuspeito] = useState("");
    const [casoCriminal, setCasosCriminais] = useState<CasoCriminal[]>([]);
    const [selectedCasoCriminal, setSelectedCasoCriminal] = useState<any | null>(null);
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
        fetchCasosCriminais();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/suspeitos", {
                nome,
                dataNascimento,
                endereco,
                descricaoFisica,
                alibi,
                relacaoComVitima,
                grauSuspeito,
                casoCriminal: selectedCasoCriminal ? selectedCasoCriminal.value : null
            });
            navigate("/suspeitos");
        } catch (error) {
            console.error("Erro ao cadastrar o Suspeito:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectChange = (selectedOption: any) => {
        setSelectedCasoCriminal(selectedOption);
    };

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className="text-left">Novo Suspeito</h3>

                    <label>
                        Nome do Suspeito: <br />
                        <input value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </label>

                    <label>
                        Data de Nascimento: <br />
                        <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
                    </label>

                    <label>
                        Endereço: <br />
                        <input value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                    </label>

                    <label>
                        Descrição Física: <br />
                        <input value={descricaoFisica} onChange={(e) => setDescricaoFisica(e.target.value)} required />
                    </label>

                    <label>
                        Alibi: <br />
                        <input value={alibi} onChange={(e) => setAlibi(e.target.value)} required />
                    </label>

                    <label>
                        Relação com a Vítima: <br />
                        <select value={relacaoComVitima} onChange={(e) => setRelacaoComVitima(e.target.value)} required>
                            <option value="">Selecione a Relação com a Vítima</option>
                            <option value="Parente">Parente</option>
                            <option value="Amigo">Amigo</option>
                            <option value="Colega de trabalho">Colega de trabalho</option>
                            <option value="Vizinho">Vizinho</option>
                            <option value="Parceiro(a) romântico(a)">Parceiro(a) romântico(a)</option>
                            <option value="Antigo parceiro(a)">Antigo parceiro(a)</option>
                            <option value="Conhecido">Conhecido</option>
                            <option value="Desconhecido">Desconhecido</option>
                        </select>
                    </label>

                    <label>
                        Grau de Suspeito: <br />
                        <select value={grauSuspeito} onChange={(e) => setGrauSuspeito(e.target.value)} required>
                            <option value="">Selecione o Grau de Suspeito</option>
                            <option value="Primário">Primário</option>
                            <option value="Secundário">Secundário</option>
                            <option value="Terciário">Terciário</option>
                            <option value="Cúmplice">Cúmplice</option>
                            <option value="Pessoa de interesse">Pessoa de interesse</option>
                        </select>
                    </label>

                    <label>Caso Criminal:</label>
                    <Select
                        options={casoCriminal.map((ca) => ({
                            value: ca._id,
                            label: `${ca.nomeVitima} - ${ca.tipoCrime} [${ca.dataAbertura}]`
                        }))}
                        value={selectedCasoCriminal}
                        onChange={handleSelectChange}
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

export default NovoSuspeito;
