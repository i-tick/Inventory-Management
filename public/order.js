$(document).ready(function () {
  function createItems(data) {
    let tbody = $("#tableData");
    let tableRow = $("<tr>");
    tableRow.append($("<td>").addClass("tdSecondry").text(data.id));
    tableRow.append($("<td>").addClass("tdPrimary").text(data.customerName));
    tableRow.append(
      $("<td>")
        .addClass("tdPrimary")
        .text(data.orderDate.replace("-", " ").replace("-", ", "))
        .append($("<br>"))
        .append($("<span>").addClass("tdSecondry").text(data.orderTime))
    );
    tableRow.append($("<td>").addClass("tdSecondry").text(`$${data.amount}`));
    tableRow.append(
      $("<td>")
        .addClass(`tdPrimary ${data.orderStatus.toLowerCase()}`)
        .text(data.orderStatus)
    );
    tbody.append(tableRow);
  }
  function filterItems(itemClass, checkboxId) {
    if ($(checkboxId).prop("checked") == true) {
      $(itemClass).parent().show();
    } else if ($(checkboxId).prop("checked") == false) {
      $(itemClass).parent().hide();
    }
    $("#count").text(`Count: ${$("#tableData tr:visible").length}`);
  }
  //Click listeners for filter button
  $("#orders-new").click(function () {
    filterItems(".new", "#orders-new");
  });
  $("#orders-delivered").click(function () {
    filterItems(".delivered", "#orders-delivered");
  });
  $("#orders-packed").click(function () {
    filterItems(".packed", "#orders-packed");
  });
  $("#orders-intransit").click(function () {
    filterItems(".intransit", "#orders-intransit");
  });
  //click listener for logout
  $("#logout").click(function (params) {
    firebase.auth().signOut().then(function() {
      localStorage.setItem("loginStatus", JSON.stringify(false));
    location.href = "./index.html";
    }).catch(function(error) {
      // An error happened.
    });
    localStorage.setItem("loginStatus", JSON.stringify(false));
    location.href = "./index.html";
  });

  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
    function (data) {
      $.each(data, function (index, responseObj) {
        createItems(responseObj);
      });
    }
  );
});
