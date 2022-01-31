var express = require('express');
var router = express.Router();
const Link = require('../models/link');

router.get('/:code', async (req, res, next) => {
  const code = req.params.code;  
  const resultado = await Link.findOne({where: {code:code}});

  if(!resultado){
    return res.sendStatus(404);
  }

  await resultado.save();

  res.redirect(resultado.url);  

})

//Teste de redirecionamento de id
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;  
  const resultadoId = await Link.findOne({where: {id: id}});

  if(!resultadoId){
    return res.sendStatus(404);
  }
  
  await resultadoId.save();

  res.render('telaId');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Atividade 3 da disciplina Backend' });
});

function generateCode() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

router.post('/new', async (req, res, next) => {
  const url = req.body.url;
  const code = generateCode();
  
  const resultado = await Link.create({
    url,
    code
  })

  //const data = new Date();
  //res.send('http://localhost/3000/' + code);

  res.render('telaResposta', resultado.dataValues);

  //res.render('stats', resultado);
})

module.exports = router;
