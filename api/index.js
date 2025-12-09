import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// COLOCAR OS MODELS AQUI (colocar o caminho ../)

import Funcionario from '../models/Funcionario.js';
import Instrumento from '../models/Instrumento.js';
import Cliente from '../models/Cliente.js';
import Financa from '../models/Financa.js';

//FIM MODELS

// Servir arquivos estáticos
//app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Rotas
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// COLOCAR AS ROTAS AQUI

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/instrumento/lst', async (req, res) => {
    //busca os instrumentos no banco de dados
    const instrumentos = await Instrumento.find()
    res.render("instrumento/lst", {instrumentos:instrumentos})
})

//vem do form de pesquisa
app.post('/instrumento/lst', async (req, res) => {
    //busca os instrumentos no banco de dados
    const pesquisa = req.body.pesquisa
    const instrumentos = await Instrumento.find(
        {nome:{$regex:pesquisa, 
            $options: "i"
        }}
    )
    res.render("instrumento/lst", {instrumentos:instrumentos})
})

app.post('/instrumento/add/ok', upload.single('foto'), async (req, res) => {
    //grava no banco
    const fotoData = req.file ? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` : null;
    await Instrumento.create({
        nome:req.body.nome,
        familia:req.body.familia,
        fabricante:req.body.fabricante,
        data_fabricacao:req.body.data_fabricacao,
        preco:req.body.preco,
        foto: fotoData
    })
    res.render("instrumento/addok")
})

app.get('/instrumento/add', (req, res) => {
    res.render("instrumento/add")
})

app.post('/instrumento/edt/:id', async (req, res) => {
    const id = req.params.id
    await Instrumento.findByIdAndUpdate(id, req.body)
    res.render("instrumento/edtok")
})

app.get('/instrumento/edt/:id', async (req, res) => {
    const id = req.params.id
    const instrumento = await Instrumento.findById(id)
    res.render("instrumento/edt", {instrumento})
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
    const fotoData = req.file ? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` : null;
    await Funcionario.create({ ...req.body, foto: fotoData })
    res.render("funcionarios/addok")
})

app.get('/funcionarios/add', (req, res) => {
    res.render("funcionarios/add")
})

app.post('/funcionarios/edt/:id', upload.single('foto'), async (req, res) => {
    const id = req.params.id
    const updateData = { ...req.body }
    if (req.file) {
        updateData.foto = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    }
    await Funcionario.findByIdAndUpdate(id, updateData)
    res.render("funcionarios/edtok")
})

app.get('/funcionarios/edt/:id', async (req, res) => {
    const id = req.params.id
    const funcionarios = await Funcionario.findById(id)
    res.render("funcionarios/edt", {funcionarios})
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

//FIM ROTAS
app.listen(3001)
// Exporta o handler compatível com Vercel
export default app;
