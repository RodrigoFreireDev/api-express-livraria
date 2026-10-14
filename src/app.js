import express from "express";
import conecao from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conecao();
const app = express();

app.get("/livros", (req, res, next) => {
  console.log("Middleware/evento registrado no GET da rota /livros");
  next();
});

routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

conexao.on("error", (erro) => {
  console.log("Erro de conexao: ", erro);
});

conexao.once("open", () => {
  console.log("Conexão bem sucedida(Com: Atlas(site), mongodb(library node) e mongoose(library node))!");
});

export default app;
