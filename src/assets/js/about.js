// Animate sections on scroll
document.addEventListener('DOMContentLoaded', function() {
  // Observe elements for animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all section headers and stat cards
  document.querySelectorAll('.section-header, .stat-card, .team-member, .value-item').forEach(el => {
    observer.observe(el);
  });
  
  // Initialize CTA animation
  setTimeout(() => {
    document.querySelector('.cta-content').classList.add('animate-fade-in');
  }, 300);
});