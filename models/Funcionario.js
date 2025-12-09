import conexao from "../config/conexao.js";

const FuncionarioSchema = new conexao.Schema({
    nome:{type:String, required:true},
    cpf:{type:String, required:true},
    data_inicio:{type:Date, required:true},
    data_fim:{type:Date, required:true},
    salario:{type:Number, required:true},
    // Armazenamos a imagem já como data URL (string)
    foto:{type:String}
})

const Funcionario = conexao.model("Funcionario", FuncionarioSchema);
export default Funcionario