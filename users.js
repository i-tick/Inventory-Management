$(document).ready(function () {
  function createItems(data) {
    let tbody = $("#tableData");
    let tableRow = $("<tr>");
    tableRow.append($("<td>").addClass("tdSecondry").text(data.id));
    tableRow.append(
      $("<td>")
        .addClass("tdPrimary")
        .append($("<img>").attr("src", data.profilePic))
    );
    tableRow.append($("<td>").addClass("tdSecondry").text(data.fullName));
    tableRow.append(
      $("<td>")
        .addClass("tdPrimary")
        .text(data.dob.replace("-", " ").replace("-", ", "))
    );
    tableRow.append($("<td>").addClass("tdSecondry").text(data.gender));
    tableRow.append(
      $("<td>")
        .addClass("tdSecondry")
        .text(`${data.currentCity}, ${data.currentCountry}`)
    );
    tbody.append(tableRow);
  }
  //click listener for reset button
  $("#reset").click(function () {
    $("#tableData tr").show();
  });

  //click listener for logout
  $("#logout").click(function (params) {
    localStorage.setItem("loginStatus", JSON.stringify(false));
    location.href = "./index.html";
  });

  $.get(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
    function (data) {
      $.each(data, function (index, responseObj) {
        createItems(responseObj);
      });
    }
  ).done(function () {
    $("#search").keypress(function (e) {
      var key = e.which;
      if (key == 13) {
        // the enter key code
        e.preventDefault();
        var searchItem = $(this).val();
        if (searchItem.length > 1) {
          $("#tableData tr").hide();
          $.get(
            `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchItem}`,
            function (searchData) {
              $.each(searchData, function (index, searchResponse) {
                createItems(searchResponse);
              });
            }
          );
        } else {
          alert("Please enter at least 2 characters");
        }
      }
    });
  });
});
