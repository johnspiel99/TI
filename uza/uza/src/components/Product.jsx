import React from 'react';
import './Product.css';

const Product = ({ product, onView }) => {
  return (
    <div className="product" onClick={() => onView(product.id)}>
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500?text=Product+Image';
          }}
        />
      </div>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <p className="product-description">{product.description}</p>
      <div className="product-tags">
        {product.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default Product;