gsap.registerPlugin(ScrollTrigger);

// Fade in
gsap.utils.toArray(".fade-in").forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});

// Slide up
gsap.from(".slide-up-on-scroll", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "easeOut",
  scrollTrigger: {
    trigger: ".slide-up-on-scroll",
    start: "top 85%",
    toggleActions: "play none none none"
  }
});



const container = document.getElementById('testimonialContainer');
const cards = document.querySelectorAll('.testimonial-card');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let index = 0;

// Get cards per page based on screen size
function getCardsPerPage() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function updateCarousel() {
  const cardsPerPage = getCardsPerPage();
  const cardWidth = cards[0].offsetWidth;
  const gap = 32; // 2rem gap

  // Calculate the scroll position
  const scrollAmount = index * (cardWidth + gap);

  container.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });

  // Update button states
  const maxIndex = Math.ceil(cards.length / cardsPerPage) - 1;
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index >= maxIndex;
}

nextBtn.addEventListener('click', () => {
  const cardsPerPage = getCardsPerPage();
  const maxIndex = Math.ceil(cards.length / cardsPerPage) - 1;

  if (index < maxIndex) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

// Update on window resize
window.addEventListener('resize', () => {
  const cardsPerPage = getCardsPerPage();
  const maxIndex = Math.ceil(cards.length / cardsPerPage) - 1;

  // Reset index if it's now out of bounds
  if (index > maxIndex) {
    index = maxIndex;
  }

  updateCarousel();
});

// Initialize
updateCarousel();


// Toggle Hamburger Menu
const toggle = document.getElementById('hamburgerToggle');
const links = document.getElementById('hamburgerLinks');

toggle.addEventListener('click', () => {
  links.classList.toggle('show');        // show/hide menu
  toggle.classList.toggle('active');     // transform hamburger into X
});


