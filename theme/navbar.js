// Navbar Functionality
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyARIEv42TeVSWw9PTXHMmk_Hy8U7sNbMWU",
    authDomain: "my-portfulio-97656.firebaseapp.com",
    projectId: "my-portfulio-97656",
    storageBucket: "my-portfulio-97656.firebasestorage.app",
    messagingSenderId: "1002345381450",
    appId: "1:1002345381450:web:c7c7641842b3fc1341b0b3",
    measurementId: "G-Z076G3MFH6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function initNavbar() {
    // Wait for navbar to be injected
    const interval = setInterval(() => {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (loginBtn && logoutBtn) {
            clearInterval(interval);
            
            // Check authentication state
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is logged in - hide login button, show logout button
                    loginBtn.style.display = 'none';
                    logoutBtn.style.display = 'inline-block';
                } else {
                    // User is not logged in - show login button, hide logout button
                    loginBtn.style.display = 'inline-block';
                    logoutBtn.style.display = 'none';
                }
            });

            // Login button click handler
            loginBtn.addEventListener('click', () => {
                // Get the base path
                const basePath = window.location.pathname.includes('/Authentication/') ? '../' : '';
                window.location.href = basePath + 'Authentication/login.html';
            });

            // Logout button click handler
            logoutBtn.addEventListener('click', () => {
                signOut(auth)
                    .then(() => {
                        alert('Logged out successfully!');
                        window.location.reload();
                    })
                    .catch(error => {
                        alert('Error logging out: ' + error.message);
                    });
            });
        }
    }, 100);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}
