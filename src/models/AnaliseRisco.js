// src/models/AnaliseRisco.js
class AnaliseRisco {
  constructor(data) {
    this.id = data.id || `analise:${Date.now()}`;
    this.cpf = data.cpf;
    this.dataNascimento = data.dataNascimento;
    this.idade = data.idade;
    this.score = data.score;
    this.risco = data.risco; // 'baixo', 'medio', 'alto'
    this.pontuacaoRisco = data.pontuacaoRisco; // 0-100
    this.fatores = data.fatores || [];
    this.dataAnalise = data.dataAnalise || new Date().toISOString();
  }

  calcularIdade(dataNascimento) {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    const diaAtual = hoje.getDate();
    const diaNascimento = nascimento.getDate();

    if (
      mesAtual < mesNascimento ||
      (mesAtual === mesNascimento && diaAtual < diaNascimento)
    ) {
      idade--;
    }

    return idade;
  }

  toJSON() {
    return {
      id: this.id,
      cpf: this.cpf,
      dataNascimento: this.dataNascimento,
      idade: this.idade,
      score: this.score,
      risco: this.risco,
      pontuacaoRisco: this.pontuacaoRisco,
      fatores: this.fatores,
      dataAnalise: this.dataAnalise,
    };
  }

  static fromJSON(data) {
    return new AnaliseRisco(data);
  }
}

module.exports = AnaliseRisco;
