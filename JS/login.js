document.addEventListener("DOMContentLoaded", function () {    
    // Wait for Google API to load
    let gapiLoaded = false;
    window.onGoogleLibraryLoad = function() {
        console.log("Google sign-in library loaded");
        gapiLoaded = true;
    };
    
    // Add a fallback in case the callback above doesn't fire
    const checkGapiLoaded = setInterval(function() {
        if (typeof gapi !== 'undefined' && gapi.auth2) {
            clearInterval(checkGapiLoaded);
            gapiLoaded = true;
            console.log("Google sign-in library detected");
        }
    }, 1000);

    // Reference to form elements
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const rememberCheckbox = document.getElementById('remember');

    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Change icon
            const eyeIcon = this.querySelector('svg');
            if (type === 'text') {
                eyeIcon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
            } else {
                eyeIcon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        `;
            }
        });
    }

    // Check if we have stored credentials
    const checkStoredCredentials = function () {
        const storedEmail = localStorage.getItem('droll_email');
        if (storedEmail) {
            emailInput.value = storedEmail;
            rememberCheckbox.checked = true;
        }
    };

    // Call to check stored credentials when page loads
    checkStoredCredentials();

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            let isValid = true;
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email) {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(emailInput);
            }

            if (!password) {
                showError(passwordInput, 'Password is required');
                isValid = false;
            } else {
                removeError(passwordInput);
            }

            if (isValid) {
                // Save to local storage if "remember me" is checked
                if (rememberCheckbox.checked) {
                    localStorage.setItem('droll_email', email);
                } else {
                    localStorage.removeItem('droll_email');
                }

                // Simulate login process
                loginUser(email, password);
            }
        });
    }

    // Error handling
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        formGroup.classList.add('error');
        input.classList.add('input-error');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            formGroup.removeChild(errorElement);
        }

        formGroup.classList.remove('error');
        input.classList.remove('input-error');
    }

    // Email validation
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Login user function (would connect to backend in a real app)
    function loginUser(email, password) {
        // Show loading state
        const submitBtn = document.querySelector('.login-submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(function () {
            // In a real app, you would validate against a backend
            // For demo purposes, we'll just redirect after a delay
            console.log('Login attempt with:', { email, password: '********' });

            if (email === 'demo@drollagents.com' && password === 'password123') {
                // Successful login
                alert('Login successful! Redirecting to dashboard...');
                window.location.href = 'index.html'; // Redirect to dashboard page
            } else {
                // Failed login
                alert('Invalid credentials. Please try again.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        }, 1500);
    }
    
    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-login-btn');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
            
            if (provider === 'Google') {
                // Call the Google login function
                initiateGoogleLogin();
            } else {
                // Keep the alert for GitHub (or implement GitHub login later)
                alert(`${provider} login would be implemented here. This would connect to an OAuth provider.`);
            }
        });
    });
    
    // Google Sign-In initialization    
    function initiateGoogleLogin() {
        console.log("Initiating Google login...");
        
        // // Check if running on localhost or 127.0.0.1
        // if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        //     console.log("Development environment detected");
            
        //     // In development environment, simulate Google login
        //     // This avoids the domain authorization issues with Google OAuth
        //     alert("Google Sign-In simulation (development mode)\n\nIn production, this would connect to Google's OAuth service.");
            
        //     setTimeout(() => {
        //         alert('Successfully signed in with Google! (Simulated for development)');
        //         window.location.href = 'index.html';
        //     }, 1000);
        //     return;
        // }
        
        // Production environment - use real Google authentication
        // Check if gapi is available
        if (typeof gapi === 'undefined') {
            console.error("Google API (gapi) is not loaded");
            alert("Google Sign-In is not available. Please check your internet connection and try again.");
            return;
        }
        
        // Check if auth2 is already initialized
        if (gapi.auth2 && gapi.auth2.getAuthInstance()) {
            // Auth2 is already initialized, proceed with sign-in
            startSignIn(gapi.auth2.getAuthInstance());
        } else {
            // Initialize auth2 and then sign in
            gapi.load('auth2', function() {
                console.log("Auth2 API loaded");
                
                // Initialize with your client ID
                const clientId = '604654204116-1paqifs0lk7figgru2p8hmurbeo42qns.apps.googleusercontent.com';
                                
                gapi.auth2.init({
                    client_id: clientId,
                    scope: 'profile email',
                    // Add this cookie_policy setting
                    cookie_policy: 'single_host_origin'
                }).then(
                    function(auth2) {
                        console.log("Auth2 initialized successfully");
                        startSignIn(auth2);
                    },
                    function(error) {
                        console.error("Auth2 initialization error:", error);
                        
                        // Check for specific origin error and provide a better message
                        if (error.error === 'idpiframe_initialization_failed' && 
                            error.details && error.details.includes("Not a valid origin")) {
                            
                            alert("This website is running on a testing domain that isn't authorized for Google Sign-In.\n\n" +
                                  "For testing purposes, we'll simulate a Google login instead.");
                                  
                            // Simulate a successful login
                            setTimeout(() => {
                                alert('Successfully signed in with Google! (Simulated for testing)');
                                window.location.href = 'index.html';
                            }, 1000);
                        } else {
                            alert("Failed to initialize Google Sign-In. Please try again later.\n\nError details: " + 
                                  (error.details || error.error || "Unknown error"));
                        }
                    }
                );
            });
        }
        
        function startSignIn(auth2) {
            console.log("Starting Google sign-in process");
            auth2.signIn({
                ux_mode: 'popup'
            }).then(
                function(googleUser) {
                    // Success handler
                    const profile = googleUser.getBasicProfile();
                    console.log('Google user signed in:', profile.getName());
                    alert('Successfully signed in with Google! Welcome, ' + profile.getName());
                    window.location.href = 'index.html';
                },
                function(error) {
                    // Error handler
                    console.error("Google sign-in error:", error);
                    if (error.error === "popup_closed_by_user") {
                        console.log("User closed the popup");
                    } else {
                        alert('Google Sign-In failed: ' + (error.error || "Unknown error"));
                    }
                }
            );
        }
    }
});