/* =========================================================
   TravelNestJourney — Shared Data Layer (Packages & Destinations)
   In a real system this would come from the backend database
   via REST API / PHP+MySQL. Here it's simulated with JS + localStorage
   so the whole frontend flow (browse -> book -> pay -> dashboard) works.
========================================================= */

const DESTINATIONS = [
  { id: "coxsbazar", name: "Cox's Bazar, Bangladesh", img: "assets/images/destinations/coxsbazar.jpg", video: "assets/videos/coxsbazar.mp4", packages: 6, from: 8500 },
  { id: "sajek", name: "Sajek Valley, Bangladesh", img: "assets/images/destinations/sajek.jpg", video: "assets/videos/sajek.mp4", packages: 4, from: 6500 },
  { id: "sundarbans", name: "Sundarbans, Bangladesh", img: "assets/images/destinations/sundarbans.jpg", video: "assets/videos/sundarbans.mp4", packages: 3, from: 9500 },
  { id: "maldives", name: "Maldives", img: "assets/images/destinations/maldives.jpg", video: "assets/videos/maldives.mp4", packages: 8, from: 65000 },
  { id: "bali", name: "Bali, Indonesia", img: "assets/images/destinations/bali.jpg", video: "assets/videos/bali.mp4", packages: 10, from: 48000 },
  { id: "dubai", name: "Dubai, UAE", img: "assets/images/destinations/dubai.jpg", video: "assets/videos/dubai.mp4", packages: 7, from: 55000 },
  { id: "paris", name: "Paris, France", img: "assets/images/destinations/paris.jpg", video: "assets/videos/paris.mp4", packages: 5, from: 120000 },
  { id: "switzerland", name: "Switzerland", img: "assets/images/destinations/switzerland.jpg", video: "assets/videos/switzerland.mp4", packages: 6, from: 145000 },
  { id: "santorini", name: "Santorini, Greece", img: "assets/images/destinations/santorini.jpg", video: "assets/videos/santorini.mp4", packages: 4, from: 98000 },
  { id: "phuket", name: "Phuket, Thailand", img: "assets/images/destinations/phuket.jpg", video: "assets/videos/phuket.mp4", packages: 9, from: 38000 },
  { id: "kashmir", name: "Kashmir, India", img: "assets/images/destinations/kashmir.jpg", video: "assets/videos/kashmir.mp4", packages: 5, from: 42000 },
];

const PACKAGES = [
  {
    id: "pkg-001", title: "Cox's Bazar Beach Escape", destId: "coxsbazar", category: "Beach",
    img: "assets/images/destinations/coxsbazar.jpg", duration: "3 Days / 2 Nights", groupSize: "Up to 10",
    price: 8500, oldPrice: 10500, rating: 0, reviews: 0, badge: "Beach",
    summary: "Relax on the world's longest natural sea beach with a fully guided coastal getaway including hotel stay, local sightseeing and sunset cruise.",
    highlights: ["Beachfront hotel stay", "Himchari & Inani beach tour", "Sunset boat cruise", "Local seafood dinner"],
    itinerary: [
      { day: 1, title: "Arrival & Beach Relaxation", desc: "Arrive at Cox's Bazar, check-in to hotel, evening free at the beach." },
      { day: 2, title: "Himchari & Inani Tour", desc: "Full-day sightseeing of Himchari waterfall, Inani beach and coral point." },
      { day: 3, title: "Sunset Cruise & Departure", desc: "Morning shopping at Burmese market, sunset boat cruise, departure." },
    ],
    includes: ["Hotel accommodation", "Breakfast & dinner", "AC transport", "Tour guide", "Boat cruise ticket"],
    excludes: ["Personal expenses", "Lunch", "Travel insurance"],
  },
  {
    id: "pkg-002", title: "Sajek Valley Cloud Trek", destId: "sajek", category: "Adventure",
    img: "assets/images/destinations/sajek.jpg", duration: "2 Days / 1 Night", groupSize: "Up to 8",
    price: 6500, oldPrice: 7800, rating: 0, reviews: 0, badge: "Adventure",
    summary: "Chase the clouds in the 'Darjeeling of Bangladesh' — cottage stay, sunrise viewpoint and tribal village walk.",
    highlights: ["Konglak hill sunrise", "Tribal village walk", "Cottage stay with valley view", "Bonfire evening"],
    itinerary: [
      { day: 1, title: "Journey to Sajek", desc: "Travel via Chandraghona, army escort, check-in cottage, evening bonfire." },
      { day: 2, title: "Sunrise & Return", desc: "Sunrise at Konglak hill, village walk, departure back to Dhaka." },
    ],
    includes: ["Cottage stay", "All meals", "Jeep/Chander gari transport", "Army escort fee"],
    excludes: ["Personal expenses", "Entry tickets not mentioned"],
  },
  {
    id: "pkg-003", title: "Sundarbans Mangrove Safari", destId: "sundarbans", category: "Adventure",
    img: "assets/images/destinations/sundarbans.jpg", duration: "3 Days / 2 Nights", groupSize: "Up to 20",
    price: 9500, oldPrice: 11000, rating: 0, reviews: 0, badge: "Eco Tour",
    summary: "Cruise through the world's largest mangrove forest on a live-aboard boat, spotting wildlife along the way.",
    highlights: ["Live-aboard boat stay", "Wildlife spotting (deer, crocodile)", "Watch tower visit", "Village canal cruise"],
    itinerary: [
      { day: 1, title: "Departure & Cruise", desc: "Board the boat, cruise into Sundarbans, evening canal ride." },
      { day: 2, title: "Deep Forest Exploration", desc: "Karamjal & Kotka visit, watch tower, wildlife spotting." },
      { day: 3, title: "Return Journey", desc: "Morning canal ride, breakfast, return to city." },
    ],
    includes: ["Boat cabin stay", "All meals", "Forest permit", "Guide"],
    excludes: ["Personal expenses", "Camera fee"],
  },
  {
    id: "pkg-004", title: "Maldives Overwater Bliss", destId: "maldives", category: "Honeymoon",
    img: "assets/images/destinations/maldives.jpg", duration: "5 Days / 4 Nights", groupSize: "Up to 2",
    price: 65000, oldPrice: 78000, rating: 0, reviews: 0, badge: "Luxury",
    summary: "A dreamy honeymoon in an overwater villa surrounded by turquoise lagoons, private beach and spa.",
    highlights: ["Overwater villa stay", "Private sunset cruise", "Snorkeling with reef sharks", "Couple's spa session"],
    itinerary: [
      { day: 1, title: "Arrival in Paradise", desc: "Speedboat transfer to resort, welcome drink, villa check-in." },
      { day: 2, title: "Snorkeling & Beach", desc: "Guided snorkeling tour, free beach time, sunset dinner." },
      { day: 3, title: "Spa & Island Hopping", desc: "Couple's spa, local island visit, evening cruise." },
      { day: 4, title: "Water Sports", desc: "Jet ski, kayaking, free leisure time." },
      { day: 5, title: "Departure", desc: "Breakfast, checkout, speedboat transfer to airport." },
    ],
    includes: ["Villa accommodation", "All meals", "Airport speedboat transfer", "One spa session"],
    excludes: ["International airfare", "Visa fee", "Alcoholic beverages"],
  },
  {
    id: "pkg-005", title: "Bali Cultural & Beach Tour", destId: "bali", category: "Honeymoon",
    img: "assets/images/destinations/bali.jpg", duration: "6 Days / 5 Nights", groupSize: "Up to 6",
    price: 48000, oldPrice: 56000, rating: 0, reviews: 0, badge: "Honeymoon",
    summary: "Explore rice terraces, ancient temples and pristine beaches on this complete Bali experience.",
    highlights: ["Tanah Lot temple sunset", "Ubud rice terrace tour", "Kuta beach free time", "Traditional dance show"],
    itinerary: [
      { day: 1, title: "Arrival Denpasar", desc: "Airport pickup, check-in, welcome dinner." },
      { day: 2, title: "Ubud Exploration", desc: "Rice terraces, monkey forest, art market." },
      { day: 3, title: "Temple Tour", desc: "Tanah Lot & Uluwatu temple sunset with kecak dance." },
      { day: 4, title: "Beach Day", desc: "Free time at Kuta / Seminyak beach." },
      { day: 5, title: "Nusa Penida Island Trip", desc: "Full day island hopping tour." },
      { day: 6, title: "Departure", desc: "Souvenir shopping, airport transfer." },
    ],
    includes: ["Hotel stay", "Daily breakfast", "AC vehicle", "English speaking guide"],
    excludes: ["International airfare", "Visa", "Lunch/Dinner unless mentioned"],
  },
  {
    id: "pkg-006", title: "Dubai Luxury City Tour", destId: "dubai", category: "City",
    img: "assets/images/destinations/dubai.jpg", duration: "4 Days / 3 Nights", groupSize: "Up to 15",
    price: 55000, oldPrice: 64000, rating: 0, reviews: 0, badge: "City Tour",
    summary: "Experience the glitz of Dubai — Burj Khalifa, desert safari, Dubai Mall and luxury shopping.",
    highlights: ["Burj Khalifa 124th floor", "Desert safari with BBQ dinner", "Dubai Mall & Fountain show", "Marina cruise"],
    itinerary: [
      { day: 1, title: "Arrival & Marina Cruise", desc: "Airport pickup, evening Dubai Marina dinner cruise." },
      { day: 2, title: "City Tour", desc: "Burj Khalifa, Dubai Mall, fountain show." },
      { day: 3, title: "Desert Safari", desc: "Dune bashing, camel ride, BBQ dinner with live show." },
      { day: 4, title: "Departure", desc: "Free time for shopping, airport transfer." },
    ],
    includes: ["4-star hotel", "Daily breakfast", "Burj Khalifa ticket", "Desert safari with dinner"],
    excludes: ["International airfare", "Visa fee", "Personal expenses"],
  },
  {
    id: "pkg-007", title: "Paris Romantic Getaway", destId: "paris", category: "Honeymoon",
    img: "assets/images/destinations/paris.jpg", duration: "5 Days / 4 Nights", groupSize: "Up to 4",
    price: 120000, oldPrice: 138000, rating: 0, reviews: 0, badge: "Luxury",
    summary: "Fall in love with the city of lights — Eiffel Tower, Seine river cruise, Louvre and charming cafes.",
    highlights: ["Eiffel Tower summit access", "Seine river dinner cruise", "Louvre Museum guided tour", "Versailles day trip"],
    itinerary: [
      { day: 1, title: "Arrival in Paris", desc: "Airport transfer, evening Eiffel Tower visit." },
      { day: 2, title: "Museums & Landmarks", desc: "Louvre Museum, Notre-Dame, Champs-Élysées walk." },
      { day: 3, title: "Versailles Day Trip", desc: "Full day excursion to Palace of Versailles." },
      { day: 4, title: "Seine Cruise", desc: "Free morning, evening Seine river dinner cruise." },
      { day: 5, title: "Departure", desc: "Breakfast, souvenir shopping, airport transfer." },
    ],
    includes: ["Boutique hotel stay", "Daily breakfast", "Museum entry tickets", "Seine river cruise"],
    excludes: ["International airfare", "Visa fee", "Lunch/Dinner unless mentioned"],
  },
  {
    id: "pkg-008", title: "Switzerland Alpine Adventure", destId: "switzerland", category: "Adventure",
    img: "assets/images/destinations/switzerland.jpg", duration: "7 Days / 6 Nights", groupSize: "Up to 10",
    price: 145000, oldPrice: 165000, rating: 0, reviews: 0, badge: "Premium",
    summary: "Ride scenic trains through the Alps, visit Jungfraujoch and cruise pristine lakes.",
    highlights: ["Jungfraujoch 'Top of Europe'", "Lake Lucerne cruise", "Scenic Glacier Express train", "Interlaken adventure sports"],
    itinerary: [
      { day: 1, title: "Arrival Zurich", desc: "Airport pickup, city orientation walk." },
      { day: 2, title: "Lucerne", desc: "Chapel Bridge, Lake Lucerne cruise." },
      { day: 3, title: "Interlaken", desc: "Scenic train ride, free adventure activities." },
      { day: 4, title: "Jungfraujoch", desc: "Full day trip to 'Top of Europe'." },
      { day: 5, title: "Zermatt", desc: "Matterhorn viewpoint, village walk." },
      { day: 6, title: "Geneva", desc: "Lake Geneva, city tour." },
      { day: 7, title: "Departure", desc: "Breakfast, airport transfer." },
    ],
    includes: ["Hotel stay", "Daily breakfast", "Swiss Travel Pass", "Jungfraujoch ticket"],
    excludes: ["International airfare", "Visa fee", "Personal expenses"],
  },
  {
    id: "pkg-009", title: "Santorini Island Romance", destId: "santorini", category: "Honeymoon",
    img: "assets/images/destinations/santorini.jpg", duration: "4 Days / 3 Nights", groupSize: "Up to 2",
    price: 98000, oldPrice: 112000, rating: 0, reviews: 0, badge: "Luxury",
    summary: "Watch the world-famous Oia sunset from a caldera-view suite in this dreamy Greek island.",
    highlights: ["Caldera view suite", "Catamaran sunset cruise", "Oia village sunset walk", "Wine tasting tour"],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Ferry/flight to Santorini, check-in caldera suite." },
      { day: 2, title: "Oia Village", desc: "Explore Oia, famous sunset viewpoint." },
      { day: 3, title: "Catamaran Cruise", desc: "Sunset sailing cruise with dinner." },
      { day: 4, title: "Departure", desc: "Wine tasting tour, airport/ferry transfer." },
    ],
    includes: ["Suite accommodation", "Daily breakfast", "Catamaran cruise", "Wine tasting tour"],
    excludes: ["International airfare", "Visa fee", "Lunch/Dinner unless mentioned"],
  },
  {
    id: "pkg-010", title: "Phuket Island Hopping", destId: "phuket", category: "Beach",
    img: "assets/images/destinations/phuket.jpg", duration: "4 Days / 3 Nights", groupSize: "Up to 12",
    price: 38000, oldPrice: 45000, rating: 0, reviews: 0, badge: "Beach",
    summary: "Hop between the stunning islands of Phang Nga Bay on a longtail boat, snorkel and relax on white beaches.",
    highlights: ["Phi Phi Island day trip", "James Bond Island tour", "Snorkeling", "Patong beach nightlife"],
    itinerary: [
      { day: 1, title: "Arrival Phuket", desc: "Airport pickup, Patong beach evening." },
      { day: 2, title: "Phi Phi Islands", desc: "Full day speedboat tour, snorkeling, Maya Bay." },
      { day: 3, title: "James Bond Island", desc: "Phang Nga Bay canoe tour, sea cave exploration." },
      { day: 4, title: "Departure", desc: "Free morning, airport transfer." },
    ],
    includes: ["Hotel stay", "Daily breakfast", "Island tour tickets", "Snorkeling gear"],
    excludes: ["International airfare", "Visa fee", "Personal expenses"],
  },
  {
    id: "pkg-011", title: "Kashmir Paradise Tour", destId: "kashmir", category: "Family",
    img: "assets/images/destinations/kashmir.jpg", duration: "6 Days / 5 Nights", groupSize: "Up to 8",
    price: 42000, oldPrice: 50000, rating: 0, reviews: 0, badge: "Family Special",
    summary: "Experience 'heaven on earth' with houseboat stay on Dal Lake, Gulmarg gondola ride and Mughal gardens.",
    highlights: ["Dal Lake houseboat stay", "Gulmarg gondola ride", "Shikara boat ride", "Mughal Garden visit"],
    itinerary: [
      { day: 1, title: "Arrival Srinagar", desc: "Airport pickup, houseboat check-in, evening shikara ride." },
      { day: 2, title: "Srinagar City", desc: "Mughal gardens, local market." },
      { day: 3, title: "Gulmarg Excursion", desc: "Gondola cable car ride, snow point visit." },
      { day: 4, title: "Pahalgam Excursion", desc: "Betaab valley, Aru valley visit." },
      { day: 5, title: "Sonmarg Excursion", desc: "Thajiwas glacier, meadows visit." },
      { day: 6, title: "Departure", desc: "Breakfast, airport transfer." },
    ],
    includes: ["Houseboat & hotel stay", "Daily breakfast & dinner", "Private vehicle", "Gondola tickets"],
    excludes: ["Airfare", "Lunch", "Personal expenses"],
  },
  {
    id: "pkg-012", title: "Dubai Family Fun Package", destId: "dubai", category: "Family",
    img: "assets/images/destinations/dubai.jpg", duration: "5 Days / 4 Nights", groupSize: "Up to 6",
    price: 62000, oldPrice: 72000, rating: 0, reviews: 0, badge: "Family Special",
    summary: "A fun-filled Dubai trip for the whole family with theme parks, aquarium and beach time.",
    highlights: ["IMG Worlds of Adventure", "Dubai Aquarium & Underwater Zoo", "Jumeirah beach day", "Kite Beach picnic"],
    itinerary: [
      { day: 1, title: "Arrival", desc: "Airport pickup, hotel check-in, Jumeirah beach evening." },
      { day: 2, title: "Theme Park Day", desc: "Full day at IMG Worlds of Adventure." },
      { day: 3, title: "Aquarium & Mall", desc: "Dubai Aquarium, Dubai Mall fountain show." },
      { day: 4, title: "Beach & Leisure", desc: "Kite beach picnic, free leisure time." },
      { day: 5, title: "Departure", desc: "Breakfast, airport transfer." },
    ],
    includes: ["Family rooms", "Daily breakfast", "Theme park tickets", "Aquarium tickets"],
    excludes: ["International airfare", "Visa fee", "Personal expenses"],
  },
];

// ------------------- Helper functions -------------------
function formatBDT(n){
  return "৳ " + Number(n).toLocaleString("en-US");
}

function getPackageById(id){
  return PACKAGES.find(p => p.id === id);
}

function getDestinationById(id){
  return DESTINATIONS.find(d => d.id === id);
}

function getVideoForPackage(p){
  const dest = getDestinationById(p.destId);
  return dest ? dest.video : null;
}

function starString(rating){
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let s = "";
  for(let i=0;i<full;i++) s += '<i class="fa-solid fa-star"></i>';
  if(half) s += '<i class="fa-solid fa-star-half-stroke"></i>';
  for(let i=full+ (half?1:0); i<5; i++) s += '<i class="fa-regular fa-star"></i>';
  return s;
}

/* =========================================================
   REVIEW SYSTEM — starts at 0 rating / 0 reviews for every package.
   Real reviews are only added when a logged-in user, who has an actual
   booking for that package, submits a rating + comment. Everything is
   stored in localStorage under "tnj_reviews" so it persists per browser.
========================================================= */
function getAllReviews(){
  return JSON.parse(localStorage.getItem("tnj_reviews") || "[]");
}

function getReviewsForPackage(packageId){
  return getAllReviews().filter(r => r.packageId === packageId);
}

function getRatingStats(packageId){
  const reviews = getReviewsForPackage(packageId);
  if(!reviews.length) return { rating: 0, count: 0 };
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { rating: Math.round(avg * 10) / 10, count: reviews.length };
}

function addReview(packageId, userId, userName, rating, comment){
  const reviews = getAllReviews();
  reviews.push({
    packageId, userId, userName, rating, comment,
    date: new Date().toISOString(),
  });
  localStorage.setItem("tnj_reviews", JSON.stringify(reviews));
}

function hasUserBookedPackage(userId, packageId){
  if(!userId) return false;
  const bookings = JSON.parse(localStorage.getItem("tnj_bookings") || "[]");
  return bookings.some(b => b.userId === userId && b.packageId === packageId);
}

function hasUserReviewedPackage(userId, packageId){
  return getAllReviews().some(r => r.userId === userId && r.packageId === packageId);
}
