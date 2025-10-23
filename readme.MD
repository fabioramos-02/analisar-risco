# Microserviço de Análise de Risco

📋 **Descrição**  
Microserviço para análise de risco de clientes baseada em idade e score de crédito. Integra-se com serviços de validação e score e usa Redis para cache e performance.

## 🚀 Funcionalidades
- Análise de risco por idade e score
- Integração com serviços de validação e score
- Cache com Redis
- Classificação de risco (baixo, médio, alto)
- Health check com verificação de dependências
- Documentação via Swagger
- Containerizável com Docker

## 🛠 Tecnologias
- Node.js + Express  
- Redis  
- Axios  
- Swagger  
- Docker / docker-compose

## 🔧 Configuração rápida

### Variáveis de ambiente (.env)
```env
PORT=3002
REDIS_HOST=localhost
REDIS_PORT=6380
VALIDACAO_API_URL=http://localhost:3001
SCORE_API_URL=http://localhost:3000
```

### Executar com Docker
```bash
docker-compose up --build
```

### Executar localmente
```bash
npm install
npm start
```

## 📡 Endpoints principais
- Analisar risco: `GET /api/analise-risco/{cpf}`
- Health check: `GET /api/analise-risco/health/check`
- Documentação (Swagger): `GET /api-docs`

### Exemplo de uso
```bash
curl "http://localhost:3002/api/analise-risco/12345678909"
```

## 📊 Classificação de risco
- Baixo: pontuação ≤ 20  
- Médio: pontuação 21–50  
- Alto: pontuação > 50

## 🔗 Dependências
- Serviço de Validação de Dados — porta 3001  
- Serviço de Score de Crédito — porta 3000  
- Redis — porta 6380

## 🐳 Docker
```bash
# Build e execução
docker-compose up --build

# Somente execução
docker-compose up
```

Serviço disponível em: http://localhost:3002
