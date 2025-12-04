import conexao from "../config/conexao.js";

const InstrumentoSchema = new conexao.Schema({
    nome:{type:String, required:true},
    familia:{type:String},
    fabricante:{type:String},
    data_fabricacao:{type:Date},
    preco:{type:Number},
    foto:{type:Buffer}

})
const Instrumento = conexao.model("Instrumento", InstrumentoSchema);

export default Instrumento