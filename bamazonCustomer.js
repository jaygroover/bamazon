console.log("test");
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'2526147480123aCB$',
    database:'bamazon'
});
connection.connect(function(err){
    if(err)throwerr;
    console.log('connection successful!');
    table();
});

function table(){
connection.query('SELECT * FROM products', function(err,res){
console.table(res);
})
    
};