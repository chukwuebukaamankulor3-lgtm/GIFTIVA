/* =========================================================
   GIFTIVA — Main JavaScript
   Send Love. Anywhere. 🌍🎁
   ========================================================= */


/* ---------------------------------------------------------
   GLOBAL CART
   --------------------------------------------------------- */

let cart = [];


/* ---------------------------------------------------------
   LOCATION DATA
   --------------------------------------------------------- */

const locations = {
  Nigeria: {
    "Abia": ["Aba", "Umuahia", "Ohafia"],
    "Adamawa": ["Yola", "Mubi", "Jimeta"],
    "Akwa Ibom": ["Uyo", "Eket", "Ikot Ekpene"],
    "Anambra": ["Awka", "Onitsha", "Nnewi"],
    "Bauchi": ["Bauchi", "Azare", "Jama'are"],
    "Bayelsa": ["Yenagoa", "Brass", "Kaiama"],
    "Benue": ["Makurdi", "Gboko", "Otukpo"],
    "Borno": ["Maiduguri", "Biu", "Dikwa"],
    "Cross River": ["Calabar", "Ikom", "Ogoja"],
    "Delta": ["Asaba", "Warri", "Sapele"],
    "Ebonyi": ["Abakaliki", "Afikpo", "Onueke"],
    "Edo": ["Benin City", "Auchi", "Ekpoma"],
    "Ekiti": ["Ado-Ekiti", "Ikere", "Ijero"],
    "Enugu": ["Enugu", "Nsukka", "Oji River"],
    "FCT": ["Abuja", "Gwagwalada", "Kuje"],
    "Gombe": ["Gombe", "Kumo", "Deba"],
    "Imo": ["Owerri", "Orlu", "Okigwe"],
    "Jigawa": ["Dutse", "Hadejia", "Gumel"],
    "Kaduna": ["Kaduna", "Zaria", "Kafanchan"],
    "Kano": ["Kano", "Wudil", "Gwarzo"],
    "Katsina": ["Katsina", "Daura", "Funtua"],
    "Kebbi": ["Birnin Kebbi", "Argungu", "Yauri"],
    "Kogi": ["Lokoja", "Okene", "Idah"],
    "Kwara": ["Ilorin", "Offa", "Jebba"],
    "Lagos": ["Lagos Island", "Ikeja", "Lekki", "Victoria Island"],
    "Nasarawa": ["Lafia", "Keffi", "Karu"],
    "Niger": ["Minna", "Suleja", "Bida"],
    "Ogun": ["Abeokuta", "Sagamu", "Ijebu-Ode"],
    "Ondo": ["Akure", "Ondo", "Owo"],
    "Osun": ["Osogbo", "Ile-Ife", "Ilesa"],
    "Oyo": ["Ibadan", "Ogbomoso", "Oyo"],
    "Plateau": ["Jos", "Bukuru", "Pankshin"],
    "Rivers": ["Port Harcourt", "Bonny", "Obio-Akpor"],
    "Sokoto": ["Sokoto", "Tambuwal", "Wurno"],
    "Taraba": ["Jalingo", "Wukari", "Gembu"],
    "Yobe": ["Damaturu", "Potiskum", "Nguru"],
    "Zamfara": ["Gusau", "Kaura Namoda", "Talata Mafara"]
  },

  "United Kingdom": {
    "England": ["London", "Manchester", "Birmingham", "Liverpool"],
    "Scotland": ["Edinburgh", "Glasgow", "Aberdeen"],
    "Wales": ["Cardiff", "Swansea", "Newport"],
    "Northern Ireland": ["Belfast", "Derry", "Lisburn"]
  },

  "United States": {
    "California": ["Los Angeles", "San Francisco", "San Diego"],
    "New York": ["New York City", "Buffalo", "Rochester"],
    "Texas": ["Houston", "Dallas", "Austin"],
    "Florida": ["Miami", "Orlando", "Tampa"]
  },

  Canada: {
    "Ontario": ["Toronto", "Ottawa", "Hamilton"],
    "Quebec": ["Montreal", "Quebec City", "Laval"],
    "British Columbia": ["Vancouver", "Victoria", "Surrey"],
    "Alberta": ["Calgary", "Edmonton", "Red Deer"]
  },

  France: {
    "Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt"],
    "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Cannes"],
    "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Annecy"]
  },

  Germany: {
    Bavaria: ["Munich", "Nuremberg", "Augsburg"],
    Berlin: ["Berlin"],
    Hesse: ["Frankfurt", "Wiesbaden", "Darmstadt"]
  },

  Italy: {
    Lazio: ["Rome", "Fiumicino", "Viterbo"],
    Lombardy: ["Milan", "Bergamo", "Brescia"],
    Campania: ["Naples", "Salerno", "Caserta"]
  },

  Spain: {
    Madrid: ["Madrid", "Alcalá de Henares"],
    Catalonia: ["Barcelona", "Girona", "Tarragona"],
    Andalusia: ["Seville", "Malaga", "Granada"]
  },

  Netherlands: {
    "North Holland": ["Amsterdam", "Haarlem", "Zaandam"],
    "South Holland": ["Rotterdam", "The Hague", "Leiden"],
    Utrecht: ["Utrecht", "Amersfoort"]
  },

  Ireland: {
    Leinster: ["Dublin", "Drogheda", "Kilkenny"],
    Munster: ["Cork", "Limerick", "Waterford"],
    Connacht: ["Galway", "Sligo"]
  },

  Australia: {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
    Victoria: ["Melbourne", "Geelong", "Ballarat"],
    Queensland: ["Brisbane", "Gold Coast", "Cairns"],
    "Western Australia": ["Perth", "Fremantle", "Bunbury"]
  },

  "New Zealand": {
    Auckland: ["Auckland"],
    Wellington: ["Wellington"],
    Canterbury: ["Christchurch", "Timaru"]
  },

  "South Africa": {
    Gauteng: ["Johannesburg", "Pretoria", "Sandton"],
    "Western Cape": ["Cape Town", "Stellenbosch", "Paarl"],
    "KwaZulu-Natal": ["Durban", "Pietermaritzburg"]
  },

  Ghana: {
    "Greater Accra": ["Accra", "Tema", "Madina"],
    Ashanti: ["Kumasi", "Obuasi", "Ejisu"],
    Western: ["Takoradi", "Tarkwa"]
  },

  Kenya: {
    "Nairobi County": ["Nairobi"],
    "Mombasa County": ["Mombasa"],
    "Kiambu County": ["Thika", "Ruiru", "Kiambu"]
  },

  "United Arab Emirates": {
    Dubai: ["Dubai"],
    "Abu Dhabi": ["Abu Dhabi"],
    Sharjah: ["Sharjah"]
  }
};


/* ---------------------------------------------------------
   COUNTRY → REGION
   --------------------------------------------------------- */

function updateRegions() {

  const country = document.getElementById("country");
  const region = document.getElementById("region");
  const city = document.getElementById("city");

  if (!country || !region || !city) return;

  region.innerHTML =
    '<option value="">Select State / Region</option>';

  city.innerHTML =
    '<option value="">Select City</option>';

  const countryData = locations[country.value];

  if (!countryData) return;

  Object.keys(countryData).forEach(function(regionName) {

    const option = document.createElement("option");

    option.value = regionName;
    option.textContent = regionName;

    region.appendChild(option);

  });
}


/* ---------------------------------------------------------
   REGION → CITY
   --------------------------------------------------------- */

function updateCities() {

  const country = document.getElementById("country");
  const region = document.getElementById("region");
  const city = document.getElementById("city");

  if (!country || !region || !city) return;

  city.innerHTML =
    '<option value="">Select City</option>';

  const countryData = locations[country.value];

  if (!countryData) return;

  const cities = countryData[region.value];

  if (!cities) return;

  cities.forEach(function(cityName) {

    const option = document.createElement("option");

    option.value = cityName;
    option.textContent = cityName;

    city.appendChild(option);

  });
}


/* ---------------------------------------------------------
   CURRENCY FORMATTER
   --------------------------------------------------------- */

function formatPrice(price, currency) {

  const currencyMap = {
    NGN: "₦",
    GBP: "£",
    USD: "$",
    CAD: "$",
    EUR: "€",
    AUD: "$"
  };

  const symbol = currencyMap[currency] || currency;

  return (
    symbol +
    Number(price).toLocaleString()
  );
}


/* ---------------------------------------------------------
   MARKETPLACE SEARCH
   --------------------------------------------------------- */

function findItems() {

  const countryElement =
    document.getElementById("country");

  const regionElement =
    document.getElementById("region");

  const cityElement =
    document.getElementById("city");

  const categoryElement =
    document.getElementById("category");

  const country =
    countryElement ? countryElement.value : "";

  const region =
    regionElement ? regionElement.value : "";

  const city =
    cityElement ? cityElement.value : "";

  const category =
    categoryElement ? categoryElement.value : "";


  if (!country) {

    alert(
      "Please select a destination country."
    );

    return;
  }


  let products = getGiftivaProducts();


  products = products.filter(function(product) {

    const countryMatch =
      product.country === country;

    const regionMatch =
      !region ||
      product.region === region;

    const cityMatch =
      !city ||
      product.city === city;

    const categoryMatch =
      !category ||
      product.category === category;

    return (
      countryMatch &&
      regionMatch &&
      cityMatch &&
      categoryMatch
    );

  });


  displayMarketplaceProducts(products);

}


/* ---------------------------------------------------------
   DISPLAY MARKETPLACE PRODUCTS
   --------------------------------------------------------- */

function displayMarketplaceProducts(products) {

  const container =
    document.getElementById("marketplace-results");

  if (!container) {

    alert(
      "Marketplace search is ready. The product display section will be connected in the next step."
    );

    return;
  }


  if (!products.length) {

    container.innerHTML = `
      <div class="empty-state">
        <span>🔍</span>
        <h3>No products found</h3>
        <p>
          We couldn't find products matching your destination.
          Try another city, category or location.
        </p>
      </div>
    `;

    container.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    return;
  }


  container.innerHTML = products.map(function(product) {

    return `
      <article class="product-card">

        <div class="product-image">
          ${product.image}
        </div>

        <div class="product-content">

          <span class="product-label">
            ${product.category}
          </span>

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.description}
          </p>

          <div class="product-rating">
            ★ ${product.rating}
          </div>

          <p class="product-vendor">
            ✓ ${product.vendor}
          </p>

          <p class="product-delivery">
            🚚 ${product.delivery}
          </p>

          <div class="product-bottom">

            <strong>
              ${formatPrice(
                product.price,
                product.currency
              )}
            </strong>

            <button
              type="button"
              class="btn btn-small btn-gold"
              onclick="addProductToCart('${product.id}')"
            >
              Choose
            </button>

          </div>

        </div>

      </article>
    `;

  }).join("");


  container.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* ---------------------------------------------------------
   CATEGORY SELECTION
   --------------------------------------------------------- */

function selectCategory(categoryName) {

  const category =
    document.getElementById("category");

  if (category) {
    category.value = categoryName;
  }


  const marketplace =
    document.getElementById("marketplace");

  if (marketplace) {

    marketplace.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }


  showCategory(categoryName);
}


function showCategory(categoryName) {

  const title =
    document.getElementById("category-title");

  if (title) {
    title.textContent = categoryName;
  }


  const country =
    document.getElementById("country");

  if (
    country &&
    country.value
  ) {

    findItems();

    return;
  }


  const products =
    getProductsByCategory(categoryName);

  displayMarketplaceProducts(products);

}


/* ---------------------------------------------------------
   ADD PRODUCT TO CART
   --------------------------------------------------------- */

function addProductToCart(productId) {

  const product =
    getProductById(productId);

  if (!product) {

    alert(
      "We couldn't find this product."
    );

    return;
  }


  cart.push(product);


  alert(
    product.name +
    " has been added to your GIFTIVA cart. 🛍️\n\n" +
    "Cart items: " +
    cart.length
  );

}


/* ---------------------------------------------------------
   OLD CART FUNCTION
   --------------------------------------------------------- */

function addToCart(productName, price) {

  cart.push({
    id: "legacy-" + Date.now(),
    name: productName,
    price: price,
    currency: "NGN"
  });


  alert(
    productName +
    " has been added to your GIFTIVA cart. 🛍️\n\n" +
    "Cart items: " +
    cart.length
  );

}


/* ---------------------------------------------------------
   GIFTIVA MOTORS
   --------------------------------------------------------- */

function carAction(action) {

  const actions = {

    buy: "Buy a Car",

    sell: "Sell a Car",

    rent: "Rent a Car",

    chauffeur: "Hire With Driver"

  };


  const title =
    actions[action] ||
    "GIFTIVA Motors";


  alert(
    title +
    " selected. 🚘\n\n" +
    "This section will connect to verified vehicle sellers, rental companies and chauffeur providers."
  );

}


function searchCars() {

  const make =
    document.getElementById("car-make");

  const type =
    document.getElementById("car-type");

  const condition =
    document.getElementById("car-condition");


  const makeValue =
    make ? make.value : "";

  const typeValue =
    type ? type.value : "";

  const conditionValue =
    condition ? condition.value : "";


  if (
    !makeValue &&
    !typeValue &&
    !conditionValue
  ) {

    alert(
      "Please select at least one vehicle search option."
    );

    return;
  }


  alert(
    "Searching GIFTIVA Motors 🚘\n\n" +

    "Make: " +
    (makeValue || "Any") +

    "\n" +

    "Type: " +
    (typeValue || "Any") +

    "\n" +

    "Condition: " +
    (conditionValue || "Any") +

    "\n\n" +

    "Live vehicle listings will appear here once the Motors database is connected."
  );

}


/* ---------------------------------------------------------
   LOGIN
   --------------------------------------------------------- */

function openLogin() {

  const modal =
    document.getElementById("loginModal");

  if (modal) {
    modal.classList.add("active");
  }

}


/* ---------------------------------------------------------
   SIGN UP
   --------------------------------------------------------- */

function openSignup() {

  const modal =
    document.getElementById("signupModal");

  if (modal) {
    modal.classList.add("active");
  }

}


/* ---------------------------------------------------------
   VENDOR APPLICATION
   --------------------------------------------------------- */

function openVendorApplication() {

  const modal =
    document.getElementById("vendorModal");

  if (modal) {
    modal.classList.add("active");
  }

}


/* ---------------------------------------------------------
   CLOSE MODAL
   --------------------------------------------------------- */

function closeModal(modalId) {

  const modal =
    document.getElementById(modalId);

  if (modal) {
    modal.classList.remove("active");
  }

}


/* ---------------------------------------------------------
   DEMO SUBMISSION
   --------------------------------------------------------- */

function demoSubmit(formType) {

  const messages = {

    login:
      "Login functionality will be connected to the secure GIFTIVA customer account system.",

    signup:
      "Your GIFTIVA account registration will be connected to the secure customer system.",

    vendor:
      "Your vendor application will be sent to the GIFTIVA verification team."

  };


  alert(
    messages[formType] ||
    "Your information will be securely processed by GIFTIVA."
  );


  if (formType === "login") {
    closeModal("loginModal");
  }

  if (formType === "signup") {
    closeModal("signupModal");
  }

  if (formType === "vendor") {
    closeModal("vendorModal");
  }

}


/* ---------------------------------------------------------
   ORDER TRACKING
   --------------------------------------------------------- */

function trackOrder() {

  const input =
    document.getElementById("trackingNumber");


  if (!input) return;


  const trackingNumber =
    input.value.trim();


  if (!trackingNumber) {

    alert(
      "Please enter your GIFTIVA tracking number."
    );

    return;
  }


  alert(
    "Tracking number: " +
    trackingNumber +

    "\n\nOrder confirmed ✓" +

    "\n\nYour full live tracking timeline will appear here once the GIFTIVA order system is connected."
  );

}


/* ---------------------------------------------------------
   CLOSE MODALS BY CLICKING OUTSIDE
   --------------------------------------------------------- */

document.addEventListener(
  "click",
  function(event) {

    if (
      event.target.classList.contains("modal")
    ) {

      event.target.classList.remove(
        "active"
      );

    }

  }
);


/* ---------------------------------------------------------
   ESCAPE KEY
   --------------------------------------------------------- */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key !== "Escape") {
      return;
    }


    document
      .querySelectorAll(".modal.active")
      .forEach(function(modal) {

        modal.classList.remove(
          "active"
        );

      });

  }
);


/* ---------------------------------------------------------
   PAGE INITIALIZATION
   --------------------------------------------------------- */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    const country =
      document.getElementById("country");

    const region =
      document.getElementById("region");


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


    console.log(
      "GIFTIVA Marketplace loaded successfully. 🌍🎁"
    );

  }
);
