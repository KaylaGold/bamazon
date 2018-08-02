DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INT,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fan", "House_Hold_Items", 50.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("running_shoes", "Athletics", 75.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("shirt", "Clothing", 12.00, 30);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pants", "Clothing", 30.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("glasses", "Eyewear", 25.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("energy_drink", "Grocery", 5.25, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("matress", "Furniture", 250.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sheets", "House_Hold_Items", 45.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("fertilizer", "Patio_Lawn_&_Garden", 77.67, 44);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("barbie_doll", "Toy", 15.23, 8);



















