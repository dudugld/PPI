const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const PORT = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public'));

const produtos = [
  {
    id: 1,
    nome: 'Notebook Gamer',
    preco: 4500.00,
    descricao: 'Notebook de alta performance com placa de vídeo dedicada e 16GB RAM.'
  },
  {
    id: 2,
    nome: 'Smartphone Pro',
    preco: 3200.00,
    descricao: 'Smartphone com tela AMOLED de 120Hz e câmera tripla de 108MP.'
  },
  {
    id: 3,
    nome: 'Fone de Ouvido Bluetooth',
    preco: 250.00,
    descricao: 'Fone sem fio com cancelamento ativo de ruído e bateria de até 30h.'
  }
];

app.get('/', (req, res) => {
  res.render('produtos', { produtos });
});

app.get('/produto/:id', (req, res) => {
  const produtoId = parseInt(req.params.id, 10);
  const produto = produtos.find(p => p.id === produtoId);

  if (produto) {
    res.render('detalhe', { produto });
  } else {
    res.status(404).send('Produto não encontrado');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});