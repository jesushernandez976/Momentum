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
    const response = await fetch('http://localhost:3001/send-email', {
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
