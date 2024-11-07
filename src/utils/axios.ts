// src/utils/axios.ts
import axios from "axios";

// Crie uma instância do axios
const instance = axios.create({
  baseURL: "http://localhost:3000", // Altere a URL para o seu back-end
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptadores para tratar requisição e resposta
instance.interceptors.request.use(
  (config) => {
    // Adicionar cabeçalhos de autorização ou manipular configurações da requisição
    // Por exemplo: const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Pode tratar as respostas antes de retornar para o código que chamou
    return response;
  },
  (error) => {
    // Pode tratar erros de resposta aqui
    // Exemplo: Se erro 401, redireciona para a página de login
    // if (error.response.status === 401) {
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export default instance;
