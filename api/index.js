const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Rota para processar a URL do TikTok
app.post("/api/tiktok", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "A URL do TikTok é obrigatória!" });
    }

    try {
        const response = await axios.post("https://tikdown.com/proxy.php", `url=${encodeURIComponent(url)}`, {
            headers: {
                "Referer": "https://tikdown.com",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar os dados do TikTok." });
    }
});

// Porta para rodar localmente
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
