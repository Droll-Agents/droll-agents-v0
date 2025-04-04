document.addEventListener("DOMContentLoaded", function() {
  // Make sure cards are visible when page loads
  const agentCards = document.querySelectorAll('.agent-card');
  
  // Show all cards with a staggered animation
  agentCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + (index * 50)); // Staggered timing
  });
  
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  // Initialize filter
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get selected category
      const category = this.getAttribute('data-category');
      
      // Filter the agent cards
      agentCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || category === cardCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Hover effect with reduced intensity for better performance
  agentCards.forEach(card => {
    const cardInner = card.querySelector('.agent-card-inner');
    
    // Simplified hover effect
    card.addEventListener('mouseenter', function() {
      cardInner.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      cardInner.style.transform = '';
    });
  });
  
  // Update the navbar to highlight "Agents" link
  setTimeout(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.textContent.trim() === 'Agents') {
        link.classList.add('active-link');
      }
    });
  }, 500);
  
  // Force layout recalculation when all content is loaded
  window.addEventListener('load', function() {
    // Update locomotive scroll to account for new content
    if (typeof LocomotiveScroll !== 'undefined' && window.scroll) {
      window.scroll.update();
    }
  });
});