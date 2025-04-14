// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.querySelector('.toggle-password');
  const rememberMeCheckbox = document.getElementById('remember-me');
  
  // Password visibility toggle
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('input');
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      // Update icon
      const iconPath = this.querySelector('path');
      if (type === 'text') {
        // Show "hide" icon (eye with slash)
        iconPath.setAttribute('d', 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24 M1 1l22 22');
      } else {
        // Show "show" icon (eye)
        iconPath.setAttribute('d', 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z');
      }
    });
  }
  
  // Form validation on submit
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    
    // Validate email
    if (emailInput.value.trim() === '') {
      setErrorFor(emailInput, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      setErrorFor(emailInput, 'Please enter a valid email');
      isValid = false;
    } else {
      clearErrorFor(emailInput);
    }
    
    // Validate password
    if (passwordInput.value === '') {
      setErrorFor(passwordInput, 'Password is required');
      isValid = false;
    } else {
      clearErrorFor(passwordInput);
    }
    
    // If form is valid, submit it
    if (isValid) {
      // For now, simulate a successful login
      const submitButton = document.querySelector('.login-submit-btn');
      submitButton.disabled = true;
      submitButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="loading-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg> Logging in...';
      
      // Store remember me preference
      if (rememberMeCheckbox && rememberMeCheckbox.checked) {
        localStorage.setItem('rememberEmail', emailInput.value);
      } else {
        localStorage.removeItem('rememberEmail');
      }
      
      // You would typically do an AJAX call here to your backend API
      // const formData = new FormData(loginForm);
      // fetch('/api/login', {
      //   method: 'POST',
      //   body: formData
      // })
      // .then(response => response.json())
      // .then(data => {
      //   if (data.success) {
      //     window.location.href = 'index.html';
      //   } else {
      //     alert(data.message || 'Login failed. Please try again.');
      //   }
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      //   alert('Login failed. Please try again.');
      // });
      
      // For now, just redirect to home page
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
  });
  
  // Social login buttons
  document.querySelector('.social-login-btn.google').addEventListener('click', function() {
    // Implement Google OAuth login
    alert('Google login integration would be implemented here');
  });
  
  document.querySelector('.social-login-btn.github').addEventListener('click', function() {
    // Implement GitHub OAuth login
    alert('GitHub login integration would be implemented here');
  });
  
  // Auto-fill remembered email
  if (rememberMeCheckbox) {
    const rememberedEmail = localStorage.getItem('rememberEmail');
    if (rememberedEmail) {
      emailInput.value = rememberedEmail;
      rememberMeCheckbox.checked = true;
    }
  }
  
  // Helper functions
  function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message') || document.createElement('span');
    
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    input.classList.add('input-error');
    
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorMessage);
    }
  }
  
  function clearErrorFor(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    input.classList.remove('input-error');
    
    if (errorMessage) {
      formGroup.removeChild(errorMessage);
    }
  }
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // Add floating label effect
  const formInputs = document.querySelectorAll('.form-group input');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('input-focused');
      }
    });
    
    // Initial check if input already has value (e.g., from remembered email)
    if (input.value !== '') {
      input.parentElement.classList.add('input-focused');
    }
  });
});