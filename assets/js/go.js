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


document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const statusMessage = document.getElementById('statusMessage');

  // Convert FormData to JSON
  const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message'),
    marketingConsent: formData.get('marketingConsent') === 'on',
    dataConsent: formData.get('dataConsent') === 'on'
  };

  // Show loading state
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  statusMessage.style.display = 'none';

  try {
    const response = await fetch('https://theory-blog.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      statusMessage.innerHTML = '<div class="alert alert-success">' + result.message + '</div>';
      form.reset(); // Clear the form
    } else {
      statusMessage.innerHTML = '<div class="alert alert-danger">' + result.message + '</div>';
    }

  } catch (error) {
    console.error('Error:', error);
    statusMessage.innerHTML = '<div class="alert alert-danger">Network error. Please try again.</div>';
  } finally {
    // Reset button state
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
    statusMessage.style.display = 'block';
  }
});
