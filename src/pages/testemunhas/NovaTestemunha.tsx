import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";
import Select from "react-select";

interface CasoCriminal {
    _id: string;
    nomeVitima: string;
    descricaoCrime: string;
    tipoCrime: string;
    dataAbertura: string;
    dataFechamento: string;
    statusCaso: string;
}

function NovaTestemunha() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [endereco, setEndereco] = useState("");
    const [tipoTestemunha, setTipoTestemunha] = useState("");
    const [alibi, setAlibi] = useState("");
    const [relacaoComVitima, setRelacaoComVitima] = useState("");
    const [depoimento, setDepoimento] = useState("");
    const [confiabilidade, setConfiabilidade] = useState("");
    const [casosCriminais, setCasosCriminais] = useState<CasoCriminal[]>([]);
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
            await axios.post("/testemunhas", {
                nome,
                dataNascimento,
                endereco,
                tipoTestemunha,
                alibi,
                relacaoComVitima,
                depoimento,
                confiabilidade,
                casoCriminal: selectedCasoCriminal ? selectedCasoCriminal.value : null,
            });
            navigate("/testemunhas");
        } catch (error) {
            console.error("Erro ao cadastrar a testemunha:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className="text-left">Nova Testemunha</h3>

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

                    <label>
                        Nome da Testemunha:
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Data de Nascimento:
                        <input
                            type="date"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Endereço:
                        <input
                            type="text"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Tipo de Testemunha:
                        <select
                            value={tipoTestemunha}
                            onChange={(e) => setTipoTestemunha(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione o tipo</option>
                            <option value="Ocular">Ocular</option>
                            <option value="Pericial">Pericial</option>
                            <option value="Informativa">Informativa</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </label>

                    <label>
                        Álibi:
                        <input
                            type="text"
                            value={alibi}
                            onChange={(e) => setAlibi(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Relação com a Vítima:
                        <select
                            value={relacaoComVitima}
                            onChange={(e) => setRelacaoComVitima(e.target.value)}
                            required
                        >
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
                        Depoimento:
                        <textarea
                            value={depoimento}
                            onChange={(e) => setDepoimento(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Confiabilidade:
                        <select
                            value={confiabilidade}
                            onChange={(e) => setConfiabilidade(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione a confiabilidade</option>
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>
                    </label>
                    <br /><br />

                    <button type="submit" disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar Testemunha"}
                    </button>
                </form>
            </Paper>
        </div >
    );
}

export default NovaTestemunha;
