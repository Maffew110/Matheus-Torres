import conexao from "../config/conexao.js";

const InstrumentoSchema = new conexao.Schema({
    nome:{type:String, required:true},
    familia:{type:String},
    fabricante:{type:String},
    data_fabricacao:{type:Date},
    preco:{type:Number},
    foto:{type:Buffer, get: (valor)=>{
        if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
    }}
})
const Instrumento = conexao.model("Instrumento", InstrumentoSchema);

export default Instrumento