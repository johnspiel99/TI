import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from products import products
import logging
from datetime import datetime

class ProductRecommender:
    def __init__(self):
        self.products = products
        self.vectorizer = TfidfVectorizer()
        self._prepare_data()
        
    def _prepare_data(self):
        self.product_texts = [
            f"{p['name']} {p['category']} {' '.join(p['tags'])}" 
            for p in self.products
        ]
        self.tfidf_matrix = self.vectorizer.fit_transform(self.product_texts)
        
    def get_recommendations(self, viewed_product_ids, num_recommendations=3, filters=None):
        if filters is None:
            filters = {}
            
        viewed_indices = [i for i, p in enumerate(self.products) 
                         if p['id'] in viewed_product_ids]
        
        if not viewed_indices:
            # Fallback: return popular items if no browsing history
            return self._get_filtered_products(
                sorted(self.products, key=lambda x: -x['price']),
                filters
            )[:num_recommendations]
        
        avg_vector = np.mean(self.tfidf_matrix[viewed_indices].toarray(), axis=0)
        avg_vector = avg_vector.reshape(1, -1)
        
        similarities = cosine_similarity(avg_vector, self.tfidf_matrix).flatten()
        
        similar_indices = np.argsort(similarities)[::-1]
        recommended_indices = [i for i in similar_indices 
                             if i not in viewed_indices]
        
        recommended_products = [self.products[i] for i in recommended_indices]
        return self._get_filtered_products(recommended_products, filters)[:num_recommendations]
    
    def _get_filtered_products(self, products, filters):
        if not filters:
            return products
            
        filtered = []
        for p in products:
            price_ok = not filters.get('max_price') or p['price'] <= float(filters['max_price'])
            category_ok = not filters.get('category') or p['category'] == filters['category']
            if price_ok and category_ok:
                filtered.append(p)
        return filtered
    
    def generate_personalized_message(self, viewed_product_ids):
        viewed_categories = set()
        viewed_tags = set()
        
        for pid in viewed_product_ids:
            product = next((p for p in self.products if p['id'] == pid), None)
            if product:
                viewed_categories.add(product['category'])
                viewed_tags.update(product['tags'])
                
        if not viewed_categories:
            return "Check out these popular items!"
            
        if "Electronics" in viewed_categories and "Bluetooth" in viewed_tags:
            return "Since you like wireless gadgets, you might love these!"
        elif "Electronics" in viewed_categories:
            return "More great electronics for you!"
        elif "Home" in viewed_categories:
            return "Home essentials you might need"
        else:
            return "Recommended products based on your browsing"