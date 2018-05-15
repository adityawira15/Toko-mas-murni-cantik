var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const jwt = require('jsonwebtoken');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tokomas',
  password: 'AdItYa15:)',
  port: 5432
})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/mc', (req, res) => {
  pool.query(`select * from data where model = '${req.query.model}' `, (err, data) => {
    pool.query(`select * from data where model = '${req.query.model}' LIMIT 4 OFFSET ${req.query.offset}`, (err, response) => {
      res.json({
        data: data.rows,
        response: response.rows
      })
    })
  })
})

router.get('/api/mc/:id', (req, res) => {
  pool.query(`SELECT * FROM data WHERE id = '${req.params.id}'`, (err, response) => {
    res.json({
      data: [],
      response: response.rows,
    })
  })
})

router.post('/login', (req, res) => {
  let data = {
    email: req.body.email,
    password: req.body.password
  }
  let token = jwt.sign({data}, 'sshkeywkwkwk')
  pool.query(`SELECT * from users WHERE email = '${data.email}'`, (err, response) => {
    if(err){
      console.log(err)
    }else{
      if(response.rows.length !== 0){
        if(response.rows[0].password === data.password){
          res.json({
            message: 'success',
            token: token
          })
        }else{
          res.json({
            message: 'Email or Password Wrong!..'
          })
        }
      }else{
        res.json({
          message: 'Email or Password Wrong!'
        })
      }
    }
  })
})

module.exports = router;
