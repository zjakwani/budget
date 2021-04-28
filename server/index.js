const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "BudgetDB",
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get("/api/retrieve", (req, res) => {
    const sqlRetrieve = "SELECT * FROM BudgetDB.transactions";
    db.query(sqlRetrieve, (error, result)=> {
        res.send(result);
    });
});


app.post("/api/add", (req, res) => {
    
    const transactionb = req.body.transactionName;
    const amountb = req.body.amount;

    const sqlAdd = "INSERT INTO BudgetDB.transactions (transactionName, amount) VALUES (?,?)";
    db.query(sqlAdd, [transactionb, amountb], (error, result)=> {
        console.log(result);
    });
});

app.delete("/api/delete/:transactionName", (req, res) => {
    const x = req.params.transactionName;
    const sqlRemove = "DELETE FROM BudgetDB.transactions WHERE transactionName = ?";
    db.query(sqlRemove, x, (error, result) => {
        if (error) console.log(error);
    })
});

app.put("/api/update", (req, res) => {
    const x = req.body.amount;
    const y = req.body.transactionName;
    const sqlUpdate = "UPDATE BudgetDB.transactions SET amount = ? WHERE transactionName = ?";
    db.query(sqlUpdate, [x,y], (error, result) => {
        if (error) console.log(error);
    })
});

app.listen(3001, () => {
    console.log("is running");
});
