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
        "we specialize in subluxation recalibration and neuromuscular rebalancing. Through integrative spinal harmonics and kinetic flow adjustments, we activate the vertebral energy channels and restore intrinsic alignment pathways.",
        "Our holistic torque-release protocol targetsmisalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium.",
        "Our holistic  targets latent vertebral misalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium.",
        "Our holistic torque-release protocol targets latent vertebral misalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium."
      ]
    },
    modal2: {
       steps: [
        "we specialize in subluxation recalibration and neuromuscular rebalancing. Through integrative spinal harmonics and kinetic flow adjustments, we activate the vertebral energy channels and restore intrinsic alignment pathways.",
        "Our holistic torque-release protocol targetsmisalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium.",
        "Our holistic  targets latent vertebral misalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium.",
        "Our holistic torque-release protocol targets latent vertebral misalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium."
      ]
    },
    modal3: {
       steps: [
        "we specialize in subluxation recalibration and neuromuscular rebalancing. Through integrative spinal harmonics and kinetic flow adjustments, we activate the vertebral energy channels and restore intrinsic alignment pathways.",
        "Our holistic torque-release protocol targetsmisalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium.",
        "Our holistic  targets latent vertebral misalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium.",
        "Our holistic torque-release protocol targets latent vertebral misalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium."
      ]
    },
    modal4: {
       steps: [
        "we specialize in subluxation recalibration and neuromuscular rebalancing. Through integrative spinal harmonics and kinetic flow adjustments, we activate the vertebral energy channels and restore intrinsic alignment pathways.",
        "Our holistic torque-release protocol targetsmisalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium.",
        "Our holistic  targets latent vertebral misalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium.",
        "Our holistic torque-release protocol targets latent vertebral misalignments, recalibrating biomechanical feedback loops and promoting craniosacral fluid resonance. Each adjustment facilitates neural decoherence, allowing the spine’s innate intelligence to express optimal postural equilibrium."
      ]
    }
  };

  let currentModalId = null;
  let currentStep = 0;

  // Update modal content and dots active state
  const updateModal = () => {
    if (!currentModalId || !modalContent[currentModalId]) return;

    const steps = modalContent[currentModalId].steps;
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
  const openModal = (modalId) => {
    currentModalId = modalId;
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
      currentModalId = null;
    }, 300);
  };

  // Event listeners for modal triggers
  const modalTriggers = [
    { selector: ".open-modal-btn", modalId: "modal1" },
    { selector: "#modal2", modalId: "modal2" },
    { selector: "#modal3", modalId: "modal3" },
    { selector: "#modal4", modalId: "modal4" }
  ];

  modalTriggers.forEach(({ selector, modalId }) => {
    const element = document.querySelector(selector);
    if (element) {
      console.log(`Found element for ${selector}, setting up ${modalId}`);
      element.addEventListener("click", () => openModal(modalId));
    } else {
      console.warn(`Element not found: ${selector}`);
    }
  });

  // Next step button
  nextStepBtn.addEventListener("click", () => {
    if (!currentModalId) return;

    const steps = modalContent[currentModalId].steps;
    
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
      if (!currentModalId) return;
      
      const steps = modalContent[currentModalId].steps;
      if (idx < steps.length) {
        currentStep = idx;
        updateModal();
      }
    });
  });
});



