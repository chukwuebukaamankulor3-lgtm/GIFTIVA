/* =========================================================
   GIFTIVA — Main JavaScript
   Send Love. Anywhere. 🌍🎁
   ========================================================= */

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

  "Canada": {
    "Ontario": ["Toronto", "Ottawa", "Hamilton"],
    "Quebec": ["Montreal", "Quebec City", "Laval"],
    "British Columbia": ["Vancouver", "Victoria", "Surrey"],
    "Alberta": ["Calgary", "Edmonton", "Red Deer"]
  },

  "France": {
    "Île-de-France": ["Paris", "Versailles", "Boulogne-Billancourt"],
    "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Cannes"],
    "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Annecy"]
  },

  "Germany": {
    "Bavaria": ["Munich", "Nuremberg", "Augsburg"],
    "Berlin": ["Berlin"],
    "Hesse": ["Frankfurt", "Wiesbaden", "Darmstadt"]
  },

  "Italy": {
    "Lazio": ["Rome", "Fiumicino", "Viterbo"],
    "Lombardy": ["Milan", "Bergamo", "Brescia"],
    "Campania": ["Naples", "Salerno", "Caserta"]
  },

  "Spain": {
    "Madrid": ["Madrid", "Alcalá de Henares"],
    "Catalonia": ["Barcelona", "Girona", "Tarragona"],
    "Andalusia": ["Seville", "Malaga", "Granada"]
  },

  "Netherlands": {
    "North Holland": ["Amsterdam", "Haarlem", "Zaandam"],
    "South Holland": ["Rotterdam", "The Hague", "Leiden"],
    "Utrecht": ["Utrecht", "Amersfoort"]
  },

  "Ireland": {
    "Leinster": ["Dublin", "Drogheda", "Kilkenny"],
    "Munster": ["Cork", "Limerick", "Waterford"],
    "Connacht": ["Galway", "Sligo"]
  },

  "Australia": {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
    "Victoria": ["Melbourne", "Geelong", "Ballarat"],
    "Queensland": ["Brisbane", "Gold Coast", "Cairns"],
    "Western Australia": ["Perth", "Fremantle", "Bunbury"]
  },

  "New Zealand": {
    "Auckland": ["Auckland"],
    "Wellington": ["Wellington"],
    "Canterbury": ["Christchurch", "Timaru"]
  },

  "South Africa": {
    "Gauteng": ["Johannesburg", "Pretoria", "Sandton"],
    "Western Cape": ["Cape Town", "Stellenbosch", "Paarl"],
    "KwaZulu-Natal": ["Durban", "Pietermaritzburg"]
  },

  "Ghana": {
    "Greater Accra": ["Accra", "Tema", "Madina"],
    "Ashanti": ["Kumasi", "Obuasi", "Ejisu"],
    "Western": ["Takoradi", "Tarkwa"]
  },

  "Kenya": {
    "Nairobi County": ["Nairobi"],
    "Mombasa County": ["Mombasa"],
    "Kiambu County": ["Thika", "Ruiru", "Kiambu"]
  },

  "United Arab Emirates": {
    "Dubai": ["Dubai"],
    "Abu Dhabi": ["Abu Dhabi"],
    "Sharjah": ["Sharjah"]
  }
};


/* ---------------------------------------------------------
   HELPER FUNCTIONS
   --------------------------------------------------------- */

function getElement(id) {
  return document.getElementById(id);
}

function safelyRun(callback) {
  try {
    callback();
  } catch (error) {
    console.error("GIFTIVA error:", error);
  }
}


/* ---------------------------------------------------------
   COUNTRY → STATE/REGION → CITY
   --------------------------------------------------------- */

function updateRegions() {
  const country = getElement("country");
  const region = getElement("region");
  const city = getElement("city");

  if (!country || !region || !city) return;

  region.innerHTML = '<option value="">Select State / Region</option>';
  city.innerHTML = '<option value="">Select City</option>';

  const countryData = locations[country.value];

  if (!countryData) return;

  Object.keys(countryData).forEach(function (regionName) {
    const option = document.createElement("option");
    option.value = regionName;
    option.textContent = regionName;
    region.appendChild(option);
  });
}

function updateCities() {
  const country = getElement("country");
  const region = getElement("region");
  const city = getElement("city");

  if (!country || !region || !city) return;

  city.innerHTML = '<option value="">Select City</option>';

  const countryData = locations[country.value];

  if (!countryData || !countryData[region.value]) return;

  countryData[region.value].forEach(function (cityName) {
    const option = document.createElement("option");
    option.value = cityName;
    option.textContent = cityName;
    city.appendChild(option);
  });
}


/* ---------------------------------------------------------
   MARKETPLACE SEARCH
   --------------------------------------------------------- */

function findItems() {
  const country = getElement("country");
  const region = getElement("region");
  const city = getElement("city");
  const category = getElement("category");

  const selectedCountry = country ? country.value : "";
  const selectedRegion = region ? region.value : "";
  const selectedCity = city ? city.value : "";
  const selectedCategory = category ? category.value : "";

  if (!selectedCountry) {
    alert("Please select a destination country.");
    return;
  }

  let message = "Showing GIFTIVA options";

  if (selectedCity) {
    message += " in " + selectedCity;
  } else if (selectedRegion) {
    message +=
