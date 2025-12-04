import conexao from "../config/conexao.js";

const ClienteSchema = new conexao.Schema({
    nome:{type:String, required:true},
    cpf:{type:String, required:true},
    telefone:{type:String, required:true},
    email:{type:String, required:true}
})
const Cliente = conexao.model("Cliente", ClienteSchema);
export default Cliente