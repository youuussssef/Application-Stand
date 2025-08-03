const bookings = {}; // temporary local bookings

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const stand = document.getElementById("stand").value;
  const time = document.getElementById("time").value;
  const key = `${stand}_${time}`;

  if (!bookings[key]) bookings[key] = [];

  if (bookings[key].length >= 2) {
    showMessage("Ce créneau est déjà complet.");
    return;
  }

  bookings[key].push(name);
  showMessage(`Réservation confirmée pour ${name} à ${stand} (${time})`);
  document.getElementById("bookingForm").reset();
});

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}