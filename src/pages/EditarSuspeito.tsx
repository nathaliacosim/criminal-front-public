import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axios";
import NavigatorLateral from "../components/NavigatorLateral";
import Paper from "../components/Paper";
import Select from "react-select";

interface CasoCriminal {
    _id: string;
    nomeVitima: string;
    tipoCrime: string;
    dataAbertura: string;
}

interface Suspeito {
    _id: string;
    nome: string;
    dataNascimento: string;
    endereco: string;
    descricaoFisica: string;
    alibi: string;
    relacaoComVitima: string;
    grauSuspeito: string;
    casoCriminal: string;
}

function EditarSuspeito() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [suspeito, setSuspeito] = useState<Suspeito | null>(null);
    const [casoCriminal, setCasosCriminais] = useState<CasoCriminal[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSuspeito = async () => {
            try {
                const response = await axios.get(`/suspeitos/${id}`);
                setSuspeito(response.data);
            } catch (error) {
                console.error("Erro ao buscar o suspeito:", error);
            }
        };

        const fetchCasosCriminais = async () => {
            try {
                const response = await axios.get("/caso-criminal");
                setCasosCriminais(response.data);
            } catch (error) {
                console.error("Erro ao buscar os casos criminais:", error);
            }
        };

        fetchSuspeito();
        fetchCasosCriminais();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`/suspeitos/${id}`, {
                nome: suspeito?.nome,
                dataNascimento: suspeito?.dataNascimento,
                endereco: suspeito?.endereco,
                descricaoFisica: suspeito?.descricaoFisica,
                alibi: suspeito?.alibi,
                relacaoComVitima: suspeito?.relacaoComVitima,
                grauSuspeito: suspeito?.grauSuspeito,
                casoCriminal: suspeito?.casoCriminal,
            });
            alert("Suspeito atualizado com sucesso!");
            navigate("/suspeitos");
        } catch (error) {
            console.error("Erro ao atualizar o Suspeito:", error);
            alert("Erro ao atualizar o Suspeito. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (!suspeito) return <div>Carregando...</div>;

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Editar Suspeito</h2>

                    <label>
                        Nome do Suspeito:
                        <input
                            type="text"
                            value={suspeito.nome}
                            onChange={(e) => setSuspeito({ ...suspeito, nome: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Data de Nascimento:
                        <input
                            type="date"
                            value={suspeito.dataNascimento}
                            onChange={(e) => setSuspeito({ ...suspeito, dataNascimento: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Endereço:
                        <input
                            type="text"
                            value={suspeito.endereco}
                            onChange={(e) => setSuspeito({ ...suspeito, endereco: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Descrição Física:
                        <input
                            type="text"
                            value={suspeito.descricaoFisica}
                            onChange={(e) => setSuspeito({ ...suspeito, descricaoFisica: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Alibi:
                        <input
                            type="text"
                            value={suspeito.alibi}
                            onChange={(e) => setSuspeito({ ...suspeito, alibi: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Relação com a Vítima:
                        <select
                            value={suspeito.relacaoComVitima}
                            onChange={(e) => setSuspeito({ ...suspeito, relacaoComVitima: e.target.value })}
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
                        Grau de Suspeito:
                        <select
                            value={suspeito.grauSuspeito}
                            onChange={(e) => setSuspeito({ ...suspeito, grauSuspeito: e.target.value })}
                            required
                        >
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
                            label: `${ca.nomeVitima} - ${ca.tipoCrime} [${ca.dataAbertura}]`,
                        }))}
                        value={{
                            value: suspeito.casoCriminal,
                            label: casoCriminal.find((ca) => ca._id === suspeito.casoCriminal)?.nomeVitima,
                        }}
                        onChange={(e) => setSuspeito({ ...suspeito, casoCriminal: e ? e.value : "" })}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Atualizando..." : "Atualizar Suspeito"}
                    </button>
                </form>
            </Paper>
        </div>
    );
}

export default EditarSuspeito;
