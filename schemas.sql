drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
itemid integer auto_increment not null,
productname VARCHAR (50) not null,
departmentname VARCHAR (50) not null,
price DECIMAL (10,4) not null,
stockquantity INTEGER (10) not null,
primary key (itemid)
);