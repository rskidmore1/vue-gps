let mysql = require('mysql');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'gps_tracker_db',
    insecureAuth: true
})


const express = require('express');

const api = express();

const HOST = 'localhost';

const PORT = 8888;

api.get('/vehicles', (req, res) => {

  const sql = `SELECT * FROM vehicles`;

  pool.query(sql, function (err, result){
    if (err) throw err;
    res.send(result);
  });

})

api.get('/vehicle', (req, res) => {

  const sql = `SELECT * FROM vehicles WHERE idvehicles = ${req.query.idvehicles}`;

  pool.query(sql, function (err, result){
    if (err) throw err;
    res.send(result);
  });

})

api.post('/newvehicle', (req, res) => {

  const sql = `INSERT INTO vehicles (make, model, color, year) values ("${req.query.make}", "${req.query.model}", "${req.query.color}", ${req.query.year})`;

  pool.query(sql, function (err, result){
      if (err) throw err;
      res.send(result);
    });

})

api.listen(PORT, ()=>{
  console.log('Listening on port 8888')
} )
