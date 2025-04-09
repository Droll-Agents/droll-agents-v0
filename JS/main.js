document.addEventListener("DOMContentLoaded", function () {
  // Initialize Vanta.js background
  var vantaEffect = VANTA.NET({
    el: ".vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x000066ff,
    backgroundColor: 0x0a0a1a,
    points: 5.0,
    maxDistance: 20.0,
    spacing: 20.0,
  });

  // Remove Locomotive Scroll attributes from DOM elements
  // This will disable all custom scrolling
  document.querySelectorAll('[data-scroll-section]').forEach(el => {
    el.removeAttribute('data-scroll-section');
  });
  
  const container = document.querySelector('[data-scroll-container]');
  if (container) {
    container.removeAttribute('data-scroll-container');
  }

  // Make sure all agent cards are visible
  document.querySelectorAll('.agent-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });

  // Update Vanta on resize
  window.addEventListener("resize", function () {
    vantaEffect.resize();
  });

  console.log("Using native browser scrolling");
});