const express = require('express');
const router = express.Router();

const {add,list,update,enabled,disabled,listActive} = require('../controllers/categoriaController');
//privados
router.post('/add', add);
router.get('/list', list);
router.put('/update', update);
router.put('/enabled', enabled);
router.put('/disabled', disabled);
router.get('/listActive', listActive);

// router.delete('/remove',CategoriaController.remove);


module.exports = router;