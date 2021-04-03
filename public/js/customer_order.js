$(document).ready(function () {
    function createItems(data, data_products,data_sum) {
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
        tableRow.append($("<td>").addClass("tdSecondry").text(`$${data_sum}`));
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


    var database = firebase.database();
    database.ref('/orders/').once('value', function (snapshot) {
        if (snapshot.exists()) {
            var content = '';
            snapshot.forEach(function (data) {
                data.forEach(function (data1) {


                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
        
        
                            window.useruid = user.uid;
                            console.log(user.uid)

                      



                    
                    var val = data1.val();
                    console.log(val)

                if (user.uid == val.userid)

                {

                
                    
                    productslist = val.products;
                    keys = Object.keys(val.products)
                    
                    text = ""
                    let tableRow = $("<tr>");
                    for (let index = 0; index < keys.length; index++) {
                        
                        text += String(keys[index]) + ": " + String(val.products[keys[index]].quantity) + ",\n";
                    }
                    text = text.replace(/,\s*$/, "");
                    



                    productslist = val.products;
                    keys = Object.keys(val.products)
                    
                    sum = 0
                    // let tableRow = $("<tr>");
                    for (let index = 0; index < keys.length; index++) {
                        
                        sum += val.products[keys[index]].amount;
                    }
                    
                    createItems(val, text,sum);
                    $("#count").text(`Count: ${$("#tableData tr:visible").length}`);
                }




                } else {

                    console.log("hello1")

                }

            });


                });

                var val = data.val();
                
            });
        }
    });


});
