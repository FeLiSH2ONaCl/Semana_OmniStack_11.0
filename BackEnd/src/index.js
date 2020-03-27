const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors(
   // origin:;  ==> indica onde o API pode ser acessado, onde está hospedada
)); //Determina quem pode acessar a API
app.use(express.json()); // Inidica que o nosso APP está usando o JSON,
//transformando ele em um objeto javaScript
app.use(routes);

/** Rota / Recurso */

// O Primeiro parâmetro do get ==> é a rota, e precisamos indicar o
// caminho dela, que é o recurso que queremos acessar.

/** 
* Métodos HTTP:
*
* - GET: Buscar / Listar uma Informação do beck-end
* - POST: Criar uma informação no beck-end
* - PUT: Alterar uma informação no beck-end
* - DELETE: Deletar uma informação no beck-end
**/

/**
 * Tipos de Parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na Rota após o "?" (Filtros, Paginação)
 *               e pode adicionar mais de um através "&"
 * Route Params: Parâmetros utilizados para identificar recursos :id
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

 /**
  * Bancos de Dados
  * 
  * SQL: MySQL, SQLite, PostgreSQL, Oracle, Mycrosoft SQL Server, etc
  * NoSQL: MongoDB, CouchDB, etc
  */

  /**
   * Comunicação com o Banco de Dados
   * 
   * Driver: SELECT * FROM users
   * Query Builder: table('users).select('*').where()
   */

app.listen(3333);