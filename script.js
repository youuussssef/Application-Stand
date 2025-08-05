// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, push, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9RWOooS9H2kyp7Ysa8kjtsN-AMbqASRw",
  authDomain: "keyclub-booking.firebaseapp.com",
  databaseURL: "https://keyclub-booking-default-rtdb.firebaseio.com",
  projectId: "keyclub-booking",
  storageBucket: "keyclub-booking.firebasestorage.app",
  messagingSenderId: "556273204825",
  appId: "1:556273204825:web:67cfdf257b025db1a5bb48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to your bookings in database
const bookingsRef = ref(db, "bookings");

// Booking form logic
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const stand = document.getElementById("stand").value;
  const time = document.getElementById("time").value;

  if (!name || !stand || !time) {
    showMessage("Veuillez remplir tous les champs.");
    return;
  }

  // Check how many people already booked this stand/time
  const snapshot = await get(child(ref(db), "bookings"));
  let count = 0;

  if (snapshot.exists()) {
    const data = snapshot.val();
    for (let key in data) {
      if (data[key].stand === stand && data[key].time === time) {
        count++;
      }
    }
  }

  if (count >= 2) {
    showMessage("❌ Ce créneau est déjà complet.");
    return;
  }

  // Save the booking
  push(bookingsRef, {
    name,
    stand,
    time
  });

  showMessage("✅ Réservation enregistrée !");
  document.querySelector("form").reset();
});

// Helper to show messages
function showMessage(text) {
  document.getElementById("message").innerText = text;
}

