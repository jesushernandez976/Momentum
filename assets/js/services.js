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



document.addEventListener("DOMContentLoaded", () => {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalBox = document.getElementById("modalBox");
  const skipBtn = document.getElementById("skipBtn");
  const nextStepBtn = document.getElementById("nextStepBtn");
  const modalText = document.getElementById("modalText");
  const dots = document.querySelectorAll(".dot");

  // Define content for each modal
  const modalContent = {
    modal1: {
      steps: [
        "We deliver precise chiropractic adjustments and soft‑tissue techniques to restore mobility, reduce pain, and improve overall body function. Our goal is simple: help you move better, recover faster, and stay at your best.",
      ]
    },
    modal2: {
       steps: [
        "Whether you're coming back from an injury, pushing your training, or just want to stay strong and active for your family, our rehab programs are built for real‑world performance. We combine targeted strength work and hands on therapy to restore stability, improve mobility, and help you move at your best, in the gym, on the field, or in everyday life.",
      ]
    },
  };

  // Create modal controller for each modal
  const createModalController = (modalId, overlayId, boxId, textId, skipBtnId, nextBtnId, dotsId) => {
    const modalOverlay = document.getElementById(overlayId);
    const modalBox = document.getElementById(boxId);
    const modalText = document.getElementById(textId);
    const skipBtn = document.getElementById(skipBtnId);
    const nextStepBtn = document.getElementById(nextBtnId);
    const dotsContainer = document.getElementById(dotsId);
    const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];
    
    let currentStep = 0;

    // Update modal content and dots active state
    const updateModal = () => {
      if (!modalContent[modalId]) return;

      const steps = modalContent[modalId].steps;
      modalText.textContent = steps[currentStep];

      // Update dots - show only the number needed for current modal
      dots.forEach((dot, index) => {
        if (index < steps.length) {
          dot.style.display = 'inline-block';
          dot.classList.toggle('active', index === currentStep);
        } else {
          dot.style.display = 'none';
        }
      });

      // Update next button text
      if (currentStep === steps.length - 1) {
        nextStepBtn.textContent = 'Done';
      } else {
        nextStepBtn.textContent = 'Next';
      }
    };

    // Open modal function
    const openModal = () => {
      currentStep = 0;
      updateModal();
      modalOverlay.style.display = "flex";
      setTimeout(() => {
        modalBox.classList.add("show");
      }, 10);
    };

    // Close modal function
    const closeModal = () => {
      modalBox.classList.remove("show");
      setTimeout(() => {
        modalOverlay.style.display = "none";
      }, 300);
    };

    // Next step button
    nextStepBtn.addEventListener("click", () => {
      const steps = modalContent[modalId].steps;
      
      if (currentStep < steps.length - 1) {
        currentStep++;
        updateModal();
      } else {
        // Last step - close modal
        closeModal();
      }
    });

    // Skip/Close button
    skipBtn.addEventListener("click", closeModal);

    // Click outside to close
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Dot navigation
    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        const steps = modalContent[modalId].steps;
        if (idx < steps.length) {
          currentStep = idx;
          updateModal();
        }
      });
    });

    return { openModal, closeModal };
  };

  // Create controllers for each modal
  const modal1Controller = createModalController(
    'modal1', 'modalOverlay1', 'modalBox1', 'modalText1', 'skipBtn1', 'nextStepBtn1', 'dots1'
  );

  const modal2Controller = createModalController(
    'modal2', 'modalOverlay2', 'modalBox2', 'modalText2', 'skipBtn2', 'nextStepBtn2', 'dots2'
  );

  // Set up modal triggers
  const modal1Trigger = document.getElementById("modal1");
  const modal2Trigger = document.getElementById("modal2");

  if (modal1Trigger) {
    modal1Trigger.addEventListener("click", modal1Controller.openModal);
  }

  if (modal2Trigger) {
    modal2Trigger.addEventListener("click", modal2Controller.openModal);
  }
});

// Toggle Hamburger Menu
const toggle = document.getElementById('hamburgerToggle');
const links = document.getElementById('hamburgerLinks');

toggle.addEventListener('click', () => {
  links.classList.toggle('show');        // show/hide menu
  toggle.classList.toggle('active');     // transform hamburger into X
});

