import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null,
  });
  const [editProductId, setEditProductId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3005/jewellery');
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle input changes for the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'image' ? e.target.files[0] : e.target.value,
    });
  };

  // Create or update a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const url = editProductId
        ? `http://localhost:3005/update/${editProductId}`
        : 'http://localhost:3005/create';

      const method = editProductId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: form,
      });

      if (response.ok) {
        const data = await response.json();
        if (editProductId) {
          setProducts(products.map((product) => (product._id === editProductId ? data.data : product)));
          setSuccess('Product updated successfully!');
        } else {
          setProducts([...products, data.data]);
          setSuccess('Product added successfully!');
        }
        resetForm();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit product');
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      setError('Error submitting product');
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3005/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
        setSuccess('Product deleted successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product');
    }
  };

  // Reset form after submit
  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: null,
    });
    setEditProductId(null);
  };

  // Handle edit action
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setEditProductId(product._id);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <h3>{editProductId ? 'Edit Product' : 'Add Product'}</h3>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input type="file" name="image" onChange={handleChange} accept="image/*" required={!editProductId} />
        <button type="submit">{editProductId ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <img src={`http://localhost:3005/${product.image}`} alt={product.name} width="50" />
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
