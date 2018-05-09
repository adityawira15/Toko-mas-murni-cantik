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
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/mc', (req, res) => {
  pool.query('select * from data', (err, response) => {
    res.json(response.rows)
  })
})

module.exports = router;
