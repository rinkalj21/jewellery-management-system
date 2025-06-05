import React from 'react'; 
import './Gallery.css'; // Ensure to style the grid layout

// Dummy data for the products
const products = [
  { id: 1, name: 'Beatrice Charm Hoops in Off-White', imageUrl: '/images/img1.jpg' },
  { id: 2, name: 'Ana Earrings in Mother of Pearl', imageUrl: '/images/img2.jpg' },
  { id: 3, name: 'Bow Statement Hoops in Magenta', imageUrl: '/images/img3.jpg' },
  { id: 4, name: 'Silver Bangle', imageUrl: '/images/b3.jpg' },
  { id: 5, name: 'Radish Statement Ring', imageUrl: '/images/ringd.jpg' },
  { id: 6, name: 'Necklace', imageUrl: '/images/n4.jpg' },
  { id: 7, name: 'Green diamond chain', imageUrl: '/images/img4.jpg' },
  { id: 8, name: 'Silver chain', imageUrl: '/images/i1.jpg' },
  { id: 9, name: 'Chilli Pepper', imageUrl: '/images/n2.jpg' },
  { id: 10, name: 'Black diamond', imageUrl: '/images/earrinf.jpg' },
  { id: 11, name: 'Locket', imageUrl: '/images/img5.jpg' },
  { id: 12, name: 'Bracelete', imageUrl: '/images/b1.jpg' },
  { id: 13, name: 'Necklace', imageUrl: '/images/n3.jpg' },
  { id: 14, name: 'Toe ring', imageUrl: '/images/toe.jpg' },
];

const ProductsGrid = () => {
  const handleProductClick = (productId) => {
    // Handle product click, e.g., navigate to product details page
    console.log(`Product clicked: ${productId}`);
  };

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div 
          key={product.id} 
          className="product-card" 
          onClick={() => handleProductClick(product.id)} // Click handler
        >
          <img 
            src={product.imageUrl} 
            alt={`Product: ${product.name}`} // Descriptive alt text
            className="product-image" 
          />
          <h3 className="product-name">{product.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default ProductsGrid;
