// function change(role) {
//     alert('Old value: ' + role.value);
// }
$(document).ready(function () {
  // if (JSON.parse(localStorage.getItem("loginStatus"))) {
  //   location.href = "./order.html";
  // }

  $("#signup").click(function (e) {
    e.preventDefault();
    var x = document.getElementById("role1").checked;
    var y = document.getElementById("role2").checked;
    let role;
    let subrole;
    if (x) {
      role = "Admin"
      subrole = $("#admin-role").val();
    }
    else {
      role = "Customer"
      subrole = " ";
    }
    let username = $("#username").val();
    let password = $("#password").val();
    let name = $("#name").val();
    let dob = $("#dob").val();
    let gender = $("#gender").val();
    // console.log(role);
    // console.log(subrole);



    firebase.auth().createUserWithEmailAndPassword(username, password)
      .then((user) => {
        const ref = firebase.database().ref("/users/" + user.user.uid);
        ref.set({
          name: name,
          dob: dob,
          gender: gender,
          email: user.user.email,
          role: role,
          subrole: subrole,
          useruid: user.user.uid
        }).then(success => {
          // location.href = "./order.html";
          if (role == "Admin") {
            if (subrole == "Inventory Manager") {
              // Inventory Manager
              location.href = "./inventory_management_products.html";
              // alert(subrole)
            } else if (subrole == "Customer Helper") 
            {
              // Customer Helper
              // location.href = "./order.html";
              // alert(subrole)
            } else if (subrole == "Security Manager") 
            {
              // Security Manager
              location.href = "./security_manager.html";
              // alert(subrole)
            } else if (subrole == "Cashier") 
            {
              // Cashier
              location.href = "./cashier_order.html";
              // alert(subrole)
            } else if (subrole == "Delivery Manager") 
            {
              // Delivery Manager
              location.href = "./delivery_manager_order.html";
              // alert(subrole)
            }
          }

          else if (role == "Customer")
          {
            // location.href = "./order.html";
            // alert(role)
          }
        })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log(errorMessage);
          });


      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorMessage);
      });
  });


  $("#login").click(function (e) {
    e.preventDefault();
    location.href = "./index.html";
  });

  $("#admin-role").hide();

  $("#role1").click(function (e) {
    // alert('Old value: ' + $("#role1").val());
    // alert('Old value: ' + $("#role2").val());
    // var x = document.getElementById("role1").checked;
    // var y = document.getElementById("role2").checked;
    // alert(x);
    // alert(y);
    $("#admin-role").show();
  })


  $("#role2").click(function (e) {
    // alert('Old value: ' + role1.value);
    $("#admin-role").hide();
  })



});
