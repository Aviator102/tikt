export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "URL do TikTok é necessária" });
        }

        // Faz a requisição para a API do TikDown
        const response = await fetch("https://tikdown.com/proxy.php", {
            method: "POST",
            headers: {
                "Referer": "https://tikdown.com",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ url })
        });

        if (!response.ok) {
            return res.status(500).json({ error: "Erro ao conectar na API do TikDown" });
        }

        const data = await response.json();

        // Pega as informações do vídeo
        const video = data.api?.mediaItems?.[0];

        if (!video || !video.mediaUrl) {
            return res.status(404).json({ error: "Vídeo não encontrado" });
        }

        // Retorna os detalhes do vídeo
        return res.json({
            percent: "100% Completo",
            fileSize: data.api.estimatedFileSize || "Desconhecido",
            fileName: "video_tiktok.mp4",
            fileUrl: video.mediaUrl
        });

    } catch (error) {
        return res.status(500).json({ error: "Erro no servidor", details: error.message });
    }
}
