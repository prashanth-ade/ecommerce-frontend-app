import { Link } from "react-router-dom";
import products from "../../data/products";
import "./RelatedProducts.css";

const RelatedProducts = ({ currentProduct }) => {
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === currentProduct.category &&
        product.id !== currentProduct.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="related-products">
      <div className="related-products-header">
        <p>YOU MAY ALSO LIKE</p>
        <h2>Related Products</h2>
      </div>

      <div className="related-products-grid">
        {relatedProducts.map((product) => (
          <Link
            to={`/products/${product.id}`}
            className="related-product-card"
            key={product.id}
          >
            <div className="related-product-image">
              <img
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="related-product-info">
              <h3>{product.name}</h3>

              <p className="related-product-category">
                {product.category}
              </p>

              <p className="related-product-price">
                ₹{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;