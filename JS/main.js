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

  // Initialize Locomotive Scroll with improved settings
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
    // Add these options
    scrollFromAnywhere: true, 
    lerp: 0.07, // Smoother scrolling
    multiplier: 1.0, // Normal scroll speed
    reloadOnContextChange: true,
    resetNativeScroll: true
  });

  // Update Vanta on resize
  window.addEventListener("resize", function () {
    vantaEffect.resize();
    // Also update scroll on resize
    scroll.update();
  });

  // Make sure to update scroll when all content is loaded
  window.addEventListener("load", function() {
    scroll.update();
  });
  
  // After footer is loaded, update the scroll
  const footer = document.getElementById("footer-container");
  if (footer) {
    const observer = new MutationObserver(function() {
      scroll.update();
    });
    observer.observe(footer, { childList: true });
  }
});