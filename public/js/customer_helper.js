$(document).ready(function () {
    function createItems(data, data_products) {
      let tbody = $("#tableData");
      let tableRow = $("<tr>");
      tableRow.append($("<td>").addClass("tdSecondry").text(data.id));
      tableRow.append($("<td>").addClass("tdPrimary").text(data.userid));
      tableRow.append($("<td>").addClass("tdPrimary").text(data.customerName));
      tableRow.append(
        $("<td>")
          .addClass("tdPrimary")
          .text(data.orderDate.replace("-", " ").replace("-", ", "))
          .append($("<br>"))
          .append($("<span>").addClass("tdSecondry").text(data.orderTime))
      );
      tableRow.append($("<td>").addClass("tdSecondry").text(`Rs. ${data.amount}`));
      tableRow.append(
        $("<td>")
          .addClass(`tdPrimary ${data.queryresolved.toLowerCase()}`)
          .text(data.queryresolved)
      );
      tableRow.append(
        $("<td>")
          .addClass(`tdPrimary`).text(data_products)
  
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
    $("#orders-resolved").click(function () {
      filterItems(".yes", "#orders-resolved");
    });
    $("#orders-notresolved").click(function () {
      filterItems(".no", "#orders-resolved");
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
    //   "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
    //   function (data) {
    //     $.each(data, function (index, responseObj) {
    //       createItems(responseObj);
    //     });
    //   }
    // );
  
    var database = firebase.database();
    database.ref('/orders/').once('value', function (snapshot) {
      if (snapshot.exists()) {
        var content = '';
        snapshot.forEach(function (data) {
          data.forEach(function (data1) {
            var val = data1.val();
            //console.log(val);
            productslist = val.products;
            keys = Object.keys(val.products)
            // productslist.forEach(data){
            //   text = String(keys[0])
            // }
            // console.log(val.products[keys[0]].quantity)
            text = ""
            let tableRow = $("<tr>");
            for (let index = 0; index < keys.length; index++) {
              // const element = array[index];
              text += String(keys[index]) + ": " + String(val.products[keys[index]].quantity) + ",\n";
            }
            createItems(val, text);
            $("#count").text(`Count: ${$("#tableData tr:visible").length}`);

          });
  
          var val = data.val();
          //console.log(val);
          // createItems(val)
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
  
  
    $("#submit").click(function (e) {
      e.preventDefault();
      const userid = $("#userid").val();
              const orderid = $("#orderid").val();
              let status = $("#querystatus").val();
  
  
      var database = firebase.database();
      database.ref('/orders/' + userid + '/' + orderid).once('value', function (snapshot) {
        if (snapshot.exists()) {
          data = snapshot.val()
          console.log(status)
  
          const ref = firebase.database().ref("/orders/" + "1g7A6tLfFCNAPggWHOeQC3FWaAi2" + "/" + "001");
          ref.set({
            userid: data.userid,
            deliveryStatus: data.deliveryStatus,
            id: data.id,
            customerName: data.customerName,
            amount: data.amount,
            orderDate: data.orderDate,
            orderTime: data.orderTime,
            paymentStatus: data.paymentStatus,
            queryresolved: status,
            products: data.products
          }).then(success => {
            
            location.reload();
          })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              // ..
              alert(errorMessage);
            });
  
  
        }
  
      });
  
    });
  
  
  });
  