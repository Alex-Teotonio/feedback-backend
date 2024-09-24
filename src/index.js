import express from "express";
import { connection } from "./database/connection.js";
import routes from "./routes/Routes.js";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Permite apenas este domínio
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  credentials: true, // Permite cookies e outras credenciais
};

app.use(cors(corsOptions));

const PORT = 3005;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(express.json());
app.use(routes);

app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos
app.use("/uploads", express.static(path.resolve("uploads")));

// Conectar ao MongoDB
connection().catch(console.error);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
