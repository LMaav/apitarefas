const express = require("express");
const app = express();
const porta = process.env.PORT || 3000;
const conexao = require("./banco-de-dados");
const Tarefa = require("./modelos/tarefa");

app.use(express.json());

// 🔧 ADICIONE ESTA ROTA:
app.get("/", (req, res) => {
  res.send("API de Tarefas está funcionando!");
});

// Sua rota POST existente:
app.post("/tarefas", async (req, res) => {
  const { titulo, descricao } = req.body;
  const tarefa = new Tarefa({ titulo, descricao });

  await tarefa.save();

  res.status(201).json({ mensagem: "Tarefa criada com sucesso!" });
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});

// Obtendo os parametros passados pela linha de comando
var userArgs = process.argv.slice(2);
var mongoURL = userArgs[0];
//Configurando a conexao com o Banco de Dados
var mongoose = require('mongoose');
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', (error) => {
 console.log(error)
})
db.once('connected', () => {
 console.log('Database Connected');
})
