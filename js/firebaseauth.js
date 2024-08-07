import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
    doc,
    getFirestore,
    getDoc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCThT3cZMA0xBXoTG9Ep0AtPo3-LDExfGY",
    authDomain: "login-form-35faa.firebaseapp.com",
    projectId: "login-form-35faa",
    storageBucket: "login-form-35faa.appspot.com",
    messagingSenderId: "100166916011",
    appId: "1:100166916011:web:c69560360a4be504f1a4ee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check if user is already logged in and redirect to search page
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is already logged in, redirecting to search page.");
        window.location.href = "search.html"; // Redirect to search page if already logged in
    }
});

// Login Form Event Listener
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            console.log("Login successful, redirecting to search page.");
            window.location.href = "search.html"; // Redirect to search page
        })
        .catch((error) => {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials and try again.");
        });
});

// Signup Form Event Listener
const signupForm = document.getElementById("signupForm");
signupForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const username = signupForm["username"].value;
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
    const confirmPassword = signupForm["confirm-password"].value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Set user display name
        await updateProfile(user, { displayName: username });

        // Save user info in Firestore
        await setDoc(doc(db, "users", user.uid), { username, email });

        // Redirect to search page
        console.log("Sign-up successful, redirecting to search page.");
        window.location.href = "search.html";
    } catch (error) {
        console.error("Sign up failed:", error);
        alert("Sign up failed. Please try again.");
    }
});

// Google Login/Signup Event Listener
const googleProvider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login");
googleLogin.addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
        .then(async(result) => {
            // Google sign-in
            const user = result.user;
            const userRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userRef);

            if (!userSnapshot.exists()) {
                // Save user info in Firestore
                await setDoc(userRef, { username: user.displayName, email: user.email });
            }

            console.log("Google login successful, redirecting to search page.");
            window.location.href = "search.html"; // Redirect to search page
        })
        .catch((error) => {
            console.error("Google sign-in failed:", error);
            alert("Google sign-in failed. Please try again.");
        });
});

const googleSignup = document.getElementById("google-signup");
googleSignup.addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
        .then(async(result) => {
            // Google sign-up
            const user = result.user;
            const userRef = doc(db, "users", user.uid);
            const userSnapshot = await getDoc(userRef);

            if (!userSnapshot.exists()) {
                // Save user info in Firestore
                await setDoc(userRef, { username: user.displayName, email: user.email });
            }

            console.log("Google sign-up successful, redirecting to search page.");
            window.location.href = "search.html"; // Redirect to search page
        })
        .catch((error) => {
            console.error("Google sign-up failed:", error);
            alert("Google sign-up failed. Please try again.");
        });
});

// Toggle between login and signup forms
document.getElementById("show-signup").addEventListener("click", () => {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", () => {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
});

// Forgot password
document.getElementById("forgot-password").addEventListener("click", () => {
    const email = prompt("Please enter your email for password reset:");
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent!");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error);
                alert("Error sending password reset email. Please try again.");
            });
    }
});