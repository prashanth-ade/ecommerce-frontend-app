const products = [
  // MEN
  {
    id: 1,
    name: "Classic Black Jacket",
    category: "Men",
    price: 2999,
    oldPrice: 3999,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    description: "Stylish black jacket for everyday fashion.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Casual White T-Shirt",
    category: "Men",
    price: 999,
    oldPrice: 1499,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    description: "Comfortable casual t-shirt for daily wear.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black"],
    rating: 4.5,
    reviews: 120,
  },

  // WOMEN
  {
    id: 3,
    name: "Women's Elegant Dress",
    category: "Women",
    price: 2499,
    oldPrice: 3299,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae",
    description: "Elegant dress for parties and special occasions.",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Black"],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 4,
    name: "Women's Fashion Handbag",
    category: "Women",
    price: 1799,
    oldPrice: 2299,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    description: "Fashionable handbag for everyday use.",
    sizes: ["Standard"],
    colors: ["Brown", "Black"],
    rating: 4.5,
    reviews: 120,
  },

  // KIDS
  {
    id: 5,
    name: "Kids Casual T-Shirt",
    category: "Kids",
    price: 699,
    oldPrice: 999,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
    description: "Comfortable and colorful casual t-shirt for kids.",
    sizes: ["4-5 Years", "6-7 Years", "8-9 Years"],
    colors: ["Blue", "Yellow"],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 6,
    name: "Kids Party Dress",
    category: "Kids",
    price: 1299,
    oldPrice: 1799,
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
    description: "Beautiful party dress for kids.",
    sizes: ["4-5 Years", "6-7 Years"],
    colors: ["Pink"],
    rating: 4.5,
    reviews: 120,
  },

  // ELECTRONICS
  {
    id: 7,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 1999,
    oldPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    description: "High quality wireless headphones with clear sound.",
    sizes: ["Standard"],
    colors: ["Black"],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 8,
    name: "Smart Watch",
    category: "Electronics",
    price: 3499,
    oldPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    description: "Modern smart watch with fitness tracking features.",
    sizes: ["Standard"],
    colors: ["Black", "Silver"],
    rating: 4.5,
    reviews: 120,
  },

  // MOBILES
  {
    id: 9,
    name: "Smartphone 5G",
    category: "Mobiles",
    price: 24999,
    oldPrice: 27999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa",
    description: "Fast and powerful 5G smartphone.",
    sizes: ["128GB", "256GB"],
    colors: ["Black", "Blue"],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 10,
    name: "Wireless Charger",
    category: "Mobiles",
    price: 1499,
    oldPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126",
    description: "Fast wireless charger for compatible smartphones.",
    sizes: ["Standard"],
    colors: ["White", "Black"],
    rating: 4.5,
    reviews: 120,
  },

  // FURNITURE
  {
    id: 11,
    name: "Modern Wooden Chair",
    category: "Furniture",
    price: 4999,
    oldPrice: 6499,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    description: "Comfortable modern chair for your home.",
    sizes: ["Standard"],
    colors: ["Brown"],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 12,
    name: "Comfortable Sofa",
    category: "Furniture",
    price: 18999,
    oldPrice: 22999,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    description: "Comfortable sofa for your living room.",
    sizes: ["3 Seater"],
    colors: ["Grey"],
    rating: 4.5,
    reviews: 120,
  },

  // KITCHEN
  {
    id: 13,
    name: "Non-Stick Cookware Set",
    category: "Kitchen",
    price: 2999,
    oldPrice: 3999,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba",
    description: "Premium non-stick cookware set for daily cooking.",
    sizes: ["5 Pieces"],
    colors: ["Black"],
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 14,
    name: "Electric Blender",
    category: "Kitchen",
    price: 2499,
    oldPrice: 3299,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b",
    description: "Powerful blender for smoothies and kitchen use.",
    sizes: ["Standard"],
    colors: ["Black", "Silver"],
    rating: 4.5,
    reviews: 120,
  },
];

export default products;