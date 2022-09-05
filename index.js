let mysql = require('mysql');


// let connection = mysql.createPool({
//   connectionLimit: 10,
//   host: 'localhost',
//   user: 'sqluser',
//   password: 'password',
//   database: 'gps_tracker_db',
//   insecureAuth: true
// });

// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'sqluser',
//   password: 'password',
//   database: 'gps_tracker_db',
//   insecureAuth: true
// });

function get_connection(){
  return  mysql.createConnection({
    host: 'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'gps_tracker_db',
    insecureAuth: true
  });
}


// connection.connect(function (err) {
  // if (err) {
  //   return console.error('error: ' + err.message);
  // }
  // console.log('Connected to the MySQL server.');
//   if (err) throw err;
//   console.log("Connected!")

//   var sql = `INSERT INTO waypoints(latitude, longitude, speed, vehicle) values (33.650784, -117.891235, 5, 1), (33.650784, -117.891235, 5, 2);`
//   connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log('1 record inserted')
//   })

// });


//  connection.connect(function (err) {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }

//     const sql = `INSERT INTO vehicles(make, model, color, year) values("Ford", "Crown Victoria", "white", 1999)`;
//     connection.query(sql, function (err, result) {
//       if (err) throw err;
//       // res.send(result);
//       console.log('Record inserted')
//     })

//   });



const express = require('express');

const api = express();

const HOST = 'localhost';

const PORT = 8888;

api.get('/vehicles', (req, res) => {
  let connection = get_connection()

  connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

    const sql = `SELECT * FROM vehicles`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    })

  });
})

api.post('/newvehicle', (req, res)=> {
   let connection = get_connection()
   connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
    const sql = `INSERT INTO vehicles (make, model, color, year) values ("${req.query.make}", "${req.query.model}", "${req.query.color}", ${req.query.year})`;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
      connection.end()
    })
  });
})


api.listen(PORT, ()=>{
  console.log('Listening on port 8888')
} )
