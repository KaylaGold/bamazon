let inquirer = require('inquirer');
let mysql = require('mysql');
let figlet = require('figlet');

figlet('BAMAZON', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)

});


//Create mysql connection
 let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

//Connect to the MySQL server and database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    //Run the start of the app once connection is established
    queryAllProducts();
});

//Query Functions:
//Displays all of the items available for sale. Include the ids, names, and prices of products for sale.
function queryAllProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('-----------------Items Available for Sale-----------------');
        for (let i = 0; i < res.length; i++) {
            console.log("Item ID:" + res[i].item_id + " | " + "Product Name:" + res[i].product_name + " | " + "Department Name:" + res[i].department_name + " | " + "Price:" + res[i].price + " | " + "Stock Quantity:" + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        startOrder();
    })

}


//Function which prompts user for the ID of the product they would like to buy and quantity of order.

function startOrder() {
    inquirer
        .prompt([{
            name: "ID",
            type: "input",
            message: "Please enter the ID of the desired product for purchase.",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return "Please enter valid product ID";
                }
            }
        }, {
            name: "Quantity",
            type: "input",
            message: "How many units of this product would you like to order?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return "Insufficient amount! Please enter quantity of the product you wish to order.";
                }
            }
        }]).then(function (answer) {
            //Update Database to reflect remaining quantity of item.
            connection.query('SELECT * FROM products WHERE item_id = ?', [answer.ID], function (err, res) {
                if (err) throw err;
                if (!answer.Quantity > res[0].stock_quantity) {
                    console.log("Insufficient Quantity");
                    console.log("This order has been cancelled.");
                } else {
                    let totalAmount = res[0].price * answer.Quantity;
                    console.log("Your Order has been placed.");
                    console.log("Total amount is:" + totalAmount);

                    //Update MySQL products table
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: res[0].stock_quantity - answer.Quantity

                    }, {
                        id: answer.ID
                    }], function (err, res) { });



                };

                
            })
        })
}


