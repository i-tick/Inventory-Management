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
          alert(role)
          if (role == "Customer") {
            // Customer
            alert(role);
          }
          else if (role == "Admin") {
            var subrole = snapshot.val().subrole;
            if (subrole == "inventory-manager") {
              // Inventory Manager
              alert(subrole);
            }
            else if (subrole == "cashier") {
              // Customer Helper
              alert(subrole);
            }
            else if (subrole == "delivery-manager") {
              // Delivery Manager
              alert(subrole);
            }
            else if (subrole == "security-manager") {
              // Cashier
              alert(subrole);
            }

            else if (subrole == "customer-helper") {
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
