// src/config/apiConfig.js
module.exports = {
  // URLs dos outros microserviços
  SERVICES: {
    VALIDACAO_DADOS: process.env.VALIDACAO_API_URL || "http://localhost:3001",
    SCORE_CREDITO: process.env.SCORE_API_URL || "http://localhost:3000",
  },

  // Timeouts e configurações de retry
  REQUEST_CONFIG: {
    timeout: 5000,
    maxRetries: 3,
    retryDelay: 1000,
  },
};
