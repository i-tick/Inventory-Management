$(document).ready(function () {
  if (JSON.parse(localStorage.getItem("loginStatus"))) {
    location.href = "./order.html";
  }
  $("#login").click(function (e) {
    e.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    if (username == password) {
      $.ajax({
        method: "POST",
        url: "https://5d76bf96515d1a0014085cf9.mockapi.io/order",
        data: { "username": username, "password": password },
      })
        .done(function (msg) {
          alert("Login Successful");
          localStorage.setItem("loginStatus", JSON.stringify(true));
          location.href = "./order.html";
        })
        .fail(function (msg) {
          alert("There is some problem with the servers");
        });
    } else {
      alert("“Please enter valid credentials!");
    }
  });
});
