DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quanity INT default 0,
  PRIMARY KEY (id)

);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Beats By Drew", "Eletronics", 49.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Rubiks Cube", "Games", 9.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("UGA Mini Helmet", "Sports", 19.95, 5);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("UGA #34 Jersey", "Apparel", 109.95, 1);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Energizer AA Batteries", "Eletronics", 19.95, 100);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("DJI Mavic Pro II", "Hobbies", 1449.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Pop Corn Popper", "Kitchen", 49.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Playstaion 5", "Games", 499.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Falcons #21 Jersey", "Apparel", 99.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Rock Salt Lamp", "Furniture", 49.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Hand-Held Football", "Games", 49.95, 10);
