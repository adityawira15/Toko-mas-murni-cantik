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

router.get('/api/mc/length', (req, res) => {
  pool.query(`SELECT * FROM data WHERE model = '${req.query.model}'`, (err, response) => {
    res.json({
      data: response.rows
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
    password: req.body.password,
  }
  let opt = {
    expiresIn: '1h'
  }
  let token = jwt.sign(data, 'sshkeywkwkwk', opt)
  pool.query(`SELECT * from users WHERE email = '${data.email}'`, (err, response) => {
    if (err) {
      console.log(err)
    } else {
      if (response.rows.length !== 0) {
        if (response.rows[0].password === data.password) {
          pool.query(`UPDATE users SET token = '${token}' WHERE id = ${response.rows[0].id}`, (err) => {
            if (err) {
              console.log(err)
            } else {
              res.json({
                message: 'success',
                user: response.rows,
                token: token
              })
            }
          })
        } else {
          res.json({
            message: 'Email or Password Wrong!'
          })
        }
      } else {
        res.json({
          message: 'Email or Password Wrong!'
        })
      }
    }
  })
})

router.post('/verifytoken', (req, res) => {
  let data = {
    userid: req.body.userid,
    token: req.body.token,
  }

  if (data) {
    pool.query(`SELECT token FROM users WHERE id = ${req.body.userid}`, (err, val) => {
      if (err) {
        console.log(err)
      } else {
        jwt.verify(data.token, 'sshkeywkwkwk', (err, response) => {
          if (err) {
            res.redirect(`/logout?id=${data.id}`)
          } else {
            res.json({
              login: true
            })
          }
        })
      }
    })
  } else {
    res.json({
      login: false
    })
  }

})

router.get('/logout', (req, res) => {
  pool.query(`UPDATE users SET token = null WHERE id = ${req.query.id}`, (err) => {
    if(err){
      console.log(err)
    }else{
      res.json({
        login: false
      })
    }
  })
})

router.post('/adddata', (req, res) => {
  let data = {
    id: req.body.id,
    title: req.body.title,
    model: req.body.model,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    detail: req.body.detail,
  }
  pool.query(`INSERT INTO data(id, title, detail, description, price, model) VALUES('${data.id}', '${data.title}', '${data.detail}', '${data.description}', ${data.price}, '${data.model}')`, (err) => {
    if(err){
      console.log(err)
    }{
      pool.query(`SELECT * FROM data WHERE id = '${data.id}'`, (err, response) => {
        if(err){
          console.log(err)
        }else{
          res.json({
            status: 'OK',
            message: 'Data Added!',
            data: response.rows
          })
        }
      })
    }
  })
})

module.exports = router;
