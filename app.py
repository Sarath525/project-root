from flask import Flask, request, jsonify, send_from_directory
import os
from python.malware_analysis import scan_url_vt, get_url_report_vt, scan_file_vt, get_file_report_vt, check_ip_abuseipdb

app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('', 'home.html')

@app.route('/search.html')
def search():
    return send_from_directory('', 'search.html')

@app.route('/result.html')
def result():
    return send_from_directory('', 'result.html')

@app.route('/mitigation.html')
def mitigation():
    return send_from_directory('', 'mitigation.html')

@app.route('/login.html')
def login():
    return send_from_directory('', 'login.html')

@app.route('/signin.html')
def signin():
    return send_from_directory('', 'signin.html')

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/images/<path:path>')
def send_images(path):
    return send_from_directory('images', path)

@app.route('/api/search', methods=['POST'])
def search_api():
    search_type = request.form.get('searchType')
    result = {}

    try:
        if search_type == 'url':
            url = request.form.get('input')
            analysis_id = scan_url_vt(url)
            result = get_url_report_vt(analysis_id)
        elif search_type == 'ip':
            ip_address = request.form.get('input')
            result = check_ip_abuseipdb(ip_address)
        elif search_type == 'file':
            file = request.files['file']
            file_path = os.path.join('/tmp', file.filename)
            file.save(file_path)
            analysis_id = scan_file_vt(file_path)
            result = get_file_report_vt(analysis_id)
            os.remove(file_path)

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
