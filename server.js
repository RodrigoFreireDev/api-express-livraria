import "dotenv/config";

import app from "./src/app.js"; // importa o app(express)

const PORTA = 3000;

app.listen(PORTA, () => {
  console.log("Projeto em execução(Via NODE.js com Express)!");
});
