// src/controllers/analiseRiscoController.js
const analiseRiscoService = require("../services/analiseRiscoService");

class AnaliseRiscoController {
  async analisarRisco(req, res) {
    try {
      const { cpf } = req.params;

      if (!cpf || cpf.length !== 11) {
        return res.status(400).json({
          status: "error",
          message: "CPF inválido. Deve conter 11 dígitos.",
        });
      }
      const resultado = await analiseRiscoService.analisarRiscoPorCPF(cpf);

      res.json({
        status: "success",
        message: "Análise de risco realizada com sucesso",
        data: resultado,
      });
    } catch (error) {
      console.error("❌ Erro no controller:", error);

      if (error.message.includes("não encontrado")) {
        return res.status(404).json({
          status: "error",
          message: error.message,
        });
      }

      if (error.message.includes("Falha ao acessar")) {
        return res.status(502).json({
          status: "error",
          message: "Serviço dependente indisponível",
        });
      }

      res.status(500).json({
        status: "error",
        message: "Erro interno no servidor de análise de risco",
      });
    }
  }

  async healthCheck(req, res) {
    try {
      const health = await analiseRiscoService.healthCheck();
      res.json(health);
    } catch (error) {
      res.status(500).json({
        servico: "Análise de Risco",
        status: "ERROR",
        timestamp: new Date().toISOString(),
        error: error.message,
      });
    }
  }
}

module.exports = new AnaliseRiscoController();
