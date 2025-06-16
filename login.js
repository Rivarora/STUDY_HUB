import { auth } from './firebase.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const authMessage = document.getElementById('auth-message');

// Login form
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    authMessage.innerText = 'Login successful! Redirecting...';
    setTimeout(() => {
      window.location.href = 'dashboard.html';  // change as needed
    }, 1500);
  } catch (error) {
    authMessage.innerText = 'Login error: ' + error.message;
  }
});

// Signup form
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    authMessage.innerText = 'Signup successful! Please login now.';
    signupForm.reset();
  } catch (error) {
    authMessage.innerText = 'Signup error: ' + error.message;
  }
});

// Optional: Redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = 'dashboard.html';
  }
});

