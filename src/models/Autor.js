import mongoose from "mongoose";

const AutorSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  nome: {
    type: String,
    required: [true, "O campo 'nome' do livro é obrigatório."]
  },
  nacionalidade: { type: String }
}, { versionKey: false });

const autores = mongoose.model("autores", AutorSchema);

export { autores, AutorSchema };
