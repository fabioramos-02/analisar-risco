// src/utils/riskCalculator.js
class RiskCalculator {
  static calcularRisco(idade, score) {
    let pontuacaoRisco = 0;
    const fatores = [];

    // Fator Idade
    if (idade < 25) {
      pontuacaoRisco += 30;
      fatores.push("idade_baixa");
    } else if (idade >= 25 && idade <= 35) {
      pontuacaoRisco += 15;
      fatores.push("idade_media");
    } else {
      fatores.push("idade_alta"); // Não adiciona pontos para idade alta
    }

    // Fator Score
    if (score < 300) {
      pontuacaoRisco += 50;
      fatores.push("score_muito_baixo");
    } else if (score >= 300 && score < 500) {
      pontuacaoRisco += 35;
      fatores.push("score_baixo");
    } else if (score >= 500 && score < 700) {
      pontuacaoRisco += 20;
      fatores.push("score_medio");
    } else if (score >= 700 && score < 850) {
      pontuacaoRisco += 10;
      fatores.push("score_alto");
    } else {
      fatores.push("score_muito_alto"); // Não adiciona pontos para score muito alto
    }

    // Classificação final
    let classificacaoRisco;
    if (pontuacaoRisco <= 20) {
      classificacaoRisco = "baixo";
    } else if (pontuacaoRisco <= 50) {
      classificacaoRisco = "medio";
    } else {
      classificacaoRisco = "alto";
    }

    return {
      pontuacaoRisco,
      classificacaoRisco,
      fatores,
    };
  }

  static gerarRecomendacao(risco, fatores) {
    const recomendacoes = {
      baixo: "Crédito pode ser aprovado com condições favoráveis.",
      medio: "Crédito pode ser aprovado com análise adicional.",
      alto: "Crédito requer análise detalhada e pode não ser aprovado.",
    };

    const recomendacaoEspecifica = [];

    if (fatores.includes("idade_baixa")) {
      recomendacaoEspecifica.push(
        "Cliente jovem - considerar histórico limitado."
      );
    }

    if (
      fatores.includes("score_muito_baixo") ||
      fatores.includes("score_baixo")
    ) {
      recomendacaoEspecifica.push(
        "Score baixo - verificar histórico de pagamentos."
      );
    }

    return {
      geral: recomendacoes[risco],
      especificas: recomendacaoEspecifica,
    };
  }
}

module.exports = RiskCalculator;
