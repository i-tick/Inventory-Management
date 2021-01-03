$(document).ready(function () {
  if (JSON.parse(localStorage.getItem("loginStatus"))) {
    location.href = "./order.html";
  }
  $("#login").click(function (e) {
    e.preventDefault();
    let username = $("#username").val();
    let password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then((user) => {
        // Signed in 
        // ...
        // location.href = "./order.html";

        var ref = firebase.database().ref('/users/' + user.user.uid);
        ref.on('value', function (snapshot) {
          //console.log(snapshot.val());
          var role = snapshot.val().role;
          // alert(role)
          if (role == "Customer") {
            // Customer
            // alert(role);
          }
          else if (role == "Admin") {
            var subrole = snapshot.val().subrole;
            if (subrole == "Inventory Manager") {
              // Inventory Manager
              // alert(subrole);
              location.href = "./inventory_management_products.html"
            }
            else if (subrole == "Cashier") {
              // Customer Helper
              // alert(subrole);
              location.href = "./cashier_order.html";

            }
            else if (subrole == "Delivery Manager") {
              // Delivery Manager
              // alert(subrole);
              location.href = "./delivery_manager_order.html";

            }
            else if (subrole == "Security Manager") {
              // Cashier
              // alert(subrole);
              location.href = "./security_manager.html";
            }

            else if (subrole == "Customer Helper") {
              // Security Manager
              alert(subrole);
            }
          }
          //  snapshot.forEach(function(childSnapshot) {
          //    var childData = childSnapshot.val();
          //    console.log(childData);
          //  });




          var database = firebase.database();
    database.ref('/users/').once('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                console.log(val.email);
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

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  });


  $("#signup").click(function (e) {
    e.preventDefault();
    location.href = "./signup.html";
  });
});
