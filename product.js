$(document).ready(function () {
  function getExpiry(expiryDate) {
    let timeNow = new Date().getTime();
    let expirydate = expiryDate.split("-");
    if (expirydate[1].toLowerCase() == "jan") {
      expirydate[1] = 1;
    } else if (expirydate[1].toLowerCase() == "feb") {
      expirydate[1] = 2;
    } else if (expirydate[1].toLowerCase() == "mar") {
      expirydate[1] = 3;
    } else if (expirydate[1].toLowerCase() == "apr") {
      expirydate[1] = 4;
    } else if (expirydate[1].toLowerCase() == "may") {
      expirydate[1] = 5;
    } else if (expirydate[1].toLowerCase() == "jun") {
      expiryDate[1] = 6;
    } else if (expirydate[1].toLowerCase() == "jul") {
      expirydate[1] = 7;
    } else if (expirydate[1].toLowerCase() == "aug") {
      expirydate[1] = 8;
    } else if (expirydate[1].toLowerCase() == "sep") {
      expirydate[1] = 9;
    } else if (expirydate[1].toLowerCase() == "oct") {
      expirydate[1] = 10;
    } else if (expirydate[1].toLowerCase() == "nov") {
      expirydate[1] = 11;
    } else if (expirydate[1].toLowerCase() == "dec") {
      expirydate[1] = 12;
    }
    var expireTime = new Date(expirydate[2], expirydate[1] - 1, expirydate[0]);
    console.log(`${timeNow} ${expireTime.getTime()}`);
    return timeNow > expireTime.getTime();
  }

  function createItems(data) {
    let tbody = $("#tableData");
    let tableRow = $("<tr>");
    tableRow.append($("<td>").addClass("tdSecondry").text(data.id));
    tableRow.append($("<td>").addClass("tdPrimary").text(data.medicineName));
    tableRow.append($("<td>").addClass("tdSecondry").text(data.medicineBrand));

    if (getExpiry(data.expiryDate)) {
      tableRow.append(
        $("<td>")
          .addClass("tdPrimary expired")
          .text(data.expiryDate.replace("-", " ").replace("-", ", "))
      );
    } else {
      tableRow.append(
        $("<td>")
          .addClass("tdPrimary")
          .text(data.expiryDate.replace("-", " ").replace("-", ", "))
      );
    }

    tableRow.append(
      $("<td>").addClass("tdSecondry").text(`$${data.unitPrice}`)
    );

    //checking if stock is low
    if (data.stock < 100) {
      tableRow.append($("<td>").addClass("tdSecondry low").text(data.stock));
    } else {
      tableRow.append($("<td>").addClass("tdSecondry").text(data.stock));
    }
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
  $("#products-expired").click(function () {
    filterItems(".expired", "#products-expired");
  });
  $("#products-low").click(function () {
    filterItems(".low", "#products-low");
  });
  //click listener for logout
  $("#logout").click(function (params) {
    localStorage.setItem("loginStatus", JSON.stringify(false));
    location.href = "./index.html";
  });

  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
    function (data) {
      $.each(data, function (index, responseObj) {
        createItems(responseObj);
      });
    }
  );
});
