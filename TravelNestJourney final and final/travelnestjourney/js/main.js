/* =========================================================
   TravelNestJourney — Main JS (UI interactions + simulated backend)
   NOTE: This is a front-end prototype. "Backend" actions (auth, booking,
   payment) are simulated using localStorage so the whole user journey
   can be demonstrated without a live server. Replace these functions with
   real API calls when connecting to PHP/Node + MySQL backend.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initNavbar();
  initMobileNav();
  initRevealOnScroll();
  initScrollProgressBar();
  initParallax();
  initStepScrollActivation();
  initBackToTop();
  initAccordion();
  initTabs();
  initNewsletter();
  initContactForm();
  initAuthForms();
  renderFeaturedDestinations();
  renderFeaturedPackages();
  renderAllDestinations();
  renderAllPackages();
  renderPackageDetail();
  renderHomeTestimonials();
  initBookingFlow();
  renderDashboard();
  initFilterBar();
  initSearchWidget();
  updateNavAuthState();
  setActiveNavLink();
  initCounters();
});

/* ---------------- Home page testimonials (real reviews only) ---------------- */
function renderHomeTestimonials(){
  const wrap = document.getElementById("homeTestimonials");
  if(!wrap) return;
  const allReviews = getAllReviews().sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  if(!allReviews.length){
    wrap.innerHTML = `
      <div class="testimonial-card reveal" style="grid-column: 1 / -1; text-align:center;">
        <i class="fa-regular fa-comments" style="font-size:2.4rem; color:#dfe4ea; margin-bottom:16px; display:block;"></i>
        <h3 style="margin-bottom:8px;">No Reviews Yet</h3>
        <p style="margin:0;">Be our first traveler to book a package and share your experience! Every review here comes from a real, verified booking &mdash; no fake ratings, ever.</p>
      </div>`;
    return;
  }

  wrap.innerHTML = allReviews.map(r => {
    const pkg = getPackageById(r.packageId);
    return `
      <div class="testimonial-card reveal">
        <div class="quote-icon"><i class="fa-solid fa-quote-left"></i></div>
        <p>"${r.comment}"</p>
        <div class="testimonial-user">
          <div>
            <h4>${r.userName}</h4>
            <span>${pkg ? pkg.title : ""}</span>
          </div>
        </div>
        <div class="testimonial-rating">${starString(r.rating)}</div>
      </div>`;
  }).join("");
  initRevealOnScroll();
}

/* ---------------- Scroll Progress Bar ---------------- */
function initScrollProgressBar(){
  const bar = document.querySelector(".scroll-progress-bar .fill");
  if(!bar) return;
  // Skip JS animation if the browser already supports native CSS scroll-driven animation
  if(CSS && CSS.supports && CSS.supports("animation-timeline: scroll()")) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------------- Parallax backgrounds (scroll-driven) ---------------- */
function initParallax(){
  const layers = document.querySelectorAll("[data-parallax]");
  if(!layers.length) return;
  // If native CSS scroll-timeline parallax were reliable across browsers we'd use it,
  // but background-position parallax needs JS for consistent cross-browser support.
  let ticking = false;
  const update = () => {
    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.parallax) || 0.2;
      const rect = layer.parentElement.getBoundingClientRect();
      const offset = rect.top * speed;
      layer.style.transform = `translate3d(0, ${offset}px, 0) scale(1.15)`;
    });
    ticking = false;
  };
  const onScroll = () => {
    if(!ticking){ requestAnimationFrame(update); ticking = true; }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

/* ---------------- "How It Works" scroll-linked step activation ---------------- */
function initStepScrollActivation(){
  const steps = document.querySelectorAll("#how-it-works .step-card");
  if(!steps.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const idx = Array.from(steps).indexOf(entry.target);
        // Activate this step and all previous ones in sequence for a cascading fill effect
        steps.forEach((s, i) => {
          if(i <= idx) setTimeout(() => s.classList.add("step-active"), (i) * 150);
        });
      }
    });
  }, { threshold: 0.6 });
  steps.forEach(s => obs.observe(s));
}

/* ---------------- Preloader ---------------- */
function initPreloader(){
  const pre = document.getElementById("preloader");
  if(!pre) return;
  window.addEventListener("load", () => {
    setTimeout(()=> pre.classList.add("hide"), 400);
  });
  setTimeout(()=> pre.classList.add("hide"), 1800);
}

/* ---------------- Navbar scroll effect ---------------- */
function initNavbar(){
  const nav = document.querySelector(".navbar");
  if(!nav) return;
  const onScroll = () => {
    if(window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll);
  onScroll();
}

function setActiveNavLink(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === path) a.classList.add("active");
  });
}

/* ---------------- Mobile nav ---------------- */
function initMobileNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if(!toggle || !links) return;
  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
    toggle.innerHTML = links.classList.contains("open") ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));
}

/* ---------------- Reveal on scroll ---------------- */
function initRevealOnScroll(){
  const items = document.querySelectorAll(".reveal");
  if(!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("in-view"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(i => obs.observe(i));
}

/* Auto-tag common elements as reveal targets when page loads (progressive enhancement) */
function autoReveal(container){
  container.querySelectorAll(".dest-card, .pkg-card, .feature-card, .testimonial-card, .step-card").forEach((el,i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 4) * 0.08 + "s";
  });
  initRevealOnScroll();
}

/* ---------------- Back to top ---------------- */
function initBackToTop(){
  const btn = document.querySelector(".back-to-top");
  if(!btn) return;
  window.addEventListener("scroll", () => {
    if(window.scrollY > 500) btn.classList.add("show");
    else btn.classList.remove("show");
  });
  btn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
}

/* ---------------- Live Site Stats (computed from real localStorage data, no fake numbers) ---------------- */
function computeLiveStat(key){
  const bookings = JSON.parse(localStorage.getItem("tnj_bookings") || "[]");
  const users = JSON.parse(localStorage.getItem("tnj_users") || "[]");
  const reviews = getAllReviews();
  switch(key){
    case "happyTravelers": {
      // Count unique users who have at least one confirmed booking, plus guest bookings
      const uniqueTravelers = new Set(bookings.map(b => b.userId || b.email));
      return uniqueTravelers.size;
    }
    case "destinations":
      return DESTINATIONS.length;
    case "packages":
      return PACKAGES.length;
    case "tripsDelivered":
      return bookings.filter(b => b.status === "confirmed").length;
    case "satisfaction": {
      if(!reviews.length) return 0;
      const avg = reviews.reduce((s,r) => s + r.rating, 0) / reviews.length;
      return Math.round((avg / 5) * 100);
    }
    case "yearsActive":
      return 0; // brand new platform — no inflated "years of trust" claim
    default:
      return 0;
  }
}

/* ---------------- Counters (stats) ---------------- */
function initCounters(){
  const counters = document.querySelectorAll("[data-count]");
  if(!counters.length) return;

  // Fill in real values before animating, for elements tagged with data-stat
  counters.forEach(el => {
    if(el.dataset.stat){
      const val = computeLiveStat(el.dataset.stat);
      el.dataset.count = val;
    }
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        if(target === 0){ el.textContent = "0"; obs.unobserve(el); return; }
        let cur = 0;
        const step = Math.max(1, Math.ceil(target/60));
        const tick = () => {
          cur += step;
          if(cur >= target){ el.textContent = target.toLocaleString(); }
          else { el.textContent = cur.toLocaleString(); requestAnimationFrame(tick); }
        };
        tick();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => obs.observe(c));
}

/* ---------------- Accordion (FAQ) ---------------- */
function initAccordion(){
  document.querySelectorAll(".accordion-item .accordion-head").forEach(head => {
    head.addEventListener("click", () => {
      const item = head.closest(".accordion-item");
      const wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("open"));
      if(!wasOpen) item.classList.add("open");
    });
  });
}

/* ---------------- Tabs (Package detail) ---------------- */
function initTabs(){
  document.querySelectorAll(".tab-buttons").forEach(tabGroup => {
    tabGroup.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        tabGroup.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const contentWrap = tabGroup.parentElement;
        contentWrap.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        const target_el = contentWrap.querySelector(`#${target}`);
        if(target_el) target_el.classList.add("active");
      });
    });
  });
}

/* ---------------- Newsletter (fake subscribe) ---------------- */
function initNewsletter(){
  const form = document.getElementById("newsletterForm");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("newsletterMsg");
    if(msg){
      msg.textContent = "🎉 Thank you! You are subscribed for exclusive travel deals.";
      msg.style.color = "#f6d98a";
    }
    form.reset();
  });
}

/* ---------------- Contact form (fake submit) ---------------- */
function initContactForm(){
  const form = document.getElementById("contactForm");
  if(!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("contactAlert").style.display = "flex";
    form.reset();
    setTimeout(() => document.getElementById("contactAlert").style.display = "none", 5000);
  });
}

/* =========================================================
   SIMULATED AUTH SYSTEM (localStorage based)
========================================================= */
function getUsers(){ return JSON.parse(localStorage.getItem("tnj_users") || "[]"); }
function saveUsers(users){ localStorage.setItem("tnj_users", JSON.stringify(users)); }
function getCurrentUser(){ return JSON.parse(localStorage.getItem("tnj_current_user") || "null"); }
function setCurrentUser(user){ localStorage.setItem("tnj_current_user", JSON.stringify(user)); }
function logoutUser(){ localStorage.removeItem("tnj_current_user"); window.location.href = "index.html"; }

function updateNavAuthState(){
  const user = getCurrentUser();
  const authArea = document.querySelector(".nav-auth-area");
  const mobileAuthArea = document.querySelector(".nav-mobile-auth");
  const html = user ? `
      <a href="dashboard.html" class="btn btn-teal btn-sm"><i class="fa-solid fa-user"></i> ${user.name.split(" ")[0]}</a>
      <a href="#" class="btn btn-outline btn-sm logout-btn">Logout</a>
    ` : `
      <a href="login.html" class="btn btn-outline btn-sm">Login</a>
      <a href="register.html" class="btn btn-gold btn-sm">Sign Up</a>
    `;
  if(authArea) authArea.innerHTML = html;
  if(mobileAuthArea) mobileAuthArea.innerHTML = html;
  document.querySelectorAll(".logout-btn").forEach(b => b.addEventListener("click", (e)=>{ e.preventDefault(); logoutUser(); }));
}

function initAuthForms(){
  const registerForm = document.getElementById("registerForm");
  if(registerForm){
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("regName").value.trim();
      const email = document.getElementById("regEmail").value.trim().toLowerCase();
      const phone = document.getElementById("regPhone").value.trim();
      const password = document.getElementById("regPassword").value;
      const errorBox = document.getElementById("authError");

      let users = getUsers();
      if(users.find(u => u.email === email)){
        errorBox.textContent = "This email is already registered. Please login.";
        errorBox.style.display = "flex";
        return;
      }
      const newUser = { id: "U" + Date.now(), name, email, phone, password };
      users.push(newUser);
      saveUsers(users);
      setCurrentUser({ id: newUser.id, name, email });
      window.location.href = "dashboard.html";
    });
  }

  const loginForm = document.getElementById("loginForm");
  if(loginForm){
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim().toLowerCase();
      const password = document.getElementById("loginPassword").value;
      const errorBox = document.getElementById("authError");
      const users = getUsers();
      const found = users.find(u => u.email === email && u.password === password);
      if(!found){
        errorBox.textContent = "Invalid email or password. Try again or sign up.";
        errorBox.style.display = "flex";
        return;
      }
      setCurrentUser({ id: found.id, name: found.name, email: found.email });
      window.location.href = "dashboard.html";
    });
  }
}

/* =========================================================
   RENDERING: Home page featured sections
========================================================= */
function renderFeaturedDestinations(){
  const wrap = document.getElementById("featuredDestinations");
  if(!wrap) return;
  const featured = DESTINATIONS.slice(0, 6);
  wrap.innerHTML = featured.map(destCardHTML).join("");
  initRevealOnScroll();
  initDestVideoHover(wrap);
}

function renderFeaturedPackages(){
  const wrap = document.getElementById("featuredPackages");
  if(!wrap) return;
  const featured = [...PACKAGES].sort((a,b)=>b.rating-a.rating).slice(0,6);
  wrap.innerHTML = featured.map(packageCardHTML).join("");
  initRevealOnScroll();
  initDestVideoHover(wrap);
}

function destCardHTML(d){
  return `
    <a href="packages.html?dest=${d.id}" class="dest-card reveal" data-video-card>
      <img class="dest-img" src="${d.img}" alt="${d.name}" loading="lazy">
      ${d.video ? `<video class="dest-video" muted loop playsinline preload="none" poster="${d.img}" data-src="${d.video}"></video>` : ""}
      <div class="dest-overlay">
        <span class="count">${d.packages} Packages</span>
        <h3>${d.name}</h3>
        <p>Starting from</p>
        <div class="price-tag">${formatBDT(d.from)}</div>
      </div>
    </a>
  `;
}

function packageCardHTML(p){
  const video = getVideoForPackage(p);
  const stats = getRatingStats(p.id);
  const ratingHTML = stats.count > 0
    ? `${starString(stats.rating)} <span>${stats.rating} (${stats.count} reviews)</span>`
    : `${starString(0)} <span>No reviews yet</span>`;
  return `
  <div class="pkg-card reveal">
    <div class="pkg-img" data-video-card>
      <img class="dest-img" src="${p.img}" alt="${p.title}" loading="lazy">
      ${video ? `<video class="dest-video" muted loop playsinline preload="none" poster="${p.img}" data-src="${video}"></video>` : ""}
      <span class="pkg-badge">${p.badge}</span>
      <span class="pkg-fav"><i class="fa-regular fa-heart"></i></span>
    </div>
    <div class="pkg-body">
      <div class="pkg-loc"><i class="fa-solid fa-location-dot"></i> ${getDestinationById(p.destId)?.name || ""}</div>
      <h3><a href="package-detail.html?id=${p.id}">${p.title}</a></h3>
      <div class="pkg-meta">
        <span><i class="fa-regular fa-clock"></i> ${p.duration}</span>
        <span><i class="fa-solid fa-users"></i> ${p.groupSize}</span>
      </div>
      <div class="pkg-rating">${ratingHTML}</div>
      <div class="pkg-footer">
        <div class="pkg-price">${formatBDT(p.price)}<small>per person</small></div>
        <a href="package-detail.html?id=${p.id}" class="btn btn-teal btn-sm">View Deal</a>
      </div>
    </div>
  </div>`;
}

/* ---------------- Auto-playing video cards (plays as soon as visible, no click/hover needed) ---------------- */
function initDestVideoHover(container){
  const cards = (container || document).querySelectorAll("[data-video-card]");
  if(!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      const video = card.querySelector(".dest-video");
      if(!video) return;
      if(entry.isIntersecting){
        if(!video.src) video.src = video.dataset.src;
        const p = video.play();
        if(p && p.catch) p.catch(()=>{});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });
  cards.forEach(card => {
    const video = card.querySelector(".dest-video");
    if(!video) return;
    video.addEventListener("playing", () => card.classList.add("video-active"));
    obs.observe(card);
  });
}

/* =========================================================
   RENDERING: Destinations page (full grid)
========================================================= */
function renderAllDestinations(){
  const wrap = document.getElementById("allDestinations");
  if(!wrap) return;
  wrap.innerHTML = DESTINATIONS.map(destCardHTML).join("");
  initRevealOnScroll();
  initDestVideoHover(wrap);
}

/* =========================================================
   RENDERING: Packages page (full grid + filter + query param)
========================================================= */
function renderAllPackages(){
  const wrap = document.getElementById("allPackages");
  if(!wrap) return;
  const params = new URLSearchParams(location.search);
  const destFilter = params.get("dest");
  let list = PACKAGES;
  if(destFilter) list = list.filter(p => p.destId === destFilter);
  wrap.dataset.full = "true";
  window._allPackagesCache = PACKAGES;
  wrap.innerHTML = list.map(packageCardHTML).join("");
  const countEl = document.getElementById("resultsCount");
  if(countEl) countEl.textContent = `${list.length} package${list.length !== 1 ? "s" : ""} found`;
  initRevealOnScroll();
  initDestVideoHover(wrap);
}

function initFilterBar(){
  const bar = document.getElementById("filterBar");
  if(!bar) return;
  bar.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.category;
      const wrap = document.getElementById("allPackages");
      let list = PACKAGES;
      if(cat && cat !== "all") list = list.filter(p => p.category === cat);
      wrap.innerHTML = list.map(packageCardHTML).join("");
      const countEl = document.getElementById("resultsCount");
      if(countEl) countEl.textContent = `${list.length} package${list.length !== 1 ? "s" : ""} found`;
      initRevealOnScroll();
      initDestVideoHover(wrap);
    });
  });
}

/* =========================================================
   RENDERING: Package detail page
========================================================= */
function renderPackageDetail(){
  const wrap = document.getElementById("packageDetailWrap");
  if(!wrap) return;
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || PACKAGES[0].id;
  const p = getPackageById(id) || PACKAGES[0];
  const dest = getDestinationById(p.destId);
  const video = getVideoForPackage(p);

  document.title = `${p.title} | TravelNestJourney`;

  document.getElementById("pd-title").textContent = p.title;
  document.getElementById("pd-location").textContent = dest ? dest.name : "";
  document.getElementById("pd-duration").textContent = p.duration;
  document.getElementById("pd-group").textContent = p.groupSize;
  const stats = getRatingStats(p.id);
  document.getElementById("pd-rating").innerHTML = stats.count > 0
    ? `${starString(stats.rating)} <span>${stats.rating} (${stats.count} reviews)</span>`
    : `${starString(0)} <span>No reviews yet — be the first to review!</span>`;
  document.getElementById("pd-summary").textContent = p.summary;
  document.getElementById("pd-price").textContent = formatBDT(p.price);
  document.getElementById("pd-oldprice").textContent = formatBDT(p.oldPrice);
  document.getElementById("pd-mainimg").src = p.img;
  document.getElementById("pd-bookbtn").href = `booking.html?id=${p.id}`;

  // Autoplaying gallery video (plays automatically, no click needed)
  const galleryVideo = document.getElementById("pd-gallery-video");
  if(galleryVideo){
    if(video){
      galleryVideo.src = video;
      galleryVideo.style.display = "block";
      galleryVideo.play().catch(()=>{});
    } else {
      galleryVideo.style.display = "none";
    }
  }

  document.getElementById("pd-highlights").innerHTML = p.highlights.map(h => `<li><i class="fa-solid fa-circle-check"></i> ${h}</li>`).join("");
  document.getElementById("pd-includes").innerHTML = p.includes.map(i => `<li><i class="fa-solid fa-check"></i> ${i}</li>`).join("");
  document.getElementById("pd-excludes").innerHTML = p.excludes.map(i => `<li><i class="fa-solid fa-xmark"></i> ${i}</li>`).join("");
  document.getElementById("pd-itinerary").innerHTML = p.itinerary.map(day => `
    <div class="itinerary-item">
      <div class="itinerary-day">${day.day}<span>Day</span></div>
      <div>
        <h4 style="margin-bottom:6px;">${day.title}</h4>
        <p style="margin:0;">${day.desc}</p>
      </div>
    </div>
  `).join("");

  renderReviewsSection(p);

  // Related packages
  const related = PACKAGES.filter(x => x.id !== p.id && x.category === p.category).slice(0,3);
  const relatedWrap = document.getElementById("pd-related");
  if(relatedWrap){
    relatedWrap.innerHTML = related.map(packageCardHTML).join("");
    initDestVideoHover(relatedWrap);
  }
  initRevealOnScroll();
}

/* ---------------- Reviews Section (real reviews only, from actual bookings) ---------------- */
function renderReviewsSection(p){
  const listEl = document.getElementById("pd-reviews-list");
  const formWrap = document.getElementById("pd-review-form-wrap");
  const countEl = document.getElementById("pd-reviews-count-tab");
  if(!listEl) return;

  const reviews = getReviewsForPackage(p.id).sort((a,b) => new Date(b.date) - new Date(a.date));
  if(countEl) countEl.textContent = reviews.length;

  if(!reviews.length){
    listEl.innerHTML = `
      <div style="text-align:center; padding:40px 20px; color:#6b7c8c;">
        <i class="fa-regular fa-comment-dots" style="font-size:2.2rem; color:#dfe4ea; margin-bottom:14px; display:block;"></i>
        <p style="margin:0;">No reviews yet for this package. Be the first traveler to share your experience!</p>
      </div>`;
  } else {
    listEl.innerHTML = reviews.map(r => `
      <div class="testimonial-card" style="margin-bottom:18px;">
        <div class="flex-between" style="margin-bottom:8px;">
          <h4 style="margin:0;">${r.userName}</h4>
          <span style="color:#6b7c8c; font-size:.8rem;">${new Date(r.date).toLocaleDateString()}</span>
        </div>
        <div class="testimonial-rating" style="margin:0 0 10px;">${starString(r.rating)}</div>
        <p style="margin:0;">${r.comment}</p>
      </div>
    `).join("");
  }

  if(!formWrap) return;
  const user = getCurrentUser();

  if(!user){
    formWrap.innerHTML = `
      <div class="alert alert-error">
        <i class="fa-solid fa-circle-info"></i> Please <a href="login.html" style="color:#0e9c8f;font-weight:700;">login</a> and complete a booking for this package to leave a review.
      </div>`;
    return;
  }

  if(hasUserReviewedPackage(user.id, p.id)){
    formWrap.innerHTML = `
      <div class="alert alert-success">
        <i class="fa-solid fa-circle-check"></i> Thanks! You've already reviewed this package.
      </div>`;
    return;
  }

  if(!hasUserBookedPackage(user.id, p.id)){
    formWrap.innerHTML = `
      <div class="alert alert-error">
        <i class="fa-solid fa-lock"></i> Only travelers who booked this package can leave a review. <a href="booking.html?id=${p.id}" style="color:#0e9c8f;font-weight:700;">Book now</a> to unlock reviewing.
      </div>`;
    return;
  }

  formWrap.innerHTML = `
    <div class="form-card">
      <h4 style="margin-bottom:16px;">Write Your Review</h4>
      <div class="form-group">
        <label>Your Rating</label>
        <div id="star-picker" style="font-size:1.6rem; color:#e5e9ee; display:flex; gap:8px; cursor:pointer;">
          ${[1,2,3,4,5].map(i => `<i class="fa-solid fa-star" data-star="${i}"></i>`).join("")}
        </div>
      </div>
      <div class="form-group">
        <label>Your Comment</label>
        <textarea id="review-comment" class="form-control" placeholder="Share your experience with this package..."></textarea>
      </div>
      <button id="submit-review-btn" class="btn btn-teal">Submit Review</button>
    </div>
  `;

  let selectedStars = 0;
  const starEls = formWrap.querySelectorAll("#star-picker i");
  starEls.forEach(star => {
    star.addEventListener("click", () => {
      selectedStars = parseInt(star.dataset.star, 10);
      starEls.forEach(s => {
        s.style.color = parseInt(s.dataset.star, 10) <= selectedStars ? "#e9b64a" : "#e5e9ee";
      });
    });
  });

  formWrap.querySelector("#submit-review-btn").addEventListener("click", () => {
    const comment = formWrap.querySelector("#review-comment").value.trim();
    if(selectedStars === 0){ alert("Please select a star rating."); return; }
    if(!comment){ alert("Please write a short comment."); return; }
    addReview(p.id, user.id, user.name, selectedStars, comment);
    renderReviewsSection(p);
  });
}


/* =========================================================
   BOOKING FLOW (multi-step + payment simulation)
========================================================= */
function initBookingFlow(){
  const bookingWrap = document.getElementById("bookingWrap");
  if(!bookingWrap) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id") || PACKAGES[0].id;
  const p = getPackageById(id) || PACKAGES[0];

  document.getElementById("bk-pkg-title").textContent = p.title;
  document.getElementById("bk-pkg-img").src = p.img;
  document.getElementById("bk-pkg-duration").textContent = p.duration;
  document.getElementById("bk-pkg-price").textContent = formatBDT(p.price);

  let currentStep = 1;
  const steps = document.querySelectorAll(".booking-step");
  const stepItems = document.querySelectorAll(".step-item");
  let travelers = 1;

  function updateSummary(){
    const travelersCount = parseInt(document.getElementById("bk-travelers")?.value || 1, 10);
    travelers = travelersCount;
    const subtotal = p.price * travelersCount;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;
    document.getElementById("sum-travelers").textContent = travelersCount;
    document.getElementById("sum-subtotal").textContent = formatBDT(subtotal);
    document.getElementById("sum-tax").textContent = formatBDT(tax);
    document.getElementById("sum-total").textContent = formatBDT(total);
    return { subtotal, tax, total, travelersCount };
  }

  const travelersInput = document.getElementById("bk-travelers");
  if(travelersInput) travelersInput.addEventListener("input", updateSummary);
  updateSummary();

  function goToStep(n){
    steps.forEach(s => s.classList.remove("active"));
    document.querySelector(`.booking-step[data-step="${n}"]`)?.classList.add("active");
    stepItems.forEach((si, idx) => {
      si.classList.remove("active","done");
      if(idx + 1 < n) si.classList.add("done");
      if(idx + 1 === n) si.classList.add("active");
    });
    currentStep = n;
    window.scrollTo({top: document.getElementById("bookingWrap").offsetTop - 120, behavior:"smooth"});
  }

  document.querySelectorAll("[data-next-step]").forEach(btn => {
    btn.addEventListener("click", () => {
      // Basic validation for step 1
      if(currentStep === 1){
        const requiredFields = document.querySelectorAll('.booking-step[data-step="1"] [required]');
        for(const f of requiredFields){
          if(!f.value){ f.focus(); f.style.borderColor = "#e2544a"; return; }
        }
      }
      goToStep(parseInt(btn.dataset.nextStep, 10));
    });
  });
  document.querySelectorAll("[data-prev-step]").forEach(btn => {
    btn.addEventListener("click", () => goToStep(parseInt(btn.dataset.prevStep, 10)));
  });

  // Payment method selection
  document.querySelectorAll(".payment-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      document.querySelectorAll('input[name="paymentMethod"]').forEach(r => r.checked = false);
      opt.querySelector('input[name="paymentMethod"]').checked = true;
    });
  });

  // Final confirm booking
  const confirmBtn = document.getElementById("confirmBookingBtn");
  if(confirmBtn){
    confirmBtn.addEventListener("click", () => {
      const user = getCurrentUser();
      const name = document.getElementById("bk-name")?.value || (user ? user.name : "Guest Traveler");
      const email = document.getElementById("bk-email")?.value || (user ? user.email : "");
      const date = document.getElementById("bk-date")?.value;
      const { total, travelersCount } = updateSummary();

      const booking = {
        bookingId: "TNJ-" + Math.floor(100000 + Math.random()*900000),
        packageId: p.id,
        packageTitle: p.title,
        image: p.img,
        travelDate: date || "To be confirmed",
        travelers: travelersCount,
        total,
        name, email,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        userId: user ? user.id : "guest",
      };

      let bookings = JSON.parse(localStorage.getItem("tnj_bookings") || "[]");
      bookings.push(booking);
      localStorage.setItem("tnj_bookings", JSON.stringify(bookings));

      document.getElementById("bk-final-id").textContent = booking.bookingId;
      document.getElementById("bk-final-total").textContent = formatBDT(total);
      goToStep(4);
    });
  }
}

/* =========================================================
   DASHBOARD (My bookings)
========================================================= */
function renderDashboard(){
  const wrap = document.getElementById("dashboardBookings");
  if(!wrap) return;

  const user = getCurrentUser();
  const nameEl = document.getElementById("dash-username");
  const emailEl = document.getElementById("dash-useremail");
  if(user){
    if(nameEl) nameEl.textContent = user.name;
    if(emailEl) emailEl.textContent = user.email;
  } else {
    if(nameEl) nameEl.textContent = "Guest User";
    if(emailEl) emailEl.textContent = "Please login to see your bookings";
  }

  let bookings = JSON.parse(localStorage.getItem("tnj_bookings") || "[]");
  if(user) bookings = bookings.filter(b => b.userId === user.id);
  bookings.reverse();

  document.getElementById("dash-total-bookings").textContent = bookings.length;
  document.getElementById("dash-total-spent").textContent = formatBDT(bookings.reduce((s,b)=>s+b.total,0));
  document.getElementById("dash-upcoming").textContent = bookings.filter(b=>b.status==="confirmed").length;

  if(!bookings.length){
    wrap.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:50px; color:#6b7c8c;">
      No bookings yet. <a href="packages.html" style="color:#0e9c8f; font-weight:600;">Browse packages</a> to plan your first trip!
    </td></tr>`;
    return;
  }

  wrap.innerHTML = bookings.map(b => `
    <tr>
      <td><strong>${b.bookingId}</strong></td>
      <td style="display:flex; align-items:center; gap:12px;">
        <img src="${b.image}" style="width:50px;height:50px;border-radius:8px;object-fit:cover;">
        ${b.packageTitle}
      </td>
      <td>${b.travelDate}</td>
      <td>${b.travelers}</td>
      <td>${formatBDT(b.total)}</td>
      <td><span class="status-pill status-${b.status}">${b.status.charAt(0).toUpperCase()+b.status.slice(1)}</span></td>
    </tr>
  `).join("");
}

/* =========================================================
   SEARCH WIDGET (hero) -> redirects to packages.html with filters
========================================================= */
function initSearchWidget(){
  const form = document.getElementById("searchWidgetForm");
  if(!form) return;

  // populate destination dropdown
  const destSelect = document.getElementById("sw-destination");
  if(destSelect){
    destSelect.innerHTML = `<option value="">Any Destination</option>` + DESTINATIONS.map(d => `<option value="${d.id}">${d.name}</option>`).join("");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dest = destSelect ? destSelect.value : "";
    const url = dest ? `packages.html?dest=${dest}` : "packages.html";
    window.location.href = url;
  });
}
