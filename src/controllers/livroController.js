import { autores, livros } from "../models/index.js";
import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscalivros = livros.find();

      req.resultado = buscalivros;

      next();
    } catch (error) {
      next(error);
    }
  };

  static async buscarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const resultBusca = await livros.findById(id);

      
      if (resultBusca !== null) {
        res.status(200).json(resultBusca);
      } else {
        next(new ErroNaoEncontrado("ID do livro, não localizado!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, req.body);

      if (livros !== null) {
        res.status(200).json({ messeg: "Atualizado com Sucesso!" });
      } else {
        next(new ErroNaoEncontrado("ID do livro, não localizado!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autores.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };

      const livroCriado = await livros.create(livroCompleto);

      res.status(201).json({ messeg: "Cadastrado com Sucesso!", livro: livroCriado });
    } catch (error) {
      next(error);
    }
  };

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);

      if (livros !== null) {
        res.status(200).json({ messeg: "Livro deletado com Sucesso!" });
      } else {
        next(new ErroNaoEncontrado("ID do livro, não localizado!"));
      }

    } catch (error) {
      next(error);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const busca = await filtros(req.query);

      if (busca !== null) {
        const lisvrosPorEditora = livros
          .find(busca);
      
        req.resultado = lisvrosPorEditora;

        next();
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      next(error);
    }
  };
};

async function filtros(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};
  
  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if(minPaginas || maxPaginas) busca.paginas = {};

  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: { $regex: nomeAutor, $options: "i" } });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
