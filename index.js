const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const fileUpload = require("express-fileupload");
var mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static(__dirname + "/public"));

const port = 4000;

app.post("/", (req, res) => {
  res.send("Hello World!");
});

// connection configurations
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "twoday",
});

dbConn.connect();

app.get("/readdata", function (req, res) {
  dbConn.query("SELECT * FROM employee", function (error, results, fields) {
    if (error) throw error;

    // check has data or not
    let message = "";
    if (results === undefined || results.length == 0)
      message = "employee table is empty";
    else message = "Successfully retrived all ";

    return res.send({ data: results });
  });
});

app.get("/readData/:id", function (req, res) {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide enter id" });
  }
  dbConn.query(
    `SELECT * FROM employee WHERE id=?`,
    id,
    function (error, results, fields) {
      if (error) throw error;

      // check has data or not
      let message = "";
      if (results === undefined || results.length == 0)
        message = " table is empty";
      else message = "Successfully retrived all ";

      return res.send({ data: results });
    }
  );
});

app.post("/addEmployee", function (req, res) {
  let name = req.body.name;
  let nid = req.body.nid;

  // validation

  // insert to db
  dbConn.query(
    "INSERT INTO employee (name, nid) VALUES (?, ?)",
    [name, nid],
    function (error, results, fields) {
      return res.send({
        error: false,
        data: results,
        message: " successfully added",
      });
      console.log(results);
    }
  );
});

app.delete("/datadelete/:id", function (req, res) {
  let id = req.params.id;

  dbConn.query("DELETE FROM employee where id=?", id, function (err, results) {
    if (err) {
      throw err;
    }
    let message = "";
    if (results.affectedRows == 0) {
      message = " deleted";
    } else {
      message = " successfully delete";
    }
    return res.send({ data: results[0], message: message });
  });
});



app.put("/updatedata/:id",function(req,res){
    let id = req.params.id;
    let name = req.body.name;
    let nid = req.body.nid;
    
    dbConn.query('UPDATE employee set name=?,nid=? WHERE id=?',[name,nid,id],function(err,results){
        if(err){throw err}
        let message = "";
        if(results.changedRows == 0){
            message = "please input";
        }
        else{
            message ="successfully updatedata";
        }
        return res.send({ data: results,message:message})
    });

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
