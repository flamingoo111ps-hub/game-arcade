"""
Game Arcade Web Application
Flask backend serving HTML/CSS/JS for three hyper-casual arcade games
Modern, polished gaming experience with local storage and progressive gameplay
"""

from flask import Flask, render_template, jsonify, request
from datetime import datetime
import json

app = Flask(__name__, static_folder='static', template_folder='templates')

# Simple in-memory storage for records (in production, use a database)
records_storage = {}


@app.route('/')
def index():
    """Serve the main game arcade interface"""
    return render_template('index.html')


@app.route('/api/records', methods=['GET'])
def get_records():
    """Retrieve high scores for all games"""
    return jsonify({
        'status': 'success',
        'records': records_storage,
        'timestamp': datetime.now().isoformat()
    })


@app.route('/api/records', methods=['POST'])
def save_records():
    """Save high scores (optional - localStorage handles persistence)"""
    try:
        data = request.get_json()
        game_id = data.get('game_id')
        score = data.get('score')
        
        if game_id and score is not None:
            if game_id not in records_storage:
                records_storage[game_id] = []
            
            records_storage[game_id].append({
                'score': score,
                'timestamp': datetime.now().isoformat()
            })
            
            # Keep only top 100 scores
            records_storage[game_id] = sorted(
                records_storage[game_id],
                key=lambda x: x['score'],
                reverse=True
            )[:100]
            
            return jsonify({
                'status': 'success',
                'message': 'Record saved',
                'best_score': records_storage[game_id][0]['score'] if records_storage[game_id] else 0
            })
        
        return jsonify({'status': 'error', 'message': 'Invalid data'}), 400
    
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'service': 'game-arcade',
        'timestamp': datetime.now().isoformat()
    })


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'status': 'error', 'message': 'Not found'}), 404


@app.errorhandler(500)
def server_error(error):
    """Handle 500 errors"""
    return jsonify({'status': 'error', 'message': 'Internal server error'}), 500


if __name__ == '__main__':
    # Run development server
    # For production, use a proper WSGI server (gunicorn, etc.)
    app.run(debug=True, host='127.0.0.1', port=5000)
