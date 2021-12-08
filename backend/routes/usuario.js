const express = require('express');
const router = express.Router();

const {add,list,update,enabled,disabled,login} = require('../controllers/usuarioController');

//privados
router.post('/add', add);
router.get('/list', list);
router.put('/update', update);
router.put('/enabled', enabled);
router.put('/disabled', disabled);

//publicos
router.post('/login', login);

module.exports = router;