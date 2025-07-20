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
const cardsPerPage = 3;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 32; // 32px gap (2rem)
  container.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth'
  });
}

nextBtn.addEventListener('click', () => {
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
