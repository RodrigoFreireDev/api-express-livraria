import mongoose from "mongoose";
import { AutorSchema } from "./Autor.js";

const LivroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: {
    type: String,
    required: [true, "O campo 'titulo' do livro é obrigatório."]
  },
  editora: {
    type: String,
    required: [true, "O campo 'editora' do livro é obrigatório."],
    enum: {
      values: ["Panini", "Kalisto", "Darksider"],
      message: "Editoras permitidas: 'Panini', 'Kalisto' e 'Darksider'. Você tentou cadastrar: {VALUE}"
    }
  },
  preco: { type: Number },
  paginas: {
    type: Number,
    validate: { // tem que ser 'validate' se não não funciona!
      validator: (valor) => { // tem que ser 'validator' se não não funciona!
        return valor >= 49 && valor <= 1000;
      },
      message: "O número de paginas deve estar entre 49 e 1000. Você tentou cadastrar {VALUE}"
    }
  },
  autor: {
    type: AutorSchema,
    ref: "autores",
    required: [true, "O campo 'autor' do livro é obrigatório."]
  }
}, { versionKey: false });

const livros  = mongoose.model("livros", LivroSchema);

export default livros;
