// src/app.js
const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const analiseRiscoRoutes = require("./routes/analiseRiscoRoutes");

const app = express();

// Middlewares
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Microserviço de Análise de Risco",
      version: "1.0.0",
      description:
        "API para análise de risco de clientes baseada em idade e score",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3002}`,
        description: "Servidor Local",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/analise-risco", analiseRiscoRoutes);

// Health check básico
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Análise de Risco",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint não encontrado",
  });
});

module.exports = app;
