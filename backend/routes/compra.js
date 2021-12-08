const express = require('express');
const router = express.Router();

const {add,list,enabled,disabled} = require('../controllers/compraController');
//privados
router.post('/add', add);
router.get('/list', list);
router.put('/enabled', enabled);
router.put('/disabled', disabled);


module.exports = router;