import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import NavigatorLateral from "../../components/NavigatorLateral";
import Paper from "../../components/Paper";
import Select from "react-select";
import { format } from "date-fns";

interface CasoCriminal {
  _id: string;
  nomeVitima: string;
  tipoCrime: string;
  dataAbertura: string;
}

function EditarEntrevista() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    motivoEntrevista: "",
    entrevistado: "",
    tipoEntrevistado: "",
    tipoEntrevista: "",
    localEntrevista: "",
    nomeResponsavel: "",
    ataEntrevista: "",
    dataHoraInicio: "",
    dataHoraFim: "",
  });
  const [casosCriminais, setCasosCriminais] = useState<CasoCriminal[]>([]);
  const [selectedCasoCriminal, setSelectedCasoCriminal] = useState<any | null>(
    null
  );
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

    const fetchEntrevista = async () => {
      try {
        const responseEntrevista = await axios.get(`/entrevistas/${id}`);
        const data = responseEntrevista.data;

        // Atualize o formulário com os dados da entrevista
        setFormData({
          motivoEntrevista: data.motivoEntrevista,
          entrevistado: data.entrevistado,
          tipoEntrevistado: data.tipoEntrevistado,
          tipoEntrevista: data.tipoEntrevista,
          localEntrevista: data.localEntrevista,
          nomeResponsavel: data.nomeResponsavel,
          ataEntrevista: data.ataEntrevista,
          dataHoraInicio: format(
            new Date(data.dataHoraInicio),
            "yyyy-MM-dd'T'HH:mm"
          ),
          dataHoraFim: format(new Date(data.dataHoraFim), "yyyy-MM-dd'T'HH:mm"),
        });

        if (data.casoCriminal) {
          const responseCaso = await axios.get(
            `/caso-criminal/${data.casoCriminal}`
          );
          const caso = responseCaso.data;

          setSelectedCasoCriminal({
            value: caso._id,
            label: `${caso.nomeVitima} - ${caso.tipoCrime} [${
              caso.dataAbertura
                ? format(new Date(caso.dataAbertura), "dd/MM/yyyy HH:mm")
                : ""
            }]`,
          });
        }
      } catch (error) {
        console.error("Erro ao buscar a entrevista ou o caso criminal:", error);
      }
    };

    fetchCasosCriminais();
    fetchEntrevista();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (selectedOption: any) => {
    setSelectedCasoCriminal(selectedOption);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/entrevistas/${id}`, {
        ...formData,
        casoCriminal: selectedCasoCriminal ? selectedCasoCriminal.value : null,
      });
      navigate("/entrevistas");
    } catch (error) {
      console.error("Erro ao atualizar a entrevista:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fullbody">
      <NavigatorLateral />
      <Paper>
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="text-left">Editar Entrevista</h3>

          <label>Caso Criminal:</label>
          <Select
            options={casosCriminais.map((ca) => ({
              value: ca._id,
              label: `${ca.nomeVitima} - ${ca.tipoCrime} [${
                ca.dataAbertura
                  ? format(new Date(ca.dataAbertura), "dd/MM/yyyy HH:mm")
                  : ""
              }]`,
            }))}
            value={selectedCasoCriminal}
            onChange={handleSelectChange}
            required
          />
          <br />
          <label>Entrevistado:</label>
          <input
            type="text"
            name="entrevistado"
            value={formData.entrevistado}
            onChange={handleChange}
            required
          />
          <br />
          <label>Tipo do Entrevistado:</label>
          <select
            name="tipoEntrevistado"
            value={formData.tipoEntrevistado}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Tipo de Entrevistado</option>
            <option value="Suspeito">Suspeito</option>
            <option value="Testemunha">Testemunha</option>
            <option value="Outros">Outros</option>
          </select>
          <br />
          <label>Tipo de Entrevista:</label>
          <select
            name="tipoEntrevista"
            value={formData.tipoEntrevista}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Tipo de Entrevista</option>
            <option value="ONLINE">ONLINE</option>
            <option value="PRESENCIAL">PRESENCIAL</option>
          </select>
          <br />
          <label>Local da Entrevista:</label>
          <input
            type="text"
            name="localEntrevista"
            value={formData.localEntrevista}
            onChange={handleChange}
            required
          />
          <br />
          <label>Motivo da Entrevista:</label>
          <select
            name="motivoEntrevista"
            value={formData.motivoEntrevista}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o Motivo da Entrevista</option>
            <option value="Investigação">Investigação</option>
            <option value="Esclarecimento">Esclarecimento</option>
            <option value="Depoimento">Depoimento</option>
            <option value="Interrogatório">Interrogatório</option>
            <option value="Outros">Outros</option>
          </select>
          <br />
          <label>Nome do Responsável:</label>
          <input
            type="text"
            name="nomeResponsavel"
            value={formData.nomeResponsavel}
            onChange={handleChange}
            required
          />
          <br />
          <label>Ata da Entrevista:</label>
          <input
            type="text"
            name="ataEntrevista"
            value={formData.ataEntrevista}
            onChange={handleChange}
            required
          />
          <br />
          <label>Início da Entrevista:</label>
          <input
            type="datetime-local"
            name="dataHoraInicio"
            value={formData.dataHoraInicio}
            onChange={handleChange}
            required
          />
          <br />
          <label>Fim da Entrevista:</label>
          <input
            type="datetime-local"
            name="dataHoraFim"
            value={formData.dataHoraFim}
            onChange={handleChange}
            required
          />
          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar Entrevista"}
          </button>
        </form>
      </Paper>
    </div>
  );
}

export default EditarEntrevista;
