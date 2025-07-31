// Number of assignments/tiles
const NUM_ASSIGNMENTS = 30;

const assignments = [
  { title: "COS2601 Assessment 2", due: new Date(2025, 5, 26, 23, 0, 0) },
  { title: "COS2601 Quiz 3", due: new Date(2025, 7, 15, 23, 0, 0) },
  { title: "COS2601 Quiz 4", due: new Date(2025, 8, 26, 23, 0, 0) },
  { title: "COS2611 Assessment 2", due: new Date(2025, 6, 21, 23, 0, 0) },
  { title: "COS2614 Asignment 2", due: new Date(2025, 5, 20, 23, 0, 0) },
  { title: "COS2614 Asignment 3", due: new Date(2025, 7, 14, 23, 0, 0) },
  { title: "COS2614 Asignment 4", due: new Date(2025, 8, 18, 23, 0, 0) },
  { title: "COS2621 Asignment 2", due: new Date(2025, 7, 15, 7, 23, 59) },
  { title: "COS2621 Asignment 3", due: new Date(2025, 8, 1, 17, 0, 0) },
  { title: "COS2661 Assignment 2", due: new Date(2025, 5, 25, 23, 0, 0) },
  { title: "COS2661 Asignment 3", due: new Date(2025, 7, 28, 20, 0, 0) },
  { title: "ICT2621 Asignment 3", due: new Date(2025, 6, 22, 23, 0, 0) },
  { title: "ICT2622 Quiz 1", due: new Date(2025, 4, 27, 23, 0, 0) },
  { title: "ICT2622 Quiz 2", due: new Date(2025, 5, 17, 23, 0, 0) },
  { title: "ICT2622 Assignment 3", due: new Date(2025, 7, 5, 23, 0, 0) },
  { title: "ICT2622 Quiz 4", due: new Date(2025, 8, 2, 23, 0, 0) },
  { title: "INF1505 Quiz 2", due: new Date(2025, 5, 17, 16, 0, 0) },
  { title: "INF1505 Quiz 3", due: new Date(2025, 7, 5, 17, 0, 0) },
  { title: "INF1505 Quiz 4", due: new Date(2025, 8, 24, 19, 0, 0) },
  { title: "INF2611 Quiz 1", due: new Date(2025, 4, 26, 8, 0, 0) },
  { title: "INF2611 Quiz 2", due: new Date(2025, 5, 30, 23, 0, 0) },
  { title: "INF2611 Quiz 3", due: new Date(2025, 7, 22, 23, 0, 0) },
  { title: "INF2611 Assignment 4", due: new Date(2025, 8, 13, 23, 0, 0) },
  // ... (keep the rest of your assignments here)
];

// Sort assignments by due date (earliest first)
assignments.sort((a, b) => a.due - b.due);

// Color map for courses
const courseColors = {
  "COS2601": "#ffb703",
  "COS2611": "#219ebc",
  "COS2614": "#8ac926",
  "COS2621": "#ff595e",
  "COS2661": "#1982c4",
  "ICT2621": "#6a4c93",
  "ICT2622": "#4bef07",
  "INF1505": "#fb5d07",
  "INF2611": "#fb5ae2"
};

// Create tiles in the DOM
const container = document.getElementById('tilesContainer');
assignments.forEach((assignment, idx) => {
  const tile = document.createElement('div');
  tile.className = 'tile';

  // Get course code prefix (first part of the title)
  const courseCode = assignment.title.split(" ")[0];

  // Set background color based on course
  tile.style.backgroundColor = courseColors[courseCode] || "#e0e0e0"; // fallback color if not found

  tile.innerHTML = `
    <div class="assignment-title">${assignment.title}</div>
    <div class="countdown" id="countdown${idx}">Loading...</div>
    <div class="due-date">Due: ${assignment.due.toLocaleString()}</div>
  `;
  container.appendChild(tile);
});

function updateCountdowns() {
  assignments.forEach((assignment, idx) => {
    const now = new Date();
    const distance = assignment.due - now;
    const countdownElem = document.getElementById(`countdown${idx}`);

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      countdownElem.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      // Change color to red if 7 days or less left, else default color
      if (days <= 7) {
        countdownElem.style.color = "#d7263d"; // red
      } else {
        countdownElem.style.color = "#f1f7f0"; // default blue
      }
    } else {
      countdownElem.textContent = "Time's up!";
      countdownElem.style.color = "#f1f7f0" ; // red
    }
  });
}

// Start the countdown timer
updateCountdowns();
setInterval(updateCountdowns, 1000);
