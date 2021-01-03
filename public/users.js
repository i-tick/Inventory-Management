$(document).ready(function () {
  function createItems(data) {
    let tbody = $("#tableData");
    let tableRow = $("<tr>");
    tableRow.append($("<td>").addClass("tdSecondry").text(data.useruid));
    
    tableRow.append($("<td>").addClass("tdSecondry").text(data.name));
    tableRow.append(
      $("<td>")
        .addClass("tdPrimary")
        .text(data.dob.replace("-", " ").replace("-", ", "))
    );
    tableRow.append($("<td>").addClass("tdSecondry").text(data.gender));
    if (data.subrole==" ")
    {
      $("<td>")
      .addClass("tdSecondry")
      .text(`${data.role}`)
    }
    else{
      
    tableRow.append(
      $("<td>")
        .addClass("tdSecondry")
        .text(`${data.role}, ${data.subrole}`)
    );
    }
    tbody.append(tableRow);
  }
  //click listener for reset button
  $("#reset").click(function () {
    $("#tableData tr").show();
  });

  //click listener for logout
  $("#logout").click(function (params) {
    firebase.auth().signOut().then(function () {
      localStorage.setItem("loginStatus", JSON.stringify(false));
      location.href = "./index.html";
    }).catch(function (error) {
      // An error happened.
    });
    localStorage.setItem("loginStatus", JSON.stringify(false));
    location.href = "./index.html";
  });

  // $.get(
  //   "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
  //   function (data) {
  //     $.each(data, function (index, responseObj) {
  //       createItems(responseObj);
  //     });
  //   }
  // ).done(function () {
  //   $("#search").keypress(function (e) {
  //     var key = e.which;
  //     if (key == 13) {
  //       // the enter key code
  //       e.preventDefault();
  //       var searchItem = $(this).val();
  //       if (searchItem.length > 1) {
  //         $("#tableData tr").hide();
  //         $.get(
  //           `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchItem}`,
  //           function (searchData) {
  //             $.each(searchData, function (index, searchResponse) {
  //               createItems(searchResponse);
  //             });
  //           }
  //         );
  //       } else {
  //         alert("Please enter at least 2 characters");
  //       }
  //     }
  //   });
  // });

  var database = firebase.database();
  database.ref('/users/').once('value', function(snapshot){
      if(snapshot.exists()){
          var content = '';
          snapshot.forEach(function(data){
              var val = data.val();
              // console.log(val.id);
              createItems(val)
              // $.each(data, function (index, responseObj) {
              //   console.log(responseObj);
              // });
              // content +='<tr>';
              // content += '<td>' + val.descripcion + '</td>';
              // content += '<td>' + val.direccion + '</td>';
              // content += '<td>' + val.estado + '</td>';
              // content += '<td>' + val.imagen + '</td>';
              // content += '<td>' + val.tipo + '</td>';
              // content += '<td>' + val.udisplayName + '</td>';
              // content += '<td>' + val.uemail + '</td>';
              // content += '</tr>';
          });
          //$('#ex-table').append(content);
      }
    });





});
