import conexao from "../config/conexao.js";

const FuncionarioSchema = new conexao.Schema({
    nome:{type:String, required:true},
    cpf:{type:String, required:true},
    data_inicio:{type:Date, required:true},
    data_fim:{type:Date, required:true},
    salario:{type:Number, required:true},
    foto:{type:Buffer, get: (valor)=>{
        if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
    }}
})

const Funcionario = conexao.model("Funcionario", FuncionarioSchema);
export default Funcionario