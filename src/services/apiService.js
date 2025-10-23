// src/services/apiService.js
const axios = require("axios");

class ApiService {
  constructor() {
    this.validacaoApi = axios.create({
      baseURL: process.env.VALIDACAO_API_URL || "http://localhost:3001",
      timeout: 10000,
    });

    this.scoreApi = axios.create({
      baseURL: process.env.SCORE_API_URL || "http://localhost:3003",
      timeout: 10000,
    });
  }

  async buscarDadosCliente(cpf) {
    try {
      const response = await this.validacaoApi.get(
        `/api/validacao/cliente/${cpf}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("Cliente não encontrado");
      }
      throw new Error(`Erro ao buscar dados do cliente: ${error.message}`);
    }
  }

  async buscarScoreCliente(cpf) {
    try {
      const response = await this.scoreApi.get(
        `/api/score/calcular-score/${cpf}`
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("Score não encontrado para o cliente");
      }
      throw new Error(`Erro ao buscar score do cliente: ${error.message}`);
    }
  }
}

module.exports = new ApiService();
