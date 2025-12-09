import express from 'express'
const app = express();
//Importar os modelos 
import Funcionario from './models/Funcionario.js';
import Instrumento from './models/Instrumento.js';
import Cliente from './models/Cliente.js';
import Financa from './models/Financa.js';
import multer from 'multer'

const storage = multer.memoryStorage();
const upload = multer({storage});

//Confiram se tem essa linha aqui também
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')


//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Converte o caminho do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))

//rotas
app.get('/', (req, res) => {
    res.render("index")
})

app.get('/instrumento/lst', async (req, res) => {
  const q = req.query.q || "";
    const isNumber = !isNaN(q);

    const query = {
        $or: [
            { nome: { $regex: q, $options: "i" } },
            { familia: { $regex: q, $options: "i" } },
            { fabricante: { $regex: q, $options: "i" } },
        ]
    };

    if (isNumber && q.trim() !== "") {
        query.$or.push({ preco: Number(q) });
    }

    const instrumentoDocs = await Instrumento.find(query);
    const instrumento = instrumentoDocs.map(doc => doc.toObject({ getters: true }));
    res.render("instrumento/lst", {instrumento, q });
});

app.post('/instrumento/add/ok', upload.single('foto'), async (req, res) => {
    //grava no banco
    await Instrumento.create({
        nome:req.body.nome,
        familia:req.body.familia,
        fabricante:req.body.fabricante,
        data_fabricacao:req.body.data_fabricacao,
        preco:req.body.preco,
        foto:req.file.buffer
    })
    res.render("instrumento/addok");
})

app.get('/instrumento/add', (req, res) => {
    res.render("instrumento/add")
})

app.post('/instrumento/edt/:id', upload.single('foto'), async (req, res) => {
    const updateData ={
        nome: req.body.nome,
        familia: req.body.familia,
        fabricante: req.body.fabricante,
        data_fabricacao: req.body.data_fabricacao,
        preco: req.body.preco,
        foto: req.file ? req.file.buffer:undefined
    };
    await Instrumento.findByIdAndUpdate(req.params.id, updateData);
    res.render("instrumento/edtok")
})

app.get('/instrumento/edt/:id', async (req, res) => {
    const instrumentoDoc = await Instrumento.findById(req.params.id);
    const instrumento = await Instrumento.findById(req.params.id);
    res.render("instrumento/edt", {instrumento});
})


app.get('/instrumento/del/:id', async (req, res) => {
    const id = req.params.id
    await Instrumento.findByIdAndDelete(id)
    res.redirect("/instrumento/lst")
})

app.get('/funcionarios/lst', async (req, res) => {
    //busca os funcionários no banco de dados
    const funcionarios = await Funcionario.find()
    res.render("funcionarios/lst", {funcionarios:funcionarios})
})

//vem do form de pesquisa
app.post('/funcionarios/lst', async (req, res) => {
    //busca os funcionários no banco de dados
    const pesquisa = req.body.pesquisa
    const funcionarios = await Funcionario.find(
        {nome:{$regex:pesquisa, 
            $options: "i"
        }}
    )
    res.render("funcionarios/lst", {funcionarios:funcionarios})
})

app.post('/funcionarios/add/ok', upload.single('foto'), async (req, res) => {
    //grava no banco
    await Funcionario.create ({
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_inicio: req.body.data_inicio,
        data_fim: req.body.data_fim,
        salario: req.body.salario,
        foto: req.file.buffer
    });
    res.render("funcionarios/addok")
})

app.get('/funcionarios/add', (req, res) => {
    res.render("funcionarios/add")
})

app.post('/funcionarios/edt/:id', upload.single('foto'), async (req, res) => {
     const updateData ={
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_inicio: req.body.data_inicio,
        data_fim: req.body.data_fim,
        salario: req.body.salario,
        foto: req.file ? req.file.buffer:undefined
    };
    await Funcionario.findByIdAndUpdate(req.params.id, updateData)
    res.render("funcionarios/edtok")
})

app.get('/funcionarios/edt/:id', async (req, res) => {
    const funcionarios = await Funcionario.findById(req.params.id)
    res.render("funcionarios/edt", {funcionarios});
})

app.get('/funcionarios/del/:id', async (req, res) => {
    const id = req.params.id
    await Funcionario.findByIdAndDelete(id)
    res.redirect("/funcionarios/lst")
})


app.get('/clientes/lst', async (req, res) => {
    //busca os clientes no banco de dados
    const clientes = await Cliente.find()
    res.render("clientes/lst", {clientes:clientes})
})

//vem do form de pesquisa
app.post('/clientes/lst', async (req, res) => {
    //busca os clientes no banco de dados
    const pesquisa = req.body.pesquisa
    const clientes = await Cliente.find(
        {nome:{$regex:pesquisa, 
            $options: "i"
        }}
    )
    res.render("clientes/lst", {clientes:clientes})
})

app.post('/clientes/add/ok', async (req, res) => {
    //grava no banco
    await Cliente.create(req.body)
    res.render("clientes/addok")
})

app.get('/clientes/add', (req, res) => {
    res.render("clientes/add")
})

app.post('/clientes/edt/:id', async (req, res) => {
    const id = req.params.id
    await Cliente.findByIdAndUpdate(id, req.body)
    res.render("clientes/edtok")
})

app.get('/clientes/edt/:id', async (req, res) => {
    const id = req.params.id
    const cliente = await Cliente.findById(id)
    res.render("clientes/edt", {cliente})
})

app.get('/clientes/del/:id', async (req, res) => {
    const id = req.params.id
    await Cliente.findByIdAndDelete(id)
    res.redirect("/clientes/lst")
})


app.get('/financas/lst', async (req, res) => {
    const financas = await Financa.find()
    res.render("financas/lst", {financas:financas})
})

//vem do form de pesquisa
app.post('/financas/lst', async (req, res) => {
    const pesquisa = req.body.pesquisa
    const financas = await Financa.find(
        {valor:{$regex:pesquisa, 
            $options: "i"
        }}
    )
    res.render("financas/lst", {financas:financas})
})

app.post('/financas/add/ok', async (req, res) => {
    //grava no banco
    await Financa.create(req.body)
    res.render("financas/addok")
})

app.get('/financas/add', (req, res) => {
    res.render("financas/add")
})

app.post('/financas/edt/:id', async (req, res) => {
    const id = req.params.id
    await Financa.findByIdAndUpdate(id, req.body)
    res.render("financas/edtok")
})

app.get('/financas/edt/:id', async (req, res) => {
    const id = req.params.id
    const financas = await Financa.findById(id)
    res.render("financas/edt", {financas})
})

app.get('/financas/del/:id', async (req, res) => {
    const id = req.params.id
    await Financa.findByIdAndDelete(id)
    res.redirect("/financas/lst")
})

app.get('/site', (req, res) => {
    res.render("site/index")
})

app.listen(3001)
console.log('Servidor rodando na porta 3001  http://localhost:3001')