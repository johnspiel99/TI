import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';

const Recommendations = ({ viewedProducts, onProductView }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState({
    maxPrice: '',
    category: ''
  });

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/recommendations', {
          viewed_product_ids: viewedProducts,
          filters: filters
        });
        setRecommendations(response.data.recommendations);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    if (viewedProducts.length > 0) {
      fetchRecommendations();
    }
  }, [viewedProducts, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendations">
      <h2>{message}</h2>
      
      <div className="filters">
        <h3>Filter Recommendations</h3>
        <div>
          <label>
            Max Price:
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="No limit"
            />
          </label>
        </div>
        <div>
          <label>
            Category:
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Home">Home</option>
              <option value="Sports">Sports</option>
              <option value="Accessories">Accessories</option>
            </select>
          </label>
        </div>
      </div>
      
      <div className="recommendation-list">
        {recommendations.map(product => (
          <Product
            key={product.id}
            product={product}
            onView={onProductView}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;