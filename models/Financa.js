import conexao from "../config/conexao.js";

const FinancaSchema = new conexao.Schema({
    valor_atual_caixa:{type:String, required:true},
    valor_movimentado:{type:String, required:true},
    data_movimentacao:{type:Date, required:true}
})
const Financa = conexao.model("Financa", FinancaSchema);
export default Financa