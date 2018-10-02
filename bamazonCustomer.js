var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}


function purchase() {
  inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "Would you like to make a purchase?",
    choices: [
      "Yes",
      "No"
    ]
  })
  .then(function(input) {
    switch (input.action) {
    case "Yes":
    //productSearch();
    queryinventory();
    break;

    //case "No":

    }
  })
}


// promptUserPurchase will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		

		var item = input.id;
		var quantity = input.quantity;

		
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {id: item}, function(err, data) {
			if (err) throw err;

			

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				queryinventory();

			} else {
				var productData = data[0];

				

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quanity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');

				
					var updateQueryStr = 'UPDATE products SET stock_quanity = ' + (productData.stock_quanity - quantity) + ' WHERE id = ' + item;
					

					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					queryinventory();
				}
			}
		})
	})
}

function queryinventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | Qty: " + res[i].stock_quanity);
      console.log("-----------------------------------------------------------------------------");
      //console.log("ID: " + res[i].id + " || Prduct: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Quanity: " + res[i].stock_quanity);
    } 
    //connection.end();
    //purchase();
    promptUserPurchase();
  });
  //connection.end();
}



// runBamazon will execute the main application logic
function runBamazon() {

	// Display the available inventory
  //queryinventory();
  purchase();
}

// Run the application logic
runBamazon();



