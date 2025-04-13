document.addEventListener("DOMContentLoaded", function() {
  // Elements to animate
  const sectionHeaders = document.querySelectorAll('.section-header');
  const ctaContent = document.querySelector('.cta-content');
  const valueItems = document.querySelectorAll('.value-item');
  const teamMembers = document.querySelectorAll('.team-member');
  const statCards = document.querySelectorAll('.stat-card');
  const contactForm = document.querySelector('.contact-form');
  
  // Initialize animations
  function initAnimations() {
    // Animate section headers
    sectionHeaders.forEach(header => {
      header.classList.add('animate-fade-in');
    });
    
    // Animate the about hero content
    document.querySelector('.about-hero-content').classList.add('animate-fade-in');
    
    // Animate value items with staggered delay
    valueItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate-fade-in');
      }, 100 * index);
    });
    
    // Animate team members with staggered delay
    teamMembers.forEach((member, index) => {
      setTimeout(() => {
        member.classList.add('animate-fade-in');
      }, 100 * index);
    });
    
    // Animate stat cards with staggered delay
    statCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-fade-in');
      }, 100 * index);
    });
    
    // Animate contact form
    if (contactForm) {
      contactForm.classList.add('animate-fade-in');
    }
    
    // Animate CTA section
    if (ctaContent) {
      setTimeout(() => {
        ctaContent.classList.add('animate-fade-in');
      }, 300);
    }
  }
  
  // Call animation initialization
  initAnimations();
  
  // Handle scroll animations using Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Elements that should animate on scroll
  const scrollAnimElements = document.querySelectorAll('.about-text, .about-values, .stats-grid, .team-grid');
  scrollAnimElements.forEach(el => {
    observer.observe(el);
  });
  
  // Handle contact form submission
  const contactFormEl = document.getElementById('contact-form');
  if (contactFormEl) {
    contactFormEl.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Simulate form submission
      const submitBtn = document.querySelector('.submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Reset form
        contactFormEl.reset();
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  // Add hover effects for team members
  teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
      this.querySelector('.member-photo').style.transform = 'scale(1.05)';
    });
    
    member.addEventListener('mouseleave', function() {
      this.querySelector('.member-photo').style.transform = '';
    });
  });
});