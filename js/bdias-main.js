// ===============================
// BDIAS Main JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  setupStickyHeader();
  setupMobileNav();
  setupHeroSlider();
  setupScrollAnimations();
  setupCounters();
  setupFloatingEnquiry();
});

/* ---------- Sticky Header ---------- */
function setupStickyHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    const offset = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("scrolled", offset > 10);
  });
}

/* ---------- Mobile Navigation ---------- */
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("open");
    nav.classList.toggle("open", isOpen);
  });

  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      toggle.classList.remove("open");
      nav.classList.remove("open");
    }
  });
}

/* ---------- Hero Slider ---------- */
function setupHeroSlider() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dotsContainer = document.getElementById("hero-dots");
  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let timerId;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  const prevBtn = document.querySelector(".hero-prev");
  const nextBtn = document.querySelector(".hero-next");

  function goToSlide(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("active");
    dots[current].classList.add("active");

    restartTimer();
  }

  function next() {
    goToSlide(current + 1);
  }

  function restartTimer() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(next, 7000);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(current - 1));
  if (nextBtn) nextBtn.addEventListener("click", next);

  restartTimer();
}

/* ---------- Scroll Animations ---------- */
function setupScrollAnimations() {
  const animatedEls = document.querySelectorAll("[data-animate]");
  if (!animatedEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedEls.forEach((el) => observer.observe(el));
}

/* ---------- Counter Animation ---------- */
function setupCounters() {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value < 10 && target >= 10 ? value.toString().padStart(2, "0") : value;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target < 10 ? target : target.toString().padStart(2, "0");
      }
    }

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------- Floating Enquiry Panel ---------- */
function setupFloatingEnquiry() {
  const wrapper = document.querySelector(".floating-enquire");
  const button = document.querySelector(".floating-btn");
  if (!wrapper || !button) return;

  let open = false;

  button.addEventListener("click", () => {
    open = !open;
    wrapper.classList.toggle("open", open);
  });

  // Optional: Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target) && open) {
      open = false;
      wrapper.classList.remove("open");
    }
  });
}
