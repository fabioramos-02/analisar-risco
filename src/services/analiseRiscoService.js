// src/services/analiseRiscoService.js
const AnaliseRisco = require("../models/AnaliseRisco");
const ApiClientService = require("./apiClientService");
const RiskCalculator = require("../utils/riskCalculator");
const redis = require("redis");

class AnaliseRiscoService {
  constructor() {
    this.redisClient = null;
    this.initRedis();
  }

  async initRedis() {
    try {
      this.redisClient = redis.createClient({
        socket: {
          host: process.env.REDIS_HOST || "localhost",
          port: process.env.REDIS_PORT || 6379,
        },
      });

      this.redisClient.on("error", (err) => {
        console.error("❌ Redis Client Error:", err);
      });

      this.redisClient.on("connect", () => {
        console.log("✅ Conectado ao Redis - Análise de Risco");
      });

      await this.redisClient.connect();
    } catch (error) {
      console.error("❌ Erro ao conectar com Redis:", error);
    }
  }

  async analisarRiscoPorCPF(cpf) {
    try {
      // Verificar cache primeiro
      const cacheKey = `analise:${cpf}`;
      if (this.redisClient) {
        const cached = await this.redisClient.get(cacheKey);
        if (cached) {
          console.log("📦 Retornando análise do cache");
          return JSON.parse(cached);
        }
      }

      // Buscar dados dos serviços externos
      const [dadosCliente, score] = await Promise.all([
        ApiClientService.buscarDadosCliente(cpf),
        ApiClientService.buscarScoreCliente(cpf),
      ]);

      // Calcular idade
      const idade = new AnaliseRisco({}).calcularIdade(
        dadosCliente.dataNascimento
      );

      // Calcular risco
      const resultadoRisco = RiskCalculator.calcularRisco(idade, score);
      const recomendacao = RiskCalculator.gerarRecomendacao(
        resultadoRisco.classificacaoRisco,
        resultadoRisco.fatores
      );

      // Criar análise
      const analise = new AnaliseRisco({
        cpf,
        dataNascimento: dadosCliente.dataNascimento,
        idade,
        score,
        risco: resultadoRisco.classificacaoRisco,
        pontuacaoRisco: resultadoRisco.pontuacaoRisco,
        fatores: resultadoRisco.fatores,
      });

      const resultado = {
        analise: analise.toJSON(),
        recomendacao,
      };

      // Salvar no cache (expira em 1 hora)
      if (this.redisClient) {
        await this.redisClient.setEx(cacheKey, 3600, JSON.stringify(resultado));
      }

      return resultado;
    } catch (error) {
      console.error("❌ Erro na análise de risco:", error);
      throw new Error(`Falha na análise de risco: ${error.message}`);
    }
  }

  async healthCheck() {
    const servicesHealth = await ApiClientService.healthCheck();
    const redisHealth = this.redisClient
      ? (await this.redisClient.ping()) === "PONG"
      : false;

    return {
      servico: "Análise de Risco",
      status: "OK",
      timestamp: new Date().toISOString(),
      dependencias: {
        validacaoDados: servicesHealth.validacaoDados,
        scoreCredito: servicesHealth.scoreCredito,
        redis: redisHealth,
      },
    };
  }
}

module.exports = new AnaliseRiscoService();
