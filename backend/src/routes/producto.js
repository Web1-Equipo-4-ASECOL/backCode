const express = require('express');
const router = express.Router();


const ProductoController = require('../controllers/productoController');

//privados
router.post('/add',ProductoController.add);
router.get('/list',ProductoController.list);
router.put('/update',ProductoController.update);
router.put('/enabled',ProductoController.enabled);
router.put('/disabled',ProductoController.disabled);
router.get('/listActive',ProductoController.listActive);
router.delete('/remove',ProductoController.remove);

module.exports = router;