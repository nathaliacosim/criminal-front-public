import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CadastrarCaso: React.FC = () => {
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const casoData = { titulo, descricao };

    try {
      await axios.post("/api/casos-criminais", casoData);
      alert("Caso cadastrado com sucesso!");
      navigate("/casos-criminais"); // Redireciona para a lista de casos
    } catch (error) {
      console.error("Erro ao cadastrar caso:", error);
      alert("Erro ao cadastrar caso");
    }
  };

  return (
    <div>
      <h1>Cadastrar Novo Caso Criminal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Caso</button>
      </form>
    </div>
  );
};

export default CadastrarCaso;
