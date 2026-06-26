const wedding = {
  title: "Свадьба Ахмеда и Камилы",
  date: "2026-08-04",
  displayDate: "4 августа 2026 г.",
  time: "00:00",
  venueName: "Название зала",
  venueAddress: "Адрес места проведения",
};

const eventTimeNode = document.querySelector("#event-time");
const venueNameNode = document.querySelector("#venue-name");
const venueAddressNode = document.querySelector("#venue-address");
const calendarButton = document.querySelector("#calendar-button");
const routeButton = document.querySelector("#route-button");
const countdownNodes = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

const eventStart = new Date(`${wedding.date}T${wedding.time}:00`);
const eventEnd = new Date(eventStart.getTime() + 6 * 60 * 60 * 1000);

eventTimeNode.textContent = wedding.time;
venueNameNode.textContent = wedding.venueName;
venueAddressNode.textContent = wedding.venueAddress;

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatCalendarDate(date) {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}${month}${day}T${hours}${minutes}00`;
}

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(eventStart.getTime() - now.getTime(), 0);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownNodes.days.textContent = pad(days);
  countdownNodes.hours.textContent = pad(hours);
  countdownNodes.minutes.textContent = pad(minutes);
  countdownNodes.seconds.textContent = pad(seconds);
}

function openCalendarReminder() {
  const details = `Свадьба Ахмеда и Камилы. Место: ${wedding.venueName}, ${wedding.venueAddress}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: wedding.title,
    dates: `${formatCalendarDate(eventStart)}/${formatCalendarDate(eventEnd)}`,
    details,
    location: `${wedding.venueName}, ${wedding.venueAddress}`,
  });

  window.open(`https://calendar.google.com/calendar/render?${params}`, "_blank");
}

function openRoute() {
  const destination = `${wedding.venueName}, ${wedding.venueAddress}`;
  const params = new URLSearchParams({
    api: "1",
    destination,
  });

  window.open(`https://www.google.com/maps/dir/?${params}`, "_blank");
}

calendarButton.addEventListener("click", openCalendarReminder);
routeButton.addEventListener("click", openRoute);

updateCountdown();
setInterval(updateCountdown, 1000);
