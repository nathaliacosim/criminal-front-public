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

interface Evidencia {
    _id: string;
    casoCriminal: string;
    tipoEvidencia: string;
    descricao: string;
    localizacao: string;
    quemLocalizou: string;
    dataEncontro: string;
    statusEvidencia: string;
    observacoes: string;
}

interface Detetive {
    _id: string;
    nome: string;
    dataNascimento: string;
    tipo: string;
    patente: string;
    especialidade: string;
}

function EditarEvidencia() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [evidencia, setEvidencia] = useState<Evidencia | null>(null);
    const [casoCriminal, setCasosCriminais] = useState<CasoCriminal[]>([]);
    const [detetives, setDetetives] = useState<Detetive[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvidencia = async () => {
            try {
                const response = await axios.get(`/evidencias/${id}`);
                setEvidencia(response.data);
            } catch (error) {
                console.error("Erro ao buscar a evidencia:", error);
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

        const fetchDetetives = async () => {
            try {
                const response = await axios.get("/detetives");
                setDetetives(response.data);
            } catch (error) {
                console.error("Erro ao buscar os detetives:", error);
            }
        };

        fetchEvidencia();
        fetchDetetives();
        fetchCasosCriminais();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`/evidencias/${id}`, {
                casoCriminal: evidencia?.casoCriminal,
                tipoEvidencia: evidencia?.tipoEvidencia,
                descricao: evidencia?.descricao,
                localizacao: evidencia?.localizacao,
                quemLocalizou: evidencia?.quemLocalizou,
                dataEncontro: evidencia?.dataEncontro,
                statusEvidencia: evidencia?.statusEvidencia,
                observacoes: evidencia?.observacoes
            });
            navigate("/evidencias");
        } catch (error) {
            console.error("Erro ao atualizar a Evidencia:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!evidencia) return <div>Carregando...</div>;

    return (
        <div className="fullbody">
            <NavigatorLateral />
            <Paper>
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Editar Evidência</h2>

                    <label>Caso Criminal:</label>
                    <Select
                        options={casoCriminal.map((ca) => ({
                            value: ca._id,
                            label: `${ca.nomeVitima} - ${ca.tipoCrime} [${ca.dataAbertura}]`,
                        }))}
                        value={{
                            value: evidencia.casoCriminal,
                            label: casoCriminal.find((ca) => ca._id === evidencia.casoCriminal)?.nomeVitima,
                        }}
                        onChange={(e) => setEvidencia({ ...evidencia, casoCriminal: e ? e.value : "" })}
                        required
                    />

                    <label>Quem Localizou:</label>
                    <Select
                        options={detetives.map((ca) => ({
                            value: ca._id,
                            label: `${ca.nome} - ${ca.especialidade}`,
                        }))}
                        value={{
                            value: evidencia.quemLocalizou,
                            label: detetives.find((ca) => ca._id === evidencia.quemLocalizou)?.nome,
                        }}
                        onChange={(e) => setEvidencia({ ...evidencia, quemLocalizou: e ? e.value : "" })}
                        required
                    />

                    <label>
                        Tipo Evidência:
                        <select
                            value={evidencia.tipoEvidencia}
                            onChange={(e) => setEvidencia({ ...evidencia, tipoEvidencia: e.target.value })}
                            required
                        >
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
                            value={evidencia.descricao}
                            onChange={(e) => setEvidencia({ ...evidencia, descricao: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Localização:
                        <input
                            type="text"
                            value={evidencia.localizacao}
                            onChange={(e) => setEvidencia({ ...evidencia, localizacao: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Data de Registro da Evidência:
                        <input
                            type="date"
                            value={evidencia.dataEncontro}
                            onChange={(e) => setEvidencia({ ...evidencia, dataEncontro: e.target.value })}
                            required
                        />
                    </label>

                    <label>
                        Status Evidência:
                        <select
                            value={evidencia.statusEvidencia}
                            onChange={(e) => setEvidencia({ ...evidencia, statusEvidencia: e.target.value })}
                            required
                        >
                            <option value="Boa">Boa</option>
                            <option value="Ruim">Ruim</option>
                            <option value="Inutilizável">Inutilizável</option>
                        </select>
                    </label>

                    <label>
                        Observação:
                        <input
                            type="text"
                            value={evidencia.observacoes}
                            onChange={(e) => setEvidencia({ ...evidencia, observacoes: e.target.value })}
                            required
                        />
                    </label>

                    <button type="submit" disabled={loading}>
                        {loading ? "Atualizando..." : "Atualizar Evidencia"}
                    </button>
                </form>
            </Paper>
        </div>
    );
}

export default EditarEvidencia;
