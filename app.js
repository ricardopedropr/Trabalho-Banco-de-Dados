const express = require("express");
const app = express();

const Pagamento = require("./models/Pagamento");
const Usuario = require("./models/Usuario"); // Importa o modelo Usuario
const path = require('path');
const router = express.Router();
const moment = require('moment');
const handlebars = require("express-handlebars");

/*// Sincronizar os modelos com o banco de dados
Usuario.sync({ force: false }) // Cria a tabela se não existir, sem deletar dados existentes
    .then(() => {
        console.log("Tabela 'usuarios' criada ou já existente.");
    })
    .catch((err) => {
        console.error("Erro ao criar a tabela 'usuarios':", err);
    });*/

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas de Pagamento
router.get('/pagamento', function (req, res) {
    res.sendFile(path.join(__dirname + '/pagamento.html'));
});

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/pagamento', function (req, res) {
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function () {
        res.redirect('/pagamento');
    }).catch(function (erro) {
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro);
    });
});

router.get('/lista', function (req, res) {
    Pagamento.findAll().then(function (pagamentos) {
        res.render('pagamento', { pagamentos: pagamentos });
    });
});

router.get('/del-pagamento/:id', function (req, res) {
    Pagamento.destroy({
        where: { 'id': req.params.id }
    }).then(function () {
        res.redirect('/pagamento');
    }).catch(function (erro) {
        res.send("Pagamento não apagado com sucesso!");
    });
});

router.get('/edit-pagamento/:id', function (req, res) {
    Pagamento.findByPk(req.params.id).then(function (pagamentos) {
        res.render('editar', { pagamentos: pagamentos });
    });
});

router.post('/edit-pagamento/:id', function (req, res) {
    Pagamento.update(
        {
            nome: req.body.nome,
            valor: req.body.valor
        },
        { where: { 'id': req.params.id } }
    ).then(function () {
        res.redirect('/lista');
    }).catch(function (erro) {
        res.send("Erro: Pagamento não foi atualizado com sucesso!" + erro);
    });
});

// Rotas de Usuário

// Formulário de cadastro de usuário
router.get('/usuario', function (req, res) {
    res.sendFile(path.join(__dirname + '/usuario.html'));
});

// Criação de usuário
router.post('/usuario', function (req, res) {
    Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
    }).then(function () {
        res.redirect('/usuario');
    }).catch(function (erro) {
        res.send("Erro: Usuário não foi cadastrado com sucesso!" + erro);
    });
});

// Listar todos os usuários
router.get('/lista-usuarios', function (req, res) {
    Usuario.findAll().then(function (usuarios) {
        res.render('usuario', { usuarios: usuarios }); // Renderiza a view 'usuario'
    }).catch(function(erro) {
        res.send("Erro: Não foi possível listar os usuários!");
    });
});

// Deletar um usuário
router.post('/del-usuario/:id', function (req, res) {
    Usuario.destroy({
        where: { 'id': req.params.id }
    }).then(function () {
        res.redirect('/lista-usuarios'); // Redireciona para a lista de usuários após a exclusão
    }).catch(function (erro) {
        res.send("Erro: Não foi possível deletar o usuário!");
    });
});

// Formulário de edição de usuário
router.get('/edit-usuario/:id', function (req, res) {
    Usuario.findByPk(req.params.id).then(function (usuario) {
        res.render('editarUsuario', { usuario: usuario }); // Renderiza a view 'editarUsuario'
    }).catch(function(erro) {
        res.send("Erro: Não foi possível carregar o formulário de edição!");
    });
});

// Atualização de usuário
router.post('/edit-usuario/:id', function (req, res) {
    Usuario.update(
        {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            //updatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        { where: { 'id': req.params.id } }
    ).then(function () {
        res.redirect('/lista-usuarios'); // Redireciona para a lista de usuários após a atualização
    }).catch(function (erro) {
        res.send("Erro: Não foi possível atualizar o usuário!");
    });
});

// Configuração de rotas
app.use('/', router);
app.use('/pagamento', router);
app.use('/lista', router);
app.use('/del-pagamento/:id', router);
app.use('/edit-pagamento/:id', router);


// Rotas de usuários
app.use('/usuario', router);
app.use('/lista-usuarios', router);
app.use('/del-usuario/:id', router);
app.use('/edit-usuario/:id', router);

app.listen(8080, function () {
    console.log("Servidor rodando na porta 8080");

});



/*const express = require("express");
const app = express();

const Pagamento = require("./models/Pagamento")
const path=require ('path');//enderço de cada rota
const router=express.Router();// trabalha com as rotas
const moment = require('moment');
const handlebars = require("express-handlebars");

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Rotas
router.get('/pagamento', function(req, res){
    res.sendFile(path.join(__dirname+'/pagamento.html'));
});

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

router.post('/pagamento', function(req, res){
    
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function(){
        res.redirect('/pagamento')
       
    }).catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    })
     
});
router.get('/lista', function(req, res){
    Pagamento.findAll().then(function(pagamentos){
        res.render('pagamento', {pagamentos: pagamentos});
    })
    
});
router.get('/del-pagamento/:id', function(req, res){
    Pagamento.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/pagamento');
        //res.send("Pagamento apagado com sucesso!");
    }).catch(function(erro){
        res.send("Pagamento não apgado com sucesso!");
    })
});
router.get('/edit-pagamento/:id', function(req, res){
    Pagamento.findByPk (req.params.id).then(function(pagamentos){
        res.render('editar', {pagamentos: pagamentos});
    })
});	


router.post('/edit-pagamento/:id', function(req, res){
    Pagamento.update(   
    {nome: req.body.nome,
    valor: req.body.valor},
    {where: {'id': req.params.id}}
    ).then(function(){
        res.redirect('/lista')
       
    }).catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    })
     
});



app.use('/',router);
app.use('/pagamento',router);
app.use('/lista',router);
app.use('/del-pagamento/:id',router);
app.use('/edit-pagamento/:id',router);

app.listen(8080);*/