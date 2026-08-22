import { useState, useEffect } from "react";
// import products from "../../data/products";
import ProductCard from "../../components/products/ProductCard";
import Loader from "../../components/common/Loader";
import { getAllProducts } from "../../services/products";
import { useSearchParams } from "react-router-dom";
import "./Products.css";

const Products = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryFromUrl]);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  const [sortOption, setSortOption] =
    useState("default");

  const [priceRange, setPriceRange] =
    useState(10000);

    const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getAllProducts();

        setProducts(data);
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if(loading) {
    return <Loader test="Loading products.. " />
  }

  // Handle multiple category selection
  const handleCategoryChange = (category) => {
    let updatedCategories;

    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter(
        (item) => item !== category
      );
    } else {
      updatedCategories = [
        ...selectedCategories,
        category,
      ];
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 1) {
      setSearchParams({
        category: updatedCategories[0],
      });
    } else {
      setSearchParams({});
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange(30000);
    setSortOption("default");

    setSearchParams({});
  };

  const filteredProducts = products
    .filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((product) => {
      if (selectedCategories.length === 0) {
        return true;
      }

      return selectedCategories.includes(
        product.category
      );
    })
    .filter((product) => product.price <= priceRange)
       .sort((a, b) => {
      if (sortOption === "low-high") {
        return a.price - b.price;
      }

      if (sortOption === "high-low") {
        return b.price - a.price;
      }

      return 0;
    }
  );

  // const filteredProducts = products
  //   .filter((product) =>
  //     product.name
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase())
  //   )
  //   .filter((product) => {
  //     if (categoryFromUrl) {
  //       return product.category === categoryFromUrl;
  //     }

  //     if (selectedCategories.length === 0) {
  //       return true;
  //     }

  //     return selectedCategories.includes(product.category);
  //   })
  //       .filter(
  //     (product) => product.price <= priceRange
  //   )
  //   .sort((a, b) => {
  //     if (sortOption === "low-high") {
  //       return a.price - b.price;
  //     }

  //     if (sortOption === "high-low") {
  //       return b.price - a.price;
  //     }

  //     return 0;
  //   }
  // );


  if (loading) {
    return <Loader text="Loading products..." />;
  }

  if (error) {
    return (
      <div className="products-error">
        <h2>Something went wrong</h2>

        <p>{error}</p>
      </div>
    );
  }

    const categories = [
                  "Men",
                  "Women",
                  "Kids",
                  "Electronics",
                  "Mobiles",
                  "Furniture",
                  "Kitchen",
                ];

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>
          Our Products
          <span className="product-count">
            ({filteredProducts.length})
          </span>
        </h1>

        <p>
          Explore our latest fashion products.
        </p>
      </div>

      <div className="products-layout">

        {/* FILTER SIDEBAR */}

        <aside className="products-sidebar">
          <div className="filter-heading">
            <h2>Filters</h2>

            <button onClick={resetFilters}>
              Reset
            </button>
          </div>

          {/* Search */}

          <div className="filter-section">
            <h3>Search</h3>

            <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />

            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
                type="button"
              >
                ✕
              </button>
            )}
          </div>
          </div>

          {/* Categories */}

          <div className="filter-section">
            <h3>Categories</h3>


            <div className="category-filter">
              {categories.map((category) => (
                <label
                  className="category-checkbox"
                  key={category}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(
                      category
                    )}
                    onChange={() =>
                      handleCategoryChange(category)
                    }
                  />

                  {category}
                </label>
              ))}
            </div>
            </div>

            {/* {[
              "Men",
              "Women",
              "Kids",
              "Electronics",
              "Mobiles",
              "Furniture",
              "Kitchen",
            ].map((category) => (
              <label
                className="category-checkbox"
                key={category}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />

                {category}
              </label>
            ))}
          </div> */}

          {/* Price Range */}

          <div className="filter-section">
            <h3>Maximum Price</h3>

            <p className="price-value">
              Up to ₹{priceRange}
            </p>

            <input
              type="range"
              min="500"
              max="30000"
              step="500"
              value={priceRange}
              onChange={(event) =>
                setPriceRange(
                  Number(event.target.value)
                )
              }
            />
          </div>
        </aside>

        {/* PRODUCTS CONTENT */}

        <main className="products-content">

          <div className="products-top-bar">
            <p>
              Showing{" "}
              <strong>
                {filteredProducts.length}
              </strong>{" "}
              products
            </p>

            <select
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value)
              }
            >
              <option value="default">
                Default Sorting
              </option>

              <option value="low-high">
                Price: Low to High
              </option>

              <option value="high-low">
                Price: High to Low
              </option>
            </select>
          </div>

            {categoryFromUrl && (
              <div className="active-category">
                products :
                <strong>{categoryFromUrl}</strong>

                <button
                  onClick={() => setSearchParams({})}
                >
                  ✕Clear
                </button>
              </div>
            )}

              {/* <p className="results-text">
              Showing {filteredProducts.length} of {products.length} products
            </p> */}

            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-products">
                <h2>No Products Found</h2>

                <p>
                  We could not find any products matching
                  your search or filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="empty-clear-btn"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          ) : (
            <div className="no-products">
              <h2>No Products Found</h2>

              <p>
                Try changing your search or filters.
              </p>

              <button onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          )
        </main>
      </div>
    </div>
  );
};

export default Products;