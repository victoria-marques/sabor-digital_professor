const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const routes = require('./routes'); 

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');


// Middlewares globais
app.use(cors()); // Habilita o CORS para permitir requisições do frontend
app.use(express.json());

// Servir arquivos estáticos (como as imagens de uploads)
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Registro de todas as rotas da API centralizadas
app.use('/', routes);

app.use('/auth', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;