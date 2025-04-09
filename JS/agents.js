document.addEventListener("DOMContentLoaded", function() {
  // Reference to all agent cards
  const agentCards = document.querySelectorAll('.agent-card');
  const agentCountDisplay = document.getElementById('agent-count-display');
  const searchInput = document.querySelector('.agents-search-input');
  const searchButton = document.querySelector('.agents-search-button');
  
  // Set initial agent count
  if (agentCountDisplay) {
    agentCountDisplay.textContent = agentCards.length;
  }
  
  // Create a no-results message element
  const noResults = document.createElement('div');
  noResults.className = 'no-results';
  noResults.textContent = 'No agents found matching your search. Try different keywords.';
  document.querySelector('.agents-grid').appendChild(noResults);
  
  // Search functionality
  function searchAgents(query) {
    query = query.toLowerCase().trim();
    let matchCount = 0;
    
    // Show all agents if query is empty
    if (!query) {
      agentCards.forEach(card => {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      });
      matchCount = agentCards.length;
      noResults.style.display = 'none';
    } else {
      // Filter agents based on search query
      agentCards.forEach(card => {
        const name = card.querySelector('.agent-name').textContent.toLowerCase();
        const description = card.querySelector('.agent-description').textContent.toLowerCase();
        
        if (name.includes(query) || description.includes(query)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
          matchCount++;
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
      
      // Show no results message if needed
      if (matchCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    }
    
    // Update count display
    if (agentCountDisplay) {
      agentCountDisplay.textContent = matchCount;
    }
    
    // Reset category filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
  }
  
  // Search event listeners
  if (searchButton && searchInput) {
    searchButton.addEventListener('click', function() {
      searchAgents(searchInput.value);
    });
    
    searchInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        searchAgents(searchInput.value);
      }
    });
  }
  
  // Show all cards with a staggered animation on page load
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
      // Clear the search input
      if (searchInput) {
        searchInput.value = '';
      }
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get selected category
      const category = this.getAttribute('data-category');
      
      // Filter the agent cards
      let visibleCount = 0;
      agentCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || category === cardCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
          visibleCount++;
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
      
      // Update count display
      if (agentCountDisplay) {
        agentCountDisplay.textContent = visibleCount;
      }
      
      // Show/hide no results message
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
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