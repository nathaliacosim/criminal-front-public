import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";
import Select from "react-select";

interface CasoCriminal {
    _id: string;
    nomeVitima: string;
    tipoCrime: string;
    dataAbertura: string;
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

function EditarTestemunha() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [testemunha, setTestemunha] = useState<Testemunha | null>(null);
    const [casoCriminal, setCasosCriminais] = useState<CasoCriminal[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTestemunha = async () => {
            try {
                const response = await axios.get(`/testemunhas/${id}`);
                setTestemunha(response.data);
            } catch (error) {
                console.error("Erro ao buscar a testemunha:", error);
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

        fetchTestemunha();
        fetchCasosCriminais();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`/testemunhas/${id}`, {
                nome: testemunha?.nome,
                dataNascimento: testemunha?.dataNascimento,
                endereco: testemunha?.endereco,
                tipoTestemunha: testemunha?.tipoTestemunha,
                alibi: testemunha?.alibi,
                relacaoComVitima: testemunha?.relacaoComVitima,
                depoimento: testemunha?.depoimento,
                confiabilidade: testemunha?.confiabilidade,
                casoCriminal: testemunha?.casoCriminal,
            });
            navigate("/testemunhas");
        } catch (error) {
            console.error("Erro ao atualizar a Testemunha:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!testemunha) return <div>Carregando...</div>;

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className="text-left">Editar Testemunha</h3>

                    <label>
                        Nome da Testemunha:
                        <input
                            type="text"
                            value={testemunha.nome}
                            onChange={(e) => setTestemunha({ ...testemunha, nome: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Data de Nascimento:
                        <input
                            type="date"
                            value={testemunha.dataNascimento}
                            onChange={(e) => setTestemunha({ ...testemunha, dataNascimento: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Endereço:
                        <input
                            type="text"
                            value={testemunha.endereco}
                            onChange={(e) => setTestemunha({ ...testemunha, endereco: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Tipo de Testemunha:
                        <select
                            value={testemunha.tipoTestemunha}
                            onChange={(e) => setTestemunha({ ...testemunha, tipoTestemunha: e.target.value })}
                            required
                        >
                            <option value="Ocular">Ocular</option>
                            <option value="Auditiva">Auditiva</option>
                            <option value="Especialista">Especialista</option>
                            <option value="Caráter">Caráter</option>
                            <option value="Circunstancial">Circunstancial</option>
                        </select>
                    </label>

                    <label>
                        Alibi:
                        <input
                            type="text"
                            value={testemunha.alibi}
                            onChange={(e) => setTestemunha({ ...testemunha, alibi: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Relação com a Vítima:
                        <select
                            value={testemunha.relacaoComVitima}
                            onChange={(e) => setTestemunha({ ...testemunha, relacaoComVitima: e.target.value })}
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
                            value={testemunha.depoimento}
                            onChange={(e) => setTestemunha({ ...testemunha, depoimento: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Confiabilidade:
                        <select
                            value={testemunha.confiabilidade}
                            onChange={(e) => setTestemunha({ ...testemunha, confiabilidade: e.target.value })}
                            required
                        >
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>
                    </label>

                    <label>Caso Criminal:</label>
                    <Select
                        options={casoCriminal.map((ca) => ({
                            value: ca._id,
                            label: `${ca.nomeVitima} - ${ca.tipoCrime} [${ca.dataAbertura}]`,
                        }))}
                        value={{
                            value: testemunha.casoCriminal,
                            label: casoCriminal.find((ca) => ca._id === testemunha.casoCriminal)?.nomeVitima,
                        }}
                        onChange={(e) => setTestemunha({ ...testemunha, casoCriminal: e ? e.value : "" })}
                        required
                    />
                    <br /><br />

                    <button type="submit" disabled={loading}>
                        {loading ? "Atualizando..." : "Atualizar Testemunha"}
                    </button>
                </form>
            </Paper>
        </div>
    );
}

export default EditarTestemunha;
