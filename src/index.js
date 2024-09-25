import express from "express";
import { connection } from "./database/connection.js";
import routes from "./routes/Routes.js";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import dotenv from "dotenv";

dotenv.config();

const app = express();

// Defina as origens permitidas com base no ambiente
const allowedOrigins = [
  "http://localhost:3000", // Ambiente de desenvolvimento
  "https://feedback-3lsctd2zh-alexteotonios-projects.vercel.app", // Ambiente de produção (Vercel)
];

// Configuração simples de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requisições sem origem (ex: mobile apps, cURL)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg =
        "A política de CORS para este site não permite acesso do origin especificado.";
      return callback(new Error(msg), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Se você precisar enviar cookies ou autenticação
};

app.use(cors(corsOptions));

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(express.json());
app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.resolve("uploads")));

connection().catch(console.error);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
