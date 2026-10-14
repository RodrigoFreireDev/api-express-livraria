import ErroNaoEncontrado from "../erros/ErroNaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = autores.find({});

      req.resultado = listaAutores;
      
      next();
    } catch (error) {
      next(error);
    }
        
  };

  static async buscarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const resultBusca = await autores.findById(id);

      if (resultBusca !== null) {
        res.status(200).json(resultBusca);
      } else {
        next(new ErroNaoEncontrado("ID do autor, não localizado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, req.body);

      if (autores !== null) {
        res.status(200).json({ messeg: "Atualizado com Sucesso!" });
      } else {
        next(new ErroNaoEncontrado("ID do autor, não localizado."));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autores.create(req.body);
      res.status(201).json({ messeg: "Cadastrado com Sucesso!", autor: novoAutor });
    } catch (error) {
      next(error);
    }
  };

  static async deletarAutor(req, res, next) {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);

      console.log(autores);
      res.status(200).json({ messeg: `Valor: ${autores}` });

      if (autores !== null || autores.res !== undefined) {
        res.status(200).json({ messeg: "autor deletado com Sucesso!" });
      } else {
        next(new ErroNaoEncontrado("ID do autor, não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };
};

export default AutorController;
