import mongoose from "mongoose";
const url = "mongodb+srv://aluno:123@cluster0.dbaqngf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
await mongoose.connect(url);
export default mongoose;