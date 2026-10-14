import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

const routes = (app) => {

  app.get("/", (req, res) => {
    return res.status(200).json({
      status: "success",
      message: "Olá! Bem-vindo(a) à API Node.js com Express.",
      description: "Um sistema simples focado em boas-práticas e evolução.",
      version: "1.0.0",
      author: {
        name: "Rodrigo Freire",
        title: "Desenvolvedor Backend (Sistemas Web, Produtos Digitais e Integrações)",
        skills: {
          languages: ["PHP", "JavaScript", "Elixir"],
          backend: ["Symfony", "Laravel", "Express", "NestJS", "Phoenix", "APIs REST", "GraphQL", "Integrações"],
          fullstack: ["Next.js"],
          devops_database: ["Docker", "Bancos de Dados relacionais e não relacionais"]
        },
        about: {
          experience: "Mais de 5 anos de experiência em Tecnologia da Informação",
          focus: "Forte atuação em Backend, APIs, integração de sistemas, sustentação e evolução de canais digitais",
          highlights: [
            "Vivência em arquiteturas orientadas a serviços e comunicação entre microsserviços em diferentes linguagens.",
            "Expertise em refatoração de código legado, padronização de projetos e melhoria contínua.",
            "Desenvolvimento de soluções que aumentaram a autonomia dos times de negócio e reduziram dependência técnica.",
            "Atuação em produtos digitais com rápida adoção e crescimento de base de usuários já no primeiro ano.",
            "Uso de Docker para conteinerização, garantindo consistência entre ambientes de desenvolvimento e deploy.",
            "Acompanhamento de métricas técnicas de produção (estabilidade de APIs, uso de features críticas e volume).",
            "Atuação em times multidisciplinares com forte cultura de versionamento, Code Review e melhoria de fluxos.",
            "Perfil analítico focado na satisfação do cliente, performance e escalabilidade."          
          ]
        }
      }
    });
  });

  app.use(
    express.json(),
    livros,
    autores
  );
};

export default routes;
