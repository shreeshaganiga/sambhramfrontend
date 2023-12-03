const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

$(".viewTicketBtn").attr(
  "href",
  `http://127.0.0.1:5500/BSummary.html?id=${id}`
);
