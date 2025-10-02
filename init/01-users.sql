CREATE USER IF NOT EXISTS 'product'@'%' IDENTIFIED BY 'productpwd';
GRANT ALL PRIVILEGES ON `product-db`.* TO 'product'@'%';
FLUSH PRIVILEGES;