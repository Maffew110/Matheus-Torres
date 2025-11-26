import conexao from "../config/conexao.js";

const FuncionarioSchema = conexao.Schema({
    nome:{type:String, required:true},
    cpf:{type:String, required:true},
    data_inicio:{type:Date, required:true},
    data_fim:{type:Date, required:true},
    salario:{type:Number, required:true}
})
const Funcionario = conexao.model("Funcionario", FuncionarioSchema);
export default Funcionario