const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

var settings = {
  url: `http://localhost:8080/p/${id}/`,
  method: "GET",
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
  },
};

$.ajax(settings).done(function (response) {
  $(".name").val(response.name);
  $(".email").val(response.email);
  $(".phone").val(response.phone);
  $(".institute").val(response.institute);
  $(".usn").val(response.usn);
  $(".amount").append(`Rs ${response.amount / 100}/-`);

  QRCode.toCanvas(
    document.getElementById("qrcode"),
    response._id,
    function (error) {
      if (error) console.error(error);
    }
  );
  var counter = 1;
  response.events.forEach((item) => {
    $(".eventTable").append(
      `<tr><td class="EvntTitle">${counter}. ${item}</td></tr>`
    );
    counter++;
  });
});
