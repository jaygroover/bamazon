// console.log("test");
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
    makeTable();
});


console.log(`
   ____  ___    __  ______ _____   ____  _   __
  / __ )/   |  /  |/  /   /__  /  / __ \/ | / /
 / __  / /| | / /|_/ / /| | / /  / / / /  |/ /
/ /_/ / ___ |/ /  / / ___ |/ /__/ /_/ / /|  /
/____/ |_/ _/  /_/_/  |_/____/\____/_/ |  _/
`);


var makeTable = function(){
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
        if (answer.choice === "Q") {
            process.exit();
          }
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
                        connection.query("UPDATE products SET stockquantity='"+(res[id].stockquantity-
                            answer.quant)+"' WHERE productname='"+product
                            +"'", function(err, res2){
                                console.log("product Purchased!!");
                                console.log("THANK YOU FOR SHOPPING BAMAZON!\n");
                                makeTable();
                            })
                    }else{
                        Console.LOG("NOT A VALID SELECTION");
                        promptCustomer(res);
                    }
                    // console.table(res);
                })
            }
        }
        if(i==res.length && correct==false){
            console.log("Not a Valid Selection!");
            promptCustomer(res);
        }
    })
}