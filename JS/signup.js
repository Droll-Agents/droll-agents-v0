// Signup Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const signupForm = document.getElementById('signup-form');
  const firstNameInput = document.getElementById('first-name');
  const lastNameInput = document.getElementById('last-name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  const termsCheckbox = document.getElementById('terms');
  const passwordStrengthMeter = document.querySelector('.strength-progress');
  const strengthLabel = document.querySelector('.strength-label');
  
  // Password visibility toggle
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
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
  });
  
  // Password strength checker
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = calculatePasswordStrength(password);
    updatePasswordStrengthUI(strength);
  });
  
  function calculatePasswordStrength(password) {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Return normalized score (0-4)
    return Math.min(4, Math.floor(score / 1.5));
  }
  
  function updatePasswordStrengthUI(strength) {
    passwordStrengthMeter.setAttribute('data-strength', strength);
    
    // Update strength label text
    switch(strength) {
      case 0:
        strengthLabel.textContent = 'Password strength';
        break;
      case 1:
        strengthLabel.textContent = 'Weak';
        break;
      case 2:
        strengthLabel.textContent = 'Fair';
        break;
      case 3:
        strengthLabel.textContent = 'Good';
        break;
      case 4:
        strengthLabel.textContent = 'Strong';
        break;
    }
  }
  
  // Form validation on submit
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    
    // Validate first name
    if (firstNameInput.value.trim() === '') {
      setErrorFor(firstNameInput, 'First name is required');
      isValid = false;
    } else {
      clearErrorFor(firstNameInput);
    }
    
    // Validate last name
    if (lastNameInput.value.trim() === '') {
      setErrorFor(lastNameInput, 'Last name is required');
      isValid = false;
    } else {
      clearErrorFor(lastNameInput);
    }
    
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
    const passwordValue = passwordInput.value;
    if (passwordValue === '') {
      setErrorFor(passwordInput, 'Password is required');
      isValid = false;
    } else if (passwordValue.length < 8) {
      setErrorFor(passwordInput, 'Password must be at least 8 characters');
      isValid = false;
    } else if (calculatePasswordStrength(passwordValue) < 2) {
      setErrorFor(passwordInput, 'Password is too weak');
      isValid = false;
    } else {
      clearErrorFor(passwordInput);
    }
    
    // Validate confirm password
    if (confirmPasswordInput.value === '') {
      setErrorFor(confirmPasswordInput, 'Please confirm your password');
      isValid = false;
    } else if (confirmPasswordInput.value !== passwordValue) {
      setErrorFor(confirmPasswordInput, 'Passwords do not match');
      isValid = false;
    } else {
      clearErrorFor(confirmPasswordInput);
    }
    
    // Validate terms checkbox
    if (!termsCheckbox.checked) {
      setErrorFor(termsCheckbox, 'You must agree to the terms and conditions');
      isValid = false;
    } else {
      clearErrorFor(termsCheckbox);
    }
    
    // If form is valid, submit it
    if (isValid) {
      // For now, simulate a successful signup
      const submitButton = document.querySelector('.signup-submit-btn');
      submitButton.disabled = true;
      submitButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="loading-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg> Creating account...';
      
      // You would typically do an AJAX call here to your backend API
      // const formData = new FormData(signupForm);
      // fetch('/api/signup', {
      //   method: 'POST',
      //   body: formData
      // })
      // .then(response => response.json())
      // .then(data => {
      //   if (data.success) {
      //     window.location.href = 'login.html';
      //   } else {
      //     alert(data.message || 'Signup failed. Please try again.');
      //   }
      // })
      // .catch(error => {
      //   console.error('Error:', error);
      //   alert('Signup failed. Please try again.');
      // });
      
      // For now, just redirect to login page
      setTimeout(() => {
        window.location.href = 'login.html?registered=true';
      }, 1500);
    }
  });
  
  // Social signup buttons
  document.querySelector('.social-signup-btn.google').addEventListener('click', function() {
    // Implement Google OAuth signup
    alert('Google signup integration would be implemented here');
  });
  
  document.querySelector('.social-signup-btn.github').addEventListener('click', function() {
    // Implement GitHub OAuth signup
    alert('GitHub signup integration would be implemented here');
  });
  
  // Helper functions
  function setErrorFor(input, message) {
    const formGroup = input.type === 'checkbox' ? 
      input.parentElement.parentElement : 
      input.parentElement;
    
    const errorMessage = formGroup.querySelector('.error-message') || document.createElement('span');
    
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    input.classList.add('input-error');
    
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(errorMessage);
    }
  }
  
  function clearErrorFor(input) {
    const formGroup = input.type === 'checkbox' ? 
      input.parentElement.parentElement : 
      input.parentElement;
    
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
  const formInputs = document.querySelectorAll('.form-group input:not([type="checkbox"])');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('input-focused');
    });
    
    input.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('input-focused');
      }
    });
    
    // Initial check if input already has value
    if (input.value !== '') {
      input.parentElement.classList.add('input-focused');
    }
  });
  
  // Check if user just registered to show success message on login page
  if (window.location.href.includes('registered=true')) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Account created successfully! Please log in.';
    
    const loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
      loginContainer.insertBefore(successMessage, loginContainer.firstChild);
    }
  }
});