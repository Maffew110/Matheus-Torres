import conexao from "../config/conexao.js";

const InstrumentoSchema = new conexao.Schema({
    nome:{type:String, required:true},
    familia:{type:String},
    fabricante:{type:String},
    data_fabricacao:{type:Date},
    preco:{type:Number},
    // Armazenamos a imagem já como data URL (string) para simplificar a renderização
    foto:{type:String}
})
const Instrumento = conexao.model("Instrumento", InstrumentoSchema);

export default Instrumento