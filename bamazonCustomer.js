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
    if (err) throw err;
    console.table(res);
    promptCustomer(res);
})
};

var promptCustomer = function(res){
    inquirer.prompt([{
        type:'input',
        name:'choice',
        message:"What would you like to buy today? [Quit with Q]"
    }])
    .then(function(answer){
        var correct = false;
        for(var i=0;i<res.length; i++){
            if(res[i].productname==answer.choice){
                correct=true;
                var product=answer.choice;
                var id=i;
                inquirer.prompt({
                    type:"input",
                    name:"quant",
                    message:"How many do you want to buy",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function(answer){
                    if((res[id].stockquantity-answer.quant)>0){
                        connection.query("UPDATE products SET stockquantity='"+(res[id].stockquantyity-
                            answer.quant)+"' WHERE productname='"+product
                            +"'", function(err, res2){
                                console.log("product Purchased!!");
                                makeTable();
                            })
                    }else{
                        Console.LOG("NOT A VALID SELECTION");
                    }
                })
            }
        }
    })
}