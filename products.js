/* =========================================================
   GIFTIVA — Marketplace Products
   Send Love. Anywhere. 🌍🎁
   ========================================================= */

const giftivaProducts = [

  {
    id: "GFT001",
    name: "Forever Rose Box",
    category: "Gifts & Flowers",
    country: "Nigeria",
    region: "Abia",
    city: "Umuahia",
    price: 35000,
    currency: "NGN",
    vendor: "GIFTIVA Verified",
    rating: 4.9,
    delivery: "Doorstep Delivery",
    image: "🌹",
    description: "An elegant rose arrangement created for someone special.",
    available: true
  },

  {
    id: "GFT002",
    name: "Classic Celebration Cake",
    category: "Food & Cakes",
    country: "Nigeria",
    region: "Abia",
    city: "Aba",
    price: 22000,
    currency: "NGN",
    vendor: "GIFTIVA Verified",
    rating: 4.8,
    delivery: "Doorstep Delivery",
    image: "🎂",
    description: "A beautiful celebration cake for birthdays and special occasions.",
    available: true
  },

  {
    id: "GFT003",
    name: "Luxury Love Hamper",
    category: "Gifts & Flowers",
    country: "Nigeria",
    region: "Lagos",
    city: "Lekki",
    price: 48000,
    currency: "NGN",
    vendor: "GIFTIVA Verified",
    rating: 4.9,
    delivery: "Doorstep Delivery",
    image: "🎁",
    description: "A premium gift hamper designed for unforgettable moments.",
    available: true
  },

  {
    id: "GFT004",
    name: "Premium Chocolate Collection",
    category: "Food & Cakes",
    country: "Nigeria",
    region: "Rivers",
    city: "Port Harcourt",
    price: 28000,
    currency: "NGN",
    vendor: "GIFTIVA Verified",
    rating: 4.7,
    delivery: "Doorstep Delivery",
    image: "🍫",
    description: "A premium selection of chocolates for someone you love.",
    available: true
  },

  {
    id: "GFT005",
    name: "Elegant Gold Necklace",
    category: "Jewelry & Luxury",
    country: "Nigeria",
    region: "Lagos",
    city: "Victoria Island",
    price: 125000,
    currency: "NGN",
    vendor: "GIFTIVA Verified",
    rating: 4.9,
    delivery: "Secure Delivery",
    image: "💎",
    description: "A timeless luxury necklace suitable for special occasions.",
    available: true
  },

  {
    id: "GFT006",
    name: "Luxury Birthday Surprise",
    category: "Experiences",
    country: "Nigeria",
    region: "Abia",
    city: "Umuahia",
    price: 75000,
    currency: "NGN",
    vendor: "GIFTIVA Verified",
    rating: 4.8,
    delivery: "Scheduled Delivery",
    image: "🥂",
    description: "A premium surprise experience created for a memorable celebration.",
    available: true
  },

  {
    id: "GFT007",
    name: "Romantic Dinner Experience",
    category: "Experiences",
    country: "Nigeria",
    region: "Lagos",
    city: "Lagos Island",
    price: 95000,
    currency: "NGN",
    vendor: "GIFTIVA Verified",
    rating: 4.9,
    delivery: "Scheduled Experience",
    image: "🍽️",
    description: "A romantic dining experience for two.",
    available: true
  },

  {
    id: "GFT008",
    name: "Premium Flower Bouquet",
    category: "Gifts & Flowers",
    country: "United Kingdom",
    region: "England",
    city: "London",
    price: 65,
    currency: "GBP",
    vendor: "GIFTIVA Verified",
    rating: 4.9,
    delivery: "Doorstep Delivery",
    image: "💐",
    description: "A premium bouquet arranged for birthdays, anniversaries and celebrations.",
    available: true
  },

  {
    id: "GFT009",
    name: "Luxury Chocolate Gift Box",
    category: "Food & Cakes",
    country: "United Kingdom",
    region: "England",
    city: "Manchester",
    price: 45,
    currency: "GBP",
    vendor: "GIFTIVA Verified",
    rating: 4.8,
    delivery: "Doorstep Delivery",
    image: "🍫",
    description: "A luxury chocolate gift box for every special occasion.",
    available: true
  },

  {
    id: "GFT010",
    name: "Luxury Jewelry Gift",
    category: "Jewelry & Luxury",
    country: "United States",
    region: "New York",
    city: "New York City",
    price: 350,
    currency: "USD",
    vendor: "GIFTIVA Verified",
    rating: 4.9,
    delivery: "Secure Delivery",
    image: "💍",
    description: "An elegant jewelry gift designed for unforgettable moments.",
    available: true
  },

  {
    id: "GFT011",
    name: "Luxury Celebration Hamper",
    category: "Gifts & Flowers",
    country: "Canada",
    region: "Ontario",
    city: "Toronto",
    price: 120,
    currency: "CAD",
    vendor: "GIFTIVA Verified",
    rating: 4.8,
    delivery: "Doorstep Delivery",
    image: "🎁",
    description: "A beautifully presented luxury hamper for celebrations.",
    available: true
  },

  {
    id: "GFT012",
    name: "Premium Celebration Cake",
    category: "Food & Cakes",
    country: "Australia",
    region: "New South Wales",
    city: "Sydney",
    price: 95,
    currency: "AUD",
    vendor: "GIFTIVA Verified",
    rating: 4.8,
    delivery: "Doorstep Delivery",
    image: "🎂",
    description: "A premium celebration cake made for special occasions.",
    available: true
  }

];


/* =========================================================
   PRODUCT HELPERS
   ========================================================= */

function getGiftivaProducts() {
  return giftivaProducts;
}

function getProductById(productId) {
  return giftivaProducts.find(function(product) {
    return product.id === productId;
  });
}

function getProductsByCategory(category) {
  if (!category) {
    return giftivaProducts;
  }

  return giftivaProducts.filter(function(product) {
    return product.category === category;
  });
}

function getProductsByLocation(country, region, city) {
  return giftivaProducts.filter(function(product) {

    const countryMatch =
      !country || product.country === country;

    const regionMatch =
      !region || product.region === region;

    const cityMatch =
      !city || product.city === city;

    return countryMatch && regionMatch && cityMatch;
  });
}
