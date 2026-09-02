/* =========================================
   GIFTIVA — MAIN JAVASCRIPT
   Worldwide Country → Region → City
   ========================================= */

let cart = [];

/* =========================================
   GIFTIVA COUNTRIES
   ========================================= */

const giftivaCountries = [
  "Nigeria",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Italy",
  "France",
  "Germany",
  "Spain",
  "Portugal",
  "Netherlands",
  "Belgium",
  "Switzerland",
  "Austria",
  "Ireland",
  "Norway",
  "Sweden",
  "Denmark",
  "Finland",
  "Poland",
  "Greece",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "South Africa",
  "Ghana",
  "Kenya",
  "Brazil",
  "Mexico",
  "Japan",
  "China",
  "India",
  "Singapore",
  "Malaysia",
  "New Zealand"
];

/* =========================================
   LOCATION API
   ========================================= */

const LOCATION_API =
  "https://countriesnow.space/api/v0.1";

/* =========================================
   GET LOCATION ELEMENTS
   ========================================= */

function getLocationElements() {

  return {
    country: document.getElementById("country"),
    region: document.getElementById("region"),
    city: document.getElementById("city")
  };
}

/* =========================================
   LOADING MESSAGE
   ========================================= */

function setSelectMessage(select, message) {

  if (!select) return;

  select.innerHTML = "";

  const option =
    document.createElement("option");

  option.value = "";
  option.textContent = message;

  select.appendChild(option);
}

/* =========================================
   POPULATE COUNTRY DROPDOWN
   ========================================= */

function populateCountries() {

  const {
    country,
    region,
    city
  } = getLocationElements();

  if (!country || !region || !city) {
    console.error(
      "GIFTIVA: Location dropdowns missing."
    );
    return;
  }

  country.innerHTML =
    '<option value="">Select country</option>';

  giftivaCountries.forEach(function(countryName) {

    const option =
      document.createElement("option");

    option.value = countryName;
    option.textContent = countryName;

    country.appendChild(option);
  });

  setSelectMessage(
    region,
    "Select state / region"
  );

  setSelectMessage(
    city,
    "Select city"
  );

  region.disabled = true;
  city.disabled = true;
}

/* =========================================
   LOAD REGIONS / STATES
   ========================================= */

async function updateRegions() {

  const {
    country,
    region,
    city
  } = getLocationElements();

  if (!country || !region || !city) {
    return;
  }

  const selectedCountry =
    country.value;

  setSelectMessage(
    region,
    "Loading states / regions..."
  );

  setSelectMessage(
    city,
    "Select city"
  );

  region.disabled = true;
  city.disabled = true;

  if (!selectedCountry) {

    setSelectMessage(
      region,
      "Select state / region"
    );

    return;
  }

  try {

    const response = await fetch(
      `${LOCATION_API}/countries/states/q?country=${encodeURIComponent(selectedCountry)}`
    );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const result =
      await response.json();

    if (
      result.error ||
      !result.data ||
      !result.data.states
    ) {
      throw new Error(
        "No region data returned."
      );
    }

    const states =
      result.data.states;

    setSelectMessage(
      region,
      "Select state / region"
    );

    states.forEach(function(state) {

      const option =
        document.createElement("option");

      option.value =
        state.name;

      option.textContent =
        state.name;

      region.appendChild(option);
    });

    region.disabled = false;

  } catch (error) {

    console.error(
      "GIFTIVA region error:",
      error
    );

    setSelectMessage(
      region,
      "Could not load regions"
    );

    alert(
      "We couldn't load the states/regions right now. Please check your internet connection and try again."
    );
  }
}

/* =========================================
   LOAD CITIES
   ========================================= */

async function updateCities() {

  const {
    country,
    region,
    city
  } = getLocationElements();

  if (!country || !region || !city) {
    return;
  }

  const selectedCountry =
    country.value;

  const selectedRegion =
    region.value;

  setSelectMessage(
    city,
    "Loading cities..."
  );

  city.disabled = true;

  if (
    !selectedCountry ||
    !selectedRegion
  ) {

    setSelectMessage(
      city,
      "Select city"
    );

    return;
  }

  try {

    const response = await fetch(
      `${LOCATION_API}/countries/state/cities`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          country:
            selectedCountry,

          state:
            selectedRegion
        })
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const result =
      await response.json();

    if (
      result.error ||
      !result.data ||
      !result.data.states
    ) {

      /*
       * Some countries/regions can have
       * inconsistent administrative data.
       * Try the city endpoint as a fallback.
       */

      await loadCitiesFallback(
        selectedCountry,
        selectedRegion
      );

      return;
    }

    const cities =
      result.data.states;

    setSelectMessage(
      city,
      "Select city"
    );

    cities.forEach(function(cityName) {

      const option =
        document.createElement("option");

      option.value =
        cityName;

      option.textContent =
        cityName;

      city.appendChild(option);
    });

    if (cities.length > 0) {
      city.disabled = false;
    } else {

      setSelectMessage(
        city,
        "No cities found"
      );
    }

  } catch (error) {

    console.error(
      "GIFTIVA city error:",
      error
    );

    await loadCitiesFallback(
      selectedCountry,
      selectedRegion
    );
  }
}

/* =========================================
   CITY FALLBACK
   ========================================= */

async function loadCitiesFallback(
  country,
  region
) {

  const {
    city
  } = getLocationElements();

  if (!city) {
    return;
  }

  try {

    const response =
      await fetch(
        `${LOCATION_API}/countries/cities`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            country: country
          })
        }
      );

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    const result =
      await response.json();

    if (
      result.error ||
      !result.data
    ) {
      throw new Error(
        "Could not load cities."
      );
    }

    /*
     * If the API returns country-wide
     * cities, use them as a fallback.
     */

    const cities =
      Array.isArray(result.data)
        ? result.data
        : [];

    setSelectMessage(
      city,
      "Select city"
    );

    cities.forEach(function(cityName) {

      const option =
        document.createElement("option");

      option.value =
        cityName;

      option.textContent =
        cityName;

      city.appendChild(option);
    });

    if (cities.length > 0) {

      city.disabled = false;

    } else {

      setSelectMessage(
        city,
        "No cities found"
      );
    }

  } catch (error) {

    console.error(
      "GIFTIVA city fallback error:",
      error
    );

    setSelectMessage(
      city,
      "Could not load cities"
    );
  }
}

/* =========================================
   PRICE FORMAT
   ========================================= */

function formatPrice(price, currency) {

  const symbols = {

    NGN: "₦",
    GBP: "£",
    USD: "$",
    CAD: "CA$",
    AUD: "A$",
    EUR: "€"

  };

  const symbol =
    symbols[currency] ||
    currency + " ";

  return (
    symbol +
    Number(price).toLocaleString()
  );
}

/* =========================================
   MARKETPLACE SEARCH
   ========================================= */

function findItems() {

  const country =
    document.getElementById(
      "country"
    )?.value;

  const region =
    document.getElementById(
      "region"
    )?.value;

  const city =
    document.getElementById(
      "city"
    )?.value;

  const category =
    document.getElementById(
      "category"
    )?.value;

  if (!country) {

    alert(
      "Please select a country first."
    );

    return;
  }

  if (!region) {

    alert(
      "Please select a state / region."
    );

    return;
  }

  if (!city) {

    alert(
      "Please select a city."
    );

    return;
  }

  if (
    typeof getGiftivaProducts !==
    "function"
  ) {

    alert(
      "GIFTIVA products could not be loaded."
    );

    return;
  }

  const products =
    getGiftivaProducts();

  const filteredProducts =
    products.filter(
      function(product) {

        const countryMatch =
          product.country === country;

        const regionMatch =
          product.region === region ||
          normalizeLocation(
            product.region
          ) ===
          normalizeLocation(
            region
          );

        const cityMatch =
          product.city === city ||
          normalizeLocation(
            product.city
          ) ===
          normalizeLocation(
            city
          );

        const categoryMatch =
          !category ||
          product.category ===
          category;

        return (
          countryMatch &&
          regionMatch &&
          cityMatch &&
          categoryMatch
        );
      }
    );

  displayMarketplaceProducts(
    filteredProducts
  );

  const section =
    document.getElementById(
      "marketplace-results-section"
    );

  if (section) {

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

/* =========================================
   LOCATION NORMALIZATION
   ========================================= */

function normalizeLocation(value) {

  if (!value) {
    return "";
  }

  return value
    .toLowerCase()
    .replace(
      /\b(state|province|region)\b/g,
      ""
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

/* =========================================
   DISPLAY PRODUCTS
   ========================================= */

function displayMarketplaceProducts(
  products
) {

  const results =
    document.getElementById(
      "marketplace-results"
    );

  if (!results) {
    return;
  }

  if (
    !products ||
    products.length === 0
  ) {

    results.innerHTML = `

      <div class="empty-state">

        <div class="empty-state-icon">
          🔍
        </div>

        <h3>
          No products found
        </h3>

        <p>
          We don't have a product available
          for this destination yet.
        </p>

      </div>

    `;

    return;
  }

  results.innerHTML =
    products
      .map(function(product) {

        return `

          <article class="product-card">

            <div class="product-image">
              ${product.image || "🎁"}
            </div>

            <div class="product-info">

              <span class="product-category">
                ${product.category}
              </span>

              <h3>
                ${product.name}
              </h3>

              <p>
                ${product.description}
              </p>

              <div class="product-meta">

                <span>
                  ⭐ ${product.rating}
                </span>

                <span>
                  🚚 ${product.delivery}
                </span>

              </div>

              <div class="product-meta">

                <span>
                  ✓ ${product.vendor}
                </span>

                <span>
                  ${product.city}
                </span>

              </div>

              <div class="product-bottom">

                <strong>
                  ${formatPrice(
                    product.price,
                    product.currency
                  )}
                </strong>

                <button
                  class="btn btn-gold"
                  onclick="addProductToCart('${product.id}')">
                  Choose
                </button>

              </div>

            </div>

          </article>

        `;

      })
      .join("");
}

/* =========================================
   CATEGORY
   ========================================= */

function selectCategory(
  categoryName
) {

  const category =
    document.getElementById(
      "category"
    );

  if (!category) {
    return;
  }

  if (
    categoryName === "All"
  ) {

    category.value = "";

  } else {

    category.value =
      categoryName;
  }

  if (
    typeof getGiftivaProducts !==
    "function"
  ) {
    return;
  }

  const products =
    getGiftivaProducts();

  const filteredProducts =
    categoryName === "All"
      ? products
      : products.filter(
          function(product) {
            return (
              product.category ===
              categoryName
            );
          }
        );

  displayMarketplaceProducts(
    filteredProducts
  );

  const section =
    document.getElementById(
      "marketplace-results-section"
    );

  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });
  }
}

function showCategory(
  categoryName
) {
  selectCategory(
    categoryName
  );
}

/* =========================================
   CART
   ========================================= */

function addProductToCart(
  productId
) {

  if (
    typeof getProductById !==
    "function"
  ) {

    alert(
      "Product system is not available."
    );

    return;
  }

  const product =
    getProductById(
      productId
    );

  if (!product) {

    alert(
      "Product could not be found."
    );

    return;
  }

  cart.push(product);

  alert(
    product.name +
    " has been selected for your GIFTIVA order. 🎁"
  );
}

function addToCart(
  productName,
  price
) {

  cart.push({
    name: productName,
    price: price
  });

  alert(
    productName +
    " has been added to your selection. 🎁"
  );
}

/* =========================================
   MOTORS
   ========================================= */

function carAction(
  action
) {

  const messages = {

    buy:
      "GIFTIVA Motors — Browse cars coming next. 🚘",

    sell:
      "GIFTIVA Motors — Vehicle listing will be available next. 🚗",

    rent:
      "GIFTIVA Motors — Car rentals will be available next. 🔑",

    chauffeur:
      "GIFTIVA Motors — Chauffeur bookings will be available next. 👨‍✈️"

  };

  alert(
    messages[action] ||
    "GIFTIVA Motors coming soon."
  );
}

function searchCars() {

  alert(
    "GIFTIVA Motors search will be connected next. 🚘"
  );
}

/* =========================================
   LOGIN
   ========================================= */

function openLogin() {

  const modal =
    document.getElementById(
      "loginModal"
    );

  if (modal) {
    modal.classList.add(
      "active"
    );
  }
}

function closeLogin() {

  const modal =
    document.getElementById(
      "loginModal"
    );

  if (modal) {
    modal.classList.remove(
      "active"
    );
  }
}

/* =========================================
   SIGNUP
   ========================================= */

function openSignup() {

  const modal =
    document.getElementById(
      "signupModal"
    );

  if (modal) {
    modal.classList.add(
      "active"
    );
  }
}

function closeSignup() {

  const modal =
    document.getElementById(
      "signupModal"
    );

  if (modal) {
    modal.classList.remove(
      "active"
    );
  }
}

/* =========================================
   VENDOR
   ========================================= */

function openVendorModal() {

  const modal =
    document.getElementById(
      "vendorModal"
    );

  if (modal) {
    modal.classList.add(
      "active"
    );
  }
}

function closeVendorModal() {

  const modal =
    document.getElementById(
      "vendorModal"
    );

  if (modal) {
    modal.classList.remove(
      "active"
    );
  }
}

/* =========================================
   DEMO FORM
   ========================================= */

function demoSubmit(
  event
) {

  if (event) {
    event.preventDefault();
  }

  alert(
    "Thank you for choosing GIFTIVA. ❤️"
  );
}

/* =========================================
   TRACK ORDER
   ========================================= */

function trackOrder() {

  const input =
    document.getElementById(
      "orderNumber"
    );

  const result =
    document.getElementById(
      "tracking-result"
    );

  if (!input || !result) {
    return;
  }

  const orderNumber =
    input.value.trim();

  if (!orderNumber) {

    alert(
      "Please enter your order number."
    );

    return;
  }

  result.innerHTML = `

    <div class="tracking-status">

      <h3>
        Order ${orderNumber}
      </h3>

      <p>
        Your GIFTIVA order tracking system
        will be connected to live orders next.
      </p>

    </div>

  `;
}

/* =========================================
   MODALS
   ========================================= */

function initializeModals() {

  document
    .querySelectorAll(".modal")
    .forEach(function(modal) {

      modal.addEventListener(
        "click",
        function(event) {

          if (
            event.target ===
            modal
          ) {

            modal.classList.remove(
              "active"
            );
          }
        }
      );
    });

  document.addEventListener(
    "keydown",
    function(event) {

      if (
        event.key === "Escape"
      ) {

        document
          .querySelectorAll(
            ".modal"
          )
          .forEach(
            function(modal) {

              modal.classList.remove(
                "active"
              );

            }
          );
      }
    }
  );
}

/* =========================================
   INITIALIZE GIFTIVA
   ========================================= */

function initializeGiftiva() {

  populateCountries();

  const {
    country,
    region
  } = getLocationElements();

  if (country) {

    country.addEventListener(
      "change",
      updateRegions
    );
  }

  if (region) {

    region.addEventListener(
      "change",
      updateCities
    );
  }

  initializeModals();

  console.log(
    "GIFTIVA initialized successfully."
  );
}

/* =========================================
   START
   ========================================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeGiftiva
  );

} else {

  initializeGiftiva();

}
