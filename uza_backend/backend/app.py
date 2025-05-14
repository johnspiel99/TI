from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import ProductRecommender
import logging
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

recommender = ProductRecommender()

# Configure logging
logging.basicConfig(
    filename='recommendations.log',
    level=logging.INFO,
    format='%(asctime)s - %(message)s'
)

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        viewed_ids = data.get('viewed_product_ids', [])
        filters = data.get('filters', {})
        
        recommendations = recommender.get_recommendations(viewed_ids, filters=filters)
        message = recommender.generate_personalized_message(viewed_ids)
        
        # Log the recommendation event
        logging.info(
            f"Recommendation - Viewed: {viewed_ids}, "
            f"Recommended: {[p['id'] for p in recommendations]}, "
            f"Filters: {filters}, "
            f"User-Agent: {request.headers.get('User-Agent', '')}"
        )
        
        return jsonify({
            'success': True,
            'message': message,
            'recommendations': recommendations
        })
    
    except Exception as e:
        logging.error(f"Error in recommendation: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        from products import products
        return jsonify({
            'success': True,
            'products': products
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        from products import products
        product = next((p for p in products if p['id'] == product_id), None)
        if product:
            return jsonify({
                'success': True,
                'product': product
            })
        else:
            return jsonify({
                'success': False,
                'error': 'Product not found'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)