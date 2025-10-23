// src/routes/analiseRiscoRoutes.js
const express = require("express");
const router = express.Router();
const analiseRiscoController = require("../controllers/analiseRiscoController");

/**
 * @swagger
 * /api/analise-risco/{cpf}:
 *   get:
 *     summary: Analisa o risco de um cliente pelo CPF
 *     tags: [Análise de Risco]
 *     parameters:
 *       - in: path
 *         name: cpf
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF do cliente (apenas números)
 *     responses:
 *       200:
 *         description: Análise de risco realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: CPF inválido
 *       404:
 *         description: Cliente não encontrado
 *       502:
 *         description: Serviço dependente indisponível
 */
router.get("/:cpf", analiseRiscoController.analisarRisco);

/**
 * @swagger
 * /api/analise-risco/health:
 *   get:
 *     summary: Health check do serviço de análise de risco
 *     tags: [Análise de Risco]
 *     responses:
 *       200:
 *         description: Status do serviço e dependências
 */
router.get("/health/check", analiseRiscoController.healthCheck);

module.exports = router;
