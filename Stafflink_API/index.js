import express from 'express';
import cors from 'cors';
import router from './routes/employees.js';
import registersRouter  from './routes/registers.js'
import newsRouter from './routes/news.js'
import vacationRouter from './routes/vacation.js'

const server = express();

server.use(cors());
server.use(express.json());

server.use('/employees', router);
server.use('/registers', registersRouter );
server.use('/news', newsRouter );
server.use('/vacation', vacationRouter)


server.get('/', (request, response) => {
  response.status(200).send('<h1>Rota raiz :)</h1>');
});

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT || 4040
}, () => {
  console.log(`Servidor iniciado na porta ${process.env.PORT ?? 4040}`)
});
