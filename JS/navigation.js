// document.addEventListener("DOMContentLoaded", function() {
//   // Wait for navbar to be loaded by templates.js
//   const navbarContainer = document.getElementById("navbar-container");
  
//   // Create a MutationObserver to detect when navbar is loaded
//   const observer = new MutationObserver(function(mutations) {
//     if (document.querySelector('.login-button') && document.querySelector('.signup-button')) {
//       // Add event listeners to nav buttons
//       document.querySelector('.login-button').addEventListener('click', function() {
//         console.log('Login clicked');
//         // Add your login logic here
//         alert('Login functionality would appear here');
//       });
      
//       document.querySelector('.signup-button').addEventListener('click', function() {
//         console.log('Sign Up clicked');
//         // Add your signup logic here
//         alert('Sign Up functionality would appear here');
//       });
      
//       // Disconnect the observer once we've added the listeners
//       observer.disconnect();
//     }
//   });
  
//   // Start observing the navbar container
//   observer.observe(navbarContainer, { childList: true, subtree: true });
// });