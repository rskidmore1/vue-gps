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

api.put('/vehicle', (req, res) => {

  const sql = `SELECT * FROM vehicles WHERE idvehicles = ${req.query.idvehicles}`;
  let idvehicles = req.query.idvehicles;
  let make = req.query.make;
  let model = req.query.model;
  let color = req.query.color;
  let year = req.query.year;

  function flatten(input){
    const toString = String(input)
    const removeSpaces = toString.replace(/ /g, "");
    const lowerCase = removeSpaces.toLowerCase();
    return lowerCase;
  }

  pool.query(sql, function (err, result){
    if (err) throw err;
    result.map(field=>{
      flatten(make) === flatten(field.make) || make === undefined ? make = field.make : null;
      flatten(model) === flatten(field.model) || model === undefined ? model = field.model : null;
      flatten(color) === flatten(field.color) || color === undefined ? color = field.color : null;
      year === field.year || year === undefined ? make = field.year : null;

    })

  });

const updateQuery = `UPDATE vehicles SET make = '${make}', model = '${model}', year = ${year}, color = '${color}' WHERE idvehicles = ${idvehicles};`

  pool.query(updateQuery, function (err, result){
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
