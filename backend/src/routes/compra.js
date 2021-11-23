const express = require('express');
const router = express.Router();


const CompraController = require('../controllers/compraController');

//privados
router.post('/add',CompraController.add);
router.get('/list',CompraController.list);


module.exports = router;