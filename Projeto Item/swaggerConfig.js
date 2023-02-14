const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'API do Item',
      version: '1.0.0',
      description: 'Documentação da API do Item',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      },
      contact: {
        name: 'Matheus Maia',
        email: 'matheusmartinsmaia@gmail.com',
      },
      contact2: {
        name: 'Roberta Assis',
        email: 'roberta.assisdecarvalho9@gmail.com',
      },
      contact3: {
        name: 'Ben Hur Faria',
        email: 'benhurfaria3@gmail.com',
      }
    },
    servers: [
      {
        url: 'http://localhost:8001',
        description: 'Servidor do Usuário'
      }
    ]
  },
  apis: ['./routes/*.js'] // Caminho para os arquivos com as rotas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
