// ======================================================
// GIFTIVA — MAIN JAVASCRIPT
// ======================================================

// ------------------------------------------------------
// 1. COUNTRIES
// ------------------------------------------------------

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


// ------------------------------------------------------
// 2. COUNTRY FLAGS
// ------------------------------------------------------

const countryFlags = {
  "Nigeria": "🇳🇬",
  "United Kingdom": "🇬🇧",
  "United States": "🇺🇸",
  "Canada": "🇨🇦",
  "Australia": "🇦🇺",
  "Italy": "🇮🇹",
  "France": "🇫🇷",
  "Germany": "🇩🇪",
  "Spain": "🇪🇸",
  "Portugal": "🇵🇹",
  "Netherlands": "🇳🇱",
  "Belgium": "🇧🇪",
  "Switzerland": "🇨🇭",
  "Austria": "🇦🇹",
  "Ireland": "🇮🇪",
  "Norway": "🇳🇴",
  "Sweden": "🇸🇪",
  "Denmark": "🇩🇰",
  "Finland": "🇫🇮",
  "Poland": "🇵🇱",
  "Greece": "🇬🇷",
  "United Arab Emirates": "🇦🇪",
  "Saudi Arabia": "🇸🇦",
  "Qatar": "🇶🇦",
  "South Africa": "🇿🇦",
  "Ghana": "🇬🇭",
  "Kenya": "🇰🇪",
  "Brazil": "🇧🇷",
  "Mexico": "🇲🇽",
  "Japan": "🇯🇵",
  "China": "🇨🇳",
  "India": "🇮🇳",
  "Singapore": "🇸🇬",
  "Malaysia": "🇲🇾",
  "New Zealand": "🇳🇿"
};


// ------------------------------------------------------
// 3. GET ELEMENTS
// ------------------------------------------------------

const countrySelect = document.getElementById("country");
const regionSelect = document.getElementById("region");
const citySelect = document.getElementById("city");
const categorySelect = document.getElementById("category");
const searchBtn = document.getElementById("searchBtn");
const marketplaceResults = document.getElementById("marketplace-results");


// ------------------------------------------------------
// 4. POPULATE COUNTRIES
// ------------------------------------------------------

function populateCountries() {

  if (!countrySelect) return;

  countrySelect.innerHTML =
    '<option value="">Select country</option>';

  giftivaCountries.forEach(country => {

    const option = document.createElement("option");

    option.value = country;

    option.textContent =
      `${countryFlags[country] || "🌍"} ${country}`;

    countrySelect.appendChild(option);

  });
}


// ------------------------------------------------------
// 5. LOCATION API
// ------------------------------------------------------

async function loadRegions(country) {

  if (!regionSelect) return;

  regionSelect.innerHTML =
    '<option value="">Loading states / regions...</option>';

  regionSelect.disabled = true;

  if (citySelect) {
    citySelect.innerHTML =
      '<option value="">Select city</option>';

    citySelect.disabled = true;
  }

  try {

    const response = await fetch(
      `https://countriesnow.space/api/v0.1/countries/states/q?country=${encodeURIComponent(country)}`
    );

    const result = await response.json();

    let states = [];

    if (result && result.data) {

      if (Array.isArray(result.data.states)) {
        states = result.data.states;
      }

      if (Array.isArray(result.data)) {
        states = result.data;
      }

    }

    regionSelect.innerHTML =
      '<option value="">Select state / region</option>';

    states.forEach(state => {

      const stateName =
        typeof state === "string"
          ? state
          : state.name;

      if (!stateName) return;

      const option = document.createElement("option");

      option.value = stateName;
      option.textContent = stateName;

      regionSelect.appendChild(option);

    });

    regionSelect.disabled = states.length === 0;

    if (states.length === 0) {

      regionSelect.innerHTML =
        '<option value="">No regions available</option>';

    }

  } catch (error) {

    console.error("Region loading error:", error);

    regionSelect.innerHTML =
      '<option value="">Unable to load regions</option>';

    regionSelect.disabled = true;

  }

}


// ------------------------------------------------------
// 6. LOAD CITIES
// ------------------------------------------------------

async function loadCities(country, region) {

  if (!citySelect) return;

  citySelect.innerHTML =
    '<option value="">Loading cities...</option>';

  citySelect.disabled = true;

  try {

    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          country: country,
          state: region
        })
      }
    );

    const result = await response.json();

    let cities = [];

    if (result && result.data) {

      if (Array.isArray(result.data)) {
        cities = result.data;
      }

      if (Array.isArray(result.data.cities)) {
        cities = result.data.cities;
      }

      if (Array.isArray(result.data.states)) {
        cities = result.data.states;
      }

    }

    cities = cities
      .map(city => {

        if (typeof city === "string") {
          return city;
        }

        return city.name || city.city || "";

      })
      .filter(Boolean);


    // Remove duplicates
    cities = [...new Set(cities)];

    cities.sort((a, b) =>
      a.localeCompare(b)
    );


    citySelect.innerHTML =
      '<option value="">Select city</option>';


    cities.forEach(city => {

      const option =
        document.createElement("option");

      option.value = city;
      option.textContent = city;

      citySelect.appendChild(option);

    });


    citySelect.disabled =
      cities.length === 0;


    if (cities.length === 0) {

      citySelect.innerHTML =
        '<option value="">No cities available</option>';

    }

  } catch (error) {

    console.error("City loading error:", error);

    citySelect.innerHTML =
      '<option value="">Unable to load cities</option>';

    citySelect.disabled = true;

  }

}


// ------------------------------------------------------
// 7. COUNTRY CHANGE
// ------------------------------------------------------

if (countrySelect) {

  countrySelect.addEventListener(
    "change",
    async function () {

      const country =
        this.value.trim();

      if (!country) {

        regionSelect.innerHTML =
          '<option value="">Select state / region</option>';

        regionSelect.disabled = true;

        citySelect.innerHTML =
          '<option value="">Select city</option>';

        citySelect.disabled = true;

        return;
      }

      await loadRegions(country);

    }
  );

}


// ------------------------------------------------------
// 8. REGION CHANGE
// ------------------------------------------------------

if (regionSelect) {

  regionSelect.addEventListener(
    "change",
    async function () {

      const country =
        countrySelect.value.trim();

      const region =
        this.value.trim();

      if (!country || !region) {

        citySelect.innerHTML =
          '<option value="">Select city</option>';

        citySelect.disabled = true;

        return;
      }

      await loadCities(
        country,
        region
      );

    }
  );

}


// ------------------------------------------------------
// 9. PRICE FORMATTER
// ------------------------------------------------------

function formatPrice(price, currency) {

  const symbols = {
    NGN: "₦",
    GBP: "£",
    USD: "$",
    CAD: "C$",
    AUD: "A$",
    EUR: "€",
    AED: "د.إ",
    SAR: "﷼",
    QAR: "﷼",
    ZAR: "R",
    GHS: "GH₵",
    KES: "KSh",
    BRL: "R$",
    MXN: "MX$",
    JPY: "¥",
    CNY: "¥",
    INR: "₹",
    SGD: "S$",
    MYR: "RM",
    NZD: "NZ$"
  };

  const symbol =
    symbols[currency] || currency || "";

  return `${symbol}${Number(price).toLocaleString()}`;

}


// ------------------------------------------------------
// 10. PRODUCT IMAGE
// ------------------------------------------------------

function getProductImage(product) {

  if (product.image) {

    return `
      <img
        src="${product.image}"
        alt="${escapeHtml(product.name)}"
        loading="lazy"
      >
    `;

  }

  return `
    <div class="product-placeholder">
      ${product.emoji || "🎁"}
    </div>
  `;

}


// ------------------------------------------------------
// 11. ESCAPE HTML
// ------------------------------------------------------

function escapeHtml(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


// ------------------------------------------------------
// 12. PRODUCT CARD
// ------------------------------------------------------

function createProductCard(product) {

  const customization =
    product.customizable
      ? `<span class="product-tag">CUSTOMIZABLE</span>`
      : "";

  return `
    <article class="product-card">

      <div class="product-image">
        ${getProductImage(product)}
      </div>

      <div class="product-info">

        <div class="product-tags">
          <span class="product-tag">
            ${escapeHtml(product.category)}
          </span>

          ${customization}
        </div>

        <h3>
          ${escapeHtml(product.name)}
        </h3>

        <p>
          ${escapeHtml(product.description)}
        </p>

        <div class="product-location">
          📍 ${escapeHtml(product.city)},
          ${escapeHtml(product.country)}
        </div>

        <div class="product-bottom">

          <strong class="product-price">
            ${formatPrice(
              product.price,
              product.currency
            )}
          </strong>

          <button
            class="btn btn-gold product-view-btn"
            data-product-id="${escapeHtml(product.id)}"
          >
            View Gift
          </button>

        </div>

      </div>

    </article>
  `;

}


// ------------------------------------------------------
// 13. DISPLAY PRODUCTS
// ------------------------------------------------------

function displayProducts(products, title = "") {

  if (!marketplaceResults) return;

  if (!products || products.length === 0) {

    marketplaceResults.innerHTML = `

      <div class="empty-state">

        <div>🎁</div>

        <h3>No products found</h3>

        <p>
          We don't have a listing for this location yet.
          Try another city or category.
        </p>

      </div>

    `;

    return;
  }


  marketplaceResults.innerHTML = `

    ${title ? `
      <div class="marketplace-result-heading">
        <h3>${escapeHtml(title)}</h3>
        <p>${products.length} product${products.length === 1 ? "" : "s"} available</p>
      </div>
    ` : ""}

    ${products
      .map(product => createProductCard(product))
      .join("")}

  `;


  // Add product button events

  document
    .querySelectorAll(".product-view-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        function () {

          const productId =
            this.dataset.productId;

          openProductDetails(productId);

        }
      );

    });

}


// ------------------------------------------------------
// 14. SHOW ALL PRODUCTS ON PAGE LOAD
// ------------------------------------------------------

function showAllProducts() {

  if (
    typeof getGiftivaProducts !== "function"
  ) {

    console.error(
      "products.js was not loaded before script.js"
    );

    return;

  }

  const products =
    getGiftivaProducts();

  displayProducts(
    products,
    "Featured GIFTIVA Gifts"
  );

}


// ------------------------------------------------------
// 15. SEARCH MARKETPLACE
// ------------------------------------------------------

function searchMarketplace() {

  if (
    typeof getGiftivaProducts !== "function"
  ) return;


  const country =
    countrySelect?.value.trim() || "";

  const region =
    regionSelect?.value.trim() || "";

  const city =
    citySelect?.value.trim() || "";

  const category =
    categorySelect?.value.trim() || "";


  let products =
    getGiftivaProducts();


  // Country

  if (country) {

    products =
      products.filter(product =>
        normalize(product.country) ===
        normalize(country)
      );

  }


  // Region

  if (region) {

    products =
      products.filter(product =>
        normalize(product.region) ===
        normalize(region)
      );

  }


  // City

  if (city) {

    products =
      products.filter(product =>
        normalize(product.city) ===
        normalize(city)
      );

  }


  // Category

  if (
    category &&
    category !== "All categories"
  ) {

    const categoryMap = {

      "Gifts & Flowers":
        ["Gifts & Flowers"],

      "Food & Cakes":
        ["Food & Cakes"],

      "Jewelry & Luxury":
        ["Jewelry & Luxury"],

      "Experiences":
        ["Experiences"],

      "Services":
        ["Services"],

      "Cars":
        ["Cars"],

      "Car Rentals":
        ["Car Rentals"],

      "Chauffeur":
        ["Chauffeur"]

    };


    const allowed =
      categoryMap[category];


    if (allowed) {

      products =
        products.filter(product =>
          allowed.includes(product.category)
        );

    }

  }


  let heading =
    "GIFTIVA Marketplace";


  if (city && region && country) {

    heading =
      `Gifts available in ${city}`;

  } else if (region && country) {

    heading =
      `Gifts available in ${region}`;

  } else if (country) {

    heading =
      `Gifts available in ${country}`;

  }


  displayProducts(
    products,
    heading
  );


  const marketplace =
    document.getElementById(
      "marketplace"
    );


  if (marketplace) {

    marketplace.scrollIntoView({
      behavior: "smooth"
    });

  }

}


// ------------------------------------------------------
// 16. SEARCH BUTTON
// ------------------------------------------------------

if (searchBtn) {

  searchBtn.addEventListener(
    "click",
    searchMarketplace
  );

}


// ------------------------------------------------------
// 17. NORMALIZE LOCATION
// ------------------------------------------------------

function normalize(value) {

  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\bstate\b/g, "")
    .replace(/\bstate of\b/g, "")
    .trim();

}


// ------------------------------------------------------
// 18. PRODUCT DETAILS
// ------------------------------------------------------

function openProductDetails(productId) {

  if (
    typeof getProductById !== "function"
  ) return;


  const product =
    getProductById(productId);


  if (!product) {

    alert(
      "Sorry, this product could not be found."
    );

    return;

  }


  const customizationText =
    product.customizable
      ? "✨ This product can be customized."
      : "This product is not currently customizable.";


  alert(

    `${product.name}\n\n` +

    `${product.description}\n\n` +

    `Price: ${formatPrice(
      product.price,
      product.currency
    )}\n` +

    `Location: ${product.city}, ${product.country}\n\n` +

    `${customizationText}\n\n` +

    `GIFTIVA product ID: ${product.id}`

  );

}


// ------------------------------------------------------
// 19. LOGIN
// ------------------------------------------------------

const loginBtn =
  document.getElementById("loginBtn");

const loginModal =
  document.getElementById("loginModal");


if (loginBtn && loginModal) {

  loginBtn.addEventListener(
    "click",
    () => {

      loginModal.classList.add("active");

    }
  );

}


// ------------------------------------------------------
// 20. SIGN UP
// ------------------------------------------------------

const signupBtn =
  document.getElementById("signupBtn");

const signupModal =
  document.getElementById("signupModal");


if (signupBtn && signupModal) {

  signupBtn.addEventListener(
    "click",
    () => {

      signupModal.classList.add("active");

    }
  );

}


// ------------------------------------------------------
// 21. VENDOR
// ------------------------------------------------------

const vendorBtn =
  document.getElementById("vendorBtn");

const vendorModal =
  document.getElementById("vendorModal");


if (vendorBtn && vendorModal) {

  vendorBtn.addEventListener(
    "click",
    () => {

      vendorModal.classList.add("active");

    }
  );

}


// ------------------------------------------------------
// 22. CLOSE MODALS
// ------------------------------------------------------

document
  .querySelectorAll(".modal-close")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const modalId =
          button.dataset.close;

        const modal =
          document.getElementById(modalId);

        if (modal) {

          modal.classList.remove(
            "active"
          );

        }

      }
    );

  });


// Close when clicking outside

document
  .querySelectorAll(".modal")
  .forEach(modal => {

    modal.addEventListener(
      "click",
      function(event) {

        if (
          event.target === this
        ) {

          this.classList.remove(
            "active"
          );

        }

      }
    );

  });


// ------------------------------------------------------
// 23. LOGIN FORM
// ------------------------------------------------------

const loginForm =
  document.getElementById("loginForm");


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      alert(
        "GIFTIVA login will be connected to the secure customer account system."
      );

    }
  );

}


// ------------------------------------------------------
// 24. SIGNUP FORM
// ------------------------------------------------------

const signupForm =
  document.getElementById("signupForm");


if (signupForm) {

  signupForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      alert(
        "Your GIFTIVA account system will be connected here."
      );

    }
  );

}


// ------------------------------------------------------
// 25. VENDOR FORM
// ------------------------------------------------------

const vendorForm =
  document.getElementById("vendorForm");


if (vendorForm) {

  vendorForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      alert(
        "Your GIFTIVA vendor application has been received. Vendor verification will be connected to the admin system."
      );

    }
  );

}


// ------------------------------------------------------
// 26. ORDER TRACKING
// ------------------------------------------------------

const trackBtn =
  document.getElementById("trackBtn");

const trackingNumber =
  document.getElementById(
    "trackingNumber"
  );

const trackingResult =
  document.getElementById(
    "trackingResult"
  );


if (trackBtn) {

  trackBtn.addEventListener(
    "click",
    function() {

      const number =
        trackingNumber?.value.trim();


      if (!number) {

        if (trackingResult) {

          trackingResult.innerHTML = `
            <div class="empty-state">
              <p>Please enter your order number.</p>
            </div>
          `;

        }

        return;

      }


      if (trackingResult) {

        trackingResult.innerHTML = `

          <div class="tracking-card">

            <h3>Order ${escapeHtml(number)}</h3>

            <div class="tracking-status">

              <div class="tracking-step active">
                <span>✓</span>
                <strong>Order Confirmed</strong>
              </div>

              <div class="tracking-step">
                <span>2</span>
                <strong>Vendor Preparing Gift</strong>
              </div>

              <div class="tracking-step">
                <span>3</span>
                <strong>Out for Delivery</strong>
              </div>

              <div class="tracking-step">
                <span>4</span>
                <strong>Delivered</strong>
              </div>

            </div>

          </div>

        `;

      }

    }
  );

}


// ------------------------------------------------------
// 27. INITIALIZE
// ------------------------------------------------------

document.addEventListener(
  "DOMContentLoaded",
  function() {

    populateCountries();

    showAllProducts();

  }
);
