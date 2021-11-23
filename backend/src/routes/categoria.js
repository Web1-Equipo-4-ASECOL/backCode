const express = require('express');
const router = express.Router();

const CategoriaController = require('../controllers/categoriaController');
//privados
router.post('/add',CategoriaController.add);
router.get('/list',CategoriaController.list);
router.put('/update',CategoriaController.update);
router.put('/enabled',CategoriaController.enabled);
router.put('/disabled',CategoriaController.disabled);
router.get('/listActive',CategoriaController.listActive);

// router.delete('/remove',CategoriaController.remove);


module.exports = router;