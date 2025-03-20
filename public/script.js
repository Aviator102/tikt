async function baixarVideo() {
    let urlTikTok = document.getElementById("urlInput").value;

    if (!urlTikTok) {
        alert("Por favor, insira a URL do TikTok.");
        return;
    }

    let apiURL = "https://SEU-PROJETO.vercel.app/baixar?url=" + encodeURIComponent(urlTikTok);

    try {
        let response = await fetch(apiURL, { method: "POST" });
        let data = await response.json();

        if (data.video_url) {
            let downloadLink = document.getElementById("downloadLink");
            downloadLink.href = data.video_url;
            downloadLink.innerText = "Clique aqui para baixar";
            document.getElementById("resultado").style.display = "block";
        } else {
            alert("Erro ao obter o vídeo. Tente outra URL.");
        }
    } catch (error) {
        alert("Erro ao processar a URL: " + error.message);
    }
}
