// index.js
require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Microserviço de Análise de Risco rodando na porta ${PORT}`);
  console.log(`📚 Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
  console.log(`⏰ Iniciado em: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n⚠️  Recebido SIGINT. Desligando servidor...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("⚠️  Recebido SIGTERM. Desligando servidor...");
  process.exit(0);
});
