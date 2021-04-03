$(document).ready(function () {
    function createItems(data, data_products) {
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
      tableRow.append($("<td>").addClass("tdSecondry").text(`Rs. ${data.amount}`));
      tableRow.append(
        $("<td>")
          .addClass(`tdPrimary ${data.deliveryStatus.toLowerCase()}`)
          .text(data.deliveryStatus)
      );
      tableRow.append(
        $("<td>")
          .addClass(`tdPrimary ${data.paymentStatus.toLowerCase()}`)
          .text(data.paymentStatus)
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
    $("#orders-paid").click(function () {
        filterItems(".paid", "#orders-paid");
      });
      $("#orders-due").click(function () {
        filterItems(".due", "#orders-due");
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
            text = text.replace(/,\s*$/, "");
            createItems(val, text);
            $("#count").text(`Count: ${$("#tableData tr:visible").length}`);
  
          });
  
          var val = data.val();
          
        });
        //$('#ex-table').append(content);
      }
    });
  
  
    $("#submit").click(function (e) {
      e.preventDefault();
      const userid = $("#userid").val();
              const orderid = $("#orderid").val();
              let status = $("#orderstatus").val();
  
  
      var database = firebase.database();
      database.ref('/orders/' + userid + '/' + orderid).once('value', function (snapshot) {
        if (snapshot.exists()) {
          data = snapshot.val()
          console.log(data.userid)
  
          const ref = firebase.database().ref("/orders/" + "1g7A6tLfFCNAPggWHOeQC3FWaAi2" + "/" + "001");
          ref.set({
            userid: data.userid,
            id: data.id,
            customerName: data.customerName,
            amount: data.amount,
            orderDate: data.orderDate,
            orderTime: data.orderTime,
            deliveryStatus: status,
            paymentStatus: data.paymentStatus,
            products: data.products
          }).then(success => {
            // location.href = "./order.html";
            // alert("added");
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
  