import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.node },
    rules: {
      // 1. Exigir ponto e vírgula (;) no final das instruções
      "semi": ["error", "always"],
        
      // 2. Indentação padrão com 2 espaços
      "indent": ["error", 2],
        
      // 3. Forçar o uso de aspas duplas por padrão
      "quotes": ["error", "double"]
    }
  },
]);
