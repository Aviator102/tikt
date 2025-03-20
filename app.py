from flask import Flask, request, jsonify, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/tiktok', methods=['POST'])
def get_tiktok_video():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "A URL é obrigatória"}), 400

    api_url = "https://tikdown.com/proxy.php"
    headers = {
        'Referer': 'https://tikdown.com',
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    payload = {'url': url}

    try:
        response = requests.post(api_url, data=payload, headers=headers)
        response_data = response.json()

        if 'api' not in response_data:
            return jsonify({"error": "Erro ao processar a resposta da API"}), 500

        return jsonify({
            "title": response_data['api']['title'],
            "description": response_data['api']['description'],
            "videoUrl": response_data['api']['mediaItems'][0]['mediaUrl'],
            "quality": response_data['api']['mediaItems'][0]['mediaQuality'],
            "duration": response_data['api']['mediaItems'][0]['mediaDuration'],
        })

    except Exception as e:
        return jsonify({"error": f"Erro na requisição: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
