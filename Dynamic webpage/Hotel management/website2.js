const rooms = [
  { number: 101, type: "Single", price: 1000, booked: false },
  { number: 102, type: "Double", price: 1500, booked: false },
  { number: 103, type: "Deluxe", price: 2000, booked: false },
  { number: 104, type: "Suite", price: 3000, booked: false },
  { number: 105, type: "Luxury", price: 5000, booked: false }
];

let bookings = [];
let totalRevenue = 0;

function updateDashboard() {
  document.getElementById("totalRooms").textContent = rooms.length;
  document.getElementById("availableRooms").textContent =
    rooms.filter(r => !r.booked).length;
  document.getElementById("bookedRooms").textContent =
    rooms.filter(r => r.booked).length;
  document.getElementById("revenue").textContent = totalRevenue;
}

function displayRooms() {
  const container = document.getElementById("rooms");
  container.innerHTML = "";

  rooms.forEach(room => {
    const div = document.createElement("div");
    div.className = "room";

    div.innerHTML = `
      <h3>Room ${room.number}</h3>
      <p>Type: ${room.type}</p>
      <p>₹${room.price}/night</p>
      <p class="${room.booked ? 'booked' : 'available'}">
        ${room.booked ? 'Booked' : 'Available'}
      </p>
      <button onclick="toggleRoom(${room.number})">
        ${room.booked ? 'Checkout' : 'Quick Book'}
      </button>
    `;

    container.appendChild(div);
  });
}

function bookRoom() {
  const name = document.getElementById("guestName").value;
  const number = parseInt(document.getElementById("roomNumber").value);
  const checkIn = new Date(document.getElementById("checkIn").value);
  const checkOut = new Date(document.getElementById("checkOut").value);

  const room = rooms.find(r => r.number === number);

  if (!name || !room || !checkIn || !checkOut) {
    alert("Fill all details!");
    return;
  }

  if (room.booked) {
    alert("Room already booked!");
    return;
  }

  const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
  const amount = days * room.price;

  room.booked = true;
  totalRevenue += amount;

  bookings.push({ name, number, days, amount });

  updateRecords();
  displayRooms();
  updateDashboard();
}

function updateRecords() {
  const table = document.getElementById("records");
  table.innerHTML = "";

  bookings.forEach(b => {
    const row = `<tr>
      <td>${b.name}</td>
      <td>${b.number}</td>
      <td>${b.days}</td>
      <td>₹${b.amount}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

function toggleRoom(number) {
  const room = rooms.find(r => r.number === number);
  room.booked = false;
  displayRooms();
  updateDashboard();
}

displayRooms();
updateDashboard();