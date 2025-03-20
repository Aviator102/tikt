async function processarUrl() {
    let urlTikTok = document.getElementById("urlInput").value;

    try {
        let response = await fetch("/api/tiktok", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: urlTikTok })
        });

        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }

        let data = await response.json();
        let videoUrl = data.api.mediaItems[0].mediaUrl;

        document.getElementById("titulo").innerText = data.api.title;
        document.getElementById("descricao").innerText = data.api.description;
        document.getElementById("dataCriacao").innerText = data.api.createdTime;
        document.getElementById("qualidade").innerText = data.api.mediaItems[0].mediaQuality;

        let downloadBtn = document.getElementById("downloadBtn");
        downloadBtn.style.display = "inline-block";
        downloadBtn.onclick = function() {
            window.open(videoUrl, "_blank");
        };

        document.getElementById("resultado").style.display = "block";
    } catch (error) {
        alert("Erro ao processar a URL: " + error.message);
    }
}
