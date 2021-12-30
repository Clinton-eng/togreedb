const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
//const pool = require('pool')
const cors = require("cors");

const app = express();
app.use(cors("*"));
const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//MYSQL

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "togreedb",
});

//Get Tracker
app.get("/trackers", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");

    connection.query("SELECT * from trackers", (err, rows) => {
      connection.release(); //return connection to pool
      if (!err) {
        return res.send(rows);
      } else {
        console.log(err);
        return res.json(err);
      }
    });
  });
});

//Get Tracker by id
app.get("/trackers/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");

    connection.query(
      "SELECT * from trackers WHERE id = ?"[req.params.id],
      (err, rows) => {
        connection.release(); //return connection to pool
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
});

//Delete
app.delete("/trackers/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");

    connection.query(
      "DELETE from trackers WHERE id=?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(
            `Tracker with the Record ID: ${[req.params.id]} has been removed`
          );
        } else {
          console.log(err);
        }
      }
    );
  });
});

//Add trackers
app.post("/trackers", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");

    const params = req.body;

    connection.query("INSERT INTO trackers SET ?", params, (err, rows) => {
      connection.release();
      if (!err) {
        res.send(
          `Tracker with the Record ID: ${[req.params.id]} has been added`
        );
      } else {
        console.log(err);
      }
    });
    console.log(req.body);
  });
});

//update request

app.put("/trackers/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");
    const { id } = req.params;

    const { first_name } = req.body;

    connection.query(
      "UPDATE trackers SET fist_name = ? WHERE id = ?",
      [first_name, id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(`Tracker with the model: ${first_name} has been added`);
        } else {
          console.log(err);
        }
      }
    );
    console.log(req.body);
  });
});

//Get cleint
app.get("/clients", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");

    connection.query("SELECT * from clients", (err, rows) => {
      connection.release(); //return connection to pool
      if (!err) {
        return res.send(rows);
      } else {
        console.log(err);
        return res.json(err);
      }
    });
  });
});

//Get Tracker by id
app.get("/clients/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");

    connection.query(
      "SELECT * from clients WHERE id = ?"[req.params.id],
      (err, rows) => {
        connection.release(); //return connection to pool
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
});

//Delete
app.delete("/clients/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");

    connection.query(
      "DELETE from clients WHERE id=?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(
            `Client with the Record ID: ${[req.params.id]} has been removed`
          );
        } else {
          console.log(err);
        }
      }
    );
  });
});

//Add trackers
app.post("/clients", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");

    const params = req.body;

    connection.query("INSERT INTO clients SET ?", params, (err, rows) => {
      connection.release();
      if (!err) {
        res.send(
          `clients with the Record ID: ${[req.params.id]} has been added`
        );
      } else {
        console.log(err);
      }
    });
    console.log(req.body);
  });
});

//update request

app.put("/clients/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id $(connection.threadId}");
    const { id } = req.params;

    const { first_name } = req.body;

    connection.query(
      "UPDATE clients SET name = ? WHERE id = ?",
      [first_name, id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(`Tracker with the model: ${first_name} has been added`);
        } else {
          console.log(err);
        }
      }
    );
    console.log(req.body);
  });
});

app.listen(port, () => console.log("Listen on port ", port));
