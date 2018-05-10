var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
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

module.exports = router;
