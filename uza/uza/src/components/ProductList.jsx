import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Product from './Product';
import Recommendations from './Recommendations';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [viewedProducts, setViewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductView = (productId) => {
    if (!viewedProducts.includes(productId)) {
      setViewedProducts(prev => [...prev, productId]);
    }
  };

  const filteredProducts = products.filter(product => 
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (!categoryFilter || product.category === categoryFilter)
  );

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-header">
        <button className="back-button" onClick={() => navigate('/')}>
          &larr; Back to Home
        </button>
        <h1>{categoryFilter ? `${categoryFilter} Products` : 'All Products'}</h1>
      </div>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="product-list">
        {filteredProducts.map(product => (
          <Product
            key={product.id}
            product={product}
            onView={handleProductView}
          />
        ))}
      </div>
      
      <Recommendations
        viewedProducts={viewedProducts}
        onProductView={handleProductView}
      />
    </div>
  );
};

export default ProductList;