// src/services/apiClientService.js
const axios = require("axios");
const apiConfig = require("../config/apiConfig");

class ApiClientService {
  constructor() {
    this.validacaoApi = axios.create({
      baseURL: apiConfig.SERVICES.VALIDACAO_DADOS,
      timeout: apiConfig.REQUEST_CONFIG.timeout,
    });

    this.scoreApi = axios.create({
      baseURL: apiConfig.SERVICES.SCORE_CREDITO,
      timeout: apiConfig.REQUEST_CONFIG.timeout,
    });
  }

  async buscarDadosCliente(cpf) {
    try {
      console.log(`🔍 Buscando dados do cliente: ${cpf}`);
      const response = await this.validacaoApi.get(
        `/api/validacao/cliente/${cpf}`
      );
      console.log("✅ Dados do cliente recebidos:", response.data);

      if (response.data.status === "success") {
        return response.data.cliente;
      }
      throw new Error("Cliente não encontrado");
    } catch (error) {
      console.error("❌ Erro ao buscar dados do cliente:", error.message);
      throw new Error(
        `Falha ao acessar serviço de validação: ${error.message}`
      );
    }
  }

  async buscarScoreCliente(cpf) {
    try {
      console.log(`📊 Buscando score do cliente: ${cpf}`);
      const response = await this.scoreApi.get(
        `/api/score/${cpf}`
      );

      if (response.data.status === "success") {
        return response.data.score;
      }
      throw new Error("Score não encontrado");
    } catch (error) {
      console.error("❌ Erro ao buscar score do cliente:", error.message);
      throw new Error(`Falha ao acessar serviço de score: ${error.message}`);
    }
  }

  async healthCheck() {
    try {
      const [validacaoHealth, scoreHealth] = await Promise.all([
        this.validacaoApi.get("/health"),
        this.scoreApi.get("/health"),
      ]);

      return {
        validacaoDados: validacaoHealth.data.status === "OK",
        scoreCredito: scoreHealth.data.status === "OK",
      };
    } catch (error) {
      return {
        validacaoDados: false,
        scoreCredito: false,
        error: error.message,
      };
    }
  }
}

module.exports = new ApiClientService();
